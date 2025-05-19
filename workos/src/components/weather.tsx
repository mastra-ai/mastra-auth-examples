'use client';

import { MastraClient } from '@mastra/client-js';
import { useAuth } from '@workos-inc/authkit-react';
import { useState, useEffect } from "react";
import { Container, Box, Text, TextField, Button, Flex, ScrollArea, Card, Heading } from '@radix-ui/themes';

export default function Weather() {
  const { getAccessToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [showSubscribePrompt, setShowSubscribePrompt] = useState(false);

  // Show welcome message on initial load
  useEffect(() => {
    setChatHistory([
      {
        role: 'assistant',
        content: "Hi there! I can help you with weather information. Ask me anything!",
      },
    ]);
  }, []);

  const subscribe = async () => {
    // if (!userId) return;

    // try {
    //   setSubscribing(true);

    //   const { error } = await supabase
    //     .from('users')
    //     .upsert({
    //       id: userId,
    //       isSubscribed: true,
    //       // email: email.trim()
    //     });

    //   if (error) {
    //     throw error;
    //   }

    //   setShowSubscribePrompt(false);
    //   setChatHistory(prev => [
    //     ...prev,
    //     { role: 'assistant', content: '✅ You are now subscribed! Feel free to ask me anything about the weather.' }
    //   ]);
    // } catch (error) {
    //   setError((error as Error).message);
    // } finally {
    //   setSubscribing(false);
    // }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage = { role: 'user' as const, content: message };
    const updatedHistory = [...chatHistory, newUserMessage];

    try {
      setLoading(true);
      setError('');
      setMessage('');
      setChatHistory(updatedHistory);

      const token = await getAccessToken();

      if (!token) throw new Error('No token provided');

      const client = new MastraClient({
        baseUrl: 'http://localhost:4111', // Your Mastra API endpoint
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      

      // await client.exchangeToken({ token });

      const response = await client.getAgent('weatherAgent').stream({
        messages: updatedHistory,
      });

      let message = '';

      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: message },
      ])

      response.processDataStream({
        onTextPart: (streamPart) => {
          message += streamPart;
          setChatHistory(prev => [
            ...prev.slice(0, -1),
            { role: 'assistant', content: message },
          ]);
        },
      });

      // setChatHistory(prev => [
      //   ...prev,
      //   { role: 'assistant', content: response.text },
      // ]);
    } catch (err) {
      const errMsg = (err as Error).message;

      if (
        errMsg.toLowerCase().includes('unauthorized') ||
        errMsg.toLowerCase().includes('403') ||
        errMsg.toLowerCase().includes('401')
      ) {
        setShowSubscribePrompt(true);
        setChatHistory(prev => [
          ...prev,
          {
            role: 'assistant',
            content:
              "🔒 It looks like you need to subscribe to access weather chat. Please enter payment information below to subscribe.",
          },
        ]);
      } else {
        setError(errMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  const SubscriptionForm = () => (
    <Card style={{ maxWidth: '32rem', margin: '1rem auto' }}>
      <Heading size="3" mb="2">🔐 Subscribe to Access</Heading>
      <Text mb="4">Enter your email to subscribe and continue chatting with our weather agent.</Text>

      <Flex direction="column" gap="2">
        <TextField.Root
          type="email"
          placeholder="Your email address"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
        />

        <Button 
          onClick={subscribe}
          disabled={subscribing}
          style={{ width: '100%' }}
        >
          {subscribing ? 'Processing...' : 'Subscribe Now'}
        </Button>

        {error && <Text color="red" size="2">{error}</Text>}
      </Flex>
    </Card>
  );

  return (
    <Container size="1" style={{ height: '70vh' }}>
      <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box p="4" style={{ backgroundColor: 'var(--accent-9)' }}>
          <Heading size="3" style={{ color: 'white' }}>Weather Chat</Heading>
        </Box>

        <ScrollArea style={{ flex: 1, padding: '1rem' }}>
          {chatHistory.map((msg, index) => (
            <Flex key={index} justify={msg.role === 'user' ? 'end' : 'start'} mb="4">
              <Box 
                p="3" 
                style={{
                  maxWidth: '80%',
                  borderRadius: '8px',
                  backgroundColor: msg.role === 'user' ? 'var(--accent-9)' : 'var(--gray-4)',
                  color: msg.role === 'user' ? 'white' : 'inherit',
                  borderBottomRightRadius: msg.role === 'user' ? 0 : '8px',
                  borderBottomLeftRadius: msg.role === 'user' ? '8px' : 0
                }}
              >
                <Text>{msg.content}</Text>
              </Box>
            </Flex>
          ))}

          {showSubscribePrompt && <SubscriptionForm />}
        </ScrollArea>

        <Box p="3" style={{ borderTop: '1px solid var(--gray-5)' }}>
          <Flex>
            <TextField.Root
              value={message}
              style={{ flex: 1 }}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about the weather..."
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button 
              onClick={sendMessage}
              disabled={loading || !message.trim()}
            >
              {loading ? '...' : 'Send'}
            </Button>
          </Flex>
          {error && <Text color="red" size="2" align="center" mt="2">{error}</Text>}
        </Box>
      </Card>
    </Container>
  );
}

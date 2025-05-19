'use client';

import { MastraClient } from '@mastra/client-js';
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth"

export default function Weather() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
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

    try {
      setSubscribing(true);

      // const { error } = await supabase
      //   .from('users')
      //   .upsert({
      //     id: userId,
      //     isSubscribed: true,
      //     // email: email.trim()
      //   });

      // if (error) {
      //   throw error;
      // }

      setShowSubscribePrompt(false);
      setChatHistory(prev => [
        ...prev,
        { role: 'assistant', content: '✅ You are now subscribed! Feel free to ask me anything about the weather.' }
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubscribing(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage = { role: 'user', content: message };
    const updatedHistory = [...chatHistory, newUserMessage];

    try {
      setLoading(true);
      setError('');
      setMessage('');
      setChatHistory(updatedHistory);

      const auth = getAuth();

      const user = auth.currentUser;
      if (!user) throw new Error('No user found');
      
      const token = await user.getIdToken();
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
      const errMsg = err.message;

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
    <div className="p-6 border rounded-lg shadow-sm bg-accent/30 dark:bg-gray-700 dark:border-gray-600 w-full max-w-md min-w-md mx-auto mt-4">
      <h3 className="text-lg font-medium mb-3 dark:text-gray-50">🔐 Subscribe to Access</h3>
      <p className="mb-4 dark:text-gray-200">Enter your email to subscribe and continue chatting with our weather agent.</p>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Your email address"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-50 dark:placeholder-gray-400"
        />
      </div>

      <button
        onClick={subscribe}
        disabled={subscribing}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
      >
        {subscribing ? 'Processing...' : 'Subscribe Now'}
      </button>

      {error && <p className="text-red-500 dark:text-red-400 mt-2">{error}</p>}
    </div>
  );

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-md min-w-md mx-auto border rounded-lg overflow-hidden dark:border-gray-700 dark:bg-gray-800">
      <div className="bg-primary p-4 dark:bg-gray-700">
        <h2 className="text-white font-medium">Weather Chat</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                msg.role === 'user'
                  ? 'bg-primary text-white rounded-br-none dark:bg-gray-700 dark:text-gray-50'
                  : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-50 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {showSubscribePrompt && <SubscriptionForm />}
      </div>

      <div className="border-t dark:border-gray-700 p-4 flex items-center dark:bg-gray-800">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about the weather..."
          className="flex-1 p-2 border dark:border-gray-600 rounded-l-md focus:outline-none dark:bg-gray-700 dark:text-gray-50 dark:placeholder-gray-400"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !message.trim()}
          className="bg-primary text-white p-2 rounded-r-md dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>

      {error && <p className="text-red-500 dark:text-red-400 p-2 text-center">{error}</p>}
    </div>
  );
}

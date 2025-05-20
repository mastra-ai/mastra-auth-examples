'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MastraClient } from '@mastra/client-js';
import { useState, useEffect } from "react";
export default function MastraChat({ agentId, getToken, onSubscribe, initialMessage, baseUrl }) {
    const [loading, setLoading] = useState(false);
    // const [data, setData] = useState<string | null>(null);
    const [error, setError] = useState('');
    const [subscribing, setSubscribing] = useState(false);
    // const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [showSubscribePrompt, setShowSubscribePrompt] = useState(false);
    // Show welcome message on initial load
    useEffect(() => {
        setChatHistory([
            {
                role: 'assistant',
                content: initialMessage ?? "Hi there! How can I help you today?",
            },
        ]);
    }, []);
    const subscribe = async () => {
        try {
            setSubscribing(true);
            const response = await onSubscribe?.();
            setShowSubscribePrompt(false);
            setChatHistory(prev => [
                ...prev,
                { role: 'assistant', content: response?.message ?? '✅ You are now subscribed!' }
            ]);
        }
        catch (error) {
            setError(error.message);
        }
        finally {
            setSubscribing(false);
        }
    };
    const sendMessage = async () => {
        if (!message.trim())
            return;
        const newUserMessage = { role: 'user', content: message };
        const updatedHistory = [...chatHistory, newUserMessage];
        try {
            setLoading(true);
            setError('');
            setMessage('');
            setChatHistory(updatedHistory);
            const token = await getToken?.();
            if (!token)
                throw new Error('No token provided');
            const client = new MastraClient({
                baseUrl: baseUrl ?? 'http://localhost:4111', // Your Mastra API endpoint
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // await client.exchangeToken({ token });
            const response = await client.getAgent(agentId).stream({
                messages: updatedHistory,
            });
            let message = '';
            setChatHistory(prev => [
                ...prev,
                { role: 'assistant', content: message },
            ]);
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
        }
        catch (err) {
            const errMsg = err.message;
            if (errMsg.toLowerCase().includes('unauthorized') ||
                errMsg.toLowerCase().includes('403') ||
                errMsg.toLowerCase().includes('401')) {
                setShowSubscribePrompt(true);
                setChatHistory(prev => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: "🔒 It looks like you need to subscribe to access this agent. Please enter information below to subscribe.",
                    },
                ]);
            }
            else {
                setError(errMsg);
            }
        }
        finally {
            setLoading(false);
        }
    };
    const SubscriptionForm = () => (_jsxs("div", { className: "p-6 border rounded-lg shadow-sm bg-accent/30 dark:bg-gray-700 dark:border-gray-600 w-full max-w-md min-w-md mx-auto mt-4", children: [_jsx("h3", { className: "text-lg font-medium mb-3 dark:text-gray-50", children: "\uD83D\uDD10 Subscribe to Access" }), _jsx("p", { className: "mb-4 dark:text-gray-200", children: "Enter your email to subscribe and continue chatting with our agent." }), _jsx("div", { className: "mb-4", children: _jsx("input", { type: "email", placeholder: "Your email address", 
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    className: "w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-gray-50 dark:placeholder-gray-400" }) }), _jsx("button", { onClick: subscribe, disabled: subscribing, className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white", children: subscribing ? 'Processing...' : 'Subscribe Now' }), error && _jsx("p", { className: "text-red-500 dark:text-red-400 mt-2", children: error })] }));
    return (_jsxs("div", { className: "flex flex-col h-[70vh] w-full max-w-md min-w-md mx-auto border rounded-lg overflow-hidden dark:border-gray-700 dark:bg-gray-800", children: [_jsx("div", { className: "bg-primary p-4 dark:bg-gray-700", children: _jsx("h2", { className: "text-white font-medium", children: "Mastra Chat" }) }), _jsxs("div", { className: "flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800", children: [chatHistory.map((msg, index) => (_jsx("div", { className: `mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`, children: _jsx("div", { className: `inline-block p-3 rounded-lg max-w-[80%] ${msg.role === 'user'
                                ? 'bg-primary text-white rounded-br-none dark:bg-gray-700 dark:text-gray-50'
                                : 'bg-gray-200 dark:bg-gray-600 dark:text-gray-50 rounded-bl-none'}`, children: msg.content }) }, index))), showSubscribePrompt && _jsx(SubscriptionForm, {})] }), _jsxs("div", { className: "border-t dark:border-gray-700 p-4 flex items-center dark:bg-gray-800", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Enter your message...", className: "flex-1 p-2 border dark:border-gray-600 rounded-l-md focus:outline-none dark:bg-gray-700 dark:text-gray-50 dark:placeholder-gray-400", onKeyPress: (e) => e.key === 'Enter' && sendMessage() }), _jsx("button", { onClick: sendMessage, disabled: loading || !message.trim(), className: "bg-primary text-white p-2 rounded-r-md dark:bg-blue-600 dark:hover:bg-blue-700", children: loading ? '...' : 'Send' })] }), error && _jsx("p", { className: "text-red-500 dark:text-red-400 p-2 text-center", children: error })] }));
}
//# sourceMappingURL=index.js.map
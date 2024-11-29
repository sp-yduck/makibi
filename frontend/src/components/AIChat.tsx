import React, { useState } from 'react';
import { Send, Bot, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I can help you create better OKRs. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getAIResponse(input);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = async (prompt: string): Promise<string> => {
    const responses = {
      default: "I can help you create effective OKRs. What specific aspect would you like guidance on?",
      objective: "When creating objectives, remember to make them ambitious yet achievable. They should be qualitative and inspirational.",
      "key result": "Key Results should be quantitative and measurable. Think about specific metrics that would indicate success.",
      example: "Here's an example OKR:\nObjective: Transform Customer Experience\nKey Results:\n1. Increase NPS from 30 to 50\n2. Reduce customer support response time from 24h to 2h\n3. Achieve 95% customer satisfaction score",
    };

    const lowercasePrompt = prompt.toLowerCase();
    if (lowercasePrompt.includes('objective')) return responses.objective;
    if (lowercasePrompt.includes('key result')) return responses["key result"];
    if (lowercasePrompt.includes('example')) return responses.example;
    return responses.default;
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow">
      <div className="flex items-center space-x-2 p-4 border-b">
        <Bot className="h-5 w-5 text-primary-600" />
        <h2 className="text-lg font-semibold">OKR Assistant</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex w-full",
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-lg px-4 py-2",
                message.role === 'assistant'
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-primary-600 text-white'
              )}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about OKR best practices..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
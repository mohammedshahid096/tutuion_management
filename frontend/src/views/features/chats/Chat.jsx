import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ChatMessage from './ChatMessage';
import { X, Send } from 'lucide-react';

export default function Chat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', content: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { id: Date.now(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: 'ai',
        content: `Thanks for your message! This is a simulated response to: "${input}"`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-xl transform transition-transform duration-300 ease-in-out z-50 h-[88%] rounded-full  ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <Card className="h-full flex flex-col py-0 overflow-hidden">
        {/* Chat header */}

        <CardHeader className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground">
          {' '}
          <h2 className="font-semibold text-lg">Chat with AI Assistant</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
            <X />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>

        {/* Messages area */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <X />
              </div>
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: '0ms' }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: '150ms' }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-primary animate-bounce"
                  style={{ animationDelay: '300ms' }}
                ></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input area */}
        <CardFooter className="p-4 border-t bg-secondary text-secondary-foreground">
          <form onSubmit={handleSubmit} className="flex justify-between  w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}

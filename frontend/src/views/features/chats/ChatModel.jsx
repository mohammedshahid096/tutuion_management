import { useState, useRef, useEffect, memo, useCallback, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ChatMessage from './ChatMessage';
import { X, Send } from 'lucide-react';
import { submitMessageChatApi } from '@/apis/ai.api';
import { speakTextFunction } from '@/helpers/speach';
import Context from '@/context/context';
import { update } from 'lodash';

const ChatModel = ({ isOpen, onClose, info, setInfo }) => {
  const {
    chatAgentState: { sessionDetails, updateChatAgentStateAction },
  } = useContext(Context);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessionDetails?.messages]);

  const handleMessageChange = useCallback(
    (e) => {
      setInfo((prev) => ({
        ...prev,
        inputMessage: e.target.value,
      }));
    },
    [info?.inputMessage]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!info?.inputMessage?.trim() || info?.messageLoading) return;
      setInfo((prev) => ({
        ...prev,
        messageLoading: true,
      }));

      let json = {
        message: info?.inputMessage,
      };
      const response = await submitMessageChatApi(info?.sessionId, json);
      let stateDetails = null;
      if (response?.success) {
        stateDetails = {
          inputMessage: '',
          messageLoading: false,
        };

        updateChatAgentStateAction({
          sessionDetails: response?.data?.details,
        });

        let message = response?.data?.outputData?.output || '';
        speakTextFunction(message);
      } else {
        stateDetails = {
          messageLoading: false,
        };
      }
      setInfo((prev) => ({
        ...prev,
        ...stateDetails,
      }));
    },
    [info?.inputMessage, sessionDetails, info?.messageLoading]
  );

  return (
    <div
      className={`fixed inset-y-2 right-0 w-full sm:w-96 bg-background shadow-xl transform transition-transform duration-300 ease-in-out z-50 h-[88%] rounded-full  ${
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
          {sessionDetails?.messages?.map((message) => (
            <ChatMessage key={message._id} message={message} />
          ))}

          {info?.messageLoading && (
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
              value={info?.inputMessage || ''}
              onChange={handleMessageChange}
              placeholder="Type your message..."
              disabled={info?.messageLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={info?.messageLoading}>
              <Send />
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default memo(ChatModel);

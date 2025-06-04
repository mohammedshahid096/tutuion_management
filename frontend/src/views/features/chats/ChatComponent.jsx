'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Chat from './Chat';
import { MessageSquareMore } from 'lucide-react';
import ModalV2 from '@/views/components/modal/ModalV2';

export default function ChatComponent() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-10"
        size="lg"
      >
        <MessageSquareMore size={24} />
        Chat with AI
      </Button>

      {/* Chat component */}
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

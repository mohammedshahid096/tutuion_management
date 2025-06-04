import { useCallback, useState, memo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ChatModel from './ChatModel';
import { MessageSquareMore } from 'lucide-react';
import { getSessionDetailsApi } from '@/apis/ai.api';

const ChatComponent = () => {
  const [info, setInfo] = useState({
    sessionId: null,
    sessionDetails: null,
    loading: false,
    isChatOpen: false,
    inputMessage: '',
    messageLoading: false,
  });

  useEffect(() => {
    if (!info?.sessionId && info?.isChatOpen) {
      fetchSessionDetails('684092e43342a365441537a2' || '68402819b144289ea3471056');
    }
  }, [info?.sessionId, info?.isChatOpen]);

  const fetchSessionDetails = useCallback(
    async (sessionId) => {
      if (info?.loading) return;
      setInfo((prev) => ({
        ...prev,
        loading: true,
      }));

      let details = {};

      const response = await getSessionDetailsApi(sessionId);
      if (response?.success) {
        details = {
          sessionDetails: response?.data,
          loading: false,
          sessionId: response?.data?._id || sessionId,
        };
      } else {
        details = {
          loading: false,
        };
      }
      setInfo((prev) => ({
        ...prev,
        ...details,
      }));
    },
    [info?.sessionId, info?.loading, info?.sessionDetails]
  );

  const chatModelFunction = useCallback(
    (value) => {
      setInfo((prev) => ({
        ...prev,
        isChatOpen: value,
      }));
    },
    [info?.isChatOpen]
  );

  return (
    <div>
      <Button
        onClick={() => chatModelFunction(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-10"
        size="lg"
      >
        <MessageSquareMore size={24} />
        Chat with AI
      </Button>

      {/* Chat component */}
      <ChatModel
        isOpen={info?.isChatOpen || false}
        onClose={() => chatModelFunction(false)}
        info={info}
        setInfo={setInfo}
      />
    </div>
  );
};

export default memo(ChatComponent);

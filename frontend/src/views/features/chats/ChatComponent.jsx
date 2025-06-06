import { useCallback, useState, memo, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import ChatModel from './ChatModel';
import { MessageSquareMore } from 'lucide-react';
import Context from '@/context/context';
import { getChatSessionId, setChatSessionId } from '@/helpers/session-storage';

const ChatComponent = () => {
  // * contexts
  const {
    chatAgentState: {
      isChatModalOpen,
      sessionDetails,
      sessionId,
      chatModalAction,
      setSessionIdAction,
      fetchSessionDetailsAction,
    },
  } = useContext(Context);

  // * states
  const [info, setInfo] = useState({
    loading: false,
    isChatOpen: false,
    inputMessage: '',
    messageLoading: false,
  });

  useEffect(() => {
    setSessionIdFromSessionStorageFunction();
  }, []);

  useEffect(() => {
    if (sessionId && !sessionDetails) {
      fetchSessionDetails(sessionId || '68402819b144289ea3471056');
    }
  }, [sessionId]);

  const setSessionIdFromSessionStorageFunction = useCallback(() => {
    let sessionStorageId = getChatSessionId();
    if (sessionStorageId) {
      setSessionIdAction(sessionStorageId);
    }
  }, [sessionId]);

  const fetchSessionDetails = useCallback(
    async (sessionId) => {
      if (info?.loading) return;
      setInfo((prev) => ({
        ...prev,
        loading: true,
      }));

      let details = {
        loading: false,
      };

      const response = await fetchSessionDetailsAction(sessionId);
      if (response[2] !== 200) {
        setSessionIdAction(null);
      }
      setInfo((prev) => ({
        ...prev,
        ...details,
      }));
    },
    [sessionId, info?.loading, sessionDetails]
  );

  return (
    <div>
      <Button
        onClick={() => chatModalAction(true)}
        className="fixed bottom-6 right-6 rounded-full shadow-lg z-10"
        size="lg"
      >
        <MessageSquareMore size={24} />
        Chat with AI
      </Button>

      {/* Chat component */}
      <ChatModel
        isOpen={isChatModalOpen || false}
        onClose={() => chatModalAction(false)}
        info={info}
        setInfo={setInfo}
      />
    </div>
  );
};

export default memo(ChatComponent);

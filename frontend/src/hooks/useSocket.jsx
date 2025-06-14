import { useEffect, useRef, useState, useContext } from 'react';
import { admin_receiver_listeners } from '@/constants/socket.constants';
import Context from '@/context/context';
import { BASE_URL } from '@/services/config';
import { io } from 'socket.io-client';

const useSocket = ({ dependencies = [], isAdmin = false }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const {
    notificationState: { updateSocketNotification },
  } = useContext(Context);

  useEffect(() => {
    const socket = io(BASE_URL);
    socketRef.current = socket;

    // Basic connection events
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');

      if (isAdmin) {
        let admin_name = 'edu_excellence_admin';
        socket.emit('joinAdminRoom', admin_name);
      }

      // 👇 Setup the listener
      socket.on(admin_receiver_listeners.adminNotification, (notification) => {
        console.log(notification, 'received inside hook shahid');
        updateSocketNotification(notification);
      });
    });

    // if disconnected
    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    // if there is an error
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return () => {
      if (socketRef.current) {
        socket.off('connect');
        socket.off('disconnect');
        socket.off('error');
        socket.off('newNotification');
        socketRef.current.disconnect();
      }
    };
  }, [...dependencies]);

  return { isConnected, socketRef };
};

export default useSocket;

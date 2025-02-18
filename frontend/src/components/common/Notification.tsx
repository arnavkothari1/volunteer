import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

const NotificationWrapper = styled(motion.div)<{ type: string }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 1rem;
  border-radius: 8px;
  background: ${({ type }) => 
    type === 'success' ? '#4caf50' :
    type === 'error' ? '#f44336' :
    '#2196f3'};
  color: white;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
`;

const Notification = ({ message, type, onClose }: NotificationProps) => (
  <AnimatePresence>
    <NotificationWrapper
      type={type}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      onClick={onClose}
    >
      {message}
    </NotificationWrapper>
  </AnimatePresence>
);

export default Notification; 
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export interface GameMessageProps {
  message?: string;
}

const GameMessageContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 2vw;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const GameMessage = ({ message }: GameMessageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(message?.length > 0);
  }, [message]);

  if (!visible) return <></>;

  return ReactDOM.createPortal(
    <GameMessageContainer>{message || ''}</GameMessageContainer>,
    document.body
  );
};

export default GameMessage;

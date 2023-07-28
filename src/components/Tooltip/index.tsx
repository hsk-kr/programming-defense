import ReactDOM from 'react-dom';
import styled from 'styled-components';

export interface TooltipProps {
  visible: boolean;
  x?: number;
  y?: number;
  text?: string;
}

const TooltipContainer = styled.div<{
  x: number;
  y: number;
}>`
  background-color: rgba(0, 0, 0, 0.6);
  font-size: 2vh;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  left: ${({ x }) => `${x}px`};
  top: ${({ y }) => `${y}px`};
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
`;

const Tooltip = ({ visible, x, y, text }: TooltipProps) => {
  if (!visible || x === undefined || y === undefined) return <></>;

  return ReactDOM.createPortal(
    <TooltipContainer x={x} y={y}>
      {text || ''}
    </TooltipContainer>,
    document.body
  );
};

export default Tooltip;

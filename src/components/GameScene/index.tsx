import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Stage } from 'react-konva';
import Map from '../../components/Map';
import { map } from '../../const/map';

const SCREEN_WIDTH = 960;
const SCREEN_HEIGHT = 960;

const GameSceneContainer = styled.div<{
  width?: number;
  height?: number;
}>`
  overflow: hidden;
  canvas {
    width: ${({ width }) => (width ? `${width}px` : '100vw')} !important;
    height: ${({ height }) => (height ? `${height}px` : '100vh')} !important;
  }
`;

const GameScene = () => {
  const [screenSize, setScreenSize] = useState<
    | {
        width: number;
        height: number;
      }
    | undefined
  >();

  useEffect(() => {
    const scaleX = window.innerWidth / SCREEN_WIDTH;
    const scaleY = window.innerHeight / SCREEN_HEIGHT;
    const minScale = scaleX < scaleY ? scaleX : scaleY;

    setScreenSize({
      width: window.innerWidth * minScale,
      height: window.innerHeight * minScale,
    });
  }, []);

  return (
    <GameSceneContainer width={screenSize?.width} height={screenSize?.height}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Map map={map} />
      </Stage>
    </GameSceneContainer>
  );
};

export default GameScene;

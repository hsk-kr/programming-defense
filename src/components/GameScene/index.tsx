import { ComponentProps, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Stage } from 'react-konva';
import Map from '../../components/Map';
import { map } from '../../const/map';
import Status from '../Status';
import UnitRenderer from '../UnitRenderer';
import MobRenderer from '../MobRenderer';
import {
  GAME_SCREEN_HEIGHT,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../const/game';
import BulletRenderer from '../BulletRenderer';

const GameSceneContainer = styled.div`
  overflow: hidden;
`;

const GameScene = () => {
  const stageRef: ComponentProps<typeof Stage>['ref'] = useRef(null);

  useEffect(() => {
    const scaleX = window.innerWidth / SCREEN_WIDTH;
    const scaleY = window.innerHeight / SCREEN_HEIGHT;
    const minScale = scaleX < scaleY ? scaleX : scaleY;

    stageRef.current.scale({
      x: minScale,
      y: minScale,
    });
  }, []);

  return (
    <GameSceneContainer>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        <Map map={map} />
        <Status y={GAME_SCREEN_HEIGHT} />
        <UnitRenderer />
        <MobRenderer />
        <BulletRenderer />
      </Stage>
    </GameSceneContainer>
  );
};

export default GameScene;

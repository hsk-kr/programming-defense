import { Group, Sprite, Text } from 'react-konva';
import { useGameContext } from '../../context/GameContext';
import { ComponentProps, useEffect, useMemo, useRef } from 'react';
import { MOB_SIZE } from '../../const/mob';

const defaultAnimations = {
  move: [128, 0, 16, 16, 144, 0, 16, 16],
};

interface MobProps {
  name: string;
  imageIndex: number;
  x: number;
  y: number;
}

const Mob = ({ name, imageIndex, x, y }: MobProps) => {
  const { mobSpriteImage } = useGameContext();
  const spriteRef: ComponentProps<typeof Sprite>['ref'] = useRef(null);
  const nameRef: ComponentProps<typeof Text>['ref'] = useRef(null);

  const animations = useMemo(() => {
    const newAnimations = { move: [...defaultAnimations.move] };
    newAnimations.move[1] = MOB_SIZE * imageIndex;
    newAnimations.move[5] = MOB_SIZE * imageIndex;

    return newAnimations;
  }, [imageIndex]);

  useEffect(() => {
    spriteRef.current.start();
  }, [animations]);

  useEffect(() => {
    nameRef.current.x(-nameRef.current.width() / 2 + 8);
  }, []);

  return (
    <Group x={x} y={y}>
      <Text ref={nameRef} fontSize={14} text={name.toUpperCase()} y={-14} />
      <Sprite
        ref={spriteRef}
        image={mobSpriteImage}
        animation="move"
        animations={animations}
        frameRate={6}
        frameIndex={0}
      />
    </Group>
  );
};

export default Mob;

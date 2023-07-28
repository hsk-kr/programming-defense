import { Circle, Layer } from 'react-konva';
import { useGameContext } from '../../context/GameContext';
import { BULLET_SIZE } from '../../const/unit';

const BulletRenderer = () => {
  const { bulletList } = useGameContext();

  return (
    <Layer>
      {bulletList.map((bullet) => (
        <Circle
          key={bullet.id}
          x={bullet.x}
          y={bullet.y}
          fill="yellow"
          width={BULLET_SIZE}
          height={BULLET_SIZE}
        />
      ))}
      <Circle />
    </Layer>
  );
};

export default BulletRenderer;

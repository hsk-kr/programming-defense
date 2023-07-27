import { Layer } from 'react-konva';
import { useGameContext } from '../../context/GameContext';
import Mob from '../Mob';

const MobRenderer = () => {
  const { mobList } = useGameContext();

  return (
    <Layer>
      {mobList.map((mob) => (
        <Mob
          key={mob.id}
          name={mob.name}
          imageIndex={mob.imageIndex}
          x={mob.x}
          y={mob.y}
        />
      ))}
    </Layer>
  );
};

export default MobRenderer;

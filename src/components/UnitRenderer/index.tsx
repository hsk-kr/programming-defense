import { Layer } from 'react-konva';
import { useGameContext } from '../../context/GameContext';
import Unit from '../Unit';

const UnitRenderer = () => {
  const { unitList } = useGameContext();

  return (
    <Layer>
      {unitList.map((unit) => (
        <Unit
          key={unit.id}
          id={unit.id}
          x={unit.x}
          y={unit.y}
          unitName={unit.name}
        />
      ))}
    </Layer>
  );
};

export default UnitRenderer;

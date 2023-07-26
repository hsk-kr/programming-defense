import { Image, Rect } from 'react-konva';
import { UnitName } from '../../types/unit';
import { TILE_SIZE } from '../../const/map';
import { useEffect, useState } from 'react';
import units from '../../const/unit';
import { useGameContext } from '../../context/GameContext';

interface UnitProps {
  id: string;
  unitName: UnitName;
  x: number;
  y: number;
}

const Unit = ({ id, unitName, x, y }: UnitProps) => {
  const { selectedUnitId, setSelectedUnitId } = useGameContext();
  const [image, setImage] = useState<HTMLImageElement>();

  const handleSelect = () => {
    setSelectedUnitId(id);
  };

  useEffect(() => {
    const unitImg = new window.Image();
    unitImg.addEventListener('load', () => {
      setImage(unitImg);
    });
    unitImg.src = units[unitName].imgSrc;
  }, [unitName]);

  return (
    <>
      <Image
        image={image}
        x={TILE_SIZE * x}
        y={TILE_SIZE * y}
        width={TILE_SIZE}
        height={TILE_SIZE}
        onClick={handleSelect}
      />
      {selectedUnitId === id && (
        <Rect
          x={TILE_SIZE * x}
          y={TILE_SIZE * y}
          width={TILE_SIZE}
          height={TILE_SIZE}
          fill="orange"
          opacity={0.4}
        />
      )}
    </>
  );
};

export default Unit;

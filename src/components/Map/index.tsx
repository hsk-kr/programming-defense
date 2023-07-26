import { ComponentProps, useEffect, useRef, useState } from 'react';
import { Layer, Image, Rect } from 'react-konva';
import { TILE_SIZE, movable } from '../../const/map';
import MapTileset from '../../assets/map/map-tileset.png';
import { useGameContext } from '../../context/GameContext';

// To fill between tiles.
const NOISE_PADDING = 2;

interface MapProps {
  map: number[][];
}

const Map = ({ map }: MapProps) => {
  const [tileImgList, setTileImgList] = useState<HTMLImageElement[]>([]);
  const [cursorInfo, setCursorInfo] = useState<{
    color: 'red' | 'green';
    x: number;
    y: number;
  }>(undefined);
  const [imageForInit, setImageForInit] = useState<HTMLImageElement>();
  const imageForInitRef: ComponentProps<typeof Image>['ref'] = useRef(null);
  const { relocateSelectedUnit } = useGameContext();
  const tileImgLoaded = tileImgList.length > 0;

  const handleImageMouseOver =
    ({ x, y }: { x: number; y: number }) =>
    () => {
      const towerAvailable = movable(map[y][x]);

      setCursorInfo({
        color: towerAvailable ? 'green' : 'red',
        x,
        y,
      });
    };

  const handleTileClick = (x: number, y: number) => () => {
    if (!movable(map[y][x])) return;
    relocateSelectedUnit(x, y);
  };

  useEffect(() => {
    const mapImage = new window.Image();
    mapImage.src = MapTileset;

    mapImage.addEventListener('load', async () => {
      imageForInitRef.current.width(TILE_SIZE);
      imageForInitRef.current.height(TILE_SIZE);
      const newTileImgList: HTMLImageElement[] = [];

      const loadPartOfMap = (index: number) => {
        return new Promise<void>((resolve) => {
          imageForInitRef.current.crop({
            x: index * TILE_SIZE,
            y: 64,
            width: TILE_SIZE,
            height: TILE_SIZE,
          });
          imageForInitRef.current.toImage({
            callback: (img) => {
              newTileImgList.push(img);
              resolve();
            },
          });
        });
      };

      // crop each tile from the map-tileset image.
      for (let i = 0; i < 4; i++) {
        await loadPartOfMap(i);
      }

      imageForInitRef.current.visible(false);
      setTileImgList(newTileImgList);
    });

    setImageForInit(mapImage);
  }, []);

  return (
    <Layer>
      <Image image={imageForInit} ref={imageForInitRef} />
      {tileImgLoaded &&
        map.map((tileList, tileListIdx) => {
          return tileList.map((tile, tileIdx) => (
            <Image
              key={`${tileListIdx}-${tileIdx}`}
              x={TILE_SIZE * tileIdx}
              y={TILE_SIZE * tileListIdx}
              width={TILE_SIZE + NOISE_PADDING}
              height={TILE_SIZE + NOISE_PADDING}
              image={tileImgList[tile]}
              onMouseEnter={handleImageMouseOver({
                y: tileListIdx,
                x: tileIdx,
              })}
              onTouchStart={handleImageMouseOver({
                y: tileListIdx,
                x: tileIdx,
              })}
            />
          ));
        })}
      {cursorInfo && (
        <Rect
          x={TILE_SIZE * cursorInfo.x}
          y={TILE_SIZE * cursorInfo.y}
          width={TILE_SIZE}
          height={TILE_SIZE}
          fill={cursorInfo.color}
          opacity={0.4}
          onClick={handleTileClick(cursorInfo.x, cursorInfo.y)}
          // Not working with onTouchStart
          onTouchEnd={handleTileClick(cursorInfo.x, cursorInfo.y)}
        />
      )}
    </Layer>
  );
};

export default Map;

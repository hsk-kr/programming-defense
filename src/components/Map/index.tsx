import { ComponentProps, useEffect, useRef, useState } from 'react';
import { Layer, Image } from 'react-konva';
import { TILE_SIZE } from '../../const/map';
import MapTileset from '../../assets/map/map-tileset.png';

interface MapProps {
  map: number[][];
}

const Map = ({ map }: MapProps) => {
  const [tileImgList, setTileImgList] = useState<HTMLImageElement[]>([]);
  const [image, setImage] = useState<HTMLImageElement>();
  const imageRef: ComponentProps<typeof Image>['ref'] = useRef(null);
  const tileImgLoaded = tileImgList.length > 0;

  useEffect(() => {
    const mapImage = new window.Image();
    mapImage.src = MapTileset;

    mapImage.addEventListener('load', async () => {
      imageRef.current.width(TILE_SIZE);
      imageRef.current.height(TILE_SIZE);
      const newTileImgList: HTMLImageElement[] = [];

      const loadPartOfMap = (index: number) => {
        return new Promise<void>((resolve) => {
          if (index === 3) {
            console.log(index, index * TILE_SIZE);
          }
          imageRef.current.crop({
            x: index * TILE_SIZE,
            y: 64,
            width: TILE_SIZE,
            height: TILE_SIZE,
          });
          imageRef.current.toImage({
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

      imageRef.current.visible(false);
      setTileImgList(newTileImgList);
    });

    setImage(mapImage);
  }, []);

  return (
    <Layer>
      <Image image={image} ref={imageRef} visible={true} />
      {tileImgLoaded &&
        map.map((tileList, tileListIdx) => {
          return tileList.map((tile, tileIdx) => (
            <Image
              key={`${tileListIdx}-${tileIdx}`}
              x={TILE_SIZE * tileIdx}
              y={TILE_SIZE * tileListIdx}
              image={tileImgList[tile]}
            />
          ));
        })}
    </Layer>
  );
};

export default Map;

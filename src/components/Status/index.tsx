import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Layer, Image, Rect, Text as ReactKonvaText, Group } from 'react-konva';
import UISet from '../../assets/ui/ui-set.png';
import { useGameContext } from '../../context/GameContext';
import { useGlobalContext } from '../../context/GlobalContext';
import { KonvaEventObject } from 'konva/lib/Node';
import { upgradeCost } from '../../const/calc';
import { UNIT_CNT_LIMIT, UNIT_GENERATION_COST } from '../../const/unit';
import UnitPreview from '../UnitPreview';

const WIDTH = 960;
const HEIGHT = 320;
const UI_BACKGROUND_COLOR = '#fee1b8';
const UI_FRAME_COLOR = '#a17d5a';
const UI_FRAME_STROKE_WIDTH = 4;
const ICON_TILE_SIZE = 16;
const ICON_START_X = 464;
const ICON_START_Y = 176;

interface StatusProps {
  y?: number;
}

interface Icons {
  redBook?: HTMLImageElement;
  greenBook?: HTMLImageElement;
  brownBook?: HTMLImageElement;
  blueBook?: HTMLImageElement;
  yellowBook?: HTMLImageElement;
  openBook?: HTMLImageElement;
  coin?: HTMLImageElement;
  heart?: HTMLImageElement;
  mob?: HTMLImageElement;
  human?: HTMLImageElement;
  delete?: HTMLImageElement;
}

const Text = (props: ComponentProps<typeof ReactKonvaText>) => (
  <ReactKonvaText {...props} fontFamily="Handjet" />
);

const Status = ({ y }: StatusProps) => {
  const [imageForInit, setImageForInit] = useState<HTMLImageElement>();
  const [icons, setIcons] = useState<Icons>({});
  const { hideTooltip, showTooltip } = useGlobalContext();
  const imageForInitRef: ComponentProps<typeof Image>['ref'] = useRef(null);
  const {
    level,
    life,
    money,
    power,
    speed,
    reload,
    moneyLevel,
    unitList,
    selectedUnitId,
    startIncreaseMoney,
    upgradeStatus,
    generateUnit,
    sellSelectedUnit,
    upgradeUnit,
  } = useGameContext();
  const selectedUnit = unitList.find((unit) => unit.id === selectedUnitId);

  useEffect(() => {
    const uiImage = new window.Image();
    uiImage.src = UISet;

    uiImage.addEventListener('load', async () => {
      imageForInitRef.current.width(ICON_TILE_SIZE);
      imageForInitRef.current.height(ICON_TILE_SIZE);
      const newIcons: Icons = {};

      const loadPartOfMap = (name: keyof Icons, x: number, y: number) => {
        return new Promise<void>((resolve) => {
          imageForInitRef.current.crop({
            x: ICON_START_X + x * ICON_TILE_SIZE,
            y: ICON_START_Y + y * ICON_TILE_SIZE,
            width: ICON_TILE_SIZE,
            height: ICON_TILE_SIZE,
          });
          imageForInitRef.current.toImage({
            callback: (img) => {
              newIcons[name] = img;
              resolve();
            },
          });
        });
      };

      await loadPartOfMap('redBook', 0, 0);
      await loadPartOfMap('greenBook', 1, 0);
      await loadPartOfMap('brownBook', 2, 0);
      await loadPartOfMap('blueBook', 3, 0);
      await loadPartOfMap('yellowBook', 4, 0);
      await loadPartOfMap('openBook', 5, 0);
      await loadPartOfMap('coin', 13, 0);
      await loadPartOfMap('heart', 12, 3);
      await loadPartOfMap('mob', 10, 3);
      await loadPartOfMap('human', 13, 3);
      await loadPartOfMap('delete', 20, 2);

      setIcons(newIcons);
      imageForInitRef.current.visible(false);
    });

    setImageForInit(uiImage);
  }, []);

  const handleMouseEnter = useCallback(
    (tooltip: string) => (e: KonvaEventObject<MouseEvent>) => {
      showTooltip({
        text: tooltip,
        x: e.evt.clientX,
        y: e.evt.clientY,
      });
    },
    [showTooltip]
  );

  const handleMouseLeave = useCallback(() => {
    hideTooltip();
  }, [hideTooltip]);

  const statusComponents = useMemo(() => {
    const [startX, startY, xGap, yGap] = [8, y + 10, 36, 48];

    const statusList: {
      icon: keyof Icons;
      label: string;
      tooltip: string;
      clickEvent?: VoidFunction;
    }[] = [
      {
        label: `LEVEL: ${level}`,
        icon: 'human',
        tooltip: `Stage`,
      },
      {
        label: `LIFE: ${life}`,
        icon: 'heart',
        tooltip: `If it reaches 0, the game will be over.`,
      },
      {
        label: `MONEY: ${money} (+${moneyLevel})`,
        icon: 'coin',
        tooltip: `Increase it by 1 by paying ${upgradeCost(
          'moneyLevel',
          moneyLevel
        )}.`,
        clickEvent: upgradeStatus('moneyLevel'),
      },
      {
        label: `POWER: ${100 + power}% (+${power}%)`,
        icon: 'redBook',
        tooltip: `Increase it by 1% by paying ${upgradeCost('power', power)}.`,
        clickEvent: upgradeStatus('power'),
      },
      {
        label: `SPEED: ${100 + speed}% (+${speed}%)`,
        icon: 'blueBook',
        tooltip: `Increase it by 1% by paying ${upgradeCost('speed', speed)}.`,
        clickEvent: upgradeStatus('speed'),
      },
      {
        label: `RELOAD: ${100 - reload}% (-${reload}%)`,
        icon: 'brownBook',
        tooltip: `Decrease it by 1% by paying ${upgradeCost(
          'reload',
          reload
        )}.`,
        clickEvent: upgradeStatus('reload'),
      },
    ];

    const generateUnitIconX = WIDTH / 2 - ICON_TILE_SIZE * 2 - 80;

    return (
      <>
        {statusList.map((status, statusIdx) => (
          <Group
            x={startX}
            y={startY + yGap * statusIdx}
            key={status.icon}
            onMouseEnter={handleMouseEnter(status.tooltip)}
            onMouseLeave={handleMouseLeave}
            onClick={status.clickEvent}
          >
            <Image
              image={icons[status.icon]}
              width={ICON_TILE_SIZE * 2}
              height={ICON_TILE_SIZE * 2}
            />
            <Text y={6} x={xGap} fontSize={24} text={status.label} />
          </Group>
        ))}
        <Group
          onMouseEnter={handleMouseEnter(
            `Generate a random unit by paying ${UNIT_GENERATION_COST}. (Max Unit: ${UNIT_CNT_LIMIT})`
          )}
          onMouseLeave={handleMouseLeave}
          onClick={generateUnit}
          y={startY}
        >
          <Image
            image={icons.mob}
            x={generateUnitIconX}
            width={ICON_TILE_SIZE * 2}
            height={ICON_TILE_SIZE * 2}
          />
          <Text y={4} x={generateUnitIconX + xGap} fontSize={24} text="PICK" />
        </Group>
      </>
    );
  }, [
    y,
    level,
    life,
    money,
    moneyLevel,
    upgradeStatus,
    power,
    speed,
    reload,
    handleMouseEnter,
    handleMouseLeave,
    generateUnit,
    icons,
  ]);

  const unitInforCoponents = useMemo(() => {
    if (!selectedUnit) return <></>;

    const [startX, startY] = [WIDTH / 2 + 16, y + 16];
    const yGap = 32;

    const infoList = [
      { text: `NAME: ${selectedUnit.name}` },
      { text: `DESC: ${selectedUnit.desc}` },
      { text: `DAMAGE: ${selectedUnit.damage}` },
      { text: `SPEED: ${selectedUnit.speed}` },
      { text: `RELOAD: ${selectedUnit.reload}` },
    ];

    const nextUnitY = yGap * infoList.length + 8;
    const neededUnitXGap = 48;

    return (
      <Group x={startX} y={startY}>
        {infoList.map((info, infoIdx) => (
          <Text
            key={info.text}
            text={info.text.toUpperCase()}
            y={yGap * infoIdx}
            fontSize={24}
          />
        ))}
        {selectedUnit.nextUnits.map((nextUnit) => (
          <Group
            key={nextUnit.unitName}
            y={nextUnitY}
            onMouseEnter={handleMouseEnter(
              `Upgrade Unit (${nextUnit.unitName.toUpperCase()})`
            )}
            onMouseLeave={handleMouseLeave}
            onClick={() => upgradeUnit(nextUnit)}
          >
            <UnitPreview unitName={nextUnit.unitName} />
            <Text text="=" x={38} fontSize={32} />
            {nextUnit.neededUnits.map((neededUnit, neededUnitIdx) => (
              <UnitPreview
                key={neededUnitIdx}
                unitName={neededUnit}
                x={60 + neededUnitIdx * neededUnitXGap}
              />
            ))}
          </Group>
        ))}
        <Group
          onMouseEnter={handleMouseEnter(
            `Sell this unit for ${selectedUnit.returnCost}.`
          )}
          onMouseLeave={handleMouseLeave}
          x={WIDTH / 2 - 100}
          onClick={sellSelectedUnit}
        >
          <Image
            image={icons.delete}
            y={-8}
            width={ICON_TILE_SIZE * 2}
            height={ICON_TILE_SIZE * 2}
          />
          <Text x={32} fontSize={24} text="SELL" />
        </Group>
      </Group>
    );
  }, [
    handleMouseEnter,
    handleMouseLeave,
    icons.delete,
    selectedUnit,
    sellSelectedUnit,
    y,
  ]);

  useEffect(() => {
    startIncreaseMoney();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layer>
      {/* UI Full Image */}
      <Image image={imageForInit} ref={imageForInitRef} y={y} />
      {/* UI Frame */}
      <Rect y={y} width={WIDTH} height={HEIGHT} fill={UI_BACKGROUND_COLOR} />
      <Rect
        x={UI_FRAME_STROKE_WIDTH - 2}
        y={y + UI_FRAME_STROKE_WIDTH - 2}
        width={WIDTH - UI_FRAME_STROKE_WIDTH}
        height={HEIGHT - UI_FRAME_STROKE_WIDTH}
        stroke={UI_FRAME_COLOR}
        strokeWidth={UI_FRAME_STROKE_WIDTH}
      />
      <Rect
        x={UI_FRAME_STROKE_WIDTH - 2}
        y={y + UI_FRAME_STROKE_WIDTH - 2}
        width={(WIDTH - UI_FRAME_STROKE_WIDTH) / 2}
        height={HEIGHT - UI_FRAME_STROKE_WIDTH}
        stroke={UI_FRAME_COLOR}
        strokeWidth={UI_FRAME_STROKE_WIDTH}
      />
      {/* Status */}
      {statusComponents}
      {/* Unit Info */}
      {unitInforCoponents}
    </Layer>
  );
};

export default Status;

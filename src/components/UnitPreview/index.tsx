import { Image } from 'react-konva';
import { UnitName } from '../../types/unit';
import { ComponentProps, useEffect, useState } from 'react';
import units from '../../const/unit';

interface UnitPreviewProps extends Omit<ComponentProps<typeof Image>, 'image'> {
  unitName: UnitName;
}

const UnitPreview = ({ unitName, ...props }: UnitPreviewProps) => {
  const [image, setImage] = useState<HTMLImageElement>();

  useEffect(() => {
    const unitImg = new window.Image();
    unitImg.addEventListener('load', () => {
      setImage(unitImg);
    });
    unitImg.src = units[unitName].imgSrc;
  }, [unitName]);

  return (
    <>
      <Image image={image} {...props} />
    </>
  );
};

export default UnitPreview;

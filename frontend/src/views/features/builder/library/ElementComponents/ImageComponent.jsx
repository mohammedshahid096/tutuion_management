import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';

const ImageComponent = (props) => {
  const { imageUrl, alt, style, uuid, styleClass } = props;
  const { activeSection } = useSelector((state) => state.builderToolkitState);
  return (
    <div
      className={cn(
        activeSection?.sub_block_uuid === uuid ? 'outline-2 outline-green-500 outline-dotted' : ''
      )}
    >
      <div className="h-full w-full">
        <img className={cn(styleClass)} src={imageUrl} alt={alt} style={style} />
      </div>
    </div>
  );
};

export default memo(ImageComponent);

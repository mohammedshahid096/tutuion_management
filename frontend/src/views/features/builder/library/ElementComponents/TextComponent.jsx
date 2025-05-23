import React from 'react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';

const TextComponent = ({ content, style, styleClass, uuid }) => {
  const { activeSection, builderEditMode } = useSelector((state) => state.builderToolkitState);
  return (
    <div
      className={cn(
        activeSection?.sub_block_uuid === uuid ? 'outline-dashed outline-red-600 outline-2' : ''
      )}
    >
      <p className={cn('w-auto', styleClass)} style={style}>
        {content}
      </p>
    </div>
  );
};

export default TextComponent;

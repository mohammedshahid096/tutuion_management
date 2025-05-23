import React from 'react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';

const TextEditorComponent = ({ content, style, styleClass, uuid }) => {
  const { activeSection, builderEditMode } = useSelector((state) => state.builderToolkitState);
  return (
    <div
      className={cn(
        'h-auto',
        activeSection?.sub_block_uuid === uuid ? 'outline-dashed outline-red-600 outline-2' : ''
      )}
    >
      <div
        className={cn('w-auto h-full', styleClass)}
        style={style}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default TextEditorComponent;

import React from 'react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';

const ButtonComponent = ({ uuid, content, style, url = '', styleClass = '' }) => {
  const { activeSection } = useSelector((state) => state.builderToolkitState);
  return (
    <div
      className={cn(
        activeSection?.sub_block_uuid === uuid ? 'outline-dashed outline-red-600 outline-2' : ''
      )}
    >
      <a href={url}>
        <button style={style} className={cn('m-0 p-0', styleClass)}>
          {content}
        </button>
      </a>
    </div>
  );
};

export default ButtonComponent;

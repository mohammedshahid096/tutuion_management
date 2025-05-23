import BuilderEditor from '@/views/features/builder/BuilderEditor';
import React, { memo } from 'react';

const Builder = () => {
  return (
    <div className="w-full h-screen">
      <BuilderEditor />
    </div>
  );
};

export default memo(Builder);

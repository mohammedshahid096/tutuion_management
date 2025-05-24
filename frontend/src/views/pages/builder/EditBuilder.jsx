import React, { memo, useCallback, useEffect } from 'react';
import BuilderEditor from '@/views/features/builder/BuilderEditor';
import { builderActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';

const EditBuilder = () => {
  const dispatch = useDispatch();
  const { setBuilderEditModeAction } = builderActions;
  const { builderEditMode } = useSelector((state) => state.builderToolkitState);

  useEffect(() => {
    if (!builderEditMode) {
      changeEditModeHandler();
    }
  }, []);

  const changeEditModeHandler = useCallback(() => {
    dispatch(setBuilderEditModeAction(true));
  }, [builderEditMode]);
  return (
    <div className="w-full h-screen">
      <BuilderEditor />
    </div>
  );
};

export default memo(EditBuilder);

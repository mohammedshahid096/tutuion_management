import React, { memo, useCallback, useEffect } from 'react';
import { builderActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import BuilderView from '@/views/features/builder/BuilderView';
import { useParams } from 'react-router-dom';

const Builder = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const { setBuilderEditModeAction, fetchTemplateNoteIdAction } = builderActions;
  const { builderEditMode } = useSelector((state) => state.builderToolkitState);

  useEffect(() => {
    if (builderEditMode) {
      changeEditModeHandler();
    }
    fetchNoteIdHandlerFunction();
  }, [noteId]);

  const changeEditModeHandler = useCallback(() => {
    dispatch(setBuilderEditModeAction(false));
  }, [builderEditMode]);

  const fetchNoteIdHandlerFunction = useCallback(() => {
    dispatch(fetchTemplateNoteIdAction(noteId));
  }, [noteId]);
  return (
    <div className="w-full h-screen">
      <BuilderView />
    </div>
  );
};

export default memo(Builder);

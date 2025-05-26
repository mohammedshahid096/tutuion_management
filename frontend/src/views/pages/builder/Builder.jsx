import React, { memo, useCallback, useEffect } from 'react';
import { builderActions } from '@/redux/combineActions';
import { useDispatch, useSelector } from 'react-redux';
import BuilderView from '@/views/features/builder/BuilderView';
import { useParams } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Builder = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const isMobile = useIsMobile();
  const {
    setBuilderEditModeAction,
    fetchTemplateNoteIdAction,
    setScreenSizeAction,
    setActiveSectionAction,
  } = builderActions;
  const { builderEditMode, activeSection } = useSelector((state) => state.builderToolkitState);

  useEffect(() => {
    if (builderEditMode) {
      changeEditModeHandler();
    }
    if (activeSection) {
      clearActiveSectionFunction();
    }
    fetchNoteIdHandlerFunction();
  }, [noteId]);

  useEffect(() => {
    changeScreenSizeFunction(isMobile ? 'mobile' : 'desktop');
  }, [isMobile]);

  const changeScreenSizeFunction = useCallback(
    (size) => {
      dispatch(setScreenSizeAction(size));
    },
    [isMobile]
  );

  const changeEditModeHandler = useCallback(() => {
    dispatch(setBuilderEditModeAction(false));
  }, [builderEditMode]);

  const fetchNoteIdHandlerFunction = useCallback(() => {
    dispatch(fetchTemplateNoteIdAction(noteId));
  }, [noteId]);

  const clearActiveSectionFunction = useCallback(() => {
    dispatch(setActiveSectionAction(null));
  }, []);
  return (
    <div className="w-full h-screen">
      <BuilderView />
    </div>
  );
};

export default memo(Builder);

import { CLEAR_BUILDER_ERRORS, RESET_BUILDER_STATE } from './constant';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  statusCode: null,
  screenSize: 'desktop',
  dragLayout: null,
  templateSections: [],
  activeSection: null,
  builderEditMode: true,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    setDragLayout: (state, action) => {
      state.dragLayout = action.payload;
    },
    setTemplateData: (state, action) => {
      state.templateSections = action.payload;
    },
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setScreenSize, setDragLayout, setTemplateData, setActiveSection } =
  builderSlice.actions;
export const builderReducerToolkit = builderSlice.reducer;

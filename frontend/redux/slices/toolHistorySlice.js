import { createSlice } from '@reduxjs/toolkit';

import { fetchToolHistory } from '../thunks/toolHistory';

const initialState = {
  data: null,
  lastDoc: null,
  hasMore: false,
  loading: true,
  error: null,
};

const ToolHistorySlice = createSlice({
  name: 'toolHistory',
  initialState,
  reducers: {
    resetToolHistory: (state) => {
      state.data = null;
      state.lastDoc = null;
      state.hasMore = false;
      state.loading = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolHistory.fulfilled, (state, action) => {
        if (action.meta.arg?.pagination) {
          // For paginated requests, append new data
          const newOutputs = action.payload.outputs.filter(
            (newOutput) =>
              !state.data?.some((existing) => existing.id === newOutput.id)
          );
          state.data = state.data ? [...state.data, ...newOutputs] : newOutputs;
        } else {
          // For non-paginated requests, replace data
          state.data = action.payload.outputs;
        }

        state.lastDoc = action.payload.lastDoc;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
      })
      .addCase(fetchToolHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetToolHistory } = ToolHistorySlice.actions;
export default ToolHistorySlice.reducer;

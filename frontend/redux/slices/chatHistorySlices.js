import { createSlice } from '@reduxjs/toolkit';

import { fetchChatHistory } from '../thunks/chatHistory';

const initialState = {
  data: [],
  lastDoc: null,
  hasMore: true,
  loading: false,
  error: null,
  selectedChatId: null,
};

const chatHistorySlice = createSlice({
  name: 'chatHistory',
  initialState,
  reducers: {
    resetChatHistory: (state) => {
      state.data = [];
      state.lastDoc = null;
      state.hasMore = true;
      state.loading = false;
      state.error = null;
      state.selectedChatId = null;
    },
    setSelectedChat: (state, action) => {
      state.selectedChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        const newChats = action.payload.chats.filter(
          (newChat) =>
            !state.data.some((existingChat) => existingChat.id === newChat.id)
        );
        state.data = [...state.data, ...newChats];
        state.lastDoc = action.payload.lastDoc;
        state.hasMore = action.payload.hasMore;
        state.loading = false;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetChatHistory, setSelectedChat } = chatHistorySlice.actions;
export default chatHistorySlice.reducer;

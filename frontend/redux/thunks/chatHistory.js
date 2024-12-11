import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { firestore } from '@/redux/store';

export const fetchChatHistory = createAsyncThunk(
  'chatHistory/fetchChatHistory',
  async ({ pageSize = 10, lastDoc = null }, { getState, rejectWithValue }) => {
    try {
      const {
        auth: {
          data: { uid },
        },
      } = getState();

      if (!uid) throw new Error('User Id is not available');

      let chatSessionQuery = query(
        collection(firestore, 'chatSessions'),
        where('user.id', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      if (lastDoc) {
        chatSessionQuery = query(chatSessionQuery, startAfter(lastDoc));
      }
      const querySnapshot = await getDocs(chatSessionQuery);
      if (querySnapshot.empty) {
        return {
          chats: [],
          lastDoc: null,
          hasMore: false,
        };
      }

      const chats = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        const messagesArray = Object.entries(data.messages || {}).map(
          ([key, message]) => ({
            id: key,
            ...message,
          })
        );

        messagesArray.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );

        return {
          id: doc.id,
          createdAt: data.createdAt,
          type: data.type,
          user: data.user,
          messages: messagesArray,
        };
      });

      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      const nextQuery = query(
        collection(firestore, 'chatSessions'),
        where('user.id', '==', uid),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(1)
      );

      const nextSnapshot = await getDocs(nextQuery);
      const hasMore = !nextSnapshot.empty;

      return {
        chats,
        lastDoc: lastVisible,
        hasMore,
      };
    } catch (error) {
      return rejectWithValue(error?.message || 'Unable to fetch chat history');
    }
  }
);

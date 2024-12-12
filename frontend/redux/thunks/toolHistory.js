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

export const fetchToolHistory = createAsyncThunk(
  'toolHistory/fetchToolHistory',
  async (options, thunkAPI) => {
    try {
      const {
        toolId = null,
        pagination = false,
        pageSize = 10,
        lastDoc = null,
      } = options || {};

      const {
        auth: {
          data: { uid },
        },
      } = thunkAPI.getState();

      if (!uid) throw new Error('User Id is not available');

      // Start building the query
      const toolSessionQuery = collection(firestore, 'toolSessions');
      const constraints = [where('userId', '==', uid)];

      // Add toolId filter if provided
      if (toolId) {
        constraints.push(where('toolId', '==', toolId));
      }

      // Add ordering and pagination if enabled
      if (pagination) {
        constraints.push(orderBy('createdAt', 'desc'));
        constraints.push(limit(pageSize));

        if (lastDoc) {
          constraints.push(startAfter(lastDoc));
        }
      }

      // Build the final query
      const finalQuery = query(toolSessionQuery, ...constraints);
      const querySnapshot = await getDocs(finalQuery);

      if (querySnapshot.empty) {
        return {
          outputs: [],
          lastDoc: null,
          hasMore: false,
        };
      }

      const outputData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // If pagination is enabled, check if there are more items
      if (pagination) {
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Check for more items
        const nextQuery = query(
          toolSessionQuery,
          ...constraints.slice(0, -1), // Remove the previous limit
          startAfter(lastVisible),
          limit(1)
        );
        const nextSnapshot = await getDocs(nextQuery);
        const hasMore = !nextSnapshot.empty;

        return {
          outputs: outputData,
          lastDoc: lastVisible,
          hasMore,
        };
      }

      // Return just the data for non-paginated requests
      return {
        outputs: outputData,
        lastDoc: null,
        hasMore: false,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.message || 'Unable to fetch tool history'
      );
    }
  }
);

import { httpsCallable } from 'firebase/functions';

import { functions } from '@/redux/store';

const getChatSessions = async () => {
  const uid = '6aUwzayF8oigt0f1jOgfH7MakKoc';
  const lastVisible = null;
  const payload = {
    data: {
      uid,
      lastVisible,
    },
  };
  try {
    const fetchChatSessions = httpsCallable(functions, 'getChatSessions');
    const response = await fetchChatSessions(payload);
    return response.data;
  } catch (error) {
    const errorMessage = error.message || 'Failed get chat sessions in service';
    throw new Error(errorMessage);
  }
};

export default getChatSessions;

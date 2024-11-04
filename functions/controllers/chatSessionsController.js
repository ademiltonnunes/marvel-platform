const admin = require('firebase-admin');
const { https } = require('firebase-functions');

/**
 * Retrieves all chat sessions for the current user.
 *
 * @function getChatSessions
 * @param {object} data - The data object containing the user information.
 * @param {string} data.uid - The ID of the user.
 * @param {number} [data.limit=10] - Optional - The number of chat sessions to retrieve.
 * @param {string} [data.lastVisible] - Optional - The last visible chat session.
 * @returns {object} The response object containing the chat sessions.
 * @throws {object} The error object containing the error message.
 * @example
 * // Request
 * {
 *  "data": {
 *   "uid": "user-id",
 *  "limit": 10,
 * "lastVisible": "last-visible-date"
 * }
 * }
 * // Response
 * {
 * "status": "success",
 * "chatSessions": [
 * {
 * "id": "chat-session-id",
 * "user": {
 * "id": "user-id",
 * "name": "user-name"
 * },
 * "type": "private",
 * "createdAt": "created-date",
 * "updatedAt": "updated-date"
 * }
 * ]
 *
 * @return {object} The response object containing the chat sessions.
 */

const getChatSessions = https.onRequest(async (request, response) => {
  try {
    const { uid, limit = 10, lastVisible } = request.body.data;

    if (!uid) {
      return response.status(400).json({ error: 'Missing required user ID' });
    }

    const userSnapshot = await admin
      .firestore()
      .collection('users')
      .doc(uid)
      .get();
    if (!userSnapshot.exists) {
      return response
        .status(404)
        .json({ error: 'No user found with the provided ID' });
    }

    let query = admin
      .firestore()
      .collection('chatSessions')
      .where('user.id', '==', uid)
      .orderBy('updatedAt', 'desc')
      .limit(limit);

    if (lastVisible) {
      const lastVisibleDate = new Date(lastVisible);
      query = query.startAfter(lastVisibleDate);
    }

    const chatSessionsSnapshot = await query.get();

    const chatSessions = chatSessionsSnapshot.docs.map((doc) => ({
      id: doc.id,
      user: doc.data().user,
      type: doc.data().type,
      createdAt: doc.data().createdAt,
      updatedAt: doc.data().updatedAt,
    }));

    const newLastVisible = chatSessionsSnapshot.docs.length
      ? chatSessionsSnapshot.docs[chatSessionsSnapshot.docs.length - 1]
          .data()
          .updatedAt.toDate()
          .toISOString()
      : null;

    return response.status(200).json({
      status: 'success',
      chatSessions,
      lastVisible: newLastVisible,
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

/**
 * Retrieves all messages for a chat session.
 *
 * @function getMessages
 * @param {object} data - The data object containing the chat session information.
 * @param {string} data.chatId - The ID of the chat session.
 * @returns {object} The response object containing the messages.
 * @throws {object} The error object containing the error message.
 * @example
 * // Request
 * {
 * "data": {
 * "chatId": "chat-session-id"
 * }
 * }
 * // Response
 * {
 * "status": "success",
 * "messages": [
 * {
 *   "role": "human",
 *   "type": "text",
 *   "payload": {
 *       "text": "Hello"
 *   },
 *   "timestamp": "date"
 * },
 * {
 *   "role": "ai",
 *   "type": "text",
 *   "timestamp": "date",
 *   "payload": {
 *       "text": "Hi! 👋 I'm Kai."
 *   }
 *   }
 * ]
 * }
 *
 */
const getMessages = https.onRequest(async (request, response) => {
  try {
    const { chatId } = request.body.data;

    if (!chatId) {
      return response.status(400).json({ error: 'Missing required chat ID' });
    }

    const chatSessionSnapshot = await admin
      .firestore()
      .collection('chatSessions')
      .doc(chatId)
      .get();

    if (!chatSessionSnapshot.exists) {
      return response
        .status(404)
        .json({ error: 'There is no such chat session with that ID' });
    }

    const chatSessionData = chatSessionSnapshot.data();
    const messages = chatSessionData.messages;

    return response.status(200).json({ status: 'success', messages });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

module.exports = {
  getChatSessions,
  getMessages,
};

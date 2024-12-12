import React, { useEffect } from 'react';

import { Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import ToggleScreen from '@/components/ToggleScreen';

import ArrowIcon from '@/assets/svg/arrow_icon.svg';
import IconChatClose from '@/assets/svg/ChatIconCloseChatHistory.svg';
import IconChatOpen from '@/assets/svg/ChatIconOpenChatHistory.svg';

import styles from './styles';

import { setSelectedChat } from '@/redux/slices/chatHistorySlices';
import {
  resetChat,
  setChatSession,
  setSessionLoaded,
  setStreaming,
  setTyping,
} from '@/redux/slices/chatSlice';
import { fetchChatHistory } from '@/redux/thunks/chatHistory';

const StyledArrow = ({ isOpen }) => {
  const theme = useTheme();
  return (
    <div
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.Common.White['100p'],
      }}
    >
      <ArrowIcon />
    </div>
  );
};

const StartIcon = ({ isOpen }) =>
  isOpen ? <IconChatOpen /> : <IconChatClose />;

const ChatHistory = () => {
  const dispatch = useDispatch();
  const { data, loading, hasMore, lastDoc } = useSelector((state) => {
    return state.chatHistory;
  });

  useEffect(() => {
    dispatch(fetchChatHistory({ pageSize: 5 }));
  }, [dispatch]);

  const transformedData = React.useMemo(() => {
    if (!data) return [];

    return data
      .map((session) => {
        let date;
        try {
          if (session.createdAt?.seconds) {
            date = new Date(session.createdAt.seconds * 1000).toISOString();
          } else {
            date = session.createdAt;
          }
        } catch (error) {
          date = new Date().toISOString();
        }

        const firstMessage =
          session.messages[0]?.payload?.text || 'No messages';

        return {
          id: session.id,
          date,
          title:
            firstMessage.length > 30
              ? `${firstMessage.substring(0, 30)}...`
              : firstMessage,
          originalData: session,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data]);

  const handleItemClick = (item) => {
    const session = item.originalData;

    // Reset current chat
    dispatch(resetChat());

    // Ensure typing and streaming are reset
    dispatch(setTyping(false));
    dispatch(setStreaming(false));

    // Set the selected chat in history slice
    dispatch(setSelectedChat(session.id));

    // Update the current session
    dispatch(setChatSession(session));

    // Set session as loaded
    dispatch(setSessionLoaded(true));
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      dispatch(fetchChatHistory({ pageSize: 5, lastDoc }));
    }
  };

  return (
    <Grid {...styles.mainGridProps}>
      <ToggleScreen
        title="Chat history"
        data={transformedData}
        onItemClick={handleItemClick}
        startIcon={StartIcon}
        endIcon={StyledArrow}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        loadMoreCount={5}
      />
    </Grid>
  );
};

export default ChatHistory;

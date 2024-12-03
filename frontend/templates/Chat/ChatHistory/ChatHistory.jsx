import React from 'react';

import { Grid, useTheme } from '@mui/material';

import ToggleScreen from '@/components/ToggleScreen';

import ArrowIcon from '@/assets/svg/arrow_icon.svg';
import IconChatClose from '@/assets/svg/ChatIconCloseChatHistory.svg';
import IconChatOpen from '@/assets/svg/ChatIconOpenChatHistory.svg';

import styles from './styles';

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
  const data = [
    { date: new Date().toISOString(), title: 'Classroom Questions' },
    {
      date: new Date(Date.now() - 86400000).toISOString(),
      title: 'Classroom Questions',
    },
    { date: '2024-06-04', title: 'Classroom Questions' },
    { date: '2024-06-04', title: 'Classroom Questions' },
    { date: '2024-06-04', title: 'Classroom Questions' },
    { date: '2024-06-04', title: 'Classroom Questions' },
    { date: '2024-06-04', title: 'Classroom Questions' },
    { date: '2024-06-04', title: 'Classroom Questions' },
    { date: '2024-06-04', title: 'Classroom Questions' },
    { date: '2024-06-04', title: 'Classroom Questions' },
  ];

  const handleItemClick = (item) => {
    console.log('Clicked chat session:', item);
  };

  return (
    <Grid {...styles.mainGridProps}>
      <ToggleScreen
        title="Chat history"
        data={data}
        onItemClick={handleItemClick}
        startIcon={StartIcon}
        endIcon={StyledArrow}
      />
    </Grid>
  );
};

export default ChatHistory;

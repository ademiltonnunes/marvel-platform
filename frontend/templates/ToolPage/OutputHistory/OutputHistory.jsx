import React from 'react';

import { Box, Grid, useTheme } from '@mui/material';

import ToggleScreen from '@/components/ToggleScreen';

import ArrowIcon from '@/assets/svg/arrow_icon.svg';
import IconHistoryClose from '@/assets/svg/ChatIconCloseChatHistory.svg';
import IconHistoryOpen from '@/assets/svg/ChatIconOpenChatHistory.svg';

import styles from './styles';

const StyledArrow = ({ isOpen }) => {
  const theme = useTheme();
  return (
    <Box
      style={{
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.2s ease-in-out',
        display: 'flex',
        alignItems: 'center',
      }}
      color={theme.palette.Common.White['100p']}
    >
      <ArrowIcon />
    </Box>
  );
};

const StartIcon = ({ isOpen }) =>
  isOpen ? <IconHistoryOpen /> : <IconHistoryClose />;

const OutputHistory = () => {
  const data = [
    {
      date: new Date().toISOString(),
      title: 'Flashcards: Advanced Biology Concepts',
      type: 'GEMINI_DYNAMO',
      count: 15,
    },
    {
      date: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      title: 'Quiz: Introduction to Physics',
      type: 'GEMINI_QUIZIFY',
      count: 10,
    },
    {
      date: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      title: 'Flashcards: Spanish Vocabulary - Chapter 5',
      type: 'GEMINI_DYNAMO',
      count: 20,
    },
    {
      date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      title: 'Quiz: World History - Ancient Civilizations',
      type: 'GEMINI_QUIZIFY',
      count: 8,
    },
    {
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      title: 'Flashcards: Chemistry Equations',
      type: 'GEMINI_DYNAMO',
      count: 12,
    },
    {
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      title: 'Quiz: Literature - Shakespeare',
      type: 'GEMINI_QUIZIFY',
      count: 15,
    },
    {
      date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      title: 'Flashcards: Mathematical Formulas',
      type: 'GEMINI_DYNAMO',
      count: 25,
    },
    {
      date: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
      title: 'Quiz: Geography - European Countries',
      type: 'GEMINI_QUIZIFY',
      count: 12,
    },
    {
      date: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
      title: 'Flashcards: Computer Science Terms',
      type: 'GEMINI_DYNAMO',
      count: 18,
    },
    {
      date: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
      title: 'Quiz: Art History - Renaissance Period',
      type: 'GEMINI_QUIZIFY',
      count: 10,
    },
    {
      date: new Date(Date.now() - 691200000).toISOString(), // 8 days ago
      title: 'Flashcards: French Grammar Rules',
      type: 'GEMINI_DYNAMO',
      count: 22,
    },
    {
      date: new Date(Date.now() - 777600000).toISOString(), // 9 days ago
      title: 'Quiz: Music Theory Basics',
      type: 'GEMINI_QUIZIFY',
      count: 15,
    },
  ];

  const handleItemClick = (item) => {
    console.log('Clicked output item:', item);
    console.log('Output type:', item.type);
    console.log('Number of items:', item.count);
  };

  return (
    <Grid {...styles.mainGridProps}>
      <ToggleScreen
        title="Output History"
        data={data}
        onItemClick={handleItemClick}
        startIcon={StartIcon}
        endIcon={StyledArrow}
        {...styles.toggleScreenProps}
      />
    </Grid>
  );
};

export default OutputHistory;

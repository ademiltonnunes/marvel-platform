import React from 'react';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import ToggleScreen from '@/components/ToggleScreen';

import ArrowIcon from '@/assets/svg/arrow_icon.svg';
import IconHistoryClose from '@/assets/svg/ChatIconCloseChatHistory.svg';
import IconHistoryOpen from '@/assets/svg/ChatIconOpenChatHistory.svg';

import { TOOLS_ID } from '@/constants/tools';

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

const EmptyState = () => (
  <Box sx={{ p: 2, textAlign: 'center' }}>
    <Typography color="textSecondary" variant="body2">
      No output history available
    </Typography>
  </Box>
);

const OutputHistory = () => {
  const { data, loading } = useSelector((state) => state.toolHistory);

  const transformedData = React.useMemo(() => {
    if (!data) return [];

    return Object.entries(data)
      .map(([id, session]) => {
        // Parse the date string and handle timestamps if present
        let date;
        try {
          if (session.createdAt?.seconds) {
            // Handle Firestore timestamp
            date = new Date(session.createdAt.seconds * 1000).toISOString();
          } else {
            // Handle string date
            date = session.createdAt;
          }
        } catch (error) {
          date = new Date().toISOString();
        }

        return {
          id,
          date,
          title: `${
            session.toolId === TOOLS_ID.GEMINI_DYNAMO ? 'Flashcards' : 'Quiz'
          }: ${session.topic}`,
          type: session.toolId,
          count: session.response ? Object.keys(session.response).length : 0,
          originalData: session,
        };
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)); // Add sorting by date
  }, [data]);

  const handleItemClick = (item) => {
    console.log('Clicked output item:', item);
    console.log('Output type:', item.type);
    console.log('Number of items:', item.count);
  };

  if (loading) {
    return (
      <Grid {...styles.mainGridProps}>
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography color="textSecondary" variant="body2">
            Loading history...
          </Typography>
        </Box>
      </Grid>
    );
  }

  return (
    <Grid {...styles.mainGridProps}>
      <ToggleScreen
        title="Output History"
        data={transformedData}
        onItemClick={handleItemClick}
        startIcon={StartIcon}
        endIcon={StyledArrow}
        emptyComponent={<EmptyState />}
        {...styles.toggleScreenProps}
      />
    </Grid>
  );
};

export default OutputHistory;

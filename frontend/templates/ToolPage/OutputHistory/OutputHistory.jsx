import React, { useState } from 'react';

import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import ToggleScreen from '@/components/ToggleScreen';
import ToolOutputHistoryDrawer from '@/components/ToolOutputHistoryDrawer';

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
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const transformedData = React.useMemo(() => {
    if (!data) return [];

    return Object.entries(data)
      .map(([id, session]) => {
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
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data]);

  const handleItemClick = (item) => {
    setSelectedItem({
      ...item.originalData,
      title: item.title,
      toolId: item.type,
      createdAt: item.date,
    });
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setSelectedItem(null);
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
    <>
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
      <ToolOutputHistoryDrawer
        isOpen={openDrawer}
        onClose={handleDrawerClose}
        data={selectedItem}
      />
    </>
  );
};

export default OutputHistory;

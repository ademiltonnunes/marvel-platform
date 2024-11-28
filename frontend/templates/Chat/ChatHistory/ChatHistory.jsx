import React, { useState, Fragment } from 'react';
import { Button, Box, useTheme, Typography, List, ListItem, ListItemText, Divider, Grid  } from '@mui/material';
import IconChatClose from '@/assets/svg/ChatIconCloseChatHistory.svg';
import IconChatOpen from '@/assets/svg/ChatIconOpenChatHistory.svg';
import ArrowIcon from '@/assets/svg/arrow_icon.svg'

import getChatSessions from '@/services/chatbot/getChatSessions';

import styles from './styles';

const ChatHistory = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const theme = useTheme();

  const data = [
    { date: 'Today', title: 'Classroom Questions' },
    { date: 'Yesterday', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
    { date: 'June 4, 2024', title: 'Classroom Questions' },
  ];

  const renderButton = () => {
    return (
      <Button
      onClick={() => toggleDrawer()}
      startIcon={!isOpen ? IconChatClose() : IconChatOpen()}
      endIcon={
        <Box sx = {{
        }}>{ArrowIcon()}</Box>
      }
        {...styles.menuButtonProps(isOpen)}
        >
          <Box sx = {{width: '100%', display: 'flex'}}>
            <Typography {...styles.menuButtonTextProps()}>
            Chat history
            </Typography>
          </Box>
      </Button>
    );
  };

  const renderChatList = () => {
    return (
      <List sx={{ backgroundColor: 'rgba(24, 26, 32, 0.37)', height: '100%', overflow: 'auto'}}>
        {data.map((item, index) => (
          <Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="body2" color="textSecondary" fontFamily="Satoshi Medium" fontSize="12px" fontWeight="400" sx={{ padding: '4px' }}>
                    {item.date}
                  </Typography>
                }
                secondary={
                  <Typography variant="body1" color="textPrimary" fontFamily="Satoshi Medium" fontSize="14px" fontWeight="400" sx={{ padding: '4px' }}>
                    {item.title}
                  </Typography>
                }
              />
            </ListItem>
            {index < data.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    );
  };

  return (
    <Grid {...styles.mainGridProps(isOpen)}>
      {renderButton()}
      {isOpen && renderChatList()}
    </Grid>
  );
};

export default ChatHistory;

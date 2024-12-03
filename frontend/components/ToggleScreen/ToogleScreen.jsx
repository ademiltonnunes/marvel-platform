import React, { useState } from 'react';

import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';

import styles from './styles';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Generates a toggle screen component with collapsible content.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title text displayed in the toggle button.
 * @param {Array} props.data - The array of items to be displayed in the list.
 * @param {Function} props.onItemClick - Callback function triggered when an item is clicked.
 * @param {Function} props.startIcon - Function that returns the icon element based on isOpen state.
 * @param {Function} props.endIcon - Function that returns the icon element based on isOpen state.
 * @param {...otherProps} - Any additional props.
 * @return {JSX.Element} - The rendered toggle screen component.
 */
const ToggleScreen = ({
  title,
  data = [],
  onItemClick,
  startIcon,
  endIcon,
  ...otherProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderButton = () => {
    return (
      <Button
        onClick={() => setIsOpen(!isOpen)}
        startIcon={startIcon && startIcon(isOpen)}
        endIcon={<Box>{endIcon && endIcon(isOpen)}</Box>}
        {...styles.menuButtonProps(isOpen)}
      >
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Typography {...styles.menuButtonTextProps()}>{title}</Typography>
        </Box>
      </Button>
    );
  };

  const renderList = () => {
    return (
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List sx={styles.listProps}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                onClick={() => onItemClick?.(item)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      fontFamily="Satoshi Medium"
                      fontSize="12px"
                      fontWeight="400"
                      sx={{ padding: '4px' }}
                    >
                      {formatDate(item.date)}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      fontFamily="Satoshi Medium"
                      fontSize="14px"
                      fontWeight="400"
                      sx={{ padding: '4px' }}
                    >
                      {item.title}
                    </Typography>
                  }
                />
              </ListItem>
              {index < data.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    );
  };

  return (
    <Box {...styles.containerProps(isOpen)}>
      {renderButton()}
      {isOpen && renderList()}
    </Box>
  );
};

export default ToggleScreen;

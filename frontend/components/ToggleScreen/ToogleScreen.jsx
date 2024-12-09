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
  try {
    const date = new Date(dateString);
    if (date.isNaN()) {
      console.error('Invalid date:', dateString);
      return '';
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Reset hours to compare just the dates
    const dateWithoutTime = new Date(date.toDateString());
    const todayWithoutTime = new Date(today.toDateString());
    const yesterdayWithoutTime = new Date(yesterday.toDateString());

    if (dateWithoutTime.getTime() === todayWithoutTime.getTime()) {
      return 'Today';
    }
    if (dateWithoutTime.getTime() === yesterdayWithoutTime.getTime()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
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
  emptyComponent,
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
    if (!data || data.length === 0) {
      return (
        <Box sx={styles.listProps}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100px',
              width: '100%',
            }}
          >
            {emptyComponent || (
              <Typography sx={styles.menuButtonTextProps().sx}>
                No items available
              </Typography>
            )}
          </Box>
        </Box>
      );
    }

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
                sx={styles.listItemProps.sx}
              >
                <ListItemText
                  primary={
                    <Typography sx={styles.dateTextProps.sx}>
                      {formatDate(item.date)}
                    </Typography>
                  }
                  secondary={
                    <Typography sx={styles.titleTextProps.sx}>
                      {item.title}
                    </Typography>
                  }
                />
              </ListItem>
              {index < data.length - 1 && (
                <Divider sx={styles.dividerProps.sx} />
              )}
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

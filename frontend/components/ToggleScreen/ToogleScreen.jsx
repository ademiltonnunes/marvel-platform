import React, { useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
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
    if (date.isNaN) {
      throw new Error('Invalid date', dateString);
    }

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

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
    return error;
  }
};

/**
 * Generates a toggle screen component with collapsible content and optional pagination.
 *
 * @param {object} props - The properties for the component.
 * @param {string} props.title - The title text displayed in the toggle button.
 * @param {Array} props.data - The array of items to be displayed in the list. Each item should have 'date' and 'title' properties.
 * @param {Function} props.onItemClick - Callback function triggered when an item is clicked. Receives the clicked item as parameter.
 * @param {Function} props.startIcon - Function that returns the icon element based on isOpen state. Receives isOpen boolean as parameter.
 * @param {Function} props.endIcon - Function that returns the icon element based on isOpen state. Receives isOpen boolean as parameter.
 * @param {React.ReactNode} [props.emptyComponent] - Custom component to display when data array is empty.
 * @param {boolean} [props.loading=false] - Flag indicating if more items are being loaded.
 * @param {boolean} [props.hasMore=false] - Flag indicating if there are more items to load.
 * @param {Function} [props.onLoadMore] - Callback function triggered when the load more button is clicked.
 * @param {string} [props.loadMoreText='Load More'] - Text to display in the load more button.
 * @param {number} [props.loadMoreCount=10] - Number of items to load in the next batch, displayed in the load more button.
 * @return {JSX.Element} The rendered toggle screen component with collapsible content.
 */
const ToggleScreen = ({
  title,
  data = [],
  onItemClick,
  startIcon,
  endIcon,
  emptyComponent,
  loading = false,
  hasMore = false,
  onLoadMore,
  loadMoreText = 'Load More',
  loadMoreCount = 10,
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

  const renderLoadMoreButton = () => {
    if (!hasMore) return null;

    return (
      <Box {...styles.loadMoreContainerProps}>
        <Button
          onClick={onLoadMore}
          disabled={loading}
          {...styles.loadMoreButtonProps}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            `${loadMoreText} (${loadMoreCount})`
          )}
        </Button>
      </Box>
    );
  };

  const renderList = () => {
    if (!data || data.length === 0) {
      return (
        <Box sx={styles.listProps}>
          <Box {...styles.emptyStateContainerProps}>
            {emptyComponent || (
              <Typography {...styles.menuButtonTextProps()}>
                No items available
              </Typography>
            )}
          </Box>
        </Box>
      );
    }

    return (
      <Box {...styles.listBoxProps}>
        <List sx={styles.listProps}>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                onClick={() => onItemClick?.(item)}
                {...styles.listItemProps}
              >
                <ListItemText
                  primary={
                    <Typography {...styles.dateTextProps}>
                      {formatDate(item.date)}
                    </Typography>
                  }
                  secondary={
                    <Typography {...styles.titleTextProps}>
                      {item.title}
                    </Typography>
                  }
                />
              </ListItem>
              {index < data.length - 1 && <Divider {...styles.dividerProps} />}
            </React.Fragment>
          ))}
          {renderLoadMoreButton()}
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

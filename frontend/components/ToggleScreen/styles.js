const styles = {
  containerProps: (isOpen) => ({
    sx: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: !isOpen ? 'flex-end' : 'flex-start',
      width: '100%',
      maxHeight: isOpen ? '80vh' : 'auto',
    },
  }),
  menuButtonProps: (isOpen) => ({
    variant: 'outlined',
    sx: (theme) => ({
      borderRadius: isOpen ? '10px 10px 0px 0px' : '10px',
      position: 'sticky',
      top: 0,
      border: 'none',
      background: isOpen
        ? theme.palette.Dark_Colors.Dark[1]
        : theme.palette.Dark_Colors.Dark[3],
      padding: '19px 24px',
      minHeight: '62px',
      width: '100%',
      justifyContent: 'space-evenly',
      zIndex: 2,
      '&:hover': {
        background: isOpen
          ? theme.palette.Dark_Colors.Dark[1]
          : theme.palette.Dark_Colors.Dark[3],
        opacity: 0.9,
      },
    }),
  }),
  listProps: {
    backgroundColor: 'rgba(24, 26, 32, 0.37)',
    overflowY: 'auto',
    flex: 1,
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255, 255, 255, 0.3)',
      borderRadius: '3px',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.4)',
      },
    },
  },
  menuButtonTextProps: () => ({
    sx: (theme) => ({
      fontFamily: 'Satoshi Medium',
      color: theme.palette.Text.Primary,
      textTransform: 'capitalize',
      fontSize: '14px',
      fontWeight: '500',
    }),
  }),
  listContainerProps: {
    sx: (theme) => ({
      backgroundColor: theme.palette.Background.Default,
      height: '100%',
      overflow: 'auto',
    }),
  },
  listItemProps: {
    sx: (theme) => ({
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.Background.Main,
      },
    }),
  },
  dateTextProps: {
    sx: (theme) => ({
      color: theme.palette.Text.Secondary,
      fontFamily: 'Satoshi Medium',
      fontSize: '12px',
      fontWeight: '400',
      padding: '4px',
    }),
  },
  titleTextProps: {
    sx: (theme) => ({
      color: theme.palette.Text.Primary,
      fontFamily: 'Satoshi Medium',
      fontSize: '14px',
      fontWeight: '400',
      padding: '4px',
    }),
  },
  dividerProps: {
    sx: (theme) => ({
      backgroundColor: theme.palette.Background.Default,
    }),
  },
  emptyStateContainerProps: {
    sx: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100px',
      width: '100%',
    },
  },
  listBoxProps: {
    sx: {
      flex: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
  },
  loadMoreContainerProps: {
    sx: {
      p: 2,
      textAlign: 'center',
    },
  },
  loadMoreButtonProps: {
    sx: (theme) => ({
      fontFamily: 'Satoshi Medium',
      color: theme.palette.Text.Primary,
      fontSize: '14px',
      fontWeight: '500',
      textTransform: 'capitalize',
      '&:hover': {
        backgroundColor: theme.palette.Common.White['12p'],
        color: theme.palette.primary.main,
      },
    }),
  },
};

export default styles;

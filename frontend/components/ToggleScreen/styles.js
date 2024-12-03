const styles = {
  containerProps: (isOpen) => ({
    sx: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: !isOpen ? 'flex-end' : 'flex-start',
      width: '100%',
    },
  }),
  menuButtonProps: (isOpen) => ({
    variant: 'outlined',
    sx: (theme) => ({
      borderRadius: isOpen ? '10px 10px 0px 0px' : '10px',
      position: 'relative',
      border: 'none',
      background: isOpen
        ? theme.palette.Dark_Colors.Dark[1]
        : theme.palette.Dark_Colors.Dark[3],
      padding: '19px 24px',
      minHeight: '62px',
      width: '100%',
      justifyContent: 'space-evenly',
      '&:hover': {
        background: isOpen
          ? theme.palette.Dark_Colors.Dark[1]
          : theme.palette.Dark_Colors.Dark[3],
        opacity: 0.9,
      },
    }),
  }),
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
    sx: {
      color: '#9CA3AF',
      fontFamily: 'Satoshi Medium',
      fontSize: '12px',
      fontWeight: '400',
      padding: '4px',
    },
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
};

export default styles;

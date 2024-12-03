const styles = {
  mainGridProps: {
    sx: {
      maxHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      position: 'relative',
      backgroundColor: 'transparent',
    },
  },
  toggleScreenProps: {
    sx: {
      '.MuiList-root': {
        maxHeight: 'calc(80vh - 62px)',
        overflowY: 'auto',
        scrollbarWidth: 'thin',
        overflowX: 'hidden',
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
      '.MuiButton-root': {
        position: 'sticky',
        bottom: 0,
        zIndex: 2,
      },
    },
  },
};

export default styles;

const styles = {
  // Main container style
  mainBoxProps: {
    sx: {
      backgroundColor: 'transparent !important',
      border: 'none !important',
      '& *': {
        border: 'none !important',
      },
      width: '1440px',
    },
  },

  // Grid container style
  mainGridContainerProps: {
    sx: {
      width: '80vw',
      maxWidth: '100%',
      boxSizing: 'border-box',
      paddingLeft: '10px',
      paddingRight: '10px',
      margin: '0 auto',
      display: 'flex',
      border: 'none',
      marginTop: '-70px',
      marginBottom: '-62px',
    },
  },

  // Slide controls container style
  slideControlsContainer: {
    sx: {
      backgroundColor: 'transparent',
      border: 'none',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },

  // Back button style
  backButtonProps: {
    sx: {
      color: '#AC92FF',
      backgroundColor: 'transparent',
    },
  },

  // Main content container style
  contentContainerProps: {
    sx: {
      minHeight: '80vh',
      width: '100%',
      display: 'flex',
      backgroundColor: 'transparent',
      border: 'none',
    },
  },

  // Sidebar container style
  sidebarProps: {
    sx: {
      backgroundColor: '#1C1233',
      borderRadius: '10px 0 0 10px',
      padding: 2,
      height: '76.5vh',
      overflowY: 'auto',
      border: 'none',
    },
  },

  // Sidebar list item style
  sidebarListItemProps: {
    sx: {
      mb: 1,
      borderRadius: '6px',
      border: 'none',
    },
  },

  // Sidebar list item button style
  sidebarListItemButtonProps: {
    sx: {
      borderRadius: '6px',
      '&:hover': { backgroundColor: '#2A1B4A' },
      border: 'none',
    },
  },

  // Sidebar list item text primary style
  sidebarListItemTextPrimaryProps: {
    sx: {
      color: '#AC92FF',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },

  // Sidebar list item text secondary style
  sidebarListItemTextSecondaryProps: {
    sx: {
      color: 'white',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '200px',
      maxWidth: '100%',
    },
  },

  // Main slide view container style
  slideViewContainerProps: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      padding: 4,
      border: 'none',
      width: '63%',
      paddingTop: '22px',
    },
  },

  // Slide content container style
  slideContentContainerProps: {
    sx: {
      backgroundColor: '#1C1233',
      borderRadius: '0 10px 10px 0',
      padding: 4,
      height: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      mb: 4,
      ml: -2,
      width: '100%',
      border: 'none',
      overflow: 'auto',
    },
  },

  // Navigation controls container style
  navigationControlsContainerProps: {
    sx: {
      backgroundColor: 'transparent',
      border: 'none',
    },
  },

  // Navigation button style
  navigationButtonProps: {
    sx: {
      color: '#AC92FF',
      backgroundColor: '#1C1233',
      '&:hover': { backgroundColor: '#2A1B4A' },
      '&.Mui-disabled': { color: 'text.disabled' },
      border: 'none',
    },
  },

  // Slide title props
  slideTitleProps: {
    color: '#AC92FF',
    fontFamily: 'Satoshi Bold',
    fontSize: '2rem',
  },

  // Slide content props
  slideContentProps: {
    color: 'white',
    fontFamily: 'Satoshi Regular',
    fontSize: '1rem',
  },

  // Slide container props
  slideContainerProps: {
    sx: {
      container: true,
      background: 'none',
      border: 'none',
    },
  },
};

export default styles;

const styles = {
  mainGrid: {
    sx: {
      height: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: {
        laptop: '180px minmax(0, 1fr) 300px',
        desktop: '180px minmax(0, 1fr) 300px',
        desktopMedium: '180px minmax(0, 1fr) 300px',
      },
    },
    props: {
      container: true,
      item: true,
    },
  },
  contentGrid: {
    sx: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      overflow: 'auto',
      rowGap: 0,
      py: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
      px: { laptop: 2, desktop: 3, desktopMedium: 4 },
      width: '100%',
      maxWidth: '100%',
    },
  },
  leftSpaceGrid: {
    sx: {
      height: '100%',
    },
  },
  historyGrid: {
    sx: {
      position: 'fixed',
      right: { laptop: 16, desktop: 20, desktopMedium: 24 },
      bottom: { laptop: 16, desktop: 20, desktopMedium: 24 },
      width: '300px',
      zIndex: 1000,
      pointerEvents: 'auto',
    },
  },
  backButtonGrid: {
    sx: {
      height: 'auto',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: '1000px',
      mb: 0,
      flex: '0 10 auto',
    },
    props: {
      container: true,
      item: true,
      mobileSmall: 12,
    },
  },
  formGrid: {
    sx: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      rowGap: '12px',
      width: '100%',
      maxWidth: '1000px',
      '& .MuiAccordion-root': {
        mb: 0,
      },
    },
    props: {
      container: true,
      item: true,
      mobileSmall: 12,
    },
  },
  outlinedButtonProps: {
    color: 'purple',
    extraProps: {
      padding: '2px',
      height: { laptop: '40px', desktop: '42px', desktopMedium: '45px' },
    },
    extraButtonProps: {
      fontFamily: 'Satoshi Medium',
      fontSize: { laptop: '14px', desktop: '15px', desktopMedium: '16px' },
      px: { laptop: 1, desktop: 2, desktopMedium: 3 },
    },
  },
};

export default styles;

const styles = {
    mainBoxProps: {
      container: true,
      backgroundColor: '#181A20',
      item: true,
      display : "flex",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      px: { laptop: 4, desktop: 5, desktopMedium: 6 },
      py: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
      p: 2,
      width: '100%', 
      borderRadius: '10px',
      border: '1px, solid',
      borderColor: (theme) => theme.palette.primary.main,
    },
    mainGridProps: {
        container: true,
        item: true,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        rowGap: 5,
        px: { laptop: 4, desktop: 5, desktopMedium: 6 },
        py: { laptop: 1, desktop: 1.5, desktopMedium: 2 },
      },
    titleGridProps: {
      container: true,
      item: true,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      color: 'white',
    },
    titleProps: {
      fontFamily: 'Satoshi Bold',
      fontSize: '36px',
      color: 'white',
    },
    subtitleProps: {
      fontFamily: 'Satoshi Regular',
      fontSize: '18px',
      color: 'white',
    },
    boldTextProps: {
      component: 'span',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'bold',
      color: 'white',
    },
    highlightTextProps: {
        component: 'span',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'bold',
        color: (theme) => theme.palette.primary.main,
    },
    reXProps: {
        // sx: (theme) => ({
        //   position: 'absolute',
        //   zIndex: 2,
        //   left: 0,
        //   width: { laptop: 320, desktop: 360, desktopMedium: 420 },
        //   height: { laptop: 500, desktop: 560, desktopMedium: 650 },
        //   bottom: theme.spacing(5),
        // }),
      },
      reXImageProps: {
        // layout: 'fill',
        // objectFit: 'cover',
        // priority: true,
      },
  };
  
  export default styles;
  
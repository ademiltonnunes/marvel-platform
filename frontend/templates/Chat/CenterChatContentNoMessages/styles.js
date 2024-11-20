const styles = {
  mainGridProps: {
    position: 'relative',
    container: true,
    mobileSmall: true,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    zIndex: 0,
    mt: 10,
    px: { laptop: 2, desktop: 2.5, desktopMedium: 3 },
    sx: {
      overflowY: 'auto',
    },
  },
  noMessagesGridProps: {
    container: true,
    mobileSmall: 12,
    rowGap: 3,
    justifyContent: 'flex-start', // starting from left
    height: '100%',
    alignContent: 'flex-start',
  },

  descriptionGridProps: {
    container: true,
    item: true,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
    mobileSmall: 12,
    width: '100%',
    maxWidth: '100%',
    px: 2,
  },

  introGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 1,
  },
  profileProps: {
    position: 'relative',
    container: true,
    item: true,
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },

  imageProps: {
    layout: 'fill',
    objectFit: 'cover',
  },

  profileGridProps: {
    container: true,
    item: true,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 1.5,
  },
  // KAI AI added
  kaiaiTextProps: {
    fontFamily: 'Ethnocentric Regular',
    fontSize: '22px',
    letterSpacing: '16px',
    lineHeight: '26.4px',
    color: '#5614F3',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '174px',
    height: '26px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  // Vector line added
  kaiaiVectorLineContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: '8px 0',
  },

  kaiaiVectorLine: {
    width: '174px',
    height: '1px',
    backgroundColor: '#5614F3',
  },

  introTextProps: {
    fontFamily: 'Satoshi',
    fontSize: '18px',
    color: 'black',
    width: '100%',
    wordWrap: 'break-word',
  },

  highlightTextProps: {
    component: 'span',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    color: '#5614F3',
    ml: 0.5,
  },
  descriptionProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '16px',
    color: 'black',
  },
};

export default styles;

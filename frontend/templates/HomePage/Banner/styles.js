const styles = {
  mainBoxProps: {
    backgroundColor: (theme) => theme.palette.Background.primary,
    width: '100%',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: (theme) => theme.palette.primary.main,
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '30px',
    color: (theme) => theme.palette.Text.Primary,
  },
  subtitleProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '15px',
    color: (theme) => theme.palette.Text.Primary,
    maxWidth: '90%',
  },
  boldTextProps: {
    fontFamily: 'inherit',
    component: 'span',
    fontWeight: '700',
  },
  highlightTextProps: {
    fontFamily: 'inherit',
    component: 'span',
    fontWeight: '700',
    color: (theme) => theme.palette.primary.main,
  },
  star2Props: {
    sx: (theme) => ({
      position: 'absolute',
      left: theme.spacing(11),
      top: theme.spacing(13),
      width: theme.spacing(5),
      zIndex: '1',
    }),
  },
  star7Props: {
    sx: (theme) => ({
      position: 'absolute',
      left: theme.spacing(18),
      top: theme.spacing(2),
    }),
  },
  star8Props: {
    sx: (theme) => ({
      position: 'relative',
      right: theme.spacing(1),
      bottom: theme.spacing(-8.5),
    }),
  },
  rectangle89Props: {
    sx: (theme) => ({
      position: 'absolute',
      left: theme.spacing(0),
      bottom: theme.spacing(-1),
      width: {
        laptop: 20,
        desktop: 20,
        desktopMedium: 20,
      },
    }),
  },
  rectangle90Props: {
    sx: (theme) => ({
      position: 'absolute',
      left: theme.spacing(15.5),
      top: theme.spacing(0),
    }),
  },
  rectangle91Props: {
    sx: (theme) => ({
      position: 'absolute',
      left: theme.spacing(25.3),
      top: theme.spacing(0),
    }),
  },
  rectangle92Props: {
    sx: (theme) => ({
      position: 'absolute',
      left: theme.spacing(13),
      top: theme.spacing(0),
    }),
  },
};

export default styles;

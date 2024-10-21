const styles = {
  mainBoxProps: {
    backgroundColor: (theme) => theme.palette.Background.Default,
    width: '100%',
    borderRadius: '10px',
    border: '1px solid',
    borderColor: (theme) => theme.palette.primary.main,
  },
  titleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: '36px',
    color: (theme) => theme.palette.Text.Primary,
  },
  subtitleProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: '18px',
    color: (theme) => theme.palette.Text.Primary,
  },
  boldTextProps: {
    component: 'span',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'bold',
    color: (theme) => theme.palette.Text.Primary,
  },
  highlightTextProps: {
    component: 'span',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'bold',
    color: (theme) => theme.palette.primary.main,
  },
};

export default styles;

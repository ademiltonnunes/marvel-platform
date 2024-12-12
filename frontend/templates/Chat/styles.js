const styles = {
  mainGridProps: {
    container: true,
    item: true,
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    overflow: 'hidden',
    sx: {
      display: 'flex',
      flexWrap: 'nowrap',
      form: {
        width: '100%',
        height: '100%',
      },
    },
  },
  leftGrid: {
    item: true,
    width: '232px',
    minWidth: '232px',
  },
  rightGrid: {
    item: true,
    width: '232px',
    minWidth: '232px',
  },
};

export default styles;

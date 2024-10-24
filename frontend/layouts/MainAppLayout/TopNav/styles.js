export const colorMap = {
  default: '#9E94A5',
  active: '#AC92FF',
};

const styles = {
  mainGridProps: {
    position: 'static',
    sx: {
      backgroundColor: (theme) => theme.palette.Background.primary,
      mt: 2,
      boxShadow: 'none',
      '& .MuiToolbar-root': {
        minHeight: '48px',
      },
    },
  },
  leftBoxProps: {
    sx: {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        height: '70px',
        width: 'auto',
      },
    },
  },
  iconTitleProps: {
    variant: 'h6',
    noWrap: true,
    sx: {
      ml: 1.5,
      fontFamily: 'monospace',
      color: (theme) => theme.palette.Text.Primary,
      textDecoration: 'none',
      fontSize: '14px',
    },
  },
  menuBoxProps: {
    sx: {
      flexGrow: 1,
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
    },
  },
  menuButtonProps: (page) => ({
    variant: 'outlined',
    sx: {
      borderRadius: '8px',
      border: '1px solid transparent',
      borderImageSource: page.active
        ? 'linear-gradient(127.16deg, #9D74FF -1.3%, rgba(157, 116, 255, 0) 132%)'
        : 'none',
      borderImageSlice: 1,
      background: '#24272F',
      padding: '4px 12px',
      minHeight: '32px',
      '& .MuiButton-startIcon': {
        marginRight: '4px',
      },
    },
  }),
  menuButtonTextProps: (page) => ({
    sx: {
      color: page.disabled
        ? colorMap.default
        : colorMap[page.active ? 'active' : 'default'],
      textDecoration: 'none',
      fontSize: '14px',
    },
  }),
  rightSectionBoxProps: {
    sx: {
      flexGrow: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
  },
  rightSectionBoxTextProps: {
    variant: 'h6',
    noWrap: true,
    sx: {
      mr: 2,
      fontFamily: 'monospace',
      color: (theme) => theme.palette.Text.Primary,
      textDecoration: 'none',
      fontSize: '14px',
    },
  },
};

export default styles;

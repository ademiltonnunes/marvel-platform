export const colorMap = {
  default: (theme) => theme.palette.MutedPurple.Default,
  active: (theme) => theme.palette.MutedPurple.Active,
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
      color: (theme) => theme.palette.MutedPurple.Default,
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
    sx: (theme) => ({
      borderRadius: '8px',
      position: 'relative',
      border: 'none',
      background: theme.palette.Dark_Colors.Dark[5],
      padding: '4px 12px',
      minHeight: '32px',
      '& .MuiButton-startIcon': {
        marginRight: '4px',
      },
      ...(page.active && {
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: '8px',
          padding: '1px',
          background: `linear-gradient(127.16deg, #9D74FF -1.3%, ${theme.palette.Dark_Colors.Dark[1]} 132%)`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none',
        },
      }),
    }),
  }),
  menuButtonTextProps: (page) => ({
    sx: (theme) => ({
      color: page.disabled
        ? colorMap.default(theme)
        : colorMap[page.active ? 'active' : 'default'](theme),
      textDecoration: 'none',
      fontSize: '14px',
    }),
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
      color: (theme) => theme.palette.MutedPurple.Default,
      textDecoration: 'none',
      fontSize: '14px',
    },
  },
  themeIconButtonProps: {
    sx: (theme) => ({
      padding: '8px',
      color: colorMap.default(theme),
    }),
  },

  logoutButtonProps: {
    sx: (theme) => ({
      p: 0, // reset padding
      pr: 2, // add padding right
      color: colorMap.default(theme),
      '&:hover': {
        backgroundColor: 'transparent',
        color: colorMap.active(theme),
      },
    }),
  },
};

export default styles;

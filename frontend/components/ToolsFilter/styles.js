const styles = {
  mainGridProps: {
    container: true,
    spacing: 1,
    sx: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'flex-start',
      width: 'fit-content',
      mt: 4,
      padding: '4px',
      borderRadius: '100px',
    },
  },
  filterItemProps: {
    item: true,
  },
  filterButton: {
    sx: (theme) => ({
      borderRadius: '50px',
      position: 'relative',
      border: 'none',
      background: theme.palette.Dark_Colors.Dark[5],
      padding: '6px 16px',
      minHeight: '32px',
      minWidth: 'auto',
      textTransform: 'none',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        borderRadius: '50px',
        padding: '1px',
        background: `linear-gradient(127.16deg, ${theme.palette.Primary.Main} -1.3%, ${theme.palette.Dark_Colors.Dark[1]} 132%)`,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        pointerEvents: 'none',
      },
      '&.active': {
        backgroundColor: theme.palette.MutedPurple.Active,
        color: theme.palette.Text.Primary,
      },
      '&:not(.active)': {
        color: theme.palette.MutedPurple.Default,
        '&:hover': {
          backgroundColor: theme.palette.Action['Hover (8p)'],
        },
      },
    }),
  },
};

export default styles;

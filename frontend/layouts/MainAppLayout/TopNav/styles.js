export const colorMap = {
  default: "#9E94A5",
  active: "#AC92FF",
};

const styles = {
  mainGridProps: {
    position: "static",
    sx: {
      backgroundColor: (theme) => theme.palette.Dark_Colors.Dark[6],
    },
  },
  leftBoxProps: {
    sx: { display: "flex", alignItems: "center" },
  },
  iconTitleProps: () => {
    return {
      variant: "h6",
      noWrap: "noWrap",
      sx: {
        mr: 2,
        fontFamily: "monospace",
        color: "inherit",
        textDecoration: "none",
        fontSize: "14px",
      },
    };
  },
  menuBoxProps: {
    sx: {
      flexGrow: 1,
      display: "flex",
      gap: "16px",
      justifyContent: "center",
    },
  },
  menuButtonProps: (page) => {
    return {
      variant: "outlined",
      sx: {
        borderRadius: "8px",
        border: "1px solid transparent",
        borderImageSource: page.active
          ? "linear-gradient(127.16deg, #9D74FF -1.3%, rgba(157, 116, 255, 0) 132%)"
          : "none",
        borderImageSlice: 1,
        background: "#24272F",
      },
    };
  },
  menuButtonTextProps: (page) => ({
    sx: {
      color: page.disabled
        ? colorMap.default
        : colorMap[page.active ? "active" : "default"],
      textDecoration: "none",
      fontSize: "14px",
    },
  }),
  rightSectionBoxProps: {
    sx: { flexGrow: 0, display: "flex", alignItems: "center" },
  },
  rightSectionBoxTextProps: {
    variant: "h6",
    noWrap: true,
    sx: {
      mr: 2,
      fontFamily: "monospace",
      color: "inherit",
      textDecoration: "none",
      fontSize: "14px",
    },
  },
};

export default styles;

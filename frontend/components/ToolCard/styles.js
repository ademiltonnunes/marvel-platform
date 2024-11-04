import { getRandomBackgroundColor } from "@/utils/MiscellaneousUtils";

const styles = {
  mainGridProps: {
    container: true,
    item: true,
    desktopLarge: 3,
    laptop: 4,
  },
  cardProps: (active) => ({
    elevation: 5,
    sx: {
      // display: "flex",
      // justifyContent: "center",
      // alignItems: "flex-end",
      position: "relative",
      // height: "200px",
      width: "100%",
      borderRadius: "10px",
      overflow: "hidden",
      // p: 2,
      transition: (theme) => theme.transitions.create("all"),
      "&:hover": {
        cursor: active ? "pointer" : "not-allowed",
        transform: active && "scale(1.05)",
      },
      background: "none",
    },
  }),
  bgSectionProps: (backgroundImgURL) => ({
    sx: {
      height: "144px",
      width: "100%",
      ...(backgroundImgURL && {
        backgroundImage: `url(${backgroundImgURL})`,
        backgroundSize: "contain",
      }),
      ...(!backgroundImgURL && {
        background: getRandomBackgroundColor(),
      }),
    },
  }),
  toolDetailsGridProps: {
    position: "relative",
    // container: true,
    item: true,
    mobileSmall: 12,
    // rowGap: 1.5,
    // justifyContent: "flex-start",
    // alignItems: "center",
    sx: {
      height: "130px",
      background: (theme) => {
        return theme.palette.Background.grey2;
      },
      padding: "18px",
    },
  },
  titleProps: {
    fontFamily: "Satoshi Bold",
    fontSize: "16px",
    color: (theme) => theme.palette.Common.White["100p"],
    sx: {
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      width: "calc(100% - 16px)",
    },
  },
  StatusTagProps: () => ({
    sx: {
      marginTop: "12px",
      textAlign: "right",
    },
  }),
  StatusTagButtonProps: {
    display: "inline-flex",
    alignItems: "center",
    sx: {
      padding: "4px 10px",
      gap: "10px",
      width: "fit-content",
      background: (theme) => theme.palette.MutedPurple.Active,
      borderRadius: "40px",
      transition: (theme) => theme.transitions.create("all"),
    },
  },
  StatusTagInavtiveButtonProps: {
    display: "inline-block",
    position: "relative",
    sx: {
      padding: "4px 10px",
      gap: "10px",
      width: "fit-content",
      borderRadius: "40px",
      transition: (theme) => theme.transitions.create("all"),
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        borderRadius: "8px",
        padding: "1px",
        background: (theme) =>
          `linear-gradient(127.16deg, #9D74FF -1.3%, ${theme.palette.Dark_Colors.Dark[1]} 132%)`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        pointerEvents: "none",
      },
    },
  },
  StatusTagButtonTextProps: {
    sx: {
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "16px",
      letterSpacing: "-0.02em",
    },
  },
  contentGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  descriptionProps: {
    fontFamily: "Satoshi Regular",
    fontSize: "11px",
    color: (theme) => theme.palette.Common.White["100p"],
    sx: {
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
  },
  imageProps: {
    layout: "fill",
    objectFit: "fill",
  },
  imageGridProps: {
    position: "relative",
    container: true,
    item: true,
    width: 48,
    height: 48,
    borderRadius: "50%",
  },
};

export default styles;

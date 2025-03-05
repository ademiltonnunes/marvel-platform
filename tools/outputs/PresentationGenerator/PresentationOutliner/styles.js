const styles = {
  presentationTitleProps: {
    fontFamily: "Satoshi Bold",
    fontSize: { laptop: "24px", desktop: "28px" },
    color: "white", // Purple color for the title
    alignSelf: "flex-start", // Align the title to the left
    width: "100%",
    mb: 3, // Add margin bottom for spacing
  },
  slidesGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    justifyContent: "flex-start",
    alignItems: "center",
    rowGap: 3,
  },
  slideGridProps: {
    container: true,
    item: true,
    mobileSmall: 12,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 1,
    sx: {
      // background: '#1C1233',
      borderRadius: "10px",
      padding: "16px",
    },
    width: "100%",
    mb: 2,
  },
  slideNumberProps: {
    fontFamily: "Satoshi Bold",
    fontSize: { laptop: "20px", desktop: "24px" },
    color: "#AC92FF", // Purple color for slide numbers
  },
  slideTitleProps: {
    fontFamily: "Satoshi Bold",
    fontSize: { laptop: "20px", desktop: "24px" },
    color: "#AC92FF", // Purple color for titles
    sx: {
      width: "100%",
      marginBottom: "8px",
      "& .MuiInputBase-root": {
        backgroundColor: "transparent",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove the border completely
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove hover border effect
      },
      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove hover border effect for the root element
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none", // Remove focus border effect
      }
    },
  },
  slideContentProps: {
    fontFamily: "Satoshi Regular",
    fontSize: { laptop: "16px", desktop: "18px" },
    color: "white", // White color for content
    sx: {
      width: "100%",
    },
  },
  generateButtonProps: {
    sx: {
      background: "linear-gradient(90deg, #AC92FF 0%, #7F77FF 100%)",
      color: "white",
      fontFamily: "Satoshi Bold",
      fontSize: { laptop: "16px", desktop: "18px" },
      padding: "10px 20px",
      borderRadius: "10px",
      marginTop: "20px",
      marginLeft: "20px",
      textTransform: "capitalize", // Ensure only the first letter is uppercase
      "&:hover": {
        background: "linear-gradient(90deg, #7F77FF 0%, #8552FF 100%)",
      },
    },
  },
  actionButtonGridProps: {
    container: true,
    justifyContent: "flex-end", // Align the button to the bottom right
    mt: 4, // Add margin top for spacing
  },
  slideControlsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  removeButton: {
    minWidth: '32px',
    width: '32px',
    height: '32px',
    padding: 0,
    borderRadius: '50%',
    color: '#AC92FF',
    '&:hover': {
      backgroundColor: 'rgba(172, 146, 255, 0.04)',
      color: '#fff',
    },
  },
};

export default styles;

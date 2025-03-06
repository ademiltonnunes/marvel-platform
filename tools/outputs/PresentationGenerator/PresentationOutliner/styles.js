const styles = {
  presentationTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '24px', desktop: '28px' },
    color: 'white',
    alignSelf: 'flex-start',
    width: '100%',
    mb: 3,
  },
  slidesGridProps: {
    container: true,
    item: true,
    xs: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    rowGap: 3,
  },
  slideGridProps: {
    container: true,
    item: true,
    xs: 12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 1,
    sx: {
      // background: '#1C1233',
      borderRadius: '10px',
      padding: '16px',
    },
    width: '100%',
    mb: 2,
  },
  slideNumberProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '20px', desktop: '24px' },
    color: '#AC92FF',
  },
  slideTitleProps: {
    fontFamily: 'Satoshi Bold',
    fontSize: { laptop: '20px', desktop: '24px' },
    color: '#AC92FF',
    sx: {
      width: '100%',
      marginBottom: '8px',
      '& .MuiInputBase-root': {
        backgroundColor: 'transparent',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  },
  slideContentProps: {
    fontFamily: 'Satoshi Regular',
    fontSize: { laptop: '16px', desktop: '18px' },
    color: 'white',
    sx: {
      width: '100%',
    },
  },
  generateButtonProps: {
    sx: {
      background: 'linear-gradient(90deg, #AC92FF 0%, #7F77FF 100%)',
      color: 'white',
      fontFamily: 'Satoshi Bold',
      fontSize: { laptop: '16px', desktop: '18px' },
      padding: '10px 20px',
      borderRadius: '10px',
      marginTop: '20px',
      marginLeft: '20px',
      textTransform: 'capitalize',
      '&:hover': {
        background: 'linear-gradient(90deg, #7F77FF 0%, #8552FF 100%)',
      },
    },
  },
  actionButtonGridProps: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  slideControlsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  outlineContainerProps: {
    sx: {
      position: 'relative',
      width: '100%',
    },
  },
  mainGridProps: {
    sx: {
      width: '100%',
    },
  },
  draggableItemProps: {
    sx: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'background 0.2s ease, transform 0.2s ease',
      userSelect: 'none',
    },
  },
  dragHandleProps: {
    sx: {
      padding: '8px',
      color: '#AC92FF',
      display: 'flex',
      alignItems: 'center',
    },
  },
  accordionProps: {
    sx: {
      width: '100%',
      bgcolor: '#1C1233',
      color: 'white',
      '& .MuiAccordionSummary-root': {
        color: 'white',
      },
      '& .MuiAccordionDetails-root': {
        color: 'white',
      },
      '& .MuiSvgIcon-root': {
        color: 'rgba(105, 73, 255, 1)',
      },
    },
  },
  accordionSummaryProps: {
    sx: {
      display: 'flex',
      alignItems: 'center',
      '& .MuiAccordionSummary-content': {
        margin: '12px 0',
      },
    },
  },
  slideTextFieldInputProps: {
    sx: {
      padding: '0px 8px',
      width: '100%',
      minWidth: '300px',
    },
  },
  slideTextFieldRootProps: {
    sx: {
      width: '100%',
    },
  },
  slideTextFieldWrapperProps: {
    sx: {
      width: '100%',
    },
  },
  slideContentTextFieldProps: {
    sx: {
      '& .MuiInputBase-root': {
        color: '#AC92FF',
        backgroundColor: 'transparent',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(105, 73, 255, 0.3)',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(105, 73, 255, 0.5)',
      },
    },
  },
  slideContentTextFieldInputProps: {
    sx: {
      color: 'white',
    },
  },
  removeButtonProps: {
    sx: {
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: 'bold',
    },
  },
  droppableAreaProps: {
    sx: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      maxHeight: 'calc(100vh - 250px)',
      overflowY: 'auto',
      padding: '8px',
      transition: 'background-color 0.2s ease',
    },
  },
  addButtonProps: {
    sx: {
      position: 'fixed',
      bottom: '4rem',
      right: { desktop: '10rem', desktopMedium: '15rem', laptop: '5rem' },
      zIndex: 1000,
    },
  },
};

export default styles;

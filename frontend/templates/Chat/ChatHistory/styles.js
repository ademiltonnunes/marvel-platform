const styles = {
  mainGridProps: (isOpen) => ({
    sx: () => ({
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: !isOpen ? 'flex-end' : 'flex-start',
      paddingBottom: '20px',
      width: '232px',
    })
  }),
  menuButtonProps: (isOpen) => ({
    variant: 'outlined',
    sx: () => ({
      borderRadius: isOpen ? '10px 10px 0px 0px' : '10px',
      position: 'relative',
      border: 'none',
      background: isOpen ? '#0B0C0F' : '#181A20',
      padding: '19px 24px',
      minHeight: '62px',
      width: '100%',
      justifyContent: 'space-evenly',
    }),
  }),
  menuButtonTextProps: () => ({
    sx: () => ({
      fontFamily: 'Satoshi Medium',
      color: 'white',
      textTransform: 'capitalize',
      fontSize: '14px',
      fontWeight: '500',
    }),
  }),
};
  
  export default styles;
  
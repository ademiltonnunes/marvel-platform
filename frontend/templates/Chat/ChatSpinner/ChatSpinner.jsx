import { useEffect, useState } from 'react';

import { Box, Fade, Grid } from '@mui/material';

import styles from './styles';

const ChatSpinner = () => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSpinner(true);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Fade in={showSpinner}>
      <Box {...styles.boxWrapperProps}>
        <Grid
          id="message"
          container
          item
          mobileSmall={12}
          alignItems="center"
          {...styles.gridContainerProps}
        >
          <Grid {...styles.messageWrapperProps(false)}>
            <Box {...styles.mainProps} />
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default ChatSpinner;

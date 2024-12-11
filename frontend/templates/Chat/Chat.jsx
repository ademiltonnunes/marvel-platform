import { Grid } from '@mui/material';

import ChatHistory from './ChatHistory';
import ChatMain from './ChatMain';
import styles from './styles';

const ChatInterface = () => {
  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.leftGrid} />
      <Grid item xs={12} md="auto">
        <ChatMain />
      </Grid>
      <Grid {...styles.rightGrid}>
        <ChatHistory />
      </Grid>
    </Grid>
  );
};

export default ChatInterface;

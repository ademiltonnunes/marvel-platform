import { Grid } from '@mui/material';
import ChatMain from './ChatMain';
import ChatHistory from './ChatHistory';
import styles from './styles';

const ChatInterface = () => {
  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.leftGrid}/>
      <Grid>
        <ChatMain/>
      </Grid>
      <Grid {...styles.rightGrid}>
        <ChatHistory/>
      </Grid> 
    </Grid>
    
  );
};

export default ChatInterface;
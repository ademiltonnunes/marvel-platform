import { Grid, Typography } from '@mui/material';

import Image from 'next/image';

import ImageURLs from '@/assets/urls';

import styles from './styles';

const CenterChatContentNoMessages = ({ isInitialGreeting = true }) => {
  const renderProfilePic = () => {
    return (
      <Grid {...styles.profileGridProps}>
        <Typography {...styles.kaiaiTextProps}>KAI AI</Typography>
        <div style={styles.kaiaiVectorLineContainer}>
          <div style={styles.kaiaiVectorLine} />
        </div>
        <Typography {...styles.IntroTextProps}>Made for educators</Typography>
      </Grid>
    );
  };

  const renderDescription = () => {
    return (
      <Grid {...styles.descriptionGridProps}>
        <Grid
          container
          sx={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 1 }}
        >
          <Grid item sx={{ width: '50px', flexShrink: 0 }}>
            <Image
              src={ImageURLs.MarvelCircleAvatar}
              alt="kai-profile"
              width={38.74}
              height={38.74}
              objectFit="cover"
              {...styles.smallImageProps}
            />
          </Grid>
          <Grid item sx={{ flex: 1, overflow: 'hidden' }}>
            <Typography {...styles.introTextProps}>
              Hello! I&apos;m Marvel, your AI teaching assistant. You can ask
              any questions related to best practices in teaching, or working
              with your students. Feel free to ask me for ideas for your
              classroom, and the more specific your questions, the better my
              responses will be. <strong>How can I help you today?</strong>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.noMessagesGridProps}>
        {renderProfilePic()}
        {renderDescription()}
      </Grid>
    </Grid>
  );
};
export default CenterChatContentNoMessages;

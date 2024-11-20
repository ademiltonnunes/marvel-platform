import { Fade, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import MemoizedReactMarkdown from '@/components/MemoizedMarkdown';

import ImageURLs from '@/assets/urls';

import CodeComponent from '../CodeComponent';

import styles from './styles';

const TextMessage = (props) => {
  const { isMyMessage, message } = props;

  return (
    <Fade in direction="up">
      <Grid id="message" {...styles.mainGridProps(isMyMessage)}>
        <Grid container {...styles.messageWrapperProps(isMyMessage)}>
          {/* Avatar Column */}
          <Grid item sx={{ width: '40px' }}>
            {!isMyMessage && (
              <Image
                src={ImageURLs.MarvelCircleAvatar}
                alt="kai-profile"
                width={38.74}
                height={38.74}
                objectFit="cover"
                {...styles.smallImageProps}
              />
            )}
          </Grid>
          {/* Message Column */}
          <Grid item sx={{ ml: !isMyMessage ? 2 : -3, flex: 1 }}>
            <Typography {...styles.messageProps(isMyMessage)}>
              <MemoizedReactMarkdown
                remarkPlugins={[remarkGfm, emoji]}
                components={{ code: CodeComponent }}
              >
                {message}
              </MemoizedReactMarkdown>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default TextMessage;

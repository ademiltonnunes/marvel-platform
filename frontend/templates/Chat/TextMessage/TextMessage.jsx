import { Box, Fade, Grid, Typography } from '@mui/material';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import MemoizedReactMarkdown from '@/components/MemoizedMarkdown';

import CodeComponent from '../CodeComponent';

import styles from './styles';

const ParagraphComponent = ({ children, isMyMessage }) => (
  <Typography component="span" {...styles.messageProps(isMyMessage)}>
    {children}
  </Typography>
);

const ParagraphWrapper = (isMyMessage) =>
  function ({ children }) {
    return (
      <ParagraphComponent isMyMessage={isMyMessage}>
        {children}
      </ParagraphComponent>
    );
  };

const TextMessage = (props) => {
  const { isMyMessage, message } = props;

  const markdownComponents = {
    code: CodeComponent,
    p: ParagraphWrapper(isMyMessage),
  };

  return (
    <Fade in>
      <Box {...styles.boxWrapperProps}>
        <Grid
          id="message"
          container
          item
          mobileSmall={12}
          alignItems="center"
          sx={{
            justifyContent: isMyMessage ? 'flex-end' : 'flex-start',
          }}
        >
          <Grid {...styles.messageWrapperProps(isMyMessage)}>
            {!isMyMessage && (
              <Typography {...styles.aiNameProps}>Marvel</Typography>
            )}
            <Typography component="div" {...styles.messageProps(isMyMessage)}>
              <MemoizedReactMarkdown
                remarkPlugins={[remarkGfm, emoji]}
                components={markdownComponents}
              >
                {message}
              </MemoizedReactMarkdown>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default TextMessage;

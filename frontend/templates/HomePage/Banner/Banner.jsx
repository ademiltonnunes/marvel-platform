import * as React from 'react';
import {Box, Grid, Paper, Typography, styled} from '@mui/material';
import styles from './styles';
import ImageURLs from '@/assets/urls';
import KaiBlob from '@/assets/images/Kai_blob.png'
import rectangle from '@/assets/svg/Rectangle_Banner_1.svg'

const Banner = () => {
  const renderLeftArtifacts = () => {
    <>
      <Box>
        <Image
          {...styles.reXImageProps}
          src={ImageURLs.MarvelAuthImg}
          alt="rexImage"
        />
        {/* <KaiBlob/> */}
      </Box>
    </>
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          Hello! Welcome to Kai Tools.
          👋
        </Typography>
        <Typography {...styles.subtitleProps}>
        Made for <Typography {...styles.highlightTextProps}>educators</Typography>. 
        Hello! I'm Kai, your AI teaching assistant. 
        We are here to support you on your journey as a 
        <Typography {...styles.boldTextProps}> teacher, mentor,</Typography> and 
        <Typography {...styles.boldTextProps}> more!</Typography>
        </Typography>
      </Grid>
    );
  };

  const renderRightArtifacts = () => {
    <>
      <Box>
        <Image
          // {...styles.reXImageProps}
          src={KaiBlob}
          alt="recImage"
        />
      </Box>
    </>
  };


  return (
    <Box {...styles.mainBoxProps}>
      <Box p={2}>
      {renderLeftArtifacts()}
      </Box>
      <Box p={2}>
        {renderTitle()}
      </Box>
      <Box p={2}>
      {renderRightArtifacts()}
      </Box>
    </Box>
  );
};

export default Banner;
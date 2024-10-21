import React from 'react';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import KaiBlob from '@/assets/images/Kai_blob.png';
import rectangle from '@/assets/svg/Rectangle_Banner_1.svg';
import ImageURLs from '@/assets/urls';

import styles from './styles';

const Banner = () => {
  const renderLeftArtifacts = () => (
    <Box position="relative" width="200px" height="200px" flexShrink={0}>
      <Image
        src={ImageURLs.MarvelAuthImg}
        alt="Marvel"
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );

  const renderTitle = () => (
    <Box flex={1} mx={2}>
      <Typography {...styles.titleProps}>
        Hello! Welcome to Kai Tools. 👋
      </Typography>
      <Typography {...styles.subtitleProps}>
        Made for{' '}
        <Typography {...styles.highlightTextProps} component="span">
          educators
        </Typography>
        . Hello! I&#39;m Kai, your AI teaching assistant. We are here to support
        you on your journey as a
        <Typography {...styles.boldTextProps} component="span">
          {' '}
          teacher, mentor,
        </Typography>{' '}
        and
        <Typography {...styles.boldTextProps} component="span">
          {' '}
          more!
        </Typography>
      </Typography>
    </Box>
  );

  const renderRightArtifacts = () => (
    <Box position="relative" width="100px" height="100px" flexShrink={0}>
      <Image
        src={ImageURLs.MarvelAuthImg}
        alt="Decorative"
        layout="fill"
        objectFit="contain"
      />
    </Box>
  );

  return (
    <Box
      {...styles.mainBoxProps}
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      p={2}
    >
      {renderLeftArtifacts()}
      {renderTitle()}
      {renderRightArtifacts()}
    </Box>
  );
};

export default Banner;

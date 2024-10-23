import React from 'react';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import Rectangle89 from '@/assets/svg/banner/Rectangle89.svg';
import Rectangle90 from '@/assets/svg/banner/Rectangle90.svg';
import Rectangle91 from '@/assets/svg/banner/Rectangle91.svg';
import Rectangle92 from '@/assets/svg/banner/Rectangle92.svg';
import Star7 from '@/assets/svg/banner/Star7.svg';
import Star8 from '@/assets/svg/banner/Star8.svg';
import Star2 from '@/assets/svg/Star_4.svg';
import ImageURLs from '@/assets/urls';

import styles from './styles';

const Banner = () => {
  const renderLeftArtifacts = () => (
    <Box
      position="relative"
      minWidth="169px"
      minHeight="169px"
      height="100%"
      flexShrink={0}
    >
      <Box {...styles.star2Props}>
        <Star2 />
      </Box>
      <Box {...styles.star7Props}>
        <Star7 />
      </Box>
      <Image
        src={ImageURLs.MarvelAuthImg}
        alt="Marvel"
        layout="fill"
        objectFit="cover"
      />
    </Box>
  );

  const renderTitle = () => (
    <Box flex={1} mx={2} maxWidth="48%">
      <Typography {...styles.titleProps}>
        Hello! Welcome to Kai Tools. 👋
      </Typography>
      <Typography {...styles.subtitleProps}>
        Made for{' '}
        <Typography {...styles.highlightTextProps}>educators</Typography>.
        Hello! I&#39;m Kai, your AI teaching assistant. We are here to support
        you on your journey as a
        <Typography {...styles.boldTextProps}> teacher, mentor,</Typography> and
        <Typography {...styles.boldTextProps}> more!</Typography>
      </Typography>
    </Box>
  );

  const renderRightArtifacts = () => (
    <Box position="relative" width="265px" height="169px" flexShrink={0}>
      <Box {...styles.rectangle89Props}>
        <Rectangle89 />
      </Box>
      <Box {...styles.rectangle90Props}>
        <Rectangle90 />
      </Box>
      <Box {...styles.rectangle91Props}>
        <Rectangle91 />
      </Box>
      <Box {...styles.rectangle92Props}>
        <Rectangle92 />
      </Box>
    </Box>
  );

  return (
    <Box
      {...styles.mainBoxProps}
      display="flex"
      flexDirection="row"
      alignItems="center"
      overflow="hidden"
      height="169px"
      justifyContent="space-between"
    >
      {renderLeftArtifacts()}
      {renderTitle()}
      {renderRightArtifacts()}
      <Box {...styles.star8Props}>
        <Star8 />
      </Box>
    </Box>
  );
};

export default Banner;

import React, { useState } from 'react';

import { Grid } from '@mui/material';

import PresentationOutliner from './PresentationOutliner';
import PresentationSlides from './PresentationSlides';

import styles from './styles';

/**
 * PresentationGenerator is the parent component that manages the state and toggles between
 * Outliner and Slides views
 */
const PresentationGenerator = () => {
  const [viewMode, setViewMode] = useState('outliner'); // 'outliner' or 'slides'
  const [slides, setSlides] = useState([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [originalSlides, setOriginalSlides] = useState([]);

  // Toggle to slides view and pass the current slides data
  const handleShowSlides = (slidesData) => {
    setSlides(slidesData);
    setViewMode('slides');
  };

  // Go back to outliner view
  const handleBackToOutliner = () => {
    setViewMode('outliner');
  };

  return (
    <Grid
      container
      item
      xs={12}
      rowGap={4}
      px={6}
      py={4}
      justifyContent="center"
      alignItems="center"
      borderRadius="20px"
      sx={styles.mainGridProps.sx}
    >
      {viewMode === 'outliner' ? (
        <PresentationOutliner
          onGeneratePresentation={handleShowSlides}
          slides={slides}
          setSlides={setSlides}
          unsavedChanges={unsavedChanges}
          setUnsavedChanges={setUnsavedChanges}
          originalSlides={originalSlides}
          setOriginalSlides={setOriginalSlides}
        />
      ) : (
        <PresentationSlides
          slides={slides}
          onBackToOutliner={handleBackToOutliner}
        />
      )}
    </Grid>
  );
};

export default PresentationGenerator;

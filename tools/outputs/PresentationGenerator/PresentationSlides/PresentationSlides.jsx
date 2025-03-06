import React, { useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  Alert,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Snackbar,
  Typography,
} from '@mui/material';

// Slide templates

import styles from './styles';

import GoogleSlidesButton from '@/tools/components/GoogleSlidesButton/GoogleSlidesButton';
import TitleAndBodySlide from '@/tools/components/SlideTemplates/TitleAndBodySlide';
import TitleSlide from '@/tools/components/SlideTemplates/TitleSlide';

/**
 * PresentationSlides component renders the actual presentation view
 * with navigation controls to move between slides and a sidebar with all slide details
 * Using modern Google Identity Services for authentication
 */
const PresentationSlides = ({ slides, onBackToOutliner }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info',
  });

  // Current slide
  const currentSlide = slides[currentSlideIndex] || { title: '', content: '' };

  // Navigate to previous slide
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Navigate to next slide
  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // Handle selecting a slide from the sidebar
  const handleSlideSelect = (index) => {
    setCurrentSlideIndex(index);
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Render the appropriate slide template based on index
  const renderSlideContent = () => {
    // First slide uses TitleSlide template
    if (currentSlideIndex === 0) {
      return (
        <TitleSlide
          title={currentSlide.title}
          subtitle={currentSlide.content}
        />
      );
    }
    // All other slides use TitleAndBodySlide template
    return (
      <TitleAndBodySlide
        title={currentSlide.title}
        body={currentSlide.content}
      />
    );
  };

  return (
    <Fade in>
      {/* Main container with forceful style overrides */}
      <Box sx={styles.mainBoxProps.sx}>
        <Grid container sx={styles.mainGridContainerProps.sx}>
          {/* Header with back button and export button */}
          <Grid item xs={12} sx={styles.slideControlsContainer.sx}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBackToOutliner}
              sx={styles.backButtonProps.sx}
            >
              Back to Outliner
            </Button>
            <GoogleSlidesButton
              slides={slides}
              setNotification={setNotification}
            />
          </Grid>

          {/* Main content with sidebar and slide view */}
          <Grid container item xs={12} sx={styles.contentContainerProps.sx}>
            {/* Sidebar with all slide details */}
            <Grid item xs={3} sx={styles.sidebarProps.sx}>
              <List sx={{ height: '100%' }}>
                {slides.map((slide, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      ...styles.sidebarListItemProps.sx,
                      backgroundColor:
                        currentSlideIndex === index ? '#2A1B4A' : 'transparent',
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleSlideSelect(index)}
                      sx={styles.sidebarListItemButtonProps.sx}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              ...styles.sidebarListItemTextPrimaryProps.sx,
                              fontWeight:
                                currentSlideIndex === index ? 'bold' : 'normal',
                            }}
                          >
                            {`${index + 1}. ${slide.title}`}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={styles.sidebarListItemTextSecondaryProps.sx}
                          >
                            {`${slide.content
                              .split(' ')
                              .slice(0, 6)
                              .join(' ')}...`}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Main slide view */}
            <Grid item xs={9} sx={styles.slideViewContainerProps.sx}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Slide {currentSlideIndex + 1} of {slides.length}
              </Typography>

              {/* Slide content container - now uses the appropriate template component */}
              <Box sx={styles.slideContentContainerProps.sx}>
                {renderSlideContent()}
              </Box>

              {/* Navigation controls */}
              <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={styles.navigationControlsContainerProps.sx}
              >
                <Grid item>
                  <IconButton
                    onClick={handlePrevSlide}
                    disabled={currentSlideIndex === 0}
                    sx={styles.navigationButtonProps.sx}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={handleNextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    sx={styles.navigationButtonProps.sx}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Notification for export status */}
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseNotification}
            severity={notification.severity}
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      </Box>
    </Fade>
  );
};

export default PresentationSlides;

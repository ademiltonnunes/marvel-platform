import React, { useState, useEffect } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';

import styles from './styles';

/**
 * PresentationSlides component renders the actual presentation view
 * with navigation controls to move between slides and a sidebar with all slide details
 * Using modern Google Identity Services for authentication
 */
const PresentationSlides = ({ slides, onBackToOutliner }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  
  // Current slide
  const currentSlide = slides[currentSlideIndex] || { title: '', content: '' };

  // Load the Google API and Identity Services libraries
  useEffect(() => {
    // Function to load Google API
    const loadGapiAndGis = () => {
      // Load gapi script
      const gapiScript = document.createElement('script');
      gapiScript.src = 'https://apis.google.com/js/api.js';
      gapiScript.async = true;
      gapiScript.defer = true;
      gapiScript.onload = () => {
        initializeGapiClient();
      };
      document.body.appendChild(gapiScript);

      // Load Google Identity Services script
      const gisScript = document.createElement('script');
      gisScript.src = 'https://accounts.google.com/gsi/client';
      gisScript.async = true;
      gisScript.defer = true;
      gisScript.onload = () => {
        setGisLoaded(true);
      };
      document.body.appendChild(gisScript);
    };

    loadGapiAndGis();
  }, []);

  // Initialize GAPI client
  const initializeGapiClient = async () => {
    await window.gapi.load('client', async () => {
      await window.gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        discoveryDocs: ['https://slides.googleapis.com/$discovery/rest?version=v1'],
      });
      setGapiLoaded(true);
    });
  };

  // Initialize tokenClient when both libraries are loaded
  useEffect(() => {
    if (gapiLoaded && gisLoaded) {
      setTokenClient(
        window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive.file',
          callback: '', // Will be set later in the exportToGoogleSlides function
        })
      );
    }
  }, [gapiLoaded, gisLoaded]);

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

  // Google Slides export function
  const exportToGoogleSlides = async () => {
    try {
      setIsExporting(true);
      
      // Check if API libraries are loaded
      if (!gapiLoaded || !gisLoaded || !tokenClient) {
        throw new Error('Google API libraries are not fully loaded yet. Please try again.');
      }
      
      // Check if environment variables are available
      const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      
      if (!googleApiKey || !googleClientId) {
        throw new Error('Google API credentials are missing. Please check your environment variables.');
      }

      // Request an access token
      tokenClient.callback = async (response) => {
        if (response.error) {
          throw new Error(response.error);
        }

        try {
          // Create a new presentation
          const presentationResponse = await window.gapi.client.slides.presentations.create({
            title: 'Exported Presentation',
          });
          
          const presentationId = presentationResponse.result.presentationId;
          
          // Prepare slide creation requests
          const requests = slides.map((slide, index) => {
            return {
              createSlide: {
                objectId: `slide_${index}`,
                insertionIndex: index,
                slideLayoutReference: {
                  predefinedLayout: 'TITLE_AND_BODY',
                },
                placeholderIdMappings: [
                  {
                    layoutPlaceholder: {
                      type: 'TITLE',
                    },
                    objectId: `title_${index}`,
                  },
                  {
                    layoutPlaceholder: {
                      type: 'BODY',
                    },
                    objectId: `body_${index}`,
                  },
                ],
              },
            };
          });
          
          // Create all slides
          await window.gapi.client.slides.presentations.batchUpdate({
            presentationId: presentationId,
            requests: requests,
          });
          
          // Add content to slides
          const contentRequests = slides.flatMap((slide, index) => [
            {
              insertText: {
                objectId: `title_${index}`,
                text: slide.title,
              },
            },
            {
              insertText: {
                objectId: `body_${index}`,
                text: slide.content,
              },
            },
          ]);
          
          await window.gapi.client.slides.presentations.batchUpdate({
            presentationId: presentationId,
            requests: contentRequests,
          });
          
          // Open the created presentation in a new tab
          window.open(`https://docs.google.com/presentation/d/${presentationId}/edit`, '_blank');
          
          setNotification({
            open: true,
            message: 'Successfully exported to Google Slides!',
            severity: 'success',
          });
        } catch (error) {
          console.error('Error creating presentation:', error);
          setNotification({
            open: true,
            message: `Failed to create presentation: ${error.message}`,
            severity: 'error',
          });
        } finally {
          setIsExporting(false);
        }
      };

      // Request an access token with immediate callback
      tokenClient.requestAccessToken({ prompt: '' });
      
    } catch (error) {
      console.error('Error exporting to Google Slides:', error);
      setNotification({
        open: true,
        message: `Failed to export: ${error.message}`,
        severity: 'error',
      });
      setIsExporting(false);
    }
  };

  return (
    <Fade in>
      {/* Main container with forceful style overrides */}
      <Box
        sx={{
          backgroundColor: 'transparent !important',
          border: 'none !important',
          '& *': {
            border: 'none !important',
          },
          width: '1440px',
        }}
      >
        <Grid
          container
          sx={{
            width: '80vw',
            maxWidth: '100%',
            boxSizing: 'border-box',
            paddingLeft: '10px',
            paddingRight: '10px',
            margin: '0 auto',
            display: 'flex',
            border: 'none',
            marginTop: '-70px',
            marginBottom: '-62px',
          }}
        >
          {/* Header with back button and export button */}
          <Grid
            item
            xs={12}
            {...styles.slideControlsContainer}
            sx={{
              backgroundColor: 'transparent',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              ...(styles.slideControlsContainer?.sx || {}),
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBackToOutliner}
              sx={{
                color: styles.slideTitleProps?.color || '#AC92FF',
                backgroundColor: 'transparent',
              }}
            >
              Back to Outliner
            </Button>
            
            <Button
              startIcon={isExporting ? <CircularProgress size={16} color="inherit" /> : <CloudUploadIcon />}
              onClick={exportToGoogleSlides}
              disabled={isExporting || slides.length === 0 || !gapiLoaded || !gisLoaded}
              sx={{
                color: styles.slideTitleProps?.color || '#AC92FF',
                backgroundColor: '#2A1B4A',
                '&:hover': { backgroundColor: '#3A2B5A' },
                borderRadius: '6px',
                padding: '6px 16px',
              }}
            >
              {isExporting ? 'Exporting...' : !gapiLoaded || !gisLoaded ? 'Loading...' : 'Export to Google Slides'}
            </Button>
          </Grid>

          {/* Main content with sidebar and slide view */}
          <Grid
            container
            item
            xs={12}
            sx={{
              minHeight: '80vh',
              width: '100%',
              display: 'flex',
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            {/* Sidebar with all slide details */}
            <Grid
              item
              xs={3}
              sx={{
                backgroundColor: '#1C1233',
                borderRadius: '10px 0 0 10px',
                padding: 2,
                overflowY: 'auto',
                maxHeight: '80vh',
                border: 'none',
              }}
            >
              <List>
                {slides.map((slide, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      mb: 1,
                      backgroundColor:
                        currentSlideIndex === index ? '#2A1B4A' : 'transparent',
                      borderRadius: '6px',
                      border: 'none',
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleSlideSelect(index)}
                      sx={{
                        borderRadius: '6px',
                        '&:hover': { backgroundColor: '#2A1B4A' },
                        border: 'none',
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              color: styles.slideTitleProps?.color || '#AC92FF',
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
                            sx={{
                              color: styles.slideContentProps?.color || 'white',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {slide.content}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Main slide view */}
            <Grid
              item
              xs={9}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 4,
                border: 'none',
                width: '63%',
                height: 'auto',
                paddingTop: '22px',
              }}
            >
              <Typography variant="body1" sx={{ mb: 2 }}>
                Slide {currentSlideIndex + 1} of {slides.length}
              </Typography>

              {/* Slide content */}
              <Box
                sx={{
                  backgroundColor: '#1C1233',
                  borderRadius: '0 10px 10px 0',
                  padding: 4,
                  minHeight: '60vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  mb: 4,
                  width: '100%',
                  border: 'none',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mb: 4,
                    color: styles.slideTitleProps?.color,
                    fontFamily: styles.slideTitleProps?.fontFamily,
                    fontSize: styles.slideTitleProps?.fontSize,
                  }}
                >
                  {currentSlide.title}
                </Typography>
                <Typography
                  sx={{
                    whiteSpace: 'pre-wrap',
                    color: styles.slideContentProps?.color,
                    fontFamily: styles.slideContentProps?.fontFamily,
                    fontSize: styles.slideContentProps?.fontSize,
                  }}
                >
                  {currentSlide.content}
                </Typography>
              </Box>

              {/* Navigation controls */}
              <Grid
                container
                justifyContent="center"
                spacing={2}
                sx={{
                  backgroundColor: 'transparent',
                  border: 'none',
                }}
              >
                <Grid item>
                  <IconButton
                    onClick={handlePrevSlide}
                    disabled={currentSlideIndex === 0}
                    sx={{
                      color: styles.slideTitleProps?.color,
                      backgroundColor: '#1C1233',
                      '&:hover': { backgroundColor: '#2A1B4A' },
                      '&.Mui-disabled': { color: 'text.disabled' },
                      border: 'none',
                    }}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={handleNextSlide}
                    disabled={currentSlideIndex === slides.length - 1}
                    sx={{
                      color: styles.slideTitleProps?.color,
                      backgroundColor: '#1C1233',
                      '&:hover': { backgroundColor: '#2A1B4A' },
                      '&.Mui-disabled': { color: 'text.disabled' },
                      border: 'none',
                    }}
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
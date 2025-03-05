import { useEffect, useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, CircularProgress } from '@mui/material';

import styles from './styles';

const GoogleSlidesButton = ({ slides, setNotification }) => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  // Initialize GAPI client
  const initializeGapiClient = async () => {
    await window.gapi.load('client', async () => {
      await window.gapi.client.init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
        discoveryDocs: [
          'https://slides.googleapis.com/$discovery/rest?version=v1',
        ],
      });
      setGapiLoaded(true);
    });
  };
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

  // Initialize tokenClient when both libraries are loaded
  useEffect(() => {
    if (gapiLoaded && gisLoaded) {
      setTokenClient(
        window.google.accounts.oauth2.initTokenClient({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          scope:
            'https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive.file',
          callback: '', // Will be set later in the exportToGoogleSlides function
        })
      );
    }
  }, [gapiLoaded, gisLoaded]);

  const exportToGoogleSlides = async () => {
    try {
      setIsExporting(true);

      // Check if API libraries are loaded
      if (!gapiLoaded || !gisLoaded || !tokenClient) {
        throw new Error(
          'Google API libraries are not fully loaded yet. Please try again.'
        );
      }

      // Check if environment variables are available
      const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      if (!googleApiKey || !googleClientId) {
        throw new Error(
          'Google API credentials are missing. Please check your environment variables.'
        );
      }

      // Request an access token
      tokenClient.callback = async (response) => {
        if (response.error) {
          throw new Error(response.error);
        }

        try {
          // Create a new presentation
          const presentationResponse =
            await window.gapi.client.slides.presentations.create({
              title: 'Exported Presentation',
            });

          const { presentationId } = presentationResponse.result;

          // Prepare slide creation requests
          const requests = slides?.map((slide, index) => {
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
            presentationId,
            requests,
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
            presentationId,
            requests: contentRequests,
          });

          // Open the created presentation in a new tab
          window.open(
            `https://docs.google.com/presentation/d/${presentationId}/edit`,
            '_blank'
          );

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

  const getExportButtonText = () => {
    if (isExporting) return 'Exporting...';
    if (!gapiLoaded || !gisLoaded) return 'Loading...';
    return 'Export to Google Slides';
  };

  return (
    <Button
      startIcon={
        isExporting ? (
          <CircularProgress size={16} color="inherit" />
        ) : (
          <CloudUploadIcon />
        )
      }
      onClick={exportToGoogleSlides}
      disabled={
        isExporting || slides?.length === 0 || !gapiLoaded || !gisLoaded
      }
      sx={{
        color: styles.slideTitleProps?.color || '#AC92FF',
        backgroundColor: '#2A1B4A',
        '&:hover': { backgroundColor: '#3A2B5A' },
        borderRadius: '6px',
        padding: '6px 16px',
      }}
    >
      {getExportButtonText()}
    </Button>
  );
};

export default GoogleSlidesButton;

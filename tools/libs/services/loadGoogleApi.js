// googleApiHelper.js
export const loadGoogleApi = () => {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('window is not defined'));
  }
  return new Promise((resolve, reject) => {
    // Check if API is already loaded
    if (window.gapi && window.gapi.client) {
      resolve();
      return;
    }

    // Check if the script is already in the document
    const existingScript = document.querySelector(
      'script[src="https://apis.google.com/js/api.js"]'
    );

    if (!existingScript) {
      // If not loaded, add the script
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Once the script is loaded, load the client
        window.gapi.load('client:auth2', () => {
          resolve();
        });
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google API script'));
      };

      document.head.appendChild(script);
    } else {
      // If script exists but gapi isn't initialized yet
      if (!window.gapi) {
        reject(new Error('Google API script loaded but gapi is not defined'));
        return;
      }

      window.gapi.load('client:auth2', () => {
        resolve();
      });
    }
  });
};

export const initGoogleApi = async (apiKey, clientId) => {
  await window.gapi.auth2.init({
    apiKey,
    clientId,
    discoveryDocs: ['https://slides.googleapis.com/$discovery/rest?version=v1'],
    scope:
      'https://www.googleapis.com/auth/presentations https://www.googleapis.com/auth/drive.file',
  });

  return window.gapi;
};

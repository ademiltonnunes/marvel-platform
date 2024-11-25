import axios from 'axios';

import { functions } from '@/redux/store';

const submitPrompt = async (payload, files) => {
  try {
    const { projectId } = functions.app.options;
    const region = functions.region || 'us-central1';

    // Get the functions URL based on environment
    const baseURL =
      window.location.hostname === 'localhost'
        ? `http://localhost:5001/${projectId}/${region}/tool/api/tool`
        : `https://${region}-${projectId}.cloudfunctions.net/tool/api/tool`;

    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));

    if (!!files && files?.length > 0) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    }

    const response = await axios.post(baseURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data?.data;
  } catch (err) {
    const { response } = err;
    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;

import { forwardRef, useRef, useState } from 'react';

import { FileUpload } from '@mui/icons-material';
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import { TextFieldElement } from 'react-hook-form-mui';

import styles from './styles';

/**
 * Generates a reusable text area input component with a required title, an optional description,
 * and the ability to upload and parse PDF files.
 *
 * @param {Object} props - The properties for the component.
 * @param {string} props.id - The id of the input field.
 * @param {string} props.error - The error state of this component.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {string} props.error - The error message for the input field.
 * @param {string} props.title - The title of the input field.
 * @param {Object} props.control - The control of the Input Text Field.
 * @param {Object} props.extraInputProps - The extraInputProps of the Input Text Field.
 * @param {Object} props.extraInputLabelProps - The extraInputLabelProps of the Input Text Field.
 * @param {number} props.rows - The number of rows to display for the text area.
 * @param {Function} props.setValue - Function to set the value of the field.
 * @param {Function} props.handleOpenSnackBar - Function to show notifications.
 *
 * @return {JSX.Element} - The rendered text area input component.
 */
const PrimaryTextAreaInput = forwardRef((props, ref) => {
  const {
    id,
    error,
    placeholder,
    title,
    helperText,
    isDescription,
    description,
    extraInputProps,
    extraInputLabelProps,
    rows = 4,
    setValue,
    handleOpenSnackBar,
    name,
    ...otherProps
  } = props;

  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      handleOpenSnackBar('error', 'Please upload a PDF file only');
      return;
    }

    try {
      setIsUploading(true);

      // Read the PDF file using PDF.js
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let extractedText = '';

      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map((item) => item.str);
        extractedText += `${textItems.join(' ')}\n`;
      }

      // Set the extracted text to the text area
      setValue(name, extractedText);

      // Reset the file input
      event.target.value = null;
      handleOpenSnackBar('success', 'PDF content extracted successfully');
    } catch (error) {
      console.error('Error parsing PDF:', error);
      handleOpenSnackBar('error', 'Failed to extract content from PDF');
    } finally {
      setIsUploading(false);
    }
  };

  // Create end adornment with PDF upload icon
  const endAdornment = (
    <InputAdornment position="end">
      <input
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Tooltip title="Upload PDF">
        {isUploading ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          <IconButton
            onClick={handleUploadClick}
            sx={{
              color: '#AC92FF', // Purple color from your theme
              '&:hover': {
                backgroundColor: 'rgba(172, 146, 255, 0.1)',
              },
            }}
          >
            <FileUpload />
          </IconButton>
        )}
      </Tooltip>
    </InputAdornment>
  );

  // Merge our InputProps with any existing ones
  const mergedInputProps = {
    ...styles.textAreaInputProps(error, extraInputProps),
    endAdornment,
  };

  const TextFieldElementConfig = {
    id,
    label: title,
    fullWidth: true,
    helperText,
    InputLabelProps: styles.textAreaLabelProps(error, extraInputLabelProps),
    InputProps: mergedInputProps,
    FormHelperTextProps: styles.helperTextProps(isDescription, error),
    autoComplete: 'off',
    placeholder,
    multiline: true, // Enable multiline for text area
    rows, // Set the number of rows for the text area
  };

  return (
    <TextFieldElement
      inputRef={ref}
      name={name}
      {...TextFieldElementConfig}
      {...otherProps}
    />
  );
});

export default PrimaryTextAreaInput;

import React, { useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Fab,
  Fade,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import styles from './styles';

import UnsavedChangesAlert from '@/tools/components/UnsavedChangesAlert';

/**
 * PresentationOutliner component renders a list of slides with their titles and content.
 * It allows editing, reordering, and generating the presentation.
 */
const PresentationOutliner = ({
  onGeneratePresentation,
  slides,
  setSlides,
  unsavedChanges,
  setUnsavedChanges,
  originalSlides,
  setOriginalSlides,
}) => {
  const { response } = useSelector((state) => state.tools);

  // Initialize slides from props or response if available
  useEffect(() => {
    if (slides.length === 0 && response?.slides) {
      setSlides(response.slides);
      setOriginalSlides(response.slides);
    }
  }, [response, slides, setSlides, setOriginalSlides]);

  // Handle editing of slide title or content
  const handleEditSlide = (index, field, value) => {
    const updatedSlides = slides.map((slide, i) => {
      if (i === index) {
        return { ...slide, [field]: value };
      }
      return slide;
    });
    setSlides(updatedSlides);
    setUnsavedChanges(true);
  };

  // Handle reordering of slides
  const handleDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Create a new array without mutating the original
    const newSlides = [...slides];
    // Remove the dragged item
    const [removed] = newSlides.splice(source.index, 1);
    // Insert it at the new position
    newSlides.splice(destination.index, 0, removed);

    // Update state with the new order
    setSlides(newSlides);
    setUnsavedChanges(true);
  };

  // Handle "Generate Presentation" button click
  const handleGeneratePresentation = () => {
    onGeneratePresentation(slides); // Call the parent component function to switch view
  };

  const handleAddSlide = () => {
    const newSlide = {
      title: 'New Slide',
      content: 'Add your content here',
    };
    setSlides([...slides, newSlide]);
    setUnsavedChanges(true);
  };

  const handleRemoveSlide = (index) => {
    const updatedSlides = slides.filter((_, i) => i !== index);
    setSlides(updatedSlides);
    setUnsavedChanges(true);
  };

  const handleSaveChanges = () => {
    setOriginalSlides([...slides]);
    setUnsavedChanges(false);
    // TODO: Add API call to save changes
    console.log('Saving changes:', slides);
  };

  const handleRevertChanges = () => {
    setSlides([...originalSlides]);
    setUnsavedChanges(false);
  };

  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (unsavedChanges) {
        handleSaveChanges();
      }
    }, 3000); // Autosave after 3 seconds of no changes

    return () => clearTimeout(autoSaveTimer);
  }, [slides, unsavedChanges]);

  // Render individual slide
  const renderSlide = (slide, index) => {
    const { title, content } = slide;

    return (
      <Draggable
        key={`slide-${index}`}
        draggableId={`slide-${index}`}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              ...styles.draggableItemProps.sx,
              opacity: snapshot.isDragging ? 0.6 : 1,
              background: snapshot.isDragging ? '#2A1B4A' : 'transparent',
              transform: snapshot.isDragging
                ? `${provided.draggableProps.style.transform} scale(1.02)`
                : provided.draggableProps.style.transform,
            }}
          >
            <div
              {...provided.dragHandleProps}
              style={{
                ...styles.dragHandleProps.sx,
                cursor: snapshot.isDragging ? 'grabbing' : 'grab',
              }}
            >
              ⋮⋮
            </div>
            <div style={{ flex: 1 }}>
              <Accordion sx={styles.accordionProps.sx}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={styles.accordionSummaryProps.sx}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography
                        fontFamily={styles.slideNumberProps.fontFamily}
                        fontSize={styles.slideNumberProps.fontSize}
                        color={styles.slideNumberProps.color}
                      >
                        {index + 1}.
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        value={title}
                        onChange={(e) =>
                          handleEditSlide(index, 'title', e.target.value)
                        }
                        fullWidth
                        sx={{
                          ...styles.slideTitleProps?.sx,
                          '& .MuiInputBase-input':
                            styles.slideTextFieldInputProps.sx,
                          '& .MuiInputBase-root':
                            styles.slideTextFieldRootProps.sx,
                        }}
                        InputProps={{
                          sx: {
                            color: styles.slideTitleProps?.color,
                            fontFamily: styles.slideTitleProps?.fontFamily,
                            fontSize: styles.slideTitleProps?.fontSize,
                            ...styles.slideTextFieldWrapperProps.sx,
                          },
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    value={content}
                    onChange={(e) =>
                      handleEditSlide(index, 'content', e.target.value)
                    }
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      ...styles.slideContentProps?.sx,
                      ...styles.slideContentTextFieldProps.sx,
                    }}
                    InputProps={{
                      sx: {
                        fontFamily: styles.slideContentProps?.fontFamily,
                        fontSize: styles.slideContentProps?.fontSize,
                        ...styles.slideContentTextFieldInputProps.sx,
                      },
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            </div>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveSlide(index);
              }}
              sx={styles.removeButtonProps.sx}
            >
              ×
            </Button>
          </div>
        )}
      </Draggable>
    );
  };

  const renderSlides = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="slides">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                ...styles.droppableAreaProps.sx,
                backgroundColor: snapshot.isDraggingOver
                  ? 'rgba(42, 27, 74, 0.1)'
                  : 'transparent',
              }}
            >
              {slides.map((slide, index) => renderSlide(slide, index))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <div style={styles.outlineContainerProps.sx}>
      <Fade in>
        <Grid
          container
          item
          xs={12}
          direction="column"
          style={styles.mainGridProps.sx}
        >
          <Typography
            fontFamily={styles.presentationTitleProps.fontFamily}
            fontSize={styles.presentationTitleProps.fontSize}
            color={styles.presentationTitleProps.color}
            alignSelf={styles.presentationTitleProps.alignSelf}
            width={styles.presentationTitleProps.width}
            mb={styles.presentationTitleProps.mb}
          >
            Presentation Detail
          </Typography>

          {/* Show unsaved changes alert */}
          {unsavedChanges && (
            <UnsavedChangesAlert
              onSave={handleSaveChanges}
              onRevert={handleRevertChanges}
            />
          )}

          {/* Render the slides */}
          {slides.length > 0 ? (
            renderSlides()
          ) : (
            <Typography>No slides available.</Typography>
          )}

          {/* Add new control buttons */}
          <Grid container justifyContent="flex-end" mt={4}>
            <Grid item>
              <Button
                onClick={handleGeneratePresentation}
                sx={styles.generateButtonProps?.sx}
              >
                Generate presentation
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Fade>

      {/* Floating Add Slide button - outside of Fade */}
      <Fab
        color="primary"
        onClick={handleAddSlide}
        sx={styles.addButtonProps.sx}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default PresentationOutliner;

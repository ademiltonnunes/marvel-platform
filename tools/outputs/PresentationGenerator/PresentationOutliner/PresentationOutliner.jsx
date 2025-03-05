import React, { useEffect } from "react";

import { Button, Fade, Grid, TextField, Typography, Fab } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import styles from "./styles";

import UnsavedChangesAlert from "@/tools/components/UnsavedChangesAlert";

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

  // Log the slides to verify the data
  console.log("Slides:", slides);

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
  ) return;
  
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
    console.log("Generating presentation with slides:", slides);
    onGeneratePresentation(slides); // Call the parent component function to switch view
  };

  const handleAddSlide = () => {
    const newSlide = {
      title: "New Slide",
      content: "Add your content here",
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
    console.log("Saving changes:", slides);
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
            // {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              opacity: snapshot.isDragging ? 0.6 : 1,
              background: snapshot.isDragging ? "#2A1B4A" : "transparent",
              transform: snapshot.isDragging 
              ? `${provided.draggableProps.style.transform} scale(1.02)`
              : provided.draggableProps.style.transform,
            transition: "background 0.2s ease, transform 0.2s ease",
            userSelect: "none",
            }}
          >
             <div 
            {...provided.dragHandleProps}
            style={{ 
              cursor: snapshot.isDragging ? 'grabbing' : 'grab',
              padding: '8px',
              color: '#AC92FF',
               display: 'flex',
              alignItems: 'center'
            }}
          >
            ⋮⋮
          </div>
            <div style={{ flex: 1 }}>
              <Accordion
                sx={{
                  width: "100%",
                  bgcolor: "#1C1233",
                  color: "white",
                  "& .MuiAccordionSummary-root": {
                    color: "white",
                  },
                  "& .MuiAccordionDetails-root": {
                    color: "white",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "rgba(105, 73, 255, 1)",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& .MuiAccordionSummary-content": {
                      margin: "12px 0",
                    },
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Typography {...styles.slideNumberProps}>
                        {index + 1}.
                      </Typography>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        value={title}
                        onChange={(e) =>
                          handleEditSlide(index, "title", e.target.value)
                        }
                        fullWidth
                        sx={{
                          ...styles.slideTitleProps?.sx,
                          "& .MuiInputBase-input": {
                            padding: "0px 8px",
                            width: "100%", // Ensure full width
                            minWidth: "300px", // Set minimum width
                          },
                          "& .MuiInputBase-root": {
                            width: "100%", // Ensure the input container is full width
                          },
                        }}
                        InputProps={{
                          sx: {
                            color: styles.slideTitleProps?.color,
                            fontFamily: styles.slideTitleProps?.fontFamily,
                            fontSize: styles.slideTitleProps?.fontSize,
                            width: "100%", // Ensure the input wrapper is full width
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
                      handleEditSlide(index, "content", e.target.value)
                    }
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      ...styles.slideContentProps?.sx,
                      "& .MuiInputBase-root": {
                        color: "#AC92FF",
                        backgroundColor: "transparent",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(105, 73, 255, 0.3)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(105, 73, 255, 0.5)",
                      },
                    }}
                    InputProps={{
                      sx: {
                        color: "white",
                        fontFamily: styles.slideContentProps?.fontFamily,
                        fontSize: styles.slideContentProps?.fontSize,
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
              sx={{
                minWidth: "32px",
                width: "32px",
                height: "32px",
                padding: 0,
                borderRadius: "50%",
                color: "#AC92FF",
                "&:hover": {
                  backgroundColor: "rgba(172, 146, 255, 0.04)",
                  color: "#fff",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
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
          {(provided,snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              // {...styles.slidesGridProps}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                minHeight: snapshot.isDraggingOver ? "100vh" : "auto",
              transition: "background-color 0.2s ease",
              backgroundColor: snapshot.isDraggingOver ? "rgba(42, 27, 74, 0.1)" : "transparent"
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
    <div style={{ position: "relative", width: "100%" }}>
      <Fade in>
        <Grid container item xs={12} direction="column" width="100%">
          <Typography {...styles.presentationTitleProps}>
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
          <Grid {...styles.actionButtonGridProps}>
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
        sx={{
          position: "fixed",
          bottom: "4rem",
          // right: '30rem',
          right: { desktop: "10rem", desktopMedium: "15rem", laptop: "5rem" },
          zIndex: 1000,
        }}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default PresentationOutliner;

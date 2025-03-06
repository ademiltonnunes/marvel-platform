import { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

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
  Paper,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";

import {
  SectionHeaderSlide,
  TitleAndBodySlide,
  TitleAndBulletsSlide,
  TitleAndImageSlide,
  TitleSlide,
  TwoColumnSlide,
} from "../../../components/SlideTemplates";

import {
  MOCK_SLIDE_DATA,
  SLIDE_TEMPLATE_TYPES,
} from "../../../libs/constants/slideTemplates";

import styles from "./styles";

/**
 * PresentationSlides component renders the actual presentation view
 * with navigation controls to move between slides and a sidebar with all slide details
 */

const PresentationSlides = ({ onBackToOutliner }) => {
  const { response } = useSelector((state) => state.tools);

  // Ensure slides is always an array
  const slides =
    response && Array.isArray(response) ? response : MOCK_SLIDE_DATA;

  console.log("Slides:", slides); // Debugging

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Navigate to previous slide
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Navigate to next slide
  const handleNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Handle selecting a slide from the sidebar
  const handleSlideSelect = (index) => {
    console.log("Selected Slide Index:", index, "Slide Data:", slides[index]); // Debugging
    setCurrentSlideIndex(index);
  };

  // Ensure slides update properly when using keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (event.key === "ArrowRight") {
        handleNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlideIndex]);

  // Ensure slide is always valid before rendering
  const renderSlide = (slide) => {
    console.log("Rendering Slide:", slide); // Debugging

    if (!slide || !slide.data) {
      return (
        <Typography variant='h5' sx={{ textAlign: "center", color: "white" }}>
          No slide data available.
        </Typography>
      );
    }

    switch (slide.type) {
      case SLIDE_TEMPLATE_TYPES.TITLE:
        return <TitleSlide {...slide.data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_BODY:
        return <TitleAndBodySlide {...slide.data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_BULLETS:
        return <TitleAndBulletsSlide {...slide.data} />;
      case SLIDE_TEMPLATE_TYPES.TWO_COLUMN:
        return <TwoColumnSlide {...slide.data} />;
      case SLIDE_TEMPLATE_TYPES.SECTION_HEADER:
        return <SectionHeaderSlide {...slide.data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_IMAGE:
        return <TitleAndImageSlide {...slide.data} />;
      default:
        return (
          <Paper sx={{ padding: "20px", margin: "20px 0" }}>
            <Typography>Unknown slide type: {slide.type}</Typography>
          </Paper>
        );
    }
  };

  return (
    <Fade in>
      <Box
        sx={{
          width: "100vw",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          overflow: "hidden",
        }}
      >
        {/* Back to Outliner Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "10px 0",
            marginBottom: "10px",
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={onBackToOutliner}
            sx={{
              color: styles.slideTitleProps?.color || "#AC92FF",
              backgroundColor: "transparent",
              fontSize: "0.9rem",
            }}
          >
            Back to Outliner
          </Button>
        </Box>

        {/* Sidebar + Main Slide Content */}
        <Grid container spacing={2} sx={{ width: "100%", minHeight: "85vh" }}>
          {/* Sidebar */}
          <Grid
            item
            xs={2}
            sx={{
              backgroundColor: "#1C1233",
              borderRadius: "10px",
              padding: 2,
              maxHeight: "85vh",
              overflowY: "auto",
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
                      currentSlideIndex === index ? "#5A2D82" : "transparent",
                    borderRadius: "6px",
                  }}
                >
                  <ListItemButton onClick={() => handleSlideSelect(index)}>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            color: styles.slideTitleProps?.color || "#AC92FF",
                            fontWeight:
                              currentSlideIndex === index ? "bold" : "normal",
                            fontSize: "0.75rem",
                            lineHeight: "1.2",
                          }}
                        >
                          {`${index + 1}. ${
                            slide.data?.title || `Slide ${index + 1}`
                          }`}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Main Slide View */}
          <Grid
            item
            xs={10}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                minHeight: "55vh",
                maxHeight: "80vh",
                width: "90%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                backgroundColor: "#1C1233",
                borderRadius: "10px",
              }}
            >
              {renderSlide(slides[currentSlideIndex])}
            </Box>

            {/* Navigation Controls */}
            <Grid
              container
              justifyContent='center'
              spacing={2}
              sx={{ marginTop: "20px" }}
            >
              <Grid item>
                <IconButton
                  onClick={handlePrevSlide}
                  disabled={currentSlideIndex === 0}
                  sx={{
                    color: styles.slideTitleProps?.color,
                    backgroundColor: "#1C1233",
                    "&:hover": { backgroundColor: "#2A1B4A" },
                    "&.Mui-disabled": { color: "text.disabled" },
                    border: "none",
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
                    backgroundColor: "#1C1233",
                    "&:hover": { backgroundColor: "#2A1B4A" },
                    "&.Mui-disabled": { color: "text.disabled" },
                    border: "none",
                  }}
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fade>
  );
};

export default PresentationSlides;

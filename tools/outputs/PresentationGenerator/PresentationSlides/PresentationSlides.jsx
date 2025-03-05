import React, { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Box,
  Button,
  Divider,
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
  SLIDE_TEMPLATE_TYPES,
  SLIDE_TEMPLATE_DEFINITIONS,
  MOCK_SLIDE_DATA,
} from "../../../libs/constants/slideTemplates";

import styles from "./styles";

/**
 * PresentationSlides component renders the actual presentation view
 * with navigation controls to move between slides and a sidebar with all slide details
 */
const PresentationSlides = ({ onBackToOutliner }) => {
  const { response } = useSelector((state) => state.tools);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Check if response is available and properly formatted
  if (!response || !Array.isArray(response)) {
    return (
      <Fade in>
        <Grid container spacing={2} sx={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Paper sx={{ padding: "20px", textAlign: "center" }}>
              <Typography variant='h6'>
                No presentation data available.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Fade>
    );
  }

  // Navigate to previous slide
  const handlePrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  // Navigate to next slide
  const handleNextSlide = () => {
    if (currentSlideIndex < response.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  // Handle selecting a slide from the sidebar
  const handleSlideSelect = (index) => {
    setCurrentSlideIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePrevSlide();
      } else if (event.key === "ArrowRight") {
        handleNextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlideIndex]); // Re-add listener if currentSlideIndex changes

  // Current slide
  // const currentSlide = slides[currentSlideIndex] || { title: "", content: "" };

  // Render slide based on its type
  const renderSlide = (slide) => {
    const { type, data } = slide;

    switch (type) {
      case SLIDE_TEMPLATE_TYPES.TITLE:
        return <TitleSlide {...data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_BODY:
        return <TitleAndBodySlide {...data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_BULLETS:
        return <TitleAndBulletsSlide {...data} />;
      case SLIDE_TEMPLATE_TYPES.TWO_COLUMN:
        return <TwoColumnSlide {...data} />;
      case SLIDE_TEMPLATE_TYPES.SECTION_HEADER:
        return <SectionHeaderSlide {...data} />;
      case SLIDE_TEMPLATE_TYPES.TITLE_AND_IMAGE:
        return <TitleAndImageSlide {...data} />;
      default:
        return (
          <Paper sx={{ padding: "20px", margin: "20px 0" }}>
            <Typography>Unknown slide type: {type}</Typography>
          </Paper>
        );
    }
  };

  return (
    <Fade in>
      {/* Main container with forceful style overrides */}
      <Box
        sx={{
          backgroundColor: "transparent !important",
          border: "none !important",
          "& *": {
            border: "none !important",
          },
          width: "1440px",
        }}
      >
        <Grid
          container
          sx={{
            width: "80vw",
            maxWidth: "100%",
            boxSizing: "border-box",
            paddingLeft: "10px",
            paddingRight: "10px",
            margin: "0 auto",
            display: "flex",
            border: "none",
            marginTop: "-70px",
            marginBottom: "-62px",
          }}
        >
          {/* Header with back button */}
          <Grid
            item
            xs={12}
            {...styles.slideControlsContainer}
            sx={{
              backgroundColor: "transparent",
              border: "none",
              ...(styles.slideControlsContainer?.sx || {}),
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBackToOutliner}
              sx={{
                color: styles.slideTitleProps?.color || "#AC92FF",
                backgroundColor: "transparent",
              }}
            >
              Back to Outliner
            </Button>
          </Grid>

          {/* Main content with sidebar and slide view */}
          <Grid
            container
            item
            xs={12}
            sx={{
              minHeight: "80vh",
              width: "100%",
              display: "flex",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            {/* Sidebar with all slide details */}
            <Grid
              item
              xs={3}
              sx={{
                backgroundColor: "#1C1233",
                borderRadius: "10px 0 0 10px",
                padding: 2,
                overflowY: "auto",
                maxHeight: "80vh",
                border: "none",
              }}
            >
              <List>
                {response.map((slide, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      mb: 1,
                      backgroundColor:
                        currentSlideIndex === index ? "#2A1B4A" : "transparent",
                      borderRadius: "6px",
                      border: "none",
                    }}
                  >
                    <ListItemButton
                      onClick={() => handleSlideSelect(index)}
                      sx={{
                        borderRadius: "6px",
                        "&:hover": { backgroundColor: "#2A1B4A" },
                        border: "none",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              color: styles.slideTitleProps?.color || "#AC92FF",
                              fontWeight:
                                currentSlideIndex === index ? "bold" : "normal",
                            }}
                          >
                            {`${index + 1}. ${
                              slide.data?.title || "Slide" + (index + 1)
                            }`}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant='body2'
                            sx={{
                              color: styles.slideContentProps?.color || "white",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
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
                display: "flex",
                flexDirection: "column",
                padding: 4,
                backgroundColor: "transparent",
                border: "none",
                width: "63%",
                height: "auto",
                paddingTop: "22px",
              }}
            >
              <Typography variant='body1' sx={{ mb: 2 }}>
                Slide {currentSlideIndex + 1} of {response.length}
                <span
                  style={{
                    color: "#8A8A8A",
                    fontSize: "0.8em",
                    marginLeft: "10px",
                  }}
                >
                  (Use ← → arrow keys to navigate)
                </span>
              </Typography>

              {/* Slide content */}
              <Box
                sx={{
                  backgroundColor: "#1C1233",
                  borderRadius: "0 10px 10px 0",
                  padding: 4,
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  mb: 4,
                  width: "100%",
                  border: "none",
                }}
              >
                {response[currentSlideIndex] &&
                  renderSlide(response[currentSlideIndex])}
                {/* <Typography
                  variant='h3'
                  sx={{
                    mb: 4,
                    color: styles.slideTitleProps?.color,
                    fontFamily: styles.slideTitleProps?.fontFamily,
                    fontSize: styles.slideTitleProps?.fontSize,
                  }}
                >
                  {currentSlide.title}
                </Typography> */}
                {/* <Typography
                  sx={{
                    whiteSpace: "pre-wrap",
                    color: styles.slideContentProps?.color,
                    fontFamily: styles.slideContentProps?.fontFamily,
                    fontSize: styles.slideContentProps?.fontSize,
                  }}
                >
                  {currentSlide.content}
                </Typography> */}
              </Box>

              {/* Navigation controls */}
              <Grid
                container
                justifyContent='center'
                spacing={2}
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
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
                    disabled={currentSlideIndex === response.length - 1}
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
        </Grid>
      </Box>
    </Fade>
  );
};

export default PresentationSlides;

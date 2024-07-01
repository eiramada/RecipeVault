import {
  Box,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

const CarouselGallery = ({ images, titles, links }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Carousel navButtonsAlwaysVisible>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: isSmallScreen ? 350 : 450,
              overflow: "hidden",
              backgroundColor: "#f0f0f0",
            }}
          >
            {links ? (
              <Link
                to={links[index]}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Tooltip title={titles ? titles[index] : ""} arrow>
                  <Box
                    component="img"
                    src={image}
                    alt={
                      titles
                        ? `${titles[index]} ${index + 1}`
                        : `Image ${index + 1}`
                    }
                    sx={{
                      width: isSmallScreen ? "100%" : 400,
                      maxHeight: "calc(100% - 50px)",
                      objectFit: "contain",
                    }}
                  />
                </Tooltip>
                {titles && (
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      p: 1,
                    }}
                  >
                    {titles[index]}
                  </Typography>
                )}
              </Link>
            ) : (
              <>
                <Tooltip title={titles ? titles[index] : ""} arrow>
                  <Box
                    component="img"
                    src={image}
                    alt={
                      titles
                        ? `${titles[index]} ${index + 1}`
                        : `Image ${index + 1}`
                    }
                    sx={{
                      width: isSmallScreen ? "100%" : 400,
                      maxHeight: "calc(100% - 50px)",
                      objectFit: "contain",
                    }}
                  />
                </Tooltip>
                {titles && (
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      textAlign: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      p: 1,
                    }}
                  >
                    {titles[index]}
                  </Typography>
                )}
              </>
            )}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default CarouselGallery;

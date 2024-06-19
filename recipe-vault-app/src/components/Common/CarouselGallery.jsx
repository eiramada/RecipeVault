import { Box, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

const CarouselGallery = ({ images, titles, links }) => {
  return (
    <Box>
      <Carousel>
        {images.map((image, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {links ? (
              <Link to={links[index]} style={{ textDecoration: "none" }}>
                <img
                  src={image}
                  alt={
                    titles
                      ? `${titles[index]} ${index + 1}`
                      : `Image ${index + 1}`
                  }
                  style={{ width: 400, maxHeight: 400, objectFit: "contain" }}
                />
                {titles && (
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    {titles[index]}
                  </Typography>
                )}
              </Link>
            ) : (
              <>
                <img
                  src={image}
                  alt={
                    titles
                      ? `${titles[index]} ${index + 1}`
                      : `Image ${index + 1}`
                  }
                  style={{ width: 400, maxHeight: 400, objectFit: "contain" }}
                />
                {titles && (
                  <Typography variant="h6" sx={{ mt: 2 }}>
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

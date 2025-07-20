import {
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// 🎨 Styles
const sectionStyles = {
  py: 5,
  px: 4,
};

const dividerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 4,
};

const lineStyles = {
  flex: 1,
  height: "1px",
  backgroundColor: "#ccc",
};

const titleStyles = {
  color: "#333",
  fontWeight: "bold",
  mx: 2,
};

const cardStyles = {
  borderRadius: "0.25rem",
  boxShadow: "none",
  position: "relative",
};

const typoStyles = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
  color: "white",
  p: 2,
};

const priceChipStyles = {
  position: "absolute",
  top: 16,
  left: 16,
  backgroundColor: "white",
  color: "black",
  px: 1,
  borderRadius: 1,
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
};

const viewAllButtonStyles = {
  backgroundColor: "#0275c9",
  color: "#fff",
  px: 4,
  py: 1,
  mt: 4,
  "&:hover": {
    backgroundColor: "#111",
  },
  borderRadius: 6,
};

export default function ProductGrid({ title }) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/api/products");
      return res.data;
    },
  });

  if (error) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" color="error">
          Failed to load products
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={sectionStyles}>
      {/* Divider */}
      <Box sx={dividerStyles}>
        <Box sx={lineStyles} />
        <Typography variant="h6" sx={titleStyles}>
          {title}
        </Typography>
        <Box sx={lineStyles} />
      </Box>

      {/* Slider */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Swiper
          modules={[Navigation]}
          navigation={true}
          slidesPerView={4}
          spaceBetween={20}
          centeredSlides={products?.length < 4}
          breakpoints={{
            1200: {
              slidesPerView: 4,
            },
            960: {
              slidesPerView: 3,
            },
            720: {
              slidesPerView: 2,
            },
            0: {
              slidesPerView: 1,
            },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product.id}>
              <Box sx={{ px: 2 }}>
                <Card sx={cardStyles}>
                  <CardMedia
                    component="img"
                    image={product.images?.[0]}
                    alt={product.title}
                    height="300"
                  />
                  <Box sx={priceChipStyles}>
                    <Typography variant="body1">${product.price}</Typography>
                  </Box>
                  <Box sx={typoStyles}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.title}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* View All Button */}
      {title !== "Similar Items" && (
        <Box textAlign="center">
          <Button variant="contained" sx={viewAllButtonStyles}>
            View All
          </Button>
        </Box>
      )}
    </Box>
  );
}

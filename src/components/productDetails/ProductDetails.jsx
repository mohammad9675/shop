import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  Rating,
  Grid,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [dialogImage, setDialogImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/api/products/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      setSelectedColor(data.colors?.[0] || "");
      setSelectedSize(data.sizes?.[0] || "");
    },
  });

  const handleImageClick = (img) => {
    setDialogImage(img);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6">Product not found.</Typography>
      </Box>
    );
  }
  console.log("object", product);
  return (
    <Box sx={{ px: 4, py: 6, maxWidth: 1200, mx: "auto" }}>
      <Grid container spacing={4}>
        {/* Left side - Swiper */}
        <Grid item xs={12} md={5}>
          <Box sx={{ width: "100%", maxWidth: 500, mx: "auto" }}>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              style={{ borderRadius: "8px" }}
            >
              {product.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={img}
                    alt={`product-${index}`}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      cursor: "pointer",
                      borderRadius: 2,
                    }}
                    onClick={() => handleImageClick(img)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>

        {/* Right side - Details */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", mb: 2, color: "#000000" }}
          >
            {product.title}
          </Typography>

          {/* Specs */}

          <Typography variant="p" sx={{ color: "#000000" }}>
            {product.description}
          </Typography>

          {/* Selectors */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, mt: 3, flexWrap: "wrap" }}>
            <TextField
              label="Quantity"
              type="number"
              size="small"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              sx={{ width: 100 }}
              inputProps={{ min: 1 }}
            />

            <FormControl size="small">
              <InputLabel>Color</InputLabel>
              <Select
                value={selectedColor}
                label="Color"
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {product.colors?.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel>Size</InputLabel>
              <Select
                value={selectedSize}
                label="Size"
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizes?.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              mb: 4,
              px: 4,
              py: 1.5,
              "&:hover": { backgroundColor: "#111" },
            }}
          >
            Add to Cart
          </Button>

          <Typography variant="body1" sx={{ mb: 4 }}>
            {product.description}
          </Typography>

          {/* Reviews */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Customer Reviews
            </Typography>
            {product.reviews?.length ? (
              product.reviews.map((review, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="subtitle2">{review.name}</Typography>
                  <Rating value={review.rating} readOnly size="small" />
                  <Typography variant="body2">{review.comment}</Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2">No reviews yet.</Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
          }}
        >
          {/* Close Button */}
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1400,
              cursor: "pointer",
              bgcolor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "50%",
              padding: "4px",
            }}
            onClick={() => setDialogOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              fill="black"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 00-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 101.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z" />
            </svg>
          </Box>

          {/* Swiper with Fullscreen Images */}
          <Swiper
            modules={[Navigation]}
            navigation
            initialSlide={product.images.indexOf(dialogImage)}
            style={{
              maxWidth: "95vw",
              maxHeight: "95vh",
            }}
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  component="img"
                  src={img}
                  alt={`Image ${idx}`}
                  sx={{
                    maxWidth: "95vw",
                    maxHeight: "95vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: 2,
                    boxShadow: "0 0 16px rgba(0,0,0,0.25)",
                    mx: "auto",
                    display: "block",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Modal>
    </Box>
  );
}

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
import Reviews from "../reviews/Reviews.jsx";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

const closeButtonStyles = {
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 1400,
  cursor: "pointer",
  bgcolor: "rgba(255, 255, 255, 0.8)",
  borderRadius: "50%",
  padding: "4px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const firstWrapperStyles = { px: 4, py: 6, maxWidth: 1200, mx: "auto" };
const secondWrapperStyles = { width: "100%", maxWidth: 500, mx: "auto" };

const imageContainerStyles = {
  width: "100%",
  height: "auto",
  objectFit: "contain",
  cursor: "pointer",
  borderRadius: 2,
};

const tileStyles = { fontWeight: "bold", mb: 2, color: "#000000" };

const selectorStyles = {
  display: "flex",
  gap: 2,
  mb: 3,
  mt: 3,
  flexWrap: "wrap",
};

const addToCardButtonStyles = {
  backgroundColor: "black",
  color: "white",
  mb: 4,
  px: 4,
  py: 1.5,
  "&:hover": { backgroundColor: "#111" },
};

const imageModalStyles = {
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
};

const modalImagesStyles = {
  maxWidth: "95vw",
  maxHeight: "95vh",
  width: "auto",
  height: "auto",
  objectFit: "contain",
  borderRadius: 2,
  boxShadow: "0 0 16px rgba(0,0,0,0.25)",
  mx: "auto",
  display: "block",
};

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

  return (
    <Box sx={firstWrapperStyles}>
      <Grid container spacing={4}>
        {/* Left side - Swiper */}
        <Grid xs={12} md={5}>
          <Box sx={secondWrapperStyles}>
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              style={{ borderRadius: "8px" }}
              loop={product.images?.length > 1}
            >
              {product.images?.map((img, index) => (
                <SwiperSlide key={index}>
                  <Box
                    component="img"
                    src={img}
                    alt={`product-${index}`}
                    sx={imageContainerStyles}
                    onClick={() => handleImageClick(img)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>

        {/* Right side - Details */}
        <Grid xs={12} md={7}>
          <Typography variant="h5" sx={tileStyles}>
            {product.title}
          </Typography>

          {/* Selectors */}
          <Box sx={selectorStyles}>
            <TextField
              label="Quantity"
              type="number"
              size="small"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value)))
              }
              sx={{ width: 100 }}
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

          <Button variant="contained" sx={addToCardButtonStyles}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      <Modal open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Box sx={imageModalStyles}>
          {/* Close Button */}
          <Box sx={closeButtonStyles} onClick={() => setDialogOpen(false)}>
            <CloseIcon fontSize="small" sx={{ color: "black" }} />
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
            loop={product.images?.length > 1}
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <Box
                  component="img"
                  src={img}
                  alt={`Image ${idx}`}
                  sx={modalImagesStyles}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Modal>

      {/* <Typography variant="p" sx={{ color: "#000000" }}>
        {product.description}
      </Typography> */}
      {/* Reviews */}
      {/* <Reviews reviews={product.reviews} /> */}
    </Box>
  );
}

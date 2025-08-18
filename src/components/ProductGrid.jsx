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
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const isSimilarItems = title === "Similar Items";

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: isSimilarItems ? ["similarProducts", productId] : ["products"],
    queryFn: async () => {
      if (isSimilarItems) {
        // Call similar products API
        if (!productId) {
          throw new Error("Product ID is required for similar items");
        }
        const res = await axios.get(
          `http://localhost:3001/api/products/${productId}/similar`
        );
        return res.data.similarProducts;
      } else {
        // Call all products API
        const res = await axios.get("http://localhost:3001/api/products");
        return res.data.products;
      }
    },
    enabled: !isSimilarItems || !!productId, // Only run query if not similar items OR if productId exists
  });

  if (error) {
    return (
      <Box sx={sectionStyles}>
        <Typography color="error" align="center">
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
        <Typography variant="h5" sx={titleStyles}>
          {title}
        </Typography>
        <Box sx={lineStyles} />
      </Box>

      {/* Slider */}
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={300}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <Card
                sx={cardStyles}
                onClick={() => navigate(`/products/${product._id}`)}
                style={{ cursor: "pointer" }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={product.images?.[0]}
                  alt={product.title}
                />
                <Typography variant="body2" sx={priceChipStyles}>
                  ${product.price}
                </Typography>
                <Typography variant="h6" sx={typoStyles}>
                  {product.title}
                </Typography>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* View All Button */}
      {title !== "Similar Items" && (
        <Box display="flex" justifyContent="center">
          <Button variant="contained" sx={viewAllButtonStyles}>
            View All
          </Button>
        </Box>
      )}
    </Box>
  );
}

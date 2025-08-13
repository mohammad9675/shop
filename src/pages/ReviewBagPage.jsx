import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useCart } from "../context/CartContext.jsx";
import TopBar from "../components/TopBar.jsx";
import MainNav from "../components/MainNav.jsx";

export default function ReviewBagPage() {
  const { cartItems, removeFromCart, getSubtotal } = useCart();

  // Fetch each product in cart with secure pricing
  const productQueries = useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ["product", item.id],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:3001/api/products/${item.id}`
        );
        // Merge database product data with cart item details (size, color, quantity)
        return { 
          ...res.data, 
          cartItem: {
            id: item.id,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
            // Keep any other cart-specific data but NOT the price
            image: item.image // This can stay as it's not security sensitive
          }
        };
      },
    })),
  });

  const isLoading = productQueries.some((q) => q.isLoading);
  const hasError = productQueries.some((q) => q.isError);
  
  const products = productQueries
    .map((q) => q.data)
    .filter((p) => p && p.cartItem); // safe filter

  // Calculate subtotal using database prices (secure)
  const calculateSecureSubtotal = () => {
    return products.reduce((total, product) => {
      const { cartItem } = product;
      // Use database price (product.price) NOT localStorage price
      return total + (product.price * cartItem.quantity);
    }, 0);
  };

  const secureSubtotal = calculateSecureSubtotal();
  const freeShippingThreshold = 59;
  const remaining = Math.max(freeShippingThreshold - secureSubtotal, 0);
  const progress = Math.min((secureSubtotal / freeShippingThreshold) * 100, 100);

  if (hasError) {
    return (
      <>
        <TopBar />
        <MainNav />
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography color="error">
            Failed to load product details. Please try again.
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <TopBar />
      <MainNav />
      <Grid container spacing={4} sx={{ p: 4 }}>
        {/* LEFT SIDE - Product Cards */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ mb: 3, color: "#333" }}>
            Review Your Bag
          </Typography>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress />
            </Box>
          ) : products.length ? (
            <Grid container spacing={2}>
              {products.map((product) => {
                const { cartItem } = product;
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={`${cartItem.id}-${cartItem.size}-${cartItem.color}`}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.images?.[0] || cartItem.image || ""}
                        alt={product.title}
                        sx={{ height: 200, objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">
                          {product.title}
                        </Typography>
                        {/* Display size and color from cart item */}
                        <Typography variant="body2" color="text.secondary">
                          Size: {cartItem.size} | Color: {cartItem.color}
                        </Typography>
                        {/* Use SECURE price from database */}
                        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                          Quantity: {cartItem.quantity}
                        </Typography>
                        {/* Show total for this item */}
                        <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                          Item Total: ${(product.price * cartItem.quantity).toFixed(2)}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ justifyContent: "space-between" }}>
                        <Button size="small" variant="outlined">
                          Edit
                        </Button>
                        <IconButton
                          aria-label="remove item"
                          color="error"
                          onClick={() =>
                            removeFromCart(
                              cartItem.id,
                              cartItem.size,
                              cartItem.color
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography>Your bag is empty.</Typography>
          )}
        </Grid>

        {/* RIGHT SIDE - Order Summary */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography sx={{ fontWeight: "bold" }}>
                  ${secureSubtotal.toFixed(2)}
                </Typography>
              </Box>
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Shipping:</Typography>
                <Typography>
                  {secureSubtotal >= freeShippingThreshold ? "FREE" : "TBD"}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${secureSubtotal.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Free Shipping Progress */}
            {remaining > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Add ${remaining.toFixed(2)} more for free shipping
                </Typography>
                <Box sx={{ 
                  width: "100%", 
                  height: 8, 
                  backgroundColor: "#e0e0e0", 
                  borderRadius: 4,
                  overflow: "hidden"
                }}>
                  <Box sx={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "#2e7d32",
                    transition: "width 0.3s ease"
                  }} />
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              fullWidth
              size="large"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold"
              }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
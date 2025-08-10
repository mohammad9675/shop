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

  // Fetch each product in cart
  const productQueries = useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ["product", item.id],
      queryFn: async () => {
        const res = await axios.get(
          `http://localhost:3001/api/products/${item.id}`
        );
        return { ...res.data, cartItem: item };
      },
    })),
  });

  const isLoading = productQueries.some((q) => q.isLoading);
  const products = productQueries.map((q) => q.data).filter(Boolean);

  // Order summary calculations (same as CartDrawer)
  const subtotal = getSubtotal();
  const freeShippingThreshold = 59;
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

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
                        image={product.images?.[0] || ""}
                        alt={product.title}
                        sx={{ height: 200, objectFit: "cover" }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {cartItem.size}, {cartItem.color}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                        <Typography variant="body2">
                          Qty: {cartItem.quantity}
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
      </Grid>
    </>
  );
}

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
      <Box sx={{ p: 4, display: "flex", gap: 4, alignItems: "flex-start" }}>
        {/* LEFT SIDE - Product Cards */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
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
        </Box>

        {/* RIGHT SIDE - Cart Summary (Fixed Width Sidebar) */}
        <Box
          sx={{
            width: 350, // Fixed width
            flexShrink: 0, // Prevent shrinking
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            position: "sticky",
            top: 20,
          }}
        >
          <Typography variant="h6" color="text.primary" fontWeight={"bold"}>
            My Shopping Bag ({cartItems.length} Item
            {cartItems.length !== 1 && "s"})
          </Typography>

          <Divider sx={{ my: 2 }} />

          {cartItems.length === 0 ? (
            <Typography variant="body2">Your bag is empty.</Typography>
          ) : (
            cartItems.map((item) => (
              <Box
                key={`${item.id}-${item.size}-${item.color}`}
                display="flex"
                mb={2}
                alignItems="center"
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 80, height: 100, objectFit: "cover", mr: 2 }}
                />
                <Box flexGrow={1}>
                  <Typography variant="subtitle2" color="text.primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.size}, {item.color}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontWeight: "bold" }}
                  >
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                </Box>
                <IconButton
                  aria-label="remove item"
                  size="small"
                  color="error"
                  onClick={() => removeFromCart(item.id, item.size, item.color)}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" color="text.primary">
            Subtotal: ${subtotal.toFixed(2)}
          </Typography>
          {/* {remaining > 0 && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Only ${remaining.toFixed(2)} away from FREE SHIPPING
            </Typography>
          )} */}
          {/* <Box
            sx={{
              width: "100%",
              height: 6,
              backgroundColor: "#eee",
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: "blue",
                borderRadius: 3,
              }}
            />
          </Box> */}

          <Button
            variant="contained"
            sx={{ mt: 2, borderRadius: 10, py: 1.5, fontWeight: "bold" }}
            fullWidth
          >
            Checkout
          </Button>
        </Box>
      </Box>
    </>
  );
}

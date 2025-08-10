import React from "react";
import {
  Drawer,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCart } from "../../context/CartContext.jsx";

export default function CartDrawer({ open, onClose }) {
  const { cartItems, removeFromCart, getSubtotal } = useCart();
  const freeShippingThreshold = 59;
  const subtotal = getSubtotal();
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 360,
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            My Shopping Bag ({cartItems.length} Item
            {cartItems.length !== 1 && "s"})
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Items */}
        <Box flexGrow={1} overflow="auto">
          {cartItems.length === 0 ? (
            <Typography variant="body2">Your bag is empty.</Typography>
          ) : (
            cartItems.map((item) => (
              <Box
                key={`${item.id}-${item.size}-${item.color}`}
                display="flex"
                mb={2}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{ width: 80, height: 100, objectFit: "cover", mr: 2 }}
                />
                <Box flexGrow={1}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.size}, {item.color}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    ${item.price.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">Qty: {item.quantity}</Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      removeFromCart(item.id, item.size, item.color)
                    }
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            ))
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Subtotal & Progress */}
        <Typography variant="subtitle1">
          Subtotal: ${subtotal.toFixed(2)}
        </Typography>
        {remaining > 0 && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            Only ${remaining.toFixed(2)} away from FREE SHIPPING
          </Typography>
        )}
        <Box
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
        </Box>

        {/* CTA */}
        <Button
          variant="contained"
          sx={{ mt: 2, borderRadius: 10, py: 1.5, fontWeight: "bold" }}
          fullWidth
        >
          Review My Bag
        </Button>
      </Box>
    </Drawer>
  );
}

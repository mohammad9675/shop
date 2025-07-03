import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const bannerStyles = {
  backgroundColor: "#FF6B6B",
  color: "white",
  textAlign: "center",
  py: 1,
  px: 2,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};

const closeButtonStyles = {
  position: "absolute",
  right: 16,
  top: "50%",
  transform: "translateY(-50%)",
  color: "white",
};

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Box sx={bannerStyles}>
      <Typography variant="body2">
        For any inquiries regarding our discount sale, please contact us at
        090292929796
      </Typography>
      <IconButton
        size="small"
        sx={closeButtonStyles}
        onClick={() => setVisible(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

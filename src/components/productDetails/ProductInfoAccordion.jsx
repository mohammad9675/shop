import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ProductInfoAccordion() {
  return (
    <Box sx={{ mt: 2 }}>
      <Accordion elevation={0} sx={{ boxShadow: "none", border: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            borderTop: "1px solid #e0e0e0",
            borderBottom: "1px solid #e0e0e0",
            px: 0,
            minHeight: 48,
            "& .MuiAccordionSummary-content": {
              margin: "8px 0",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Size & Fit
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, py: 1.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              lineHeight: 1.5,
              fontSize: "0.875rem",
            }}
          >
            This garment fits true to size. Model is wearing size M and is 5'9"
            tall. Available in sizes XS to XXL.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} sx={{ boxShadow: "none", border: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            borderBottom: "1px solid #e0e0e0",
            px: 0,
            minHeight: 48,
            "& .MuiAccordionSummary-content": {
              margin: "8px 0",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Details & Material
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, py: 1.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              lineHeight: 1.5,
              fontSize: "0.875rem",
            }}
          >
            Premium organic cotton blend. 80% organic cotton, 20% recycled
            polyester. Machine washable.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} sx={{ boxShadow: "none", border: "none" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{
            borderBottom: "1px solid #e0e0e0",
            px: 0,
            minHeight: 48,
            "& .MuiAccordionSummary-content": {
              margin: "8px 0",
            },
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#333" }}
          >
            Shipping & Returns
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0, py: 1.5 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              lineHeight: 1.5,
              fontSize: "0.875rem",
            }}
          >
            Free shipping on orders over $75. 3-5 business days delivery. Easy
            30-day returns.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

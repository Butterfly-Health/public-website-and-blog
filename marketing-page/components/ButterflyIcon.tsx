import Box from "@mui/material/Box";
import logoHorizontal from "../../src/assets/logo/butterfly-health-high-resolution-logo-transparent.png";

export default function ButterflyIcon() {
  return (
    <Box
      component="a"
      href="/"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        height: { xs: 30, md: 34 },
        width: "auto",
        mr: 2,
        textDecoration: "none",
      }}
      aria-label="Go to homepage"
    >
      <Box
        component="img"
        src={logoHorizontal}
        alt="Butterfly Health"
        sx={{
          height: "100%",
          width: "auto",
          display: "block",
        }}
      />
    </Box>
  );
}

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import visuallyHidden from "@mui/utils/visuallyHidden";

const templateImageBase =
  import.meta.env.VITE_TEMPLATE_IMAGE_URL || "https://mui.com";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "4px solid",
  outlineColor: "rgba(177, 155, 221, 0.22)",
  border: "1px solid",
  borderColor: "rgba(255, 220, 130, 0.55)",
  boxShadow: "0 0 18px 8px rgba(177, 155, 221, 0.28)",
  backgroundImage: `url(${templateImageBase}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 680,
  },
}));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={{
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 90% 60% at 50% -20%, rgba(177,155,221,0.55), rgba(255,220,130,0.18) 52%, transparent 100%)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "72%" } }}
        >
          <Typography
            variant="h1"
            sx={{
              textAlign: "center",
              lineHeight: 1.1,
              fontSize: "clamp(2.2rem, 7vw, 3.7rem)",
              color: "#5b3f86",
            }}
          >
            A thyroid disease tracking app to simplify care
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "86%" },
            }}
          >
            Keep symptoms, lab trends, medications, and appointments in one
            place. Give patients and care teams the same clear timeline for
            faster, calmer decisions.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "380px" } }}
          >
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: "off",
                  "aria-label": "Enter your email address",
                },
              }}
            />
            <Button
              variant="contained"
              size="small"
              sx={{
                minWidth: "fit-content",
                backgroundColor: "#ffdc82 !important",
                backgroundImage: "none !important",
                border: "1px solid #f2c95d",
                boxShadow: "none !important",
                color: "#5b3f86 !important",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "#f4cf6c !important",
                  backgroundImage: "none !important",
                  boxShadow: "none !important",
                },
              }}
            >
              Start now
            </Button>
          </Stack>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            By clicking "Start now" you agree to our{" "}
            <Link href="#">Terms & Conditions</Link>.
          </Typography>
        </Stack>
        <StyledBox id="image" />
      </Container>
    </Box>
  );
}

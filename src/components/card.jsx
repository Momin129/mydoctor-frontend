import { Box, Stack, Typography } from "@mui/material";

export default function Card(props) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: "#e6e6e6",
        borderRadius: 2,
        width: 1,
        height: "200px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        spacing={2}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <img
          src=""
          onError={(e) => {
            e.target.src = "/images/alternative.svg";
            e.onerror = null;
          }}
          style={{ width: "100px" }}
        />
        <Typography
          sx={{ display: "block", fontSize: "16px", fontWeight: "bold" }}
        >
          {props.name}
        </Typography>
      </Stack>
    </Box>
  );
}

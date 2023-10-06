/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";

export default function Card({ item }) {
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
          src={item.speciality_image}
          onError={(e) => {
            e.target.src = "/images/alternative.svg";
            e.onerror = null;
          }}
          style={{ width: "100px" }}
        />
        <Typography
          sx={{ display: "block", fontSize: "16px", fontWeight: "bold" }}
        >
          {item.speciality_name}
        </Typography>
      </Stack>
    </Box>
  );
}

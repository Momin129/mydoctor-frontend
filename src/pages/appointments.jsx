import { Box, Stack, Typography } from "@mui/material";
import { menuButton } from "../App";
import { useContext } from "react";

export default function Appointments() {
  const { role } = useContext(menuButton);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "fles",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h1">
          {role == "doctor" ? "Doctor's" : "Patient's"}
        </Typography>
        <Typography variant="h3">My Appointments</Typography>
      </Stack>
    </Box>
  );
}

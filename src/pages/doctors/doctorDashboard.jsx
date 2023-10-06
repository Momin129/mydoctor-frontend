import { Box, TextField } from "@mui/material";

export default function DoctorDashboard() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <TextField
        type="date"
        label="Date"
        value={`${year}-${month}-${day >= 0 && day <= 9 ? "0" + day : day}`}
      />
      <TextField
        type="time"
        label="Start Time"
        value={`${date.getHours()}:${date.getMinutes()}`}
      />
      <TextField
        type="time"
        label="End Time"
        value={`${date.getHours()}:${date.getMinutes()}`}
      />
    </Box>
  );
}

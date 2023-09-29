/* eslint-disable react/prop-types */
import { Button, Grid, Link, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import InfoIcon from "@mui/icons-material/Info";
import { menuButton } from "../App";

export default function Login(props) {
  const navigate = useNavigate();
  const [logmsg, setLogmsg] = useState("");
  const [inputs, setInputs] = useState({});
  const { setRole, handleListItemClick } = useContext(menuButton);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      const result = await axios.post("http://localhost:4000/api/login", {
        email: inputs.email,
        password: inputs.password,
      });
      console.log(result.data.role);
      const url = result.data.role == "patient" ? "/dashboard" : "/doctors";
      localStorage.setItem("role", result.data.role);
      handleListItemClick(e, 0);
      setRole(result.data.role);
      navigate(url);
    } catch (error) {
      console.log(error);
      setLogmsg(error.response.data.message);
    }
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        border: 1,
        paddingX: { xs: 1, md: 5 },
        paddingY: 2,
        borderColor: "#bfbfbf",
      }}
    >
      {logmsg != "" && (
        <Grid item sm={12}>
          <Box
            sx={{
              backgroundColor: "#ffb3b3",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <InfoIcon sx={{ color: "red" }} />{" "}
            <Typography sx={{ color: "black", fontWeight: "bold" }}>
              {logmsg}
            </Typography>
          </Box>
        </Grid>
      )}
      <Grid item sm={12} md={12}>
        <TextField
          name="email"
          label="Email or Mobile Number"
          type="text"
          variant="outlined"
          value={inputs.email || ""}
          onChange={handleChange}
          sx={{ width: 1 }}
          required
        />
      </Grid>
      <Grid item sm={12} md={12}>
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={inputs.password || ""}
          onChange={handleChange}
          sx={{ width: 1 }}
          required
        />
      </Grid>
      <Grid item sm={12} md={12}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "left" } }}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#303f9f" }}
              onClick={handleSubmit}
            >
              LOGIN
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: { xs: "center", md: "right" } }}
          >
            <Link variant="body2">Forget Password?</Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12}>
        {"Don't have an account? "}
        <Link
          sx={{ cursor: "pointer" }}
          fontWeight={"bold"}
          color={"#303f9f"}
          onClick={() => {
            props.setValue("2");
            props.setImage("/images/registration.svg");
            navigate("/auth/patientSignup");
          }}
        >
          Sign up
        </Link>
      </Grid>
    </Grid>
  );
}

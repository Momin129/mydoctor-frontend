/* eslint-disable react/prop-types */
import {
  Button,
  Grid,
  InputLabel,
  Link,
  TextField,
  Typography,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateName,
  validateNumber,
  validateEmail,
  validatePassword,
} from "../utility/formValidation.js";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";

export default function SignUp(props) {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [regmsg, setRegmsg] = useState("");
  const [regMsgColor, setRegMsgColor] = useState("");

  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const [validity, setValidity] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
    role: "",
  });

  const [empty, setEmpty] = useState({
    fullname: true,
    email: true,
    mobile: true,
    password: true,
    confirmpassword: true,
    role: true,
  });

  const [inputs, setInputs] = useState({
    gender: "male",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const empty = value.lenght == 0 ? true : false;
    setInputs((values) => ({ ...values, [name]: value }));
    setEmpty((values) => ({ ...values, [name]: empty }));
  };

  useEffect(() => {
    if (inputs && inputs.password === inputs.confirmpassword) {
      let valid = true;
      for (let item in validity) {
        if (empty[item] || validity[item].length != 0 || !inputs[item])
          valid = false;
      }
      setRegister(valid);
    } else setRegister(false);

    if (
      (inputs.role == "doctor" &&
        (inputs.licence_number == undefined || inputs.licence_number == "")) ||
      (inputs.role == "hospital_admin" &&
        (inputs.hospital_name == undefined || inputs.hospital_name == ""))
    )
      setRegister(false);
  }, [inputs, validity, empty, inputs.role]);

  const handleBlur = async (e) => {
    const name = e.target.name;
    if (name == "fullname") {
      const value = validateName(e.target.value.trim());
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "mobile") {
      const value = await validateNumber(e.target.value.trim());
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "email") {
      const value = await validateEmail(e.target.value.trim());
      console.log(value);
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "password") {
      const value = validatePassword(e.target.value.trim());
      setValidity((values) => ({ ...values, [name]: value }));
    } else if (name == "role") {
      if (inputs.role == "")
        setValidity((values) => ({
          ...values,
          [name]: "you have to choose a role",
        }));
    } else if (name == "confirmpassword") {
      let value = "";
      if (
        inputs.password &&
        inputs.password.length != 0 &&
        inputs.password !== inputs.confirmpassword
      )
        value = "*Password does not match";

      setValidity((values) => ({
        ...values,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    const obj = {
      fullname: inputs.fullname,
      email: inputs.email,
      contact: inputs.mobile,
      gender: inputs.gender,
      password: inputs.password,
      role: inputs.role,
    };

    if (inputs.role == "patient") obj["dob"] = inputs.dob;
    else if (inputs.role == "doctor")
      obj["licence_number"] = inputs.licence_number;
    else if (inputs.role == "hospital_admin")
      obj["hospital_name"] = inputs.hospital_name;

    try {
      const result = await axios.post(
        "http://localhost:4000/api/registerUser",
        obj
      );
      console.log(result);
      setRegmsg(result.data.message);
      setRegMsgColor("lightgreen");
      for (let item in inputs) {
        setInputs((values) => ({ ...values, [item]: "" }));
      }
    } catch (error) {
      console.log(error);
      setRegmsg(error.response.data.message);
      setRegMsgColor("red");
    }
  };

  return (
    <>
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
        {regmsg != "" && (
          <Grid item sm={12}>
            <Box
              sx={{
                backgroundColor: regMsgColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
              }}
            >
              <InfoIcon sx={{ color: regMsgColor }} />{" "}
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                {regmsg}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item sm={12} md={12}>
          <Typography variant="h6" fontWeight={"bold"}>
            Create an account
          </Typography>
        </Grid>
        <Grid item md={12}>
          <InputLabel>{"Full Name*"}</InputLabel>
          <TextField
            name="fullname"
            placeholder={"Enter name"}
            type="text"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.fullname || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.fullname.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {validity.fullname}
            </Box>
          )}
        </Grid>

        <Grid item sm={12} md={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender*</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="male"
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={12}>
          <InputLabel>Mobile Number*</InputLabel>
          <TextField
            name="mobile"
            placeholder="Enter Mobile Number"
            type="text"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.mobile || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.mobile.length != 0 && (
            <Box
              component={"span"}
              sx={{ display: "block", color: "red", paddingX: 1 }}
            >
              {parse(validity.mobile)}
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <InputLabel>Email*</InputLabel>
          <TextField
            name="email"
            placeholder="abc@gmail.com"
            type="email"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.email.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {validity.email}
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <InputLabel>Create Password*</InputLabel>
          <TextField
            name="password"
            placeholder="create password"
            type="password"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.password || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.password.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {parse(validity.password)}
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <InputLabel>Confirm Password*</InputLabel>
          <TextField
            name="confirmpassword"
            placeholder="confirm password"
            type="password"
            variant="outlined"
            sx={{ width: 1 }}
            value={inputs.confirmpassword || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {validity.confirmpassword.length != 0 && (
            <Box
              component={"span"}
              sx={{
                display: "block",
                color: "red",
                paddingX: 1,
              }}
            >
              {parse(validity.confirmpassword)}
            </Box>
          )}
        </Grid>
        <Grid item md={12}>
          <FormControl fullWidth>
            <InputLabel>Choose a role</InputLabel>
            <Select
              name="role"
              value={inputs.role || ""}
              onChange={handleChange}
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
              <MenuItem value="hospital_admin">Hospital Admin</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {inputs.role && (
          <Grid item md={12}>
            {inputs.role == "patient" && (
              <TextField
                name="dob"
                type="date"
                label="Date Of Birth"
                variant="outlined"
                sx={{ width: 1 }}
                value={
                  inputs.dob ||
                  `${year}-${month}-${
                    date >= 0 && date <= 9 ? "0" + date : date
                  }`
                }
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            )}
            {inputs.role == "doctor" && (
              <TextField
                name="licence_number"
                type="text"
                label="Licence Number"
                variant="outlined"
                sx={{ width: 1 }}
                value={inputs.licence_number || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            )}
            {inputs.role == "hospital_admin" && (
              <TextField
                name="hospital_name"
                type="text"
                label="Hospital Name"
                variant="outlined"
                sx={{ width: 1 }}
                value={inputs.hospital_name || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            )}
          </Grid>
        )}
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
                disabled={!register}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={12}>
          Already have an account?{" "}
          <Link
            sx={{ cursor: "pointer" }}
            fontWeight={"bold"}
            color={"#303f9f"}
            onClick={() => {
              props.setValue("1");
              props.setImage("/images/login.svg");
              navigate("/auth/login");
            }}
          >
            Sign in
          </Link>
        </Grid>
      </Grid>
    </>
  );
}

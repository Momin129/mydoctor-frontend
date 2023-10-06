import { Box, Tab, Grid, Divider } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Login from "./login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

export default function Tabular() {
  const [value, setValue] = useState("1");
  const [image, setImage] = useState("/images/login.svg");
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    let img = "";
    let page = "";

    if (newValue === "1") page = "login";
    else if (newValue === "2") page = "Signup";

    newValue === "1"
      ? (img = "/images/login.svg")
      : (img = "/images/registration.svg");

    setImage(img);
    navigate(`/auth/${page}`);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 5 }}>
        <TabContext value={value}>
          <Grid container spacing={5}>
            <Grid
              item
              md={6}
              sx={{ display: { xs: "none", md: "block" } }}
            ></Grid>
            <Grid item xs={12} lg={6}>
              <TabList
                variant="fullWidth"
                aria-label="navigation tabs"
                sx={{
                  border: 1,
                  borderRadius: 1,
                  borderColor: "#bfbfbf",
                  width: { lg: "60%" },
                }}
                onChange={handleChange}
              >
                <Tab label="LOGIN" value="1"></Tab>
                <Divider
                  orientation="vertical"
                  style={{ height: 50, alignSelf: "center" }}
                />
                <Tab
                  label="SIGN UP"
                  sx={{
                    wordWrap: { xs: "break-word", md: "normal" },
                  }}
                  value="2"
                ></Tab>
              </TabList>
            </Grid>
          </Grid>
          <Grid container spacing={5}>
            <Grid
              item
              md={6}
              sx={{
                display: { xs: "none", sm: "none", xl: "block" },
              }}
            >
              <img src={image} alt="" />
            </Grid>
            <Grid container item xs={12} lg={6}>
              <TabPanel
                value="1"
                sx={{
                  width: { xs: 1, lg: "58%" },
                  paddingRight: { xs: 0 },
                  paddingX: 2,
                  paddingY: 4,
                }}
              >
                <Login setValue={setValue} setImage={setImage} />
              </TabPanel>
              <TabPanel
                value="2"
                sx={{
                  width: { xs: 1, lg: "58%" },
                  paddingRight: { xs: 0 },
                  paddingX: 2,
                  paddingY: 4,
                }}
              >
                <SignUp setValue={setValue} setImage={setImage} />
              </TabPanel>
            </Grid>
          </Grid>
        </TabContext>
      </Box>
    </>
  );
}

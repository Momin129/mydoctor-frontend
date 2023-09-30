/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext } from "react";
import { menuButton } from "../App";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { path, mobileOpen, handleDrawerToggle, role } = useContext(menuButton);

  const home = [
    { name: "Doctors", link: "doctors" },
    { name: "Specialities", link: "speciality" },
  ];

  const patients = [
    { name: "Doctors", link: "doctors" },
    { name: "Specialities", link: "speciality" },
    { name: "My Appointments", link: "patientAppointments" },
    { name: "Account Settings", link: "patientSettings" },
  ];

  const doctors = [
    { name: "Dasboard", link: "doctorDashboard" },
    { name: "Doctor's Profile", link: "doctorProfile" },
    { name: "Appointments", link: "doctorAppointments" },
    { name: "Reviews", link: "reviews" },
  ];

  const hospital_admin = [
    { name: "Dashboard", link: "hospitalDashboard" },
    { name: "Requests", link: "doctorRequests" },
  ];

  let list;
  if (!role) list = home;
  else
    list =
      role == "patient"
        ? patients
        : role == "hospital_admin"
        ? hospital_admin
        : doctors;

  const handleChangePage = (item) => {
    props.setPath(item.link);
  };
  const drawer = (
    <div style={{ height: "100%" }}>
      <List>
        {list.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{ backgroundColor: path == item.link ? "lightgrey" : "white" }}
          >
            <ListItemButton onClick={() => handleChangePage(item)}>
              <ListItemText primary={item.name} sx={{ fontWeight: "bold" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      <Box aria-label="mailbox folders" sx={{ height: "100%" }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            height: "100%",
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block", height: "100%" },
          }}
          PaperProps={{
            style: {
              position: "static",
              padding: "20px",
              height: "100%",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;

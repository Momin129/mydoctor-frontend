import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useContext, useState } from "react";
import { menuButton } from "../App";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const {
    mobileOpen,
    selectedIndex,
    handleDrawerToggle,
    handleListItemClick,
    role,
  } = useContext(menuButton);

  const handleChangePage = (e) => {
    let path = e.target.textContent.toLowerCase().split(" ").join("");
    if (path == "reviews" || path == "doctors") path = "doctors";
    else if (path == "myappointments" || path == "appointments")
      path = "appointments";
    else if (path == "myprofile" || path == "doctorprofile") path = "profile";

    props.setPath(path);
  };
  const drawer = (
    <div style={{ height: "100%" }}>
      <List>
        {role == "doctor" && (
          <ListItem
            key={"Dasboard"}
            disablePadding
            selected={selectedIndex === 0}
            onClick={(event) => handleListItemClick(event, 0)}
          >
            <ListItemButton onClick={handleChangePage}>
              <ListItemText primary={"Dashboard"} sx={{ fontWeight: "bold" }} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem
          key={"doctors"}
          disablePadding
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemButton onClick={handleChangePage}>
            <ListItemText
              primary={role == "doctor" ? "Reviews" : "Doctors"}
              sx={{ fontWeight: "bold" }}
            />
          </ListItemButton>
        </ListItem>
        {(role == "" || role == "patient") && (
          <ListItem
            key={"Speciality"}
            disablePadding
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemButton onClick={handleChangePage}>
              <ListItemText
                primary={"Speciality"}
                sx={{ fontWeight: "bold" }}
              />
            </ListItemButton>
          </ListItem>
        )}
        {role != "" && (
          <ListItem
            key={"appointment"}
            disablePadding
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemButton onClick={handleChangePage}>
              <ListItemText
                primary={role == "patient" ? "My appointments" : "Appointments"}
                sx={{ fontWeight: "bold" }}
              />
            </ListItemButton>
          </ListItem>
        )}
        {role != "" && (
          <ListItem
            key={"account"}
            disablePadding
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemButton onClick={handleChangePage}>
              <ListItemText
                primary={role == "patient" ? "My Profile" : "Doctor Profile"}
                sx={{ fontWeight: "bold" }}
              />
            </ListItemButton>
          </ListItem>
        )}
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

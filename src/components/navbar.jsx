import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { menuButton } from "../App";

export default function Navbar() {
  const navigate = useNavigate();
  const { handleDrawerToggle, role, setRole, setPath } = useContext(menuButton);
  return (
    <>
      <AppBar position="static" color="transparent" sx={{ padding: 2 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="/images/logo.svg"
              alt="mydoctor"
              style={{ width: "150px" }}
            />
          </Typography>
          <Stack direction="row" spacing={2}>
            {role == "" ? (
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/auth/login");
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  localStorage.removeItem("token");
                  setRole("");
                  navigate("/doctors");
                  setPath("doctors");
                }}
                sx={{ fontSize: { xs: 10, md: 12 } }}
              >
                Logout
              </Button>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

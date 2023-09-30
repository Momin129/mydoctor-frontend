import { Grid } from "@mui/material";
import ResponsiveDrawer from "../components/sidebar";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Speciality from "./speciality";
import Dashboard from "./doctors";
import { menuButton } from "../App";
import DoctorDashboard from "./doctors/doctorDashboard";
import MyAppointments from "./patients/myAppointments";

export default function Home() {
  const { path, setPath } = useContext(menuButton);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`${path}`);
  }, [path, navigate]);

  return (
    <>
      <Grid container>
        <Grid item md={2}>
          <ResponsiveDrawer setPath={setPath} />
        </Grid>
        <Grid item xs={10}>
          {path == "speciality" && <Speciality />}
          {path == "doctors" && <Dashboard setPath={setPath} />}
          {path == "doctorDashboard" && <DoctorDashboard />}
          {path == "patientAppointments" && <MyAppointments />}
        </Grid>
      </Grid>
    </>
  );
}

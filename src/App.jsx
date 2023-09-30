/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Tab from "./pages/Tab";
import Login from "./pages/login";
import PatientSignup from "./pages/patientSignup";
import Speciality from "./pages/speciality";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./pages/doctors";
import DoctorDashboard from "./pages/doctors/doctorDashboard";
import { verifyToken } from "./hooks/verifyToken";
import MyAppointments from "./pages/patients/myAppointments";

let isrole = JSON.parse(localStorage.getItem("details")) ?? "";

export const menuButton = createContext();

function App() {
  useEffect(() => {
    if (isrole.token) {
      (async () => {
        const result = await verifyToken(isrole.token);
        !result ? setRole("") : setRole(isrole.role);
      })();
    }
  }, []);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState(isrole != "" ? isrole.role : "");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let url = "";
  if (role.length > 0) {
    url =
      role == "patient"
        ? "doctors"
        : role == "doctor"
        ? "doctorDashboard"
        : "hospitalDashboard";
  } else {
    url = "doctors";
  }

  const [path, setPath] = useState(url);

  return (
    <>
      <menuButton.Provider
        value={{
          mobileOpen,
          handleDrawerToggle,
          role,
          setRole,
          path,
          setPath,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Home />}>
                <Route path="speciality" element={<Speciality />}></Route>
                <Route path="doctors" element={<Dashboard />}></Route>
                <Route path="doctorDashboard" element={<DoctorDashboard />} />
                <Route
                  path="patientAppointments"
                  element={<MyAppointments />}
                />
              </Route>
              <Route path="auth" element={<Tab />}>
                <Route path="login" element={<Login />} />
                <Route path="patientSignup" element={<PatientSignup />} />
                <Route path="doctorSignup" element={<PatientSignup />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </menuButton.Provider>
    </>
  );
}

export default App;

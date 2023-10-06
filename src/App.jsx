/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Tab from "./pages/Tab";
import Login from "./pages/login";
import Speciality from "./pages/speciality";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./pages/doctors";
import DoctorDashboard from "./pages/doctors/doctorDashboard";
import { verifyToken } from "./hooks/verifyToken";
import MyAppointments from "./pages/patients/myAppointments";
import Hospitaldashboard from "./pages/hospitalAdmins/hospitaldashboard";
import SignUp from "./pages/SignUp";

let token = JSON.parse(localStorage.getItem("token")) ?? "";

export const menuButton = createContext();

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState("");
  const [path, setPath] = useState("");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const result = await verifyToken(token);
        !result.success ? setRole("") : setRole(result.decode.role);
        if (result.decode.role == "patient") setPath("doctors");
        else if (result.decode.role == "doctor") setPath("doctorDashboard");
        else setPath("hospitalDashboard");
      })();
    }
  }, []);

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
                  path="hospitalDashboard"
                  element={<Hospitaldashboard />}
                />
                <Route
                  path="patientAppointments"
                  element={<MyAppointments />}
                />
              </Route>
              <Route path="auth" element={<Tab />}>
                <Route path="login" element={<Login />} />
                <Route path="Signup" element={<SignUp />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </menuButton.Provider>
    </>
  );
}

export default App;

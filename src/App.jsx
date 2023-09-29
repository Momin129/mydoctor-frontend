import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Tab from "./pages/Tab";
import Login from "./pages/login";
import PatientSignup from "./pages/patientSignup";
import Speciality from "./pages/speciality";
import { createContext, useState } from "react";
import Dashboard from "./pages/doctors";
import DoctorDashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Appointments from "./pages/appointments";

let isrole = "";
if (localStorage.getItem("role")) isrole = localStorage.getItem("role");

export const menuButton = createContext();

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [role, setRole] = useState(isrole);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const [path, setPath] = useState(role == "doctor" ? "dashboard" : "doctors");

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <menuButton.Provider
        value={{
          mobileOpen,
          handleDrawerToggle,
          selectedIndex,
          handleListItemClick,
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
                <Route path="dashboard" element={<DoctorDashboard />}></Route>
                <Route path="profile" element={<Profile />}></Route>
                <Route path="appointments" element={<Appointments />}></Route>
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

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Membership from "./pages/Membership";
import Schedule from "./pages/Schedule";
import Trainers from "./pages/Trainers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import style from "./App.module.scss";
import Header from "./components/molecules/Header";
import Footer from "./components/molecules/Footer";

function App() {
  return (
    <div className={style.container}>
      <Header />

      <div className={style.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;

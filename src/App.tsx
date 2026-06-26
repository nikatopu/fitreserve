import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Membership from "./pages/Membership";
import UserPage from "./pages/User";
import UserMyMembership from "./pages/UserMyMembership";
import Programs from "./pages/Programs";
import Schedule from "./pages/Schedule";
import Trainers from "./pages/Trainers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import style from "./App.module.scss";
import Header from "./components/molecules/Header";
import Footer from "./components/molecules/Footer";
import ModalController from "./components/organisms/ModalController";

function App() {
  return (
    <div className={style.container}>
      <ModalController>
        <Header />

        <div className={style.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/user/my-membership" element={<UserMyMembership />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
          </Routes>
        </div>

        <Footer />
      </ModalController>
    </div>
  );
}

export default App;

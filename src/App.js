import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Access from "./pages/Access";
import Dashboard from "./pages/Dashboard";
import APIHistory from "./pages/APIHistory";
import Wallet from "./pages/Wallet";
import Settings from "./pages/Settings";
import NoPage from "./pages/NoPage";
import SignIn from "./pages/SignIn";
import OTPVerification from "./pages/OTPVerification";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import TokenSuccess from "./pages/TokenSuccess";
import Offers from "./pages/Offers";
import Loyalty from "./pages/Loyalty";
import Transaction from "./pages/Transaction";
import Announcement from "./pages/Announcement";
import Team from "./pages/Team";
import { StorageContextProvider } from "./context/firebaseContext";
import ProtectedPages from "./pages/ProtectedPages";
import Signup from "./pages/Signup";
import SignupSuccess from "./pages/SignupSuccess";

export default function App(){
  return(
    <StorageContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectedPages><Layout /></ProtectedPages>}>
          <Route index element={<ProtectedPages><Dashboard /></ProtectedPages>} />
          <Route path="api-history" element={<ProtectedPages><APIHistory /></ProtectedPages>} />
          <Route path="offers" element={<ProtectedPages><Offers /></ProtectedPages>} />
          <Route path="loyalty" element={<ProtectedPages><Loyalty /></ProtectedPages>} />
          <Route path="transaction" element={<ProtectedPages><Transaction /></ProtectedPages>} />
          <Route path="team" element={<ProtectedPages><Team /></ProtectedPages>} />
          <Route path="announcement" element={<ProtectedPages><Announcement /></ProtectedPages>} />
          <Route path="wallet" element={<ProtectedPages><Wallet /></ProtectedPages>} />
          <Route path="settings" element={<ProtectedPages><Settings /></ProtectedPages>} />
          <Route path="*" element={<NoPage />} />
        </Route>
        
        <Route path='/' element={<Access />}>
          <Route path="/access/:stripped" element={<SignIn />} />
          <Route path="/verify/otp-verification" element={<OTPVerification />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="/verify/email" element={<VerifyEmail />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup-success" element={<SignupSuccess />} />

          <Route path="token-success" element={<TokenSuccess />} />

        </Route>
      </Routes>
      </BrowserRouter>
      </StorageContextProvider>
  );
}
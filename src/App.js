import React from "react";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PartnerProtectedRoute from "./components/PartnerProtectedRoute";
import ResetPassword from "./components/ForgotPassword";
import { PasswordResetSuccessful } from "./components/PasswordResetSuccessful";
import SignUpFree from "./components/SignUpt";
import { Index } from "./components/Landing-page/components";
import { Dashboard } from "./components/Home/Dashboard/Dashboard";
import BrowseApp from "./components/Home/BrowseApp/BrowseApp";
import { Notifications } from "./components/Home/Notifications/Notifications";
import { Profile } from "./components/Home/Profile/Profile";
import Setting from "./components/Home/Settings/Setting";
import BasicVerification from "./components/Home/Verification/Basic Verification/BasicVerification";
import CredentialVerification from "./components/Home/Verification/Credential Verification/CredentialVerification";
import ExtendedVerification from "./components/Home/Verification/Extended Verification/ExtendedVerification";
import GovernmentRecord from "./components/Home/Verification/Government Record/GovernmentRecord";
import PartnersDashboard from "./components/Partners/PartnersDashboard";
import PartnersOffers from "./components/Partners/PartnersOffers";
import PartnersLoyalties from "./components/Partners/PartnersLoyalties";
import PartnersSetting from "./components/Partners/PartnersSetting";
import PartnersToken from "./components/Partners/PartnersToken";
import PartnersBusinessSettings from "./components/Partners/settings/PartnersBusinessSettings";
import SignInWelcome from "./components/Partners/PartnersSignInWelcome";
import PartnersOtp from "./components/Partners/PartnersOtp";
import PartnerResetToken from "./components/Partners/PartnerResetToken";
import PartnerEmailSent from "./components/Partners/PartnerEmailSent";
import PartnerResetSuccesful from "./components/Partners/PartnerResetSuccesful";
import PartnerSignUp from "./components/Partners/PartnerSignUp";
import SignIn from "./components/Partners/PartnersSignIn";
import PartnersAnnouncement from "./components/Partners/PartnersAnnouncement";
import PartnerTransactions from "./components/Partners/PartnerTransactions";
import UsePartnerDetails, { PartnerDetails } from "./components/Partners/context/partnerDetails.context";
import VerifyEmail from "./components/Partners/VerifyEmail";

function App() {
  return (
    <div>
      <PartnerDetails>
        <AuthContextProvider>
          <Routes>
            <Route path="/welcome" element={<Index />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ResetPassword />} />
            <Route path="/" element={<SignUpFree />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
            <Route path="/Browse-Apps" element={<ProtectedRoute><BrowseApp /></ProtectedRoute>}/>
            <Route path="/Notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>}/>
            <Route path="/Profile" element={  <ProtectedRoute> <Profile /> </ProtectedRoute>}/>
            <Route path="/Settings" element={ <ProtectedRoute> <Setting /> </ProtectedRoute>}/>
            <Route path="/reset" element={<PasswordResetSuccessful />} />
            <Route path="/extended-verification" element={<ExtendedVerification />} />
            <Route path="/basic-verification" element={<BasicVerification />} />
            <Route path="/credential-verification" element={<CredentialVerification />} />
            <Route path="/government-record" element={<GovernmentRecord />} />


            <Route path="/access/:stripped" element={ <SignIn /> } />
            <Route path="/partners-signin-email" element={<SignInWelcome />} />
            <Route path="/verify/email" element={ <VerifyEmail /> } />
            <Route path="/partners-reset-token" element={<PartnerResetToken />} />
            <Route path="/partners-dashboard" element={ <PartnersDashboard /> } />
            <Route path="/partners-offers" element={ <PartnersOffers /> } />
            <Route path="/partners-loyalties" element={ <PartnersLoyalties /> } />
            <Route path="/partners-settings" element={ <PartnersSetting /> } />
            <Route path="/partners-token" element={ <PartnersToken /> } />
            <Route path="/partners-transactions" element={ <PartnerTransactions /> } />
            <Route path="/partners-business-settings" element={ <PartnersBusinessSettings /> } />
            <Route path="/partners-otp" element={<PartnersOtp />} />
            <Route path="/partners-email-sent" element={<PartnerEmailSent />} />
            <Route path="/partners-reset-successful" element={<PartnerResetSuccesful />} />
            <Route path="/partners-signup" element={<PartnerSignUp />} />
            <Route path="/partners-announcement" element={ <PartnersAnnouncement /> } />
            

            
          </Routes>
        </AuthContextProvider>
      </PartnerDetails>
    </div>
  );
}

export default App;

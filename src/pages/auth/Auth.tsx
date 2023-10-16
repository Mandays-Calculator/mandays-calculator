import type { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContainer } from "./components/auth-container";
import { Footer } from "~/components/footer";
import { Login, ForgotPassword, ChangePassword } from ".";

const Auth = (): ReactElement => {
  return (
    <>
      <AuthContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthContainer>
      <Footer />
    </>
  );
};

export default Auth;

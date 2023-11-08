import type { ReactElement } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { Footer } from "~/components/footer";

import { AuthContainer } from "./components/auth-container";
import { Login, ForgotPassword } from ".";

const Auth = (): ReactElement => {
  return (
    <>
      <AuthContainer>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthContainer>
      <Footer />
    </>
  );
};

export default Auth;

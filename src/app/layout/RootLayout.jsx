import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header.jsx";
import { AuthProvider } from "./providers/AuthProvider";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </AuthProvider>
  );
}

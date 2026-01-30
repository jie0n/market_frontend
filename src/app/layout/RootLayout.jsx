import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header.jsx";

export default function RootLayout() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

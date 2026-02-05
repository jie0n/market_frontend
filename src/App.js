import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/header/Header";

import Home from "./pages/Home/Home";
import PostList from "./pages/Posts/PostList";
import PostDetail from "./pages/Posts/PostDetail";
import PostCreate from "./pages/Posts/PostCreate";
import PostEdit from "./pages/Posts/PostEdit";

import ChatPage from "./pages/Chat/ChatPage";
import MyPage from "./pages/My/MyPage";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import ReportBoard from "./pages/Reports/ReportBoard";
import ReportCreate from "./pages/Reports/ReportCreate";

import { AuthProvider } from "./app/providers/AuthProvider";
import RequireAuth from "./app/routeGuards/RequireAuth";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main className="container">
          <Routes>
            {/* public */}
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/posts/:id/edit" element={<PostEdit />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/reports" element={<ReportBoard />} />
            <Route path="/reports/new" element={<ReportCreate />} />


            {/* protected */}
            <Route
              path="/posts/new"
              element={
                <RequireAuth>
                  <PostCreate />
                </RequireAuth>
              }
            />
            <Route
              path="/mypage"
              element={
                <RequireAuth>
                  <MyPage />
                </RequireAuth>
              }
            />
            <Route
              path="/chat"
              element={
                <RequireAuth>
                  <ChatPage />
                </RequireAuth>
              }
            />
            <Route
              path="/chat/:roomId"
              element={
                <RequireAuth>
                  <ChatPage />
                </RequireAuth>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

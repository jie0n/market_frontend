import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";

import Home from "../pages/Home/Home.jsx";
import PostList from "../pages/Posts/PostList.jsx";
import PostDetail from "../pages/Posts/PostDetail.jsx";
import PostCreate from "../pages/Posts/PostCreate.jsx";
import ChatList from "../pages/Chat/ChatList.jsx";
import MyPage from "../pages/My/MyPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/new" element={<PostCreate />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/chat" element={<ChatList />} />
        <Route path="/mypage" element={<MyPage />} />

        {/* 없는 경로는 홈으로 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

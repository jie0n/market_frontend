import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";

import Home from "../pages/Home/Home.jsx";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";

import PostList from "../pages/Posts/PostList.jsx";
import PostDetail from "../pages/Posts/PostDetail.jsx";
import PostCreate from "../pages/Posts/PostCreate.jsx";

import ChatList from "../pages/Chat/ChatList.jsx";
import MyPage from "../pages/My/MyPage.jsx";

import RequireAuth from "./routeGuards/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      { path: "posts", element: <PostList /> },
      { path: "posts/:id", element: <PostDetail /> },

      {
        path: "posts/new",
        element: (
          <RequireAuth>
            <PostCreate />
          </RequireAuth>
        ),
      },

      {
        path: "mypage",
        element: (
          <RequireAuth>
            <MyPage />
          </RequireAuth>
        ),
      },

      {
        path: "chat",
        element: (
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        ),
      },
      {
        path: "chat/:roomId",
        element: (
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);
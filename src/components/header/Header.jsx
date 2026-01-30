import React from "react";
import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu.jsx";

export default function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__inner">
        {/* 상단에 사이트 이름 넣을 공간 */}
        <div className="brand">
          <Link to="/" className="brand__name">
            market
          </Link>
          <span className="brand__desc">중고거래</span>
        </div>

        <nav className="nav">
          <Link className={`nav__link ${location.pathname === "/posts/new" ? "is-active" : ""}`} to="/posts/new">
            글쓰기
          </Link>
          <Link className={`nav__link ${location.pathname === "/posts" ? "is-active" : ""}`} to="/posts">
            게시물
          </Link>
        </nav>

        {/* 상단 우측 드롭메뉴 버튼 */}
        <UserMenu />
      </div>
    </header>
  );
}

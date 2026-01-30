import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { useAuth } from "../../app/providers/AuthProvider";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const nav = useNavigate();
  const { user, isAuthed, logout } = useAuth();

  useOutsideClick(ref, () => setOpen(false));

  async function onLogout() {
    await logout();
    setOpen(false);
    nav("/", { replace: true });
  }

  return (
    <div className="menu" ref={ref}>
      <button className="menu__btn" onClick={() => setOpen((v) => !v)} type="button">
        {isAuthed ? (user?.nickname || "계정") : "메뉴"} ▾
      </button>

      {open && (
        <div className="menu__panel" role="menu">
          {!isAuthed ? (
            <>
              <Link to="/login" className="menu__item" onClick={() => setOpen(false)}>로그인</Link>
              <Link to="/signup" className="menu__item" onClick={() => setOpen(false)}>회원가입</Link>
            </>
          ) : (
            <>
              <Link to="/mypage" className="menu__item" onClick={() => setOpen(false)}>마이페이지</Link>
              <Link to="/chat" className="menu__item" onClick={() => setOpen(false)}>1:1 채팅</Link>
              <button className="menu__item menu__item--danger" type="button" onClick={onLogout}>
                로그아웃
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

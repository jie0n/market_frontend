import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOutsideClick(ref, () => setOpen(false));

  return (
    <div className="menu" ref={ref}>
      <button
        className="menu__btn"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        메뉴 ▾
      </button>

      {open && (
        <div className="menu__panel" role="menu">
          <Link
            to="/mypage"
            className="menu__item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            마이페이지
          </Link>

          <Link
            to="/chat"
            className="menu__item"
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            1:1 채팅
          </Link>
        </div>
      )}
    </div>
  );
}

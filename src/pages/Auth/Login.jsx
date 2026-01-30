import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const redirectTo = loc.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    await login({ email, password });
    nav(redirectTo, { replace: true });
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h1 className="title">로그인</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <label className="label">이메일</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">비밀번호</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* <div className="actions" style={{ justifyContent: "flex-start" }}>
          <button className="btn" type="submit">로그인</button>
          <Link className="btn btn--ghost" to="/signup">회원가입</Link>
        </div> */}

        <div className="actions" style={{ justifyContent: "flex-start" }}>
            <button className="btn" type="submit">로그인</button>

            <button
                className="btn btn--ghost"
                type="button"
                onClick={async () => {
                await login({ email: "test@market.com", password: "1234" });
                nav("/", { replace: true });
                }}
            >
                테스트 로그인
            </button>
            <Link className="btn btn--ghost" to="/signup">회원가입</Link>
        </div>
      </form>
    </div>
  );
}

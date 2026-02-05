import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers/AuthProvider";

export default function Signup() {
  const { signup } = useAuth();
  const nav = useNavigate();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    await signup({ email, password, nickname });
    nav("/", { replace: true });
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "0 auto" }}>
      <h1 className="title" style={{ marginBottom: 22 }}>회원가입</h1>

      <form className="form" onSubmit={onSubmit}>
        <div className="field">
          <label className="label">닉네임</label>
          <input className="input" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">이메일</label>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label className="label">비밀번호</label>
          <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="actions" style={{ justifyContent: "flex-start" }}>
          <button className="btn" type="submit">회원가입</button>
          <Link className="btn btn--ghost" to="/login">로그인</Link>
        </div>
      </form>
    </div>
  );
}

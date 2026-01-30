import React from "react";
import { Link } from "react-router-dom";
import { mockPosts } from "../../mock/posts";

export default function Home() {
  return (
    <div className="card">
      <h1 className="title">market</h1>

      {/* 버튼 3개 */}
      <div className="actions" style={{ justifyContent: "flex-start" }}>
        <Link className="btn" to="/posts/new">
          게시물 작성
        </Link>
        <Link className="btn btn--ghost" to="/posts">
          게시물 목록
        </Link>
        <Link className="btn btn--ghost" to="/chat">
          1:1 채팅
        </Link>
      </div>

      <div style={{ marginTop: 16 }}>
        <div className="panelHead">
          <h2 className="panelTitle">최근 게시물</h2>
          <Link className="panelLink" to="/posts">
            전체보기 →
          </Link>
        </div>

        <ul className="list">
          {mockPosts.map((p) => (
            <li key={p.id} className="list__item">
              <Link to={`/posts/${p.id}`} className="list__link" title={p.title}>
                <div style={{ fontWeight: 800 }}>{p.title}</div>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.8 }}>
                  작성자: {p.author}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

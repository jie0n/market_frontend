import React from "react";
import { Link } from "react-router-dom";

export default function PostListPanel({ posts }) {
  return (
    <div>
      <div className="panelHead">
        {/* 게시물 목록(제목 누르면 목록 페이지로 이동함) */}
        <h2 className="panelTitle">게시물 목록</h2>
        <Link className="panelLink" to="/posts">
          전체보기 →
        </Link>
      </div>

      {/* 게시물 제목 리스트(누르면 해당 게시물로 이동함) */}
      <ul className="list">
        {posts.map((p) => (
          <li key={p.id} className="list__item">
            <Link to={`/posts/${p.id}`} className="list__link" title={p.title}>
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

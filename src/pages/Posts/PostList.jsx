import React from "react";
import { Link } from "react-router-dom";
import { mockPosts } from "../../mock/posts.js";

export default function PostList() {
  return (
    <div className="card">
      <h1 className="title">게시물 목록</h1>
      <ul className="list">
        {mockPosts.map((p) => (
          <li key={p.id} className="list__item">
            <Link className="list__link" to={`/posts/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>

      <div className="actions" style={{ justifyContent: "flex-start" }}>
        <Link className="btn" to="/posts/new">글쓰기</Link>
      </div>
    </div>
  );
}

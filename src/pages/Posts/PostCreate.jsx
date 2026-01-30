import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockPosts } from "../../mock/posts.js";
import PostForm from "../../components/posts/PostForm.jsx";
import PostListPanel from "../../components/posts/PostListPanel.jsx";

export default function PostCreate() {
  const navigate = useNavigate();
  const posts = useMemo(() => mockPosts, []);

  const [form, setForm] = useState({
    title: "",
    author: "",
    content: "",
  });

  const [images, setImages] = useState([]); // File[]

  function onChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit() {
    const createdId = 999;
    navigate(`/posts/${createdId}`);
  }

  function onChat() {
    if (!form.author.trim()) return;
    navigate(`/chat?user=${encodeURIComponent(form.author.trim())}`);
  }

  return (
    <div className="grid">
      {/* 좌: 작성 폼 */}
      <section className="card grid__main">
        <div className="card__head">
          <h1 className="title">게시물 작성</h1>
          <p className="desc">제목/작성자/본문을 입력하고 등록하세요.</p>
        </div>

        <PostForm
          title={form.title}
          author={form.author}
          content={form.content}
          images={images}
          setImages={setImages}
          onChange={onChange}
          onSubmit={onSubmit}
          onChat={onChat}
        />
      </section>

      {/* 우: 게시물 목록 */}
      <aside className="card grid__side">
        <PostListPanel posts={posts} />
      </aside>
    </div>
  );
}

import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockPosts } from "../../mock/posts";
import PostForm from "../../components/posts/PostForm";
import PostListPanel from "../../components/posts/PostListPanel";

export default function PostEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts = useMemo(() => mockPosts, []);
  const post = posts.find((p) => p.id === id);

  const [form, setForm] = useState({
    title: post?.title || "",
    author: post?.author || "",
    content: post?.content || "",
  });

  // 이미지 편집도 같이 쓸 거면 상태 유지(일단 UI용)
  const [images, setImages] = useState([]);

  function onChange(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit() {
    // TODO: 백엔드 연결 시 PUT/PATCH 호출
    // 지금은 UI만: 수정 완료 가정하고 상세로 이동
    navigate(`/posts/${id}`);
  }

  function onChat() {
    if (!form.author.trim()) return;
    // 작성자 기준 채팅방 연결은 너 로직대로
    navigate(`/chat`);
  }

  if (!post) {
    return (
      <div className="card">
        <h1 className="title" style={{ marginBottom: 22 }}>게시물 수정</h1>
        <p className="desc">해당 게시물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid">
      <section className="card grid__main">
        <h1 className="title" style={{ marginBottom: 22 }}>게시물 수정</h1>

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

      <aside className="card grid__side">
        <PostListPanel posts={posts} />
      </aside>
    </div>
  );
}

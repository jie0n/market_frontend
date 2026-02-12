import { Link, useNavigate, useParams } from "react-router-dom";
import { mockPosts } from "../../mock/posts";
import SafeText from "../../components/security/SafeText";
import WatermarkedImage from "../../components/security/WatermarkedImage";
import React from "react";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = mockPosts.find((p) => p.id === id);

  function goChat(author) {
    // 작성자 기준 채팅방 매칭(예시)
    const roomId = author === "홍길동" ? "r1" : author === "김지은" ? "r2" : "r1";
    navigate(`/chat/${roomId}`);
  }

  function goEdit() {
    navigate(`/posts/${id}/edit`);
  }

  // ✅ 게시물 없을 때도 "목록 카드"는 별도로 보여주기
  if (!post) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* 상세 카드 */}
        <section className="card">
          <h1 className="title">게시물 상세</h1>
          <p className="desc">해당 게시물을 찾을 수 없습니다.</p>
        </section>

        {/* 목록 카드 */}
        <aside className="card">
          <div className="panelHead">
            <h2 className="panelTitle">게시물 목록</h2>
            <Link className="panelLink" to="/posts">전체보기 →</Link>
          </div>

          <ul className="list">
            {mockPosts.map((p) => (
              <li key={p.id} className="list__item">
                <Link to={`/posts/${p.id}`} className="list__link" title={p.title}>
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ✅ 1) 상세 내용 카드 */}
      <section className="card">
        <h1 className="title" style={{ marginBottom: 22 }}>{post.title}</h1>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8, marginBottom: 18 }}>
          <span className="desc" style={{ margin: 0 }}>
            작성자: <b>{post.author}</b>
          </span>

          <button className="btn btn--ghost" type="button" onClick={() => goChat(post.author)}>
            1:1 채팅
          </button>

          <button
              className="btn btn--ghost"
              type="button"
              onClick={() =>
                navigate(`/reports/new?type=post&postId=${id}&author=${encodeURIComponent(post.author)}`)
              }
            >
              신고
          </button>

          <button className="btn btn--ghost" type="button" onClick={goEdit}>
            수정
          </button>
        </div>

        <div style={{ marginTop: 8, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
          <div className="postBody" style={{ lineHeight: 1.7 }}>
            <SafeText text={post.content} />
          </div>
        </div>

        {/* ✅ 이미지(워터마크 데모) */}
        <div>
          <div
            className="row"
            style={{ justifyContent: "space-between", alignItems: "center" }}
          >
          </div>

        <div style={{ marginTop: 10 }}>
          <WatermarkedImage
            src={post.imageUrl || "https://picsum.photos/900/560"}
            alt="post"
            watermarkText={`MARKET Post#${post.id} ${post.author}`}
          />
        </div>
    </div>
      </section>

      {/* ✅ 2) 게시물 목록 카드 (완전 분리된 박스) */}
      <aside className="card">
        <div className="panelHead">
          <h2 className="panelTitle">게시물 목록</h2>
          <Link className="panelLink" to="/posts">
            전체보기 →
          </Link>
        </div>

        <ul className="list">
          {mockPosts.map((p) => {
            const isCurrent = p.id === id;
            return (
              <li key={p.id} className="list__item">
                <Link
                  to={`/posts/${p.id}`}
                  className="list__link"
                  title={p.title}
                  style={{
                    fontWeight: isCurrent ? 900 : 600,
                    background: isCurrent ? "#f3f4f6" : "#fafafa",
                    borderColor: isCurrent ? "var(--border)" : "transparent",
                  }}
                >
                  {p.title}
                  {isCurrent ? " (현재 글)" : ""}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}

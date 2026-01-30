import React, { useEffect, useMemo, useState } from "react";

export default function PostForm({ title, author, content, images, setImages, onChange, onSubmit, onChat }) {
  const [errors, setErrors] = useState({ title: "", author: "", content: "" });
  const [previews, setPreviews] = useState([]); // { url, name }[]
  const canChat = useMemo(() => author.trim().length > 0, [author]);

useEffect(() => {
  const next = (images || []).map((file) => ({
    url: URL.createObjectURL(file),
    name: file.name,
  }));
  setPreviews(next);

  return () => {
    next.forEach((p) => URL.revokeObjectURL(p.url));
  };
}, [images]);

  function validate() {
    const next = { title: "", author: "", content: "" };
    if (!title.trim()) next.title = "게시물 제목을 입력하세요.";
    if (!author.trim()) next.author = "작성자를 입력하세요.";
    if (!content.trim()) next.content = "게시물 본문을 입력하세요.";
    setErrors(next);
    return !next.title && !next.author && !next.content;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit?.();
  }

  function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if(files.length === 0) return;

    const onlyImages = files.filter((f) => f.type.startsWith("image/"));

    const merged = [...PostForm(images || []), ...onlyImages].slice(0, 6);
    setImages?.(merged);

    e.target.value = "";
  }

  function removeImage(idx) {
    const next = [...PostForm(images || [])];
    next.splice(idx, 1);
    setImages?.(next);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* 게시물 제목 */}
      <div className="field">
        <label className="label">게시물 제목</label>
        <input
          className="input"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="예: 아이패드 에어 5 판매합니다"
        />
        {errors.title && <p className="error">{errors.title}</p>}
      </div>

      {/* 작성자 + 채팅 */}
      <div className="field">
        <label className="label">작성자</label>
        <div className="row">
          <input
            className="input"
            value={author}
            onChange={(e) => onChange("author", e.target.value)}
            placeholder="예: 홍길동"
          />
          <button className="btn btn--ghost" type="button" onClick={onChat} disabled={!canChat}>
            1:1 채팅
          </button>
        </div>
        {errors.author && <p className="error">{errors.author}</p>}
      </div>

      {/* 사진 첨부 */}
      <div className="field">
        <label className="label">사진 첨부</label>
        <div className="uploadRow">
          <input
            className="file"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFiles}
          />
          <span className="hint">최대 6장까지 첨부 가능</span>
        </div>

        {previews.length > 0 && (
          <div className="previewGrid">
            {previews.map((p, idx) => (
              <div key={p.url} className="previewItem">
                <img className="previewImg" src={p.url} alt={p.name} />
                <button
                  type="button"
                  className="previewRemove"
                  onClick={() => removeImage(idx)}
                  aria-label="이미지 삭제"
                  title="삭제"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 게시물 본문 */}
      <div className="field">
        <label className="label">게시물 본문</label>
        <textarea
          className="textarea"
          value={content}
          onChange={(e) => onChange("content", e.target.value)}
          placeholder="상품 상태, 가격, 거래 방법 등을 적어주세요."
        />
        {errors.content && <p className="error">{errors.content}</p>}
      </div>

      {/* 게시물 등록 버튼 */}
      <div className="actions">
        <button className="btn" type="submit">
          게시물 등록
        </button>
      </div>
    </form>
  );
}

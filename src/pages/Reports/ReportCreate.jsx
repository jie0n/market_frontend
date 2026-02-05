import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addReport } from "../../app/services/reportService";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function ReportCreate() {
  const q = useQuery();
  const nav = useNavigate();

  // type: post | chat | board(직접 작성)
  const type = q.get("type") || "board";
  const postId = q.get("postId") || "";
  const roomId = q.get("roomId") || "";
  const targetName = q.get("target") || q.get("author") || "";

  const [reason, setReason] = useState("사기 의심");
  const [detail, setDetail] = useState("");

  const targetLabel = useMemo(() => {
    if (type === "post") return `게시물(${postId}) / 작성자(${targetName})`;
    if (type === "chat") return `채팅방(${roomId}) / 상대(${targetName})`;
    return targetName ? `대상(${targetName})` : "직접 입력";
  }, [type, postId, roomId, targetName]);

  function submit(e) {
    e.preventDefault();

    addReport({
      type,
      postId,
      roomId,
      targetName,
      reason,
      detail,
    });

    nav("/reports");
  }

  return (
    <div className="card" style={{ maxWidth: 760, margin: "0 auto" }}>
      <h1 className="title" style={{ marginBottom: 18 }}>신고 작성</h1>

      <form className="form" onSubmit={submit}>
        <div className="field">
          <label className="label">신고 대상</label>
          <input className="input" value={targetLabel} readOnly />
        </div>

        <div className="field">
          <label className="label">신고 사유</label>
          <select className="input" value={reason} onChange={(e) => setReason(e.target.value)}>
            <option>사기 의심</option>
            <option>욕설/비방</option>
            <option>불법 거래</option>
            <option>스팸/광고</option>
            <option>기타</option>
          </select>
        </div>

        <div className="field">
          <label className="label">상세 내용</label>
          <textarea
            className="textarea"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="상황을 간단히 적어주세요."
          />
        </div>

        <div className="actions" style={{ justifyContent: "flex-start" }}>
          <button className="btn" type="submit">신고 접수</button>
        </div>
      </form>
    </div>
  );
}

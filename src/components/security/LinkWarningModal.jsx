import React from "react";

export default function LinkWarningModal({ open, info, onClose, onProceed }) {
  if (!open || !info) return null;

  return (
    <div
      className="modalOverlay"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="modalCard">
        <div className="modalHead">
          <div>
            <div className="modalTitle">외부 링크 주의</div>
            <div className="modalSub">
              아래 링크는 외부 사이트로 이동합니다. 의심 요소가 있으면 열지 마세요.
            </div>
          </div>
          <button className="modalClose" type="button" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="modalBody">
          <div className="field">
            <label className="label">도메인</label>
            <input className="input" value={info.domain || "-"} readOnly />
          </div>

          <div className="field">
            <label className="label">URL</label>
            <input className="input" value={info.url} readOnly />
          </div>

          {info.reasons?.length > 0 && (
            <div className="field">
              <label className="label">주의 사유</label>
              <ul style={{ margin: "8px 0 0 18px", color: "#b91c1c", fontWeight: 700 }}>
                {info.reasons.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="actions" style={{ justifyContent: "flex-start", marginTop: 14 }}>
            <button className="btn btn--ghost" type="button" onClick={onClose}>
              취소
            </button>
            <button className="btn" type="button" onClick={onProceed}>
              계속 열기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

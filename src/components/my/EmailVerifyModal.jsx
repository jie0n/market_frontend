import React, { useEffect, useMemo, useState } from "react";

function maskEmail(email) {
  if (!email) return "-";
  const [id, domain] = email.split("@");
  if (!domain) return email;

  const maskedId =
    id.length <= 2 ? id[0] + "*" : id.slice(0, 2) + "*".repeat(Math.min(6, id.length - 2));
  const parts = domain.split(".");
  const host = parts[0] || "";
  const tld = parts.slice(1).join(".") || "";
  const maskedHost = host.length <= 2 ? host[0] + "*" : host.slice(0, 2) + "*".repeat(Math.min(6, host.length - 2));
  return `${maskedId}@${maskedHost}${tld ? "." + tld : ""}`;
}

export default function EmailVerifyModal({
  open,
  email,
  purposeLabel = "정보 수정",
  onClose,
  onVerified,
}) {
  const [step, setStep] = useState("idle"); // idle | sent | verified
  const [code, setCode] = useState("");
  const [issued, setIssued] = useState(""); // 더미로 발급된 OTP(콘솔에 표시)
  const [cooldown, setCooldown] = useState(0);
  const [requestId, setRequestId] = useState("");

  const masked = useMemo(() => maskEmail(email), [email]);

  useEffect(() => {
    if (!open) {
      setStep("idle");
      setCode("");
      setIssued("");
      setCooldown(0);
      return;
    }
  }, [open]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  if (!open) return null;

  async function sendOtp() {
  const res = await fetch("http://localhost:8000/auth/email-otp/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, purpose: purposeLabel }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    alert(err.detail || "인증번호 요청 실패");
    return;
  }
  const data = await res.json();
  setRequestId(data.request_id);
  setStep("sent");
  setCooldown(30);
  alert("인증번호를 전송했습니다. (개발용 OTP는 FastAPI 콘솔에서 확인)");
}

  async function verifyOtp() {
  if (code.trim().length !== 6) return alert("6자리 인증번호를 입력하세요.");
  if (!requestId) return alert("먼저 인증번호를 보내세요.");

  const res = await fetch("http://localhost:8000/auth/email-otp/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, request_id: requestId, code }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    alert(data.detail || "인증 실패");
    return;
  }

  // 성공 토큰 저장(더미)
  localStorage.setItem("market_verified_token", data.verified_token);

  onVerified?.();
  onClose?.();
}

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
            <div className="modalTitle">이메일 인증</div>
            <div className="modalSub">
              {purposeLabel}을 위해 인증번호를 이메일로 전송합니다. (백엔드 연결 전: 콘솔 출력)
            </div>
          </div>
          <button className="modalClose" type="button" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <div className="modalBody">
          <div className="field">
            <label className="label">이메일</label>
            <input className="input" value={masked} readOnly />
          </div>

          <div className="row" style={{ gap: 10, alignItems: "flex-end" }}>
            <div className="field" style={{ flex: 1, marginBottom: 0 }}>
              <label className="label">인증번호(6자리)</label>
              <input
                className="input"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                inputMode="numeric"
              />
            </div>

            <button className="btn btn--ghost" type="button" onClick={sendOtp} disabled={cooldown > 0}>
              {step === "sent" ? (cooldown > 0 ? `재전송(${cooldown})` : "재전송") : "인증번호 보내기"}
            </button>
          </div>

          <div className="actions" style={{ justifyContent: "flex-start", marginTop: 16 }}>
            <button className="btn" type="button" onClick={verifyOtp}>
              인증 확인
            </button>
            <button className="btn btn--ghost" type="button" onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

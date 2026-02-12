import React, { useMemo, useState } from "react";
import LinkWarningModal from "./LinkWarningModal";

// URL 찾기(간단 버전)
const URL_RE = /(https?:\/\/[^\s<>"')\]]+|www\.[^\s<>"')\]]+)/gi;

function normalizeUrl(raw) {
  if (!raw) return "";
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  if (raw.startsWith("www.")) return `https://${raw}`;
  return raw;
}

function getDomain(url) {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return "";
  }
}

// 아주 간단 룰 기반 의심 판정(데모용)
function analyzeUrl(url) {
  const domain = getDomain(url);
  const reasons = [];

  const lower = url.toLowerCase();
  const suspiciousKeywords = ["verify-login", "secure-update", "account-update", "login", "verify", "security"];

  // 1) 키워드
  if (suspiciousKeywords.some((k) => lower.includes(k))) {
    reasons.push("의심 키워드 포함");
  }

  // 2) 매우 긴 URL
  if (url.length >= 90) {
    reasons.push("URL이 비정상적으로 김");
  }

  // 3) IP 주소 도메인
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(domain)) {
    reasons.push("도메인이 IP 주소 형태");
  }

  // 4) punycode(IDN) 흔한 신호
  if (domain.includes("xn--")) {
    reasons.push("IDN(Punycode) 도메인 가능성");
  }

  // 5) 단축 URL (흔한 도메인만 예시)
  const shorteners = ["bit.ly", "t.co", "tinyurl.com", "goo.gl", "s.id", "rebrand.ly"];
  if (shorteners.includes(domain)) {
    reasons.push("단축 URL");
  }

  const isSuspicious = reasons.length > 0;
  return { url, domain, reasons, isSuspicious };
}

export default function SafeText({ text }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, setPending] = useState(null);

  const parts = useMemo(() => {
    const s = text || "";
    const matches = [...s.matchAll(URL_RE)];
    if (matches.length === 0) return [{ type: "text", value: s }];

    const out = [];
    let last = 0;

    for (const m of matches) {
      const raw = m[0];
      const idx = m.index ?? 0;
      if (idx > last) out.push({ type: "text", value: s.slice(last, idx) });

      const url = normalizeUrl(raw);
      const info = analyzeUrl(url);
      out.push({ type: "link", raw, url, info });

      last = idx + raw.length;
    }
    if (last < s.length) out.push({ type: "text", value: s.slice(last) });

    return out;
  }, [text]);

  function onClickLink(e, info) {
    e.preventDefault();
    setPending(info);
    setModalOpen(true);
  }

  function proceed() {
    if (!pending?.url) return;
    window.open(pending.url, "_blank", "noopener,noreferrer");
    setModalOpen(false);
    setPending(null);
  }

  return (
    <>
      <span>
        {parts.map((p, i) => {
          if (p.type === "text") return <React.Fragment key={i}>{p.value}</React.Fragment>;

          const { info } = p;
          return (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <a
                href={p.url}
                onClick={(e) => onClickLink(e, info)}
                style={{
                  textDecoration: "underline",
                  fontWeight: 800,
                  wordBreak: "break-all",
                }}
              >
                {p.raw}
              </a>
              {info.isSuspicious && (
                <span
                  title={info.reasons.join(", ")}
                  style={{ fontWeight: 900, color: "#b91c1c" }}
                >
                  ⚠️
                </span>
              )}
            </span>
          );
        })}
      </span>

      <LinkWarningModal
        open={modalOpen}
        info={pending}
        onClose={() => {
          setModalOpen(false);
          setPending(null);
        }}
        onProceed={proceed}
      />
    </>
  );
}

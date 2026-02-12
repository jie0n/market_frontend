import React, { useMemo, useState } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import EmailVerifyModal from "../../components/my/EmailVerifyModal";

function maskPhone(phone) {
  const d = (phone || "").replace(/\D/g, "");
  if (!d) return "-";
  if (d.length < 7) return phone;
  return `${d.slice(0, 3)}-****-${d.slice(-4)}`;
}

function maskEmail(email) {
  if (!email) return "-";
  const [id, domain] = email.split("@");
  if (!domain) return email;
  const maskedId = id.length <= 2 ? id[0] + "*" : id.slice(0, 2) + "******";
  const host = domain.split(".")[0] || "";
  const tld = domain.split(".").slice(1).join(".") || "";
  const maskedHost = host.length <= 2 ? host[0] + "*" : host.slice(0, 2) + "******";
  return `${maskedId}@${maskedHost}${tld ? "." + tld : ""}`;
}

export default function MyPage() {
  const { user, isAuthed } = useAuth();

  const [nickname, setNickname] = useState(user?.nickname || "사용자");
  const [email, setEmail] = useState(user?.email || "test@market.com");
  const [phone, setPhone] = useState(user?.phone || "01012345678");

  // 편집 모드(인증 완료 후 true)
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editPw, setEditPw] = useState(false);

  // 인증 모달 제어
  const [verifyOpen, setVerifyOpen] = useState(false);
  const [verifyPurpose, setVerifyPurpose] = useState("정보 수정");
  const [onVerifiedAction, setOnVerifiedAction] = useState(() => () => {});

  const maskedEmail = useMemo(() => maskEmail(email), [email]);
  const maskedPhone = useMemo(() => maskPhone(phone), [phone]);

  if (!isAuthed) {
    return (
      <div className="card">
        <h1 className="title" style={{ marginBottom: 18 }}>마이페이지</h1>
        <p className="desc">로그인이 필요합니다.</p>
      </div>
    );
  }

  function openVerify(purposeLabel, afterVerified) {
    setVerifyPurpose(purposeLabel);
    setOnVerifiedAction(() => afterVerified);
    setVerifyOpen(true);
  }

  function saveEmail() {
    alert("이메일 저장(더미) 완료");
    setEditEmail(false);
  }

  function savePhone() {
    alert("전화번호 저장(더미) 완료");
    setEditPhone(false);
  }

  function savePassword(e) {
    e.preventDefault();
    alert("비밀번호 변경(더미) 완료");
    setEditPw(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <section className="card">
        <h1 className="title" style={{ marginBottom: 18 }}>내 프로필</h1>

        {/* 닉네임 */}
        <div className="myRow">
          <div className="myRow__left">
            <div className="myRow__label">닉네임</div>
            <div className="myRow__value">
              <input className="input" value={nickname} onChange={(e) => setNickname(e.target.value)} />
            </div>
          </div>
          <div className="myRow__right">
            <button className="btn btn--ghost" type="button" onClick={() => alert("닉네임 저장(더미) 완료")}>
              수정
            </button>
          </div>
        </div>

        {/* 이메일 (마스킹 + 수정 버튼) */}
        <div className="myRow">
          <div className="myRow__left">
            <div className="myRow__label">이메일</div>
            <div className="myRow__value">
              {!editEmail ? (
                <span style={{ fontWeight: 700 }}>{maskedEmail}</span>
              ) : (
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
              )}
            </div>
          </div>
          <div className="myRow__right">
            {!editEmail ? (
              <button
                className="btn btn--ghost"
                type="button"
                onClick={() =>
                  openVerify("이메일 수정", () => {
                    setEditEmail(true);
                  })
                }
              >
                수정
              </button>
            ) : (
              <button className="btn" type="button" onClick={saveEmail}>
                저장
              </button>
            )}
          </div>
        </div>

        {/* 전화번호 (마스킹 + 수정 버튼) */}
        <div className="myRow">
          <div className="myRow__left">
            <div className="myRow__label">전화번호</div>
            <div className="myRow__value">
              {!editPhone ? (
                <span style={{ fontWeight: 700 }}>{maskedPhone}</span>
              ) : (
                <input
                  className="input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="숫자만 입력 (예: 01012345678)"
                  inputMode="numeric"
                />
              )}
            </div>
          </div>
          <div className="myRow__right">
            {!editPhone ? (
              <button
                className="btn btn--ghost"
                type="button"
                onClick={() =>
                  openVerify("전화번호 수정", () => {
                    setEditPhone(true);
                  })
                }
              >
                수정
              </button>
            ) : (
              <button className="btn" type="button" onClick={savePhone}>
                저장
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 보안설정 - 비밀번호 */}
      <section className="card">
        <h2 className="panelTitle" style={{ marginBottom: 14 }}>보안설정</h2>

        <div className="myRow" style={{ marginTop: 8 }}>
          <div className="myRow__left">
            <div className="myRow__label">비밀번호</div>
            <div className="myRow__value">
              {!editPw ? (
                <span style={{ fontWeight: 700 }}>••••••••</span>
              ) : (
                <form onSubmit={savePassword} className="pwForm">
                  <input className="input" type="password" placeholder="현재 비밀번호" />
                  <input className="input" type="password" placeholder="새 비밀번호" />
                  <input className="input" type="password" placeholder="새 비밀번호 확인" />
                  <button className="btn" type="submit">변경</button>
                </form>
              )}
            </div>
          </div>

          <div className="myRow__right">
            {!editPw ? (
              <button
                className="btn btn--ghost"
                type="button"
                onClick={() =>
                  openVerify("비밀번호 변경", () => {
                    setEditPw(true);
                  })
                }
              >
                수정
              </button>
            ) : (
              <button className="btn btn--ghost" type="button" onClick={() => setEditPw(false)}>
                취소
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 이메일 OTP 인증 모달 */}
      <EmailVerifyModal
        open={verifyOpen}
        email={email}
        purposeLabel={verifyPurpose}
        onClose={() => setVerifyOpen(false)}
        onVerified={() => onVerifiedAction?.()}
      />
    </div>
  );
}

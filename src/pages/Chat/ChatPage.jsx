import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockChatRooms, mockMessagesByRoom } from "../../mock/chat";

function SendIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 11.5L21 3l-8.5 18-2.2-7.2L3 11.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M21 3L10.3 13.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ChatPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const rooms = useMemo(() => mockChatRooms, []);
  const activeRoomId = roomId || rooms[0]?.roomId;

  const [messages, setMessages] = useState(
    mockMessagesByRoom[activeRoomId] || []
  );
  const [text, setText] = useState("");

  React.useEffect(() => {
    setMessages(mockMessagesByRoom[activeRoomId] || []);
  }, [activeRoomId]);

  const activeRoom = rooms.find((r) => r.roomId === activeRoomId);

  function openRoom(rid) {
    navigate(`/chat/${rid}`);
  }

  function send() {
    const v = text.trim();
    if (!v) return;

    setMessages((prev) => [
      ...prev,
      { id: `m_${Date.now()}`, from: "me", text: v },
    ]);
    setText("");
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="chatGrid">
      {/* 좌: 채팅방 목록 */}
      <aside className="card chatSide">
        <div className="panelHead">
          <h2 className="panelTitle">1:1 채팅</h2>
        </div>

        <ul className="chatList" style={{ marginTop: 12 }}>
          {rooms.map((r) => (
            <li key={r.roomId}>
              <button
                className={`chatItem ${r.roomId === activeRoomId ? "is-active" : ""}`}
                onClick={() => openRoom(r.roomId)}
                type="button"
              >
                <div className="chatItem__top">
                  <b>{r.user}</b>
                  <span className="chatItem__time">{r.updatedAt}</span>
                </div>
                <div className="chatItem__msg">{r.lastMessage}</div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* 우: 채팅방 */}
      <section className="card chatMain">
        <div className="chatHeader">
          <div>
            <div classNme="chatTitle">{activeRoom ? activeRoom.user : "채팅"}</div>
          </div>
          
          <div className="chatHeader__actions">
            <button
              className="btn btn--ghost"
              type="button"
              onClick={() =>
                navigate(
                  `/reports/new?type=chat&roomId=${activeRoomId}&target=${encodeURIComponent(
                    activeRoom?.user || ""
                  )}`
                )
              }
            >
              신고
              </button>
          </div>
        </div>

        <div className="chatBody">
          {messages.map((m) => (
            <div key={m.id} className={`bubbleRow ${m.from === "me" ? "me" : "other"}`}>
              <div className={`bubble ${m.from === "me" ? "bubble--me" : "bubble--other"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="chatInput">
          <textarea
            className="textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="메시지를 입력하세요 (Enter 전송, Shift+Enter 줄바꿈)"
          />
          <button
            className="btn chatSendBtn"
            type="button"
            onClick={send}
            aria-label="전송"
            title="전송"
          >
            <SendIcon />
          </button>
        </div>
      </section>
    </div>
  );
}

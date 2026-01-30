import React from "react";
import { useNavigate } from "react-router-dom";
import { mockChatRooms } from "../../mock/chat";

export default function ChatList() {
  const navigate = useNavigate();

  function openRoom(roomId) {
    navigate(`/chat/${roomId}`);
  }

  return (
    <div className="card">
      <div className="panelHead">
        <h1 className="panelTitle">1:1 채팅</h1>
        <span className="panelLink" style={{ cursor: "default" }}>
          채팅방 리스트
        </span>
      </div>

      {mockChatRooms.length === 0 ? (
        <p className="desc" style={{ marginTop: 12 }}>
          아직 채팅방이 없습니다.
        </p>
      ) : (
        <ul className="chatList" style={{ marginTop: 12 }}>
          {mockChatRooms.map((r) => (
            <li key={r.roomId}>
              <button
                type="button"
                className="chatItem"
                onClick={() => openRoom(r.roomId)}
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
      )}
    </div>
  );
}

export const mockChatRooms = [
  {
    roomId: "r1",
    user: "홍길동",
    lastMessage: "네 가능합니다! 서울역에서 뵐까요?",
    updatedAt: "방금",
  },
  {
    roomId: "r2",
    user: "김지은",
    lastMessage: "택배로도 가능해요 :)",
    updatedAt: "10분 전",
  },
];

export const mockMessagesByRoom = {
  r1: [
    { id: "m1", from: "me", text: "안녕하세요! 아이패드 아직 판매 중인가요?" },
    { id: "m2", from: "other", text: "네 아직 있어요!" },
    { id: "m3", from: "me", text: "직거래 가능한 시간대가 어떻게 되세요?" },
    { id: "m4", from: "other", text: "네 가능합니다! 서울역에서 뵐까요?" },
  ],
  r2: [
    { id: "m1", from: "me", text: "에어팟 프로2 구매하고 싶어요." },
    { id: "m2", from: "other", text: "네! 직거래/택배 다 가능해요." },
    { id: "m3", from: "me", text: "택배로 진행 가능할까요?" },
    { id: "m4", from: "other", text: "택배로도 가능해요 :)" },
  ],
};

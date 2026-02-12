import React from "react";

export default function WatermarkedImage({
  src,
  alt = "",
  watermarkText = "MARKET",
}) {
  if (!src) return null;

  return (
    <div className="wmWrap">
      <img className="wmImg" src={src} alt={alt} />

      {/* ✅ 항상 워터마크 표시 */}
      <div className="wmOverlay" aria-hidden="true">
        <div className="wmBigText">{watermarkText}</div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listReports } from "../../app/services/reportService";

export default function ReportBoard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports(listReports());
  }, []);

  return (
    <div className="card">
      <div className="panelHead">
        <h1 className="panelTitle">신고 게시판</h1>
        <Link className="panelLink" to="/reports/new">신고 작성 →</Link>
      </div>

      {reports.length === 0 ? (
        <p className="desc" style={{ marginTop: 12 }}>
          아직 접수된 신고가 없습니다.
        </p>
      ) : (
        <div style={{ marginTop: 12, overflowX: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th>접수일</th>
                <th>유형</th>
                <th>대상</th>
                <th>사유</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>{r.type}</td>
                  <td>{r.targetName || "-"}</td>
                  <td>{r.reason}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

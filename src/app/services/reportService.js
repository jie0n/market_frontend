const KEY = "market_reports";

export function listReports() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addReport(report) {
  const prev = listReports();
  const next = [
    {
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      status: "접수",
      ...report,
    },
    ...prev,
  ];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next[0];
}

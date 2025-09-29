const alerts = [
  {
    id: 1,
    message: "New scholarship applications open for Engineering students - Apply by December 15th",
    priority: "high",
    date: "2024-12-01"
  },
  {
    id: 2,
    message: "JEE Main 2024 registration deadline extended to January 10th",
    priority: "medium",
    date: "2024-12-01"
  },
  {
    id: 3,
    message: "Free career counseling session at I2IT Pune this weekend",
    priority: "low",
    date: "2024-12-01"
  },
  {
    id: 4,
    message: "New courses added in Data Science and AI at top institutes",
    priority: "medium",
    date: "2024-12-01"
  },
  {
    id: 5,
    message: "Scholarship deadline reminder: Last date for Science stream applications",
    priority: "high",
    date: "2024-12-01"
  }
];

async function getAllAlerts() { return alerts; }
async function addAlert(alert) { alerts.push(alert); return alert; }
async function updateAlert(id, update) {
  const idx = alerts.findIndex(a => a.id == id);
  if (idx === -1) return null;
  alerts[idx] = { ...alerts[idx], ...update };
  return alerts[idx];
}
async function deleteAlert(id) {
  const idx = alerts.findIndex(a => a.id == id);
  if (idx === -1) return null;
  return alerts.splice(idx, 1)[0];
}

module.exports = { getAllAlerts, addAlert, updateAlert, deleteAlert }; 
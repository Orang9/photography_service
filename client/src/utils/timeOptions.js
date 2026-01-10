// utils/timeOptions.js
export const generateTimeOptions = () => {
  const times = [];
  for (let h = 6; h <= 17; h++) {
    times.push(`${String(h).padStart(2, "0")}:00`);
    if (h !== 17) times.push(`${String(h).padStart(2, "0")}:30`);
  }
  return times;
};

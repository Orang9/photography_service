import pool from "../../config/mysql.js";

export const findAllSchedule = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM schedule");
    console.log("Schedules found:", rows.length);
    return rows;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    throw error;
  }
};

export const findScheduleById = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM schedule WHERE schedule_id = ?",
    [id]
  );
  return rows[0];
};

export const createSchedule = async (schedule) => {
  const { photographer_id, booking_date, start_time, end_time } = schedule;
  const [result] = await pool.query(
    "INSERT INTO schedule (photographer_id, booking_date, start_time, end_time) VALUES (?, ?, ?, ?)",
    [photographer_id, booking_date, start_time, end_time]
  );
  return result.insertId;
};

export const updateSchedule = async (id, schedule) => {
  const { photographer_id, booking_date, start_time, end_time } = schedule;
  await pool.query(
    "UPDATE schedule SET photographer_id = ?, booking_date = ?, start_time = ?, end_time = ? WHERE schedule_id = ?",
    [photographer_id, booking_date, start_time, end_time, id]
  );
};

export const deleteSchedule = async (id) => {
  await pool.query("DELETE FROM schedule WHERE schedule_id = ?", [id]);
};

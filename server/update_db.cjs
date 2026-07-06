const mysql = require('mysql2/promise');
async function run() {
  const pool = mysql.createPool({host:'127.0.0.1', user:'root', password:'rootpassword', database:'photography_service'});
  await pool.query("ALTER TABLE transaction MODIFY COLUMN status enum('awaiting_schedule_approval','unpaid','awaiting_dp_verification','dp_paid','awaiting_final_verification','fully_paid','rejected') DEFAULT 'awaiting_schedule_approval'");
  console.log('Schema updated');
  process.exit(0);
}
run();

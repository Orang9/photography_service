import db from '../src/config/mysql.js';

export const seedSchedules = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`schedule\` (\`schedule_id\`, \`photographer_id\`, \`booking_date\`, \`start_time\`, \`end_time\`) VALUES
      (1, 1, '2025-12-24', '08:00:00', '12:00:00'),
      (2, 1, '2025-12-24', '13:00:00', '17:00:00'),
      (3, 1, '2025-12-26', '09:00:00', '15:00:00'),
      (4, 1, '2025-12-28', '10:00:00', '18:00:00'),
      (5, 1, '2025-12-30', '08:00:00', '14:00:00');
    `;
    await db.query(query);
    console.log('✅ Schedules seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding schedules:', error);
    throw error;
  }
};

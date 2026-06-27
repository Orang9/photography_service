import db from '../src/config/mysql.js';

export const seedJobs = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`job\` (\`job_id\`, \`transaction_id\`, \`photographer_id\`, \`status\`, \`created_at\`) VALUES
      (5, 5, 1, 'assigned', '2025-12-22 18:26:19'),
      (6, 6, 1, 'assigned', '2025-12-22 18:26:19');
    `;
    await db.query(query);
    console.log('✅ Jobs seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
    throw error;
  }
};

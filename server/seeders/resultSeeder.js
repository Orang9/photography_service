import db from '../src/config/mysql.js';

export const seedResults = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`result\` (\`result_id\`, \`job_id\`, \`submitted_at\`) VALUES
      (3, 5, '2025-12-22 18:34:30'),
      (4, 6, '2025-12-22 18:34:30');
    `;
    await db.query(query);
    console.log('✅ Results seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding results:', error);
    throw error;
  }
};

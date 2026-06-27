import db from '../src/config/mysql.js';

export const seedResultFiles = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`resultfile\` (\`file_id\`, \`result_id\`, \`file_url\`) VALUES
      (1, 3, 'https://drive.google.com/file/hasil_anna'),
      (2, 4, 'https://drive.google.com/file/hasil_qia');
    `;
    await db.query(query);
    console.log('✅ Result files seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding result files:', error);
    throw error;
  }
};

import db from '../src/config/mysql.js';

export const seedPhotographers = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`photographer\` (\`photographer_id\`, \`name\`, \`email\`, \`phone\`, \`status\`) VALUES
      (1, 'Mohammad Faalih', 'aynfaal.lens@gmail.com', '081393910873', 'available');
    `;
    await db.query(query);
    console.log('✅ Photographers seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding photographers:', error);
    throw error;
  }
};

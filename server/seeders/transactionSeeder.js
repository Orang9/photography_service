import db from '../src/config/mysql.js';

export const seedTransactions = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`transaction\` (\`transaction_id\`, \`user_id\`, \`location\`, \`amount\`, \`status\`, \`created_at\`) VALUES
      (5, 1, 'Universitas Bakrie Area Wisuda', 200000.00, 'order', '2025-12-22 18:21:41'),
      (6, 2, 'Universitas Bakrie Area Wisuda', 350000.00, 'order', '2025-12-22 18:22:20');
    `;
    await db.query(query);
    console.log('✅ Transactions seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding transactions:', error);
    throw error;
  }
};

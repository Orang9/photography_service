import db from '../src/config/mysql.js';

export const seedTransactions = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`transaction\` (\`transaction_id\`, \`user_id\`, \`location\`, \`amount\`, \`status\`, \`created_at\`) VALUES
      (10293, 1, 'Jakarta (Wisuda Premium)', 200000.00, 'awaiting_dp_verification', '2026-06-20 10:00:00'),
      (10294, 2, 'Bandung (Wedding Standard)', 350000.00, 'dp_paid', '2026-06-21 11:00:00'),
      (10295, 1, 'Surabaya (Prewedding)', 500000.00, 'fully_paid', '2026-06-22 12:00:00'),
      (10296, 2, 'Bali (Event Silver)', 150000.00, 'rejected', '2026-06-23 13:00:00'),
      (1, 1, 'UI Depok - 2025-10-21 10:00 (Wisuda Platinum)', 350000.00, 'unpaid', '2026-06-24 10:00:00'),
      (2, 2, 'Jakarta Selatan - 2025-10-23 13:00 (Event Documentation)', 500000.00, 'unpaid', '2026-06-24 11:00:00');
    `;
    await db.query(query);
    console.log('✅ Transactions seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding transactions:', error);
    throw error;
  }
};

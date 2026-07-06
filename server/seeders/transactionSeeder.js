import db from '../src/config/mysql.js';

export const seedTransactions = async () => {
  try {
    // Insert dummy users to ensure foreign key constraint passes
    await db.query(`
      INSERT IGNORE INTO \`user\` (\`user_id\`, \`username\`, \`fullname\`, \`email\`, \`password\`, \`role\`, \`phone\`) VALUES
      (10, 'faalih', 'Faalih', 'faalih@mail.com', '$2b$10$2Qy8y06Mn/B5/nVsY3fDjupVNZ1cIUqI4ZqXwgYWxCtmZ3jmCgDgm', 'client', '081200000010'),
      (11, 'budi', 'Budi', 'budi@mail.com', '$2b$10$2Qy8y06Mn/B5/nVsY3fDjupVNZ1cIUqI4ZqXwgYWxCtmZ3jmCgDgm', 'client', '081200000011'),
      (12, 'siti', 'Siti', 'siti@mail.com', '$2b$10$2Qy8y06Mn/B5/nVsY3fDjupVNZ1cIUqI4ZqXwgYWxCtmZ3jmCgDgm', 'client', '081200000012'),
      (13, 'andi', 'Andi', 'andi@mail.com', '$2b$10$2Qy8y06Mn/B5/nVsY3fDjupVNZ1cIUqI4ZqXwgYWxCtmZ3jmCgDgm', 'client', '081200000013'),
      (14, 'rahma', 'Rahma', 'rahma@mail.com', '$2b$10$2Qy8y06Mn/B5/nVsY3fDjupVNZ1cIUqI4ZqXwgYWxCtmZ3jmCgDgm', 'client', '081200000014'),
      (15, 'ahmad', 'Ahmad', 'ahmad@mail.com', '$2b$10$2Qy8y06Mn/B5/nVsY3fDjupVNZ1cIUqI4ZqXwgYWxCtmZ3jmCgDgm', 'client', '081200000015');
    `);

    const query = `
      INSERT IGNORE INTO \`transaction\` (\`transaction_id\`, \`user_id\`, \`location\`, \`amount\`, \`status\`, \`created_at\`) VALUES
      (10293, 10, 'Jakarta (Wisuda Premium)', 200000.00, 'awaiting_dp_verification', '2026-06-20 10:00:00'),
      (10294, 11, 'Bandung (Wedding Standard)', 350000.00, 'dp_paid', '2026-06-21 11:00:00'),
      (10295, 12, 'Surabaya (Prewedding)', 500000.00, 'fully_paid', '2026-06-22 12:00:00'),
      (10296, 13, 'Bali (Event Silver)', 150000.00, 'rejected', '2026-06-23 13:00:00'),
      (1, 14, 'UI Depok - 2025-10-21 10:00 (Wisuda Platinum)', 350000.00, 'unpaid', '2026-06-24 10:00:00'),
      (2, 15, 'Jakarta Selatan - 2025-10-23 13:00 (Event Documentation)', 500000.00, 'unpaid', '2026-06-24 11:00:00');
    `;
    await db.query(query);
    console.log('✅ Transactions seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding transactions:', error);
    throw error;
  }
};

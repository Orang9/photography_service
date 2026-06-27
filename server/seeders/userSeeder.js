import db from '../src/config/mysql.js';

export const seedUsers = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`user\` (\`user_id\`, \`username\`, \`fullname\`, \`email\`, \`password\`, \`role\`, \`phone\`) VALUES
      (1, 'anna01', 'Anna', 'anna@mail.com', 'client123', 'client', '081200000003'),
      (2, 'qia01', 'Qia', 'qia@mail.com', 'client123', 'client', '081200000004'),
      (3, 'Fika', 'Egbert Felica Wibianto', '1232001032@student.bakrie.ac.id', '123456789', 'admin', '085799335009');
    `;
    await db.query(query);
    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};

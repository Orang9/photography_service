import db from '../src/config/mysql.js';

export const seedPackages = async () => {
  try {
    const query = `
      INSERT IGNORE INTO \`package\` (\`package_id\`, \`photographer_id\`, \`name\`, \`description\`, \`price\`) VALUES
      (1, 1, 'Paket Al-Bayan', 'Paket foto wisuda 1 jam dengan 1 spot foto. Cocok untuk dokumentasi singkat namun berkesan.', 200000.00),
      (2, 1, 'Paket Al-Burhan', 'Paket foto wisuda 2 jam dengan 2–3 spot foto. Fleksibel dan ideal untuk berbagai konsep.', 350000.00),
      (3, 1, 'Paket Al-Hidayah', 'Paket foto wisuda 3 jam dengan lokasi fleksibel area Jabodetabek dan coverage lebih luas.', 650000.00);
    `;
    await db.query(query);
    console.log('✅ Packages seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding packages:', error);
    throw error;
  }
};

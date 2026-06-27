import db from '../src/config/mysql.js';
import { seedUsers } from './userSeeder.js';
import { seedPhotographers } from './photographerSeeder.js';
import { seedTransactions } from './transactionSeeder.js';
import { seedSchedules } from './scheduleSeeder.js';
import { seedPackages } from './packageSeeder.js';
import { seedJobs } from './jobSeeder.js';
import { seedResults } from './resultSeeder.js';
import { seedResultFiles } from './resultfileSeeder.js';

const runSeeders = async () => {
  console.log('🌱 Starting database seeding process...\n');
  try {
    // Execution order matters due to foreign key constraints
    
    // Level 1: No dependencies
    await seedUsers();
    await seedPhotographers();
    
    // Level 2: Depends on Level 1
    await seedTransactions(); // depends on user
    await seedSchedules(); // depends on photographer
    await seedPackages(); // depends on photographer
    
    // Level 3: Depends on Level 1 & 2
    await seedJobs(); // depends on transaction, photographer
    
    // Level 4: Depends on Level 3
    await seedResults(); // depends on job
    
    // Level 5: Depends on Level 4
    await seedResultFiles(); // depends on result
    
    console.log('\n✅ All seeders executed successfully!');
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
  } finally {
    // Close the database connection
    if (db && db.end) {
      await db.end();
      console.log('🔌 Database connection closed.');
    }
    process.exit(0);
  }
};

runSeeders();

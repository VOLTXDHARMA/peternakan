import { db } from '../config/database.js';

async function addUmkmIdColumn() {
  try {
    console.log('Adding umkm_id column to ternak table...');
    
    await db.query(`
      DO $$
      BEGIN
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'ternak' AND column_name = 'umkm_id'
          ) THEN
              ALTER TABLE ternak 
              ADD COLUMN umkm_id INTEGER REFERENCES umkm(id) ON DELETE SET NULL;
              RAISE NOTICE 'Column umkm_id added successfully';
          ELSE
              RAISE NOTICE 'Column umkm_id already exists';
          END IF;
      END$$;
    `);
    
    console.log('✅ Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

addUmkmIdColumn();

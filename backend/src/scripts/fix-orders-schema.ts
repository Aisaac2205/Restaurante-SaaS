import pool from '../config/db';

const fixSchema = async () => {
    try {
        console.log('Applying schema fixes to orders table...');

        // 1. Add payment_method if not exists
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='payment_method') THEN 
                    ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'cash'; 
                END IF;
            END $$;
        `);

        // 2. Add delivery_address
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='delivery_address') THEN 
                    ALTER TABLE orders ADD COLUMN delivery_address TEXT; 
                END IF;
            END $$;
        `);

        // 3. Add delivery_method (pickup/delivery)
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='orders' AND column_name='delivery_method') THEN 
                    ALTER TABLE orders ADD COLUMN delivery_method VARCHAR(20) DEFAULT 'pickup'; 
                END IF;
            END $$;
        `);

        console.log('Schema fixes applied successfully.');
    } catch (err) {
        console.error('Error applying schema fixes:', err);
    } finally {
        await pool.end();
    }
};

fixSchema();

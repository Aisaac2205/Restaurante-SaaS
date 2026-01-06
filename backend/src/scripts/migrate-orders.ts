import pool from '../config/db';

const createOrdersTables = async () => {
    const client = await pool.connect();
    try {
        console.log('Starting Orders DB Migration...');
        await client.query('BEGIN');

        // Create Orders Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
                customer_name VARCHAR(255) NOT NULL,
                table_number VARCHAR(50),
                total DECIMAL(10, 2) NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'pending', -- pending, preparing, ready, delivered, cancelled
                payment_method VARCHAR(50) NOT NULL DEFAULT 'cash', -- cash, card
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `);
        console.log('Created "orders" table.');

        // Create Order Items Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS order_items (
                id SERIAL PRIMARY KEY,
                order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
                product_id INTEGER NOT NULL REFERENCES products(id),
                quantity INTEGER NOT NULL,
                price DECIMAL(10, 2) NOT NULL, -- Price at moment of purchase
                subtotal DECIMAL(10, 2) NOT NULL
            );
        `);
        console.log('Created "order_items" table.');

        await client.query('COMMIT');
        console.log('Migration completed successfully.');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Migration failed:', error);
    } finally {
        client.release();
        process.exit();
    }
};

createOrdersTables();

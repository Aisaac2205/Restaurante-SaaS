import pool from '../config/db';

const listRestaurants = async () => {
    try {
        const res = await pool.query('SELECT id, name, slug FROM restaurants');
        console.log('Restaurantes encontrados in DB:');
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error('Error querying database:', err);
    } finally {
        await pool.end();
    }
};

listRestaurants();

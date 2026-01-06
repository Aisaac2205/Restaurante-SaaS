import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testFlow() {
    try {
        console.log('1. Logging in...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: 'bk@example.com',
            password: '123456'
        });

        const token = loginRes.data.token;
        console.log('Login successful. Token obtained.');

        const headers = { Authorization: `Bearer ${token}` };

        console.log('2. Creating Category...');
        const catRes = await axios.post(`${API_URL}/categories`, {
            name: 'Test Category Node',
            sort_order: 1
        }, { headers });

        console.log('Category created:', catRes.data);

        console.log('3. Deleting Category...');
        await axios.delete(`${API_URL}/categories/${catRes.data.id}`, { headers });
        console.log('Category deleted.');

        console.log('--- TEST PASSED ---');

    } catch (error: any) {
        console.error('TEST FAILED');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testFlow();

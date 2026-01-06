const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/api';

export const api = {
    post: async (path: string, body: any) => {
        const res = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('API Request Failed');
        return res.json();
    }
};

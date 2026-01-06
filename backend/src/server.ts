import app from './app';
import dotenv from 'dotenv';
import path from 'path';

// Asegurar que las variables de entorno estén cargadas
dotenv.config({ path: path.join(__dirname, '../.env') });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from '@astrojs/react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: node({
        mode: 'standalone'
    }),
    integrations: [
        react()
    ],
    server: {
        port: 4321,
        host: true
    },
    prefetch: true,
    vite: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src")
            }
        },
        ssr: {
            noExternal: ['swiper']
        }
    }
});

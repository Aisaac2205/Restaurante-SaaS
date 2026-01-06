/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Personalización para Shadcn o colores del sistema
                primary: "var(--primary)",
            }
        },
    },
    plugins: [],
}

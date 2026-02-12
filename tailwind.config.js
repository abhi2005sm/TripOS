/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    dark: '#0B0F1A',
                    card: '#121A2F',
                },
                primary: {
                    DEFAULT: '#3B82F6', // Fallback
                    accent: '#06b6d4',
                },
                text: {
                    primary: '#E6EAF2',
                    secondary: '#9AA4BF',
                },
                danger: '#EF4444',
            },
            fontFamily: {
                sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(to right, #3B82F6, #06b6d4)',
                'gradient-dark': 'linear-gradient(to bottom, #0B0F1A, #0E1424)',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
            },
            backdropBlur: {
                'xs': '2px',
            }
        },
    },
    plugins: [],
}

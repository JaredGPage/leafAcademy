import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        border: 'borderAnim 4s linear infinite',
      },
      keyframes: {
        borderAnim: {
          '0%': { clipPath: 'inset(0% 100% 100% 0%)' },
          '25%': { clipPath: 'inset(0% 0% 100% 0%)' },
          '50%': { clipPath: 'inset(0% 0% 0% 0%)' },
          '75%': { clipPath: 'inset(0% 0% 0% 100%)' },
          '100%': { clipPath: 'inset(100% 0% 0% 0%)' },
        },
      
      },
      colors:{
        leafblue:{
          100: "#118df0",
          200: "#41a4f3",
          300: "#0c71c2",
          400: "#71bbf6",
        }
      }
    },
  },
  plugins: [],
} satisfies Config;

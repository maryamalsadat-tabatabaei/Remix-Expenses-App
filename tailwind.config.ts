import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color-10": "var(--color-primary-10)",
        "primary-color-50": "var(--color-primary-50)",
        "primary-color-100": "var(--color-primary-100)",
        "primary-color-200": "var(--color-primary-200)",
        "primary-color-300": "var(--color-primary-300)",
        "primary-color-400": "var(--color-primary-400)",
        "primary-color-500": "var(--color-primary-500)",
        "primary-color-600": "var(--color-primary-600)",
        "primary-color-700": "var(--color-primary-700)",
        "primary-color-800": "var(--color-primary-800)",
        "secondary-color-50": "var(--color-secondary-50)",
        "secondary-color-100": "var(--color-secondary-100)",
        "secondary-color-200": "var(--color-secondary-200)",
        "secondary-color-300": "var(--color-secondary-300)",
        "secondary-color-400": "var(--color-secondary-400)",
        "secondary-color-500": "var(--color-secondary-500)",
        "secondary-color-600": "var(--color-secondary-600)",
        "gray-color-10": "var(--color-gray-10)",
        "gray-color-50": "var(--color-gray-50)",
        "gray-color-100": "var(--color-gray-100)",
        "gray-color-200": "var(--color-gray-200)",
        "gray-color-300": "var(--color-gray-300)",
        "gray-color-400": "var(--color-gray-400)",
        "gray-color-500": "var(--color-gray-500)",
        "gray-color-600": "var(--color-gray-600)",
        "gray-color-700": "var(--color-gray-700)",
        "gray-color-800": "var(--color-gray-800)",
        "gray-color-900": "var(--color-gray-900)",
      },
      fontFamily: {
        roboto: [
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      keyframes: {
        "fade-blur-in": {
          from: {
            opacity: "0",
            filter: "blur(1rem)",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-slide-in": {
          from: {
            opacity: "0",
            transform: "translateY(-2rem)",
          },
          to: {
            opacity: "1",
          },
        },
        "fade-slide-up": {
          from: {
            opacity: "0",
            transform: "translateY(1rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-slide-down": {
          from: {
            opacity: "0",
            transform: "translateY(-1rem)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },

      animation: {
        "fade-blur-in": "fade-blur-in 1s ease-out forwards",
        "fade-slide-in": "fade-slide-in 1s ease-out forwards",
        "fade-slide-up": "fade-slide-up 1.5s ease-out forwards",
        "fade-slide-down": "fade-slide-down 1.5s ease-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;

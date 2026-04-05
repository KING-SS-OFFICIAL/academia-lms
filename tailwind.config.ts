import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006c52",
          container: "#1de9b6",
          light: "#4db6ac",
          dark: "#004d40",
          "fixed": "#45fec9",
          "fixed-dim": "#00e1ae",
        },
        secondary: {
          DEFAULT: "#2e6955",
          container: "#afedd3",
          "fixed": "#b2efd6",
          "fixed-dim": "#97d3bb",
        },
        tertiary: {
          DEFAULT: "#7c5800",
          container: "#ffc554",
          "fixed": "#ffdea7",
          "fixed-dim": "#f6bd4d",
        },
        surface: {
          DEFAULT: "#f3fcf5",
          dim: "#d3dcd6",
          bright: "#f3fcf5",
          variant: "#dce5df",
          container: {
            DEFAULT: "#e7f0ea",
            lowest: "#ffffff",
            low: "#edf6ef",
            high: "#e1eae4",
            highest: "#dce5df",
          },
        },
        on: {
          primary: "#ffffff",
          "primary-container": "#00644c",
          "primary-fixed": "#002117",
          "primary-fixed-variant": "#00513d",
          secondary: "#ffffff",
          "secondary-container": "#326d59",
          "secondary-fixed": "#002117",
          "secondary-fixed-variant": "#10503e",
          tertiary: "#ffffff",
          "tertiary-container": "#735200",
          "tertiary-fixed": "#271900",
          "tertiary-fixed-variant": "#5e4200",
          surface: "#151d1a",
          "surface-variant": "#3b4a43",
          background: "#151d1a",
          error: "#ffffff",
          "error-container": "#93000a",
        },
        outline: {
          DEFAULT: "#6b7b73",
          variant: "#bacac1",
        },
        error: {
          DEFAULT: "#ba1a1a",
          container: "#ffdad6",
        },
        inverse: {
          primary: "#00e1ae",
          surface: "#2a322e",
          "on-surface": "#eaf3ed",
        },
        background: "#f3fcf5",
      },
      fontFamily: {
        headline: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Manrope", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glow: "0 0 30px rgba(29, 233, 182, 0.25)",
        "glow-sm": "0 0 15px rgba(29, 233, 182, 0.15)",
        card: "0 8px 32px 0 rgba(0, 108, 82, 0.04)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cs-black": "#080810",
        "cs-dark": "#0d0d1a",
        "cs-card": "rgba(15, 15, 30, 0.7)",
        "cs-neon": "#b06dff",
        "cs-cyan": "#00e5ff",
        "cs-pink": "#ff2d78",
        "cs-muted": "#6b6b8a",
        "cs-glass": "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "noise": "url('/noise.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "neon": "0 0 20px rgba(176,109,255,0.4), 0 0 60px rgba(176,109,255,0.15)",
        "neon-cyan": "0 0 20px rgba(0,229,255,0.4), 0 0 60px rgba(0,229,255,0.1)",
        "neon-pink": "0 0 20px rgba(255,45,120,0.4), 0 0 60px rgba(255,45,120,0.1)",
        "glass": "0 8px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

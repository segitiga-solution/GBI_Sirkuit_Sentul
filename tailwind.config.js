/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },

    extend: {
      colors: {
        brand: {
          amber: "#F59E0B",
          amberDark: "#D97706",
          gold: "#FBBF24",
          rose: "#E11D48",
          blue: "#2563EB",
          indigo: "#4338CA",
        },
      },

      borderRadius: {
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },

      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.08)",
        premium: "0 10px 40px rgba(0,0,0,0.12)",
        glow: "0 0 35px rgba(245, 158, 11, 0.35)", // amber glow
        roseGlow: "0 0 35px rgba(225, 29, 72, 0.35)",
        blueGlow: "0 0 35px rgba(37, 99, 235, 0.35)",
      },

      backdropBlur: {
        xs: "2px",
      },

      animation: {
        fadeIn: "fadeIn 1.2s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        fadeSlow: "fadeSlow 2.5s ease-in-out",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeSlow: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
}

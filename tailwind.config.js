/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        sm: "16px",
        md: "24px",
        lg: "24px",
        xl: "24px",
        "2xl": "24px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1100px",
        "2xl": "1100px",
      },
    },
    extend: {
      colors: {
        brand: {
          primary: "#1E3A5F",
          primaryHover: "#163047",
          background: "#F4F7FA",
          surface: "#FFFFFF",
        },
        text: {
          primary: "#1F2933",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          inverse: "#FFFFFF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          strong: "#CBD5E1",
        },
        status: {
          success: "#1B5E20",
          danger: "#B91C1C",
          warning: "#B45309",
          info: "#1E40AF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["20px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        body: ["16px", { lineHeight: "1.6" }],
        label: ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        help: ["13px", { lineHeight: "1.4" }],
        small: ["12px", { lineHeight: "1.4" }],
      },
      borderRadius: {
        md: "8px",
        lg: "10px",
        xl: "12px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.05)",
        card: "0 4px 16px rgba(0,0,0,0.06)",
        focus: "0 0 0 3px rgba(30,58,95,0.25)",
      },
      spacing: {
        section: "48px",
        card: "24px",
      },
    },
  },
  plugins: [],
};

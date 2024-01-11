/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font)"]
    },
    extend: {
      colors: {
        background: "var(--background)",
        secondary: "var(--secondary)",
        primary: "var(--primary)",
        text: "var(--text)",
        textInverse: "var(--textInverse)",
        transparent: "transparent"
      },
      fontFamily: {
        title: "Poppins"
      }
    }
  }
}


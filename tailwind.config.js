module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#000000",
        },
        primary: {
          DEFAULT: "#409EFF",
        },
        gray: {
          DEFAULT: "#dcdfe6",
        },
        green: {
          DEFAULT: "#67C23A",
        },
        red: {
          DEFAULT: "#F56C6C",
        },
        orange: {
          DEFAULT: "#E6A23C",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

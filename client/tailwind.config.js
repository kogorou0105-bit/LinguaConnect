// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "mb-4",
    "gap-2",
    "gap-3",
    "flex-wrap",
    "text-sm", // 👈 你的组件中常用的类
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

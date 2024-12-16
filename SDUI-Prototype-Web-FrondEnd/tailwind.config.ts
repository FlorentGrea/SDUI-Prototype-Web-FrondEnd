import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'md:w-[400px]',
    'md:rounded-t-[12px]',
    'md:hidden',
    'bg-gray-300',
    'h-[1px]',
    'md:p-2',
    'min-[400px]:w-[40px]',
    'min-[400px]:h-[40px]',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;

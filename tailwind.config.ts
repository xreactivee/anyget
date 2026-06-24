import type { Config } from "tailwindcss";

const config: Config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-poppins)"],
            },
        },
    },
};

export default config;
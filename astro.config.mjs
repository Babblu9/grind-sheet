import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://grindsheet.vercel.app', // Update this with your actual domain
    output: 'static',
    integrations: [
        react(),
        tailwind({
            applyBaseStyles: false,
        }),
        sitemap(),
    ],
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto',
    },
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp',
        },
    },
});

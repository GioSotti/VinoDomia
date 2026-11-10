import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    modules: ['@shuriken-ui/nuxt', '@nuxt/eslint'],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            htmlAttrs: {lang: 'fr'},
            title: 'VinoDomia',
            link: [
                {rel: 'icon', type: 'image/svg+xml', href: '/images/icone/favicon.svg'},
                {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/icone/favicon-32.png'},
                {rel: 'apple-touch-icon', href: '/images/icone/icone-app-sable-180.png'},
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap',
                },
            ],
        },
    },
    runtimeConfig: {
        jwtSecret: '',
    },
    vite: {
        plugins: [
            tailwindcss(),
        ]
    }
})

import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

// Fontawesome Components
import {
    FontAwesomeIcon,
    FontAwesomeLayers,
    FontAwesomeLayersText,
} from '@fortawesome/vue-fontawesome' // Fontawesome componentlerini tanımlıyoruz.
import "./sources/icons" // icons.js i import ediyoruz.

// i18n

import { createI18n } from "vue-i18n";
import translateTr from "./Langs/tr.json";
import translateEn from "./Langs/en.json";

const i18n = createI18n({
    legacy: false, // you must specify 'legacy: false' option
    locale: 'tr', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages: {
        tr: translateTr, // set locale messages
        en: translateEn, // set locale messages
    }
 });


const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .component('font-awesome-icon', FontAwesomeIcon) // global olarak ekledik.
            .component('font-awesome-layers', FontAwesomeLayers) //layer ve layertext i global olarak import ediyoruz.
            .component('font-awesome-layers-text', FontAwesomeLayersText)
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(i18n)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});

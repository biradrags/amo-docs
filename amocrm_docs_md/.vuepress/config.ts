import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "ru-RU",
  title: "amoCRM Developer Docs (AI-friendly)",
  description: "Документация для разработчиков amoCRM - AI-friendly версия для работы с LLM и агентами",
  head: [
    ['meta', { name: 'robots', content: 'noindex, nofollow' }],
    ['meta', { charset: 'UTF-8' }],
    ['link', { rel: 'canonical', href: 'https://www.amocrm.ru/developers/content/' }],
  ],
  theme
});



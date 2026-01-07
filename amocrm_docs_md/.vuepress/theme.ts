import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  hostname: "https://amo-docs.fly.dev",
  docsDir: "amocrm_docs_md",
  sidebar: "structure",
  navbar: [
    {
      text: "Главная",
      link: "/",
    },
    {
      text: "API Reference",
      link: "/crm_platform/api-reference.html",
    },
    {
      text: "Интеграции",
      link: "/integrations/intro.html",
    },
    {
      text: "OAuth",
      link: "/oauth/oauth.html",
    },
    {
      text: "Ресурсы",
      children: [
        {
          text: "🤖 AI Index (llms.txt)",
          link: "https://amo-docs.fly.dev/llms.txt",
        },
        {
          text: "📖 Официальная документация",
          link: "https://www.amocrm.ru/developers/content/",
        },
        {
          text: "💻 GitHub",
          link: "https://github.com/biradrags/amo-docs",
        },
      ],
    },
  ],
  displayFooter: true,
  footer: '⚠️ Это НЕ официальная документация amoCRM. <a href="https://www.amocrm.ru/developers/content/" target="_blank">Официальная версия</a> | <a href="https://github.com/biradrags/amo-docs" target="_blank">GitHub</a>',
  copyright: "amoCRM © 2009-2026 QSOFT. Эта версия создана для удобства работы с документацией.",
});



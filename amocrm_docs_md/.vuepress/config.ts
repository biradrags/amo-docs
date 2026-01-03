import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "ru-RU",
  title: "amoCRM Docs",
  description: "Локальное зеркало документации amoCRM",
  theme
});



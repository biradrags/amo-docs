---
home: true
title: amoCRM Developer Documentation
heroText: amoCRM Developer Docs
tagline: Документация для разработчиков (AI-friendly версия)
actions:
  - text: Начать работу
    link: /crm_platform/platform-abilities.html
    type: primary
  - text: GitHub
    link: https://github.com/biradrags/amo-docs
    type: secondary
features:
  - title: CRM Platform API
    details: Полное API для работы с amoCRM - сделки, контакты, компании, задачи и многое другое
    link: /crm_platform/api-reference.html
  - title: Интеграции и виджеты
    details: Создание интеграций, виджетов и расширений для amoCRM
    link: /integrations/intro.html
  - title: OAuth 2.0
    details: Авторизация и аутентификация через OAuth 2.0
    link: /oauth/oauth.html
  - title: Webhooks
    details: Получение уведомлений о событиях в amoCRM
    link: /crm_platform/webhooks-format.html
  - title: Телефония
    details: Интеграция телефонии с amoCRM
    link: /telephony/capabilities-2.html
  - title: Чаты
    details: API для работы с чатами и мессенджерами
    link: /chats/chat-capabilities.html
footer: false
---

## ⚠️ Важное предупреждение

:::danger Это НЕ официальная документация
Это автоматически сгенерированная версия документации amoCRM, оптимизированная для парсинга AI-агентами и LLM.

**Официальная документация amoCRM:** [https://www.amocrm.ru/developers/content/](https://www.amocrm.ru/developers/content/)

При возникновении противоречий между этой версией и оригиналом, приоритет имеет **официальная документация на сайте amoCRM**.
:::

## 📚 Основные разделы

### [CRM Platform](/crm_platform/)
- [Возможности платформы](/crm_platform/platform-abilities.html)
- [API Reference](/crm_platform/api-reference.html)
- [Сделки (Leads)](/crm_platform/leads-api.html)
- [Контакты](/crm_platform/contacts-api.html)
- [Компании](/crm_platform/companies-api.html)
- [Задачи](/crm_platform/tasks-api.html)
- [События и примечания](/crm_platform/events-and-notes.html)
- [Webhooks](/crm_platform/webhooks-format.html)
- [Виджеты](/crm_platform/widgets-api.html)

### [Интеграции](/integrations/)
- [Введение](/integrations/intro.html)
- [Структура виджета](/integrations/structure.html)
- [JavaScript SDK](/integrations/js_sdk.html)
- [Модерация интеграций](/integrations/moderation.html)
- [Salesbot виджеты](/integrations/salesbot_widget.html)

### [OAuth 2.0](/oauth/)
- [Обзор OAuth 2.0](/oauth/oauth.html)
- [Пошаговая инструкция](/oauth/step-by-step.html)
- [Кнопка авторизации](/oauth/button.html)
- [Права доступа (Scopes)](/oauth/scopes.html)

### [Digital Pipeline](/digital_pipeline/)
- [Интеграции для Digital Pipeline](/digital_pipeline/integrations.html)
- [Salesbot](/digital_pipeline/salesbot.html)
- [Webhooks](/digital_pipeline/webhooks.html)

### [Телефония](/telephony/)
- [Возможности](/telephony/capabilities-2.html)
- [Пример интеграции](/telephony/integration.html)
- [События звонков](/telephony/call_event.html)

### [Чаты](/chats/)
- [Возможности Chat API](/chats/chat-capabilities.html)
- [Методы API](/chats/chat-api-reference.html)
- [Webhooks чатов](/chats/chat-webhooks.html)
- [Пошаговый пример](/chats/chat-step-by-step.html)

### [Каталоги](/catalogs/)
- [Возможности](/catalogs/capabilities.html)
- [Работа с каталогами](/catalogs/catalogs.html)
- [Товары](/catalogs/products.html)

### [Уведомления](/notifications/)
- [Центр уведомлений](/notifications/center_capabilities.html)
- [Добавление уведомлений](/notifications/adding_notifications.html)
- [Подписка на уведомления](/notifications/js-subscribe.html)

### [Web SDK](/web_sdk/)
- [Начало работы](/web_sdk/start.html)
- [Интерфейс карточки](/web_sdk/card.html)
- [Интерфейс списков](/web_sdk/list.html)
- [Настройки](/web_sdk/settings.html)

## 🤖 Для AI и LLM

Эта документация оптимизирована для использования с AI-агентами и языковыми моделями:

- **[llms.txt](/llms.txt)** - структурированный индекс всей документации для AI
- Все внутренние ссылки конвертированы в локальные пути
- Markdown-формат для легкого парсинга
- Сохранена вся структура и примеры кода

## 🔗 Ссылки

- 📖 **Официальная документация:** [https://www.amocrm.ru/developers/content/](https://www.amocrm.ru/developers/content/)
- 💻 **Исходный код:** [https://github.com/biradrags/amo-docs](https://github.com/biradrags/amo-docs)
- 🤖 **AI-индекс:** [/llms.txt](/llms.txt)

## 📄 Авторские права

Вся документация принадлежит **amoCRM** (QSOFT © 2009-2026).

Этот репозиторий создан исключительно для удобства работы с документацией и не претендует на права на контент.

## 🛠️ Обновление документации

Для обновления документации с официального сайта используй crawler:

```bash
node crawl_amocrm_docs.mjs
```

---

*Последнее обновление: 2026*


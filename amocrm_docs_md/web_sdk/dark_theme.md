<!-- https://www.amocrm.ru/developers/content/web_sdk/dark_theme -->

# Темная тема

### Оглавление

*   [Использование переменных в темной теме](/web_sdk/dark_theme#%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%B2-%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%D0%B9-%D1%82%D0%B5%D0%BC%D0%B5.html)
*   [Пример реализации темной темы](/web_sdk/dark_theme#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8.html)
*   [Правила для интеграторов](/web_sdk/dark_theme#%D0%9F%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D0%B4%D0%BB%D1%8F-%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%BE%D0%B2.html)
*   [Кастомные переменные для интеграций](/web_sdk/dark_theme#%D0%9A%D0%B0%D1%81%D1%82%D0%BE%D0%BC%D0%BD%D1%8B%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%B9.html)
*   [Пример переменных для цветов](/web_sdk/dark_theme#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D1%85-%D0%B4%D0%BB%D1%8F-%D1%86%D0%B2%D0%B5%D1%82%D0%BE%D0%B2.html)
*   [Пример для светлой темы](/web_sdk/dark_theme#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B4%D0%BB%D1%8F-%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D0%BE%D0%B9-%D1%82%D0%B5%D0%BC%D1%8B.html)
*   [Пример для темной темы](/web_sdk/dark_theme#%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B4%D0%BB%D1%8F-%D1%82%D0%B5%D0%BC%D0%BD%D0%BE%D0%B9-%D1%82%D0%B5%D0%BC%D1%8B.html)

Если вы нажмете на аватарку вашего профиля, расположенную в верхнем левом углу экрана, в правом углу появится возможность выбрать тему интерфейса: светлую или тёмную. Вы можете выбрать одну из тем вручную или настроить автоматическое переключение, чтобы темная тема активировалась в соответствии с настройками вашей операционной системы.

![](https://i.postimg.cc/3JH9zyn8/dark-theme.webp)

Тёмная тема является возможностью системы amoCRM, которая позволяет пользователям настроить интерфейс под свои предпочтения. Для успешной интеграции с темной темой необходимо использовать предопределенные переменные, объявленные в CSS, и соблюдать определенные правила, чтобы гарантировать совместимость и целостность дизайна.

### Использование переменных в темной теме:

Тёмная тема в amoCRM опирается на использование переменных, которые объявлены в CSS. Эти переменные предоставляют возможность настраивать цвета и стилизационные параметры интерфейса. Для доступа к этим переменным необходимо обратиться к макету в [Figma](https://www.figma.com/file/McUonLMFEayitn5xNqMsqz/amoCRM-Colors?type=design&node-id=0-1&mode=design), где они будут подробно описаны и продемонстрированы.

### Пример реализации

В качестве примера будем использовать input.  
![](https://i.postimg.cc/tJR17K6h/white-input.png)  
![](https://i.postimg.cc/T3nRMkLG/dark-input.png)

```css
.input {
  color: var(--palette-text-secondary-dark);
  border: 1px solid var(--palette-border-default);
  background-color: var(--palette-background-primary);
}
```

### Правила для интеграторов:

При разработке интеграции с темной темой в amoCRM необходимо соблюдать следующие правила:

1.  Желательно использовать предоставленные переменные: это гарантирует согласованность и стабильность внешнего вида системы и предотвращает возможные конфликты и ошибки, но если у вас есть свои корпоративные цвета и вам не подходят наши, то нужно использовать [данное решение](/web_sdk/dark_theme#%D0%9A%D0%B0%D1%81%D1%82%D0%BE%D0%BC%D0%BD%D1%8B%D0%B5-%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B4%D0%BB%D1%8F-%D0%B8%D0%BD%D1%82%D0%B5%D0%B3%D1%80%D0%B0%D1%86%D0%B8%D0%B9.html).
2.  Не переопределять переменные: интеграторам не разрешается переопределять предопределенные переменные, объявленные в CSS темной темы. Это позволяет сохранить целостность стилей и избежать несовместимости с обновлениями системы.
3.  Использование переменных только для соответствующих элементов: переменные, связанные с текстом, рамками и фоном, должны использоваться только для соответствующих элементов в интерфейсе. Например, переменные, определенные для текста, могут быть применены только к элементам, содержащим текст, и не должны использоваться для изменения других стилей.

### Кастомные переменные для интеграций

Поддержка темной и светлой темы реализована через data-атрибут тега html “\[data-color-scheme="dark"\]”. В системе используются переменные для цветов объявленные через :root. Вам нужно использовать уникальные переменные, например, можно включать код своего виджета в название переменной.

### Пример переменных для цветов

```css
:root {
  --example-code-widget-color-white: #ffffff;
  --example-code-widget-color-anti-flash-white: #f2f2f2;
  --example-code-widget-color-cultured: #f5f5f5;
  --example-code-widget-color-onyx: #363b44;
  --example-code-widget-color-dark-gunmetal: #0f2231;
  --example-code-widget-color-spanish-gray: #92989b;
  --example-code-widget-color-dark-silver: #6b6d72;
}
```

При объявлении переменных для фона и текста, вы должны использовать переменные уже существующих цветов. В частных случаях, можно использовать цвета без переменных.

### Пример для светлой темы

```css
:root {
  --example-code-widget-text-primary: var( --example-code-widget-color-onyx); /* text */
  --example-code-widget-background-default: var(--example-code-widget-color-cultured); /* background */
  --example-code-widget-overlay-background-primary-600: rgba(255, 255, 255, 0.6); /* частный случай с фоном */
}
```

### Пример для темной темы

В темной теме нужно использовать data attribute

```css
:root[data-color-scheme="dark"] {
  --example-code-widget-text-primary: var(--example-code-widget-color-anti-flash-white); /* text */
  --example-code-widget-background-default: var(--example-code-widget-color-dark-gunmetal); /* background */
  --example-code-widget-overlay-background-primary-600: rgba(0, 0, 0, 0.6); /* частный случай с прозрачным */
}
```
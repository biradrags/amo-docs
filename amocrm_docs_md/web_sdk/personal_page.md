<!-- https://www.amocrm.ru/developers/content/web_sdk/personal_page -->

# Кабинет клиента

в amoCRM существует личный кабинет клиента. Активировать его можно на странице “Общие настройки” под настройками левого меню. Там есть отдельная секция.

Данный пункт доступен только для тарифов выше "базового".

![](https://i.postimg.cc/nctN1ndQ/2022-11-14-17-06-49.png)

Для входа необходимо в селекте выбрать виджет для отправки смс. Если есть виджеты конкретного типа, то показывается селект, иначе текст красного цвета со ссылкой, которая ведет на страницу интеграции -> каталог с виджетами для отправки смс.

Авторизация происходит по номеру телефона который клиент указывает в сделке.

В сайдбаре слева находятся данные по сделке, контакты и аккордион с виджетами. Кнопка с виджетами будет доступа только если интеграция настроена для отображения в кабинете клиента.

### Настройка виджета для кабинета клиента

Чтобы виджет маунтился в кабинет клиента необходимо добавить location в **manifest.json**

```javascript
{
  ...

  "locations": [
    "personal_page"  // указываем personal_page
  ],

  ...
}
```

В корневой папке проекта виджета создаем одноименный js файл **personal\_page.js**

**Общий вид personal\_page.js**

```javascript
// Мы используем requirejs для импорта модулей в рантайме
// См. секцию "Объявленные зависимости", чтобы узнать, какие модули предоставлены для импорта.
define(['amocrm-sdk', 'jquery', 'dateformat'], function (initAmocrmWidgetSdk, $, dateFormat) {
  // Этот код выполняется один раз при импорте модуля
  const WidgetSdk = initAmocrmWidgetSdk({
    version: '1.0.0',
  })

  // Чтобы виджет заработал, нужно вернуть объект с колбэками
  return {
    initLead(params) {
      console.warn('WIDGET: initLead with token: ', params.token)

      return () => {
        console.warn('WIDGET: initLead destroyed')
      }
    },
    registerWidgetsBarSlot(el) {
      const $el = $(el)
      const sysData = WidgetSdk.methods.getState(WidgetSdk.constants.PUBLIC_STATE_ENTITIES.sys)
      const formattedTime = dateFormat(Date.now(), sysData.timeFormat)

      $el.text('Hello world!')

      console.warn(`WIDGET registerWidgetsBarSlot inited at ${formattedTime}`)

      return () => {
        console.warn('WIDGET: registerWidgetsBarSlot destroyed')
      }
    },
  }
})
```

### Callbacks:

**_initLead_**

Вызывается сразу после подключения модуля и каждый раз, когда меняется активная сделка.

**Обязательный колбэк**  
**Аргументы**

*   _params (object):_ Параметры сделки.
*   _params.token (string):_ Токен в формате JWT, подписанный client\_secret’ом от интеграции.

**Должен возвращать**

*   _(() => void):_ Колбэк может вернуть функцию, она будет вызвана, когда пользователь покинет активную сделку. Будет гарантировано вызвана до повторного исполнения `initLead`.
*   _(void):_ Можно ничего не возвращать, если нет необходимости подчищать данные при смене аккаунта.

**_registerWidgetsBarSlot_**

Необходим для добавления виджета в боковую панель с виджетами. Будет вызван во время рендера, после того, как завершится `initLead`.

**Обязательный колбэк**  
**Аргументы**

*   _el (HtmlElement):_ Получает html element с классом `WidgetSdk.constants.GLOBAL_CLASS_NAMES.widgetBarItemContainer` для рендера содержимого виджета.

**Должен возвращать**

*   _(() => void):_ Колбэк может вернуть функцию, она будет вызвана, когда приложение задестроет компонент с виджетом.
*   _(void):_ Можно ничего не возвращать, если нет необходимости подчищать данные при дестрое.

### Объявленные зависимости

Модули, которые используются в самом приложении и предоставлены разработчикам виджетов, чтобы не загружать их повторно.

*   amocrm-sdk – См. `initAmocrmWidgetSdk` из следующей секции.
*   import-modules – requirejs обернытый в промис.
*   [jquery](https://github.com/jquery/jquery)
*   [react](https://github.com/facebook/react)
*   [react-dom](https://github.com/facebook/react)
*   [@reduxjs/toolkit](https://github.com/reduxjs/redux-toolkit)
*   [react-redux](https://github.com/reduxjs/react-redux)
*   [immer.produce](https://github.com/immerjs/immer)
*   [immer.current](https://github.com/immerjs/immer)
*   [nanoid](https://github.com/ai/nanoid) – non-secure версия
*   [classnames](https://github.com/JedWatson/classnames)
*   [dateformat](https://github.com/felixge/node-dateformat) – Используется для форматирования дат в проекте.
*   [lodash](https://github.com/lodash/lodash)

### amocrm-sdk

**_initAmocrmWidgetSdk_**

Функция, получаемая с помощью requirejs.

**Аргументы**

*   _options (object)_
*   _options.version (string):_ Обязательно нужно указать версию SDK, которой вы пользуетесь, чтобы избежать проблем с изменением возвращаемого формата.

**Возвращает**

Создает инстанс WidgetSdk следующего вида:

```javascript
type Constants = {
  DATE_FORMATS: {
    americanNormal: 'dd/mm/yyyy',
    americanInversed: 'mm/dd/yyyy',
    russianNormal: 'dd.mm.yyyy',
    chineseNormal: 'yyyy/mm/dd',
  },
  TIME_FORMATS: {
    twelve: 'h:MM TT',
    twentyFour: 'HH:MM',
  },
  SUPPORTED_LANGS: {
    ru: 'ru',
    en: 'en',
    es: 'es',
    pt: 'pt',
  },
  LEAD_FIELD_SOURCES: {
    lead: 'lead',
    contacts: 'contacts',
    company: 'company',
  },
  FIELD_TYPES: {
    text: 'text',
    numeric: 'numeric',
    checkbox: 'checkbox',
    date: 'date',
    select: 'select',
    multiselect: 'multiselect',
    url: 'url',
    textarea: 'textarea',
    radiobutton: 'radiobutton',
    streetaddress: 'streetaddress',
    smartAddress: 'smartAddress',
    legalEntity: 'legalEntity',
    birthday: 'birthday',
    dateTime: 'dateTime',
    multitext: 'multitext',
    budget: 'budget',
  },
  PUBLIC_STATE_ENTITIES: {
    sys: 'sys',
    lead: 'lead',
    leadFields: 'leadFields',
    authors: 'authors',
  },
  // Содержит все имена классов, начинающиеся на `js-`
  GLOBAL_CLASS_NAMES: {
    widgetBarItemContainer: string,
  },
}

type SysModel = {
  currencySymbol: string,
  dateFormat: ValueOf<Constants[DATE_FORMATS]>,
  timeFormat: ValueOf<Constants[TIME_FORMATS]>,
  lang: ValueOf<Constants[SUPPORTED_LANGS]>,
  isRemovalAvailable: boolean,
  logoUrl: string,
  pageTitle: string,
}

type LeadModel = {
  id: string,
  pid: string,
  isLeadLoaded: boolean,
  fieldIds: string[],
  statuses: Array<{
    id: string,
    name: string,
    color: string,
    selected: boolean,
  }>,
  managerId: string,
  contacts: Record<
    string,
    {
      fieldIds: string[],
      id: string,
      userId: string,
    }
  >,
  company: {
    id: string,
    name: string,
    fieldIds: string[],
  } | null,
}

type LeadFieldsModel = Record<
  string,
  {
    id: string,
    fieldId: string,
    fieldSource: ValueOf<Constants[LEAD_FIELD_SOURCES]>,
    name: string,
    type: ValueOf<Constants[FIELD_TYPES]>,
    value: any,
  }
>

type AuthorsModel = Record<
  string,
  {
    id: string,
    avatar: string,
    name: string,
    isBot: boolean,
    isClient: boolean,
  }
>

type RouterQuery = {
  leadId?: string,
  accountId?: string,
}

type WidgetSdk = {
  methods: {
    // Запрашивает данные сущности по её имени
    getState: (entityName: ValueOf<Constants[PUBLIC_STATE_ENTITIES]>) => SysModel | LeadModel | LeadFieldsModel | AuthorsModel | null,
    // Подписывается на изменение данных сущности. Возвращает функцию для подчистки слушателя изменений.
    // Третьим аргументом можно передать дополнительные параметры.
    subscribe: (
      entityName: FirstArgument<typeof getState>,
      callback: (ReturnType<typeof getState>) => void,
      options?: {
        // Если withInitialResult true, то при создании подписки callback будет сразу же вызван с текущим значением.
        withInitialResult?: boolean,
      }
    ) => () => void,
    // Получает динамические id по урлу
    getRouterQuery: () => RouterQuery,
  },
  constants: Constants,
}
```

### Developer utils

Для удобства разработки виджетов мы предоставляем набор вспомогательных функций, что находятся в `window.AMOCRM.developer`. Они созданы для облегчения разработки и не должны находиться в коде финального продукта.

Сейчас доступные методы:

**_addWidget_**

Добавляет виджет в стор приложения кабинет клиента, как это было бы при получении виджета с бэкенда amoCRM. Удобно для проверки js виджета без необходимости открывать интерфейс amoCRM и загружать каждый раз новый архив с правками.

Для подключения виджета с локального компьютера в консоли браузера необходимо выполнить следующий метод (значения аргументов см. ниже):

```js
window.AMOCRM.developer.addWidget({
  script: 'http://localhost:3000',
  token: 'foo',
})
//параметр токен может принимать пустую строку, если тестируется фронт
```

_При переключении сделок, виджет будет сбрасываться и понадобится повторный вызов метода в консоли._  
_При вызове метода будет отображаться только подключаемый виджет. Для отката необходимо обновить страницу._

**Аргументы**

*   _widgetParams (object):_ Параметры виджета в формате, в котором они хранятся на фронте.
*   _widgetParams.script (string):_ Ссылка на js файл вашего виджета.
*   _widgetParams.token (string):_ Имитация токена в формате JWT, что будет передан в колбэк `initLead`.

**Возвращает**

*   _(void)_
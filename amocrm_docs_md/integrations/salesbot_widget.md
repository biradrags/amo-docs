<!-- https://www.amocrm.ru/developers/content/integrations/salesbot_widget -->

# Интеграция виджета в Salesbot

# _Файл manifest.json_

**1.** Указать интерфейс в области видимости

#### Пример:

```javascript
"locations":[
  "salesbot_designer"
],
```

**2.** В сам манифест добавляется объект salesbot\_designer Данный объект описывает поля для отображения интерфейса настроек виджета в конфигураторе

#### Пример:

```javascript
"salesbot_designer": {
  "logo": "/widgets/testWidgetShrek/images/shrek.jpg",
  "handler_name": {
    "name": "settings.handler_name",
    "settings": {
      "text": {
        "name": "settings.text",
        "default_value": "Hello, i am Salesbot!",
        "type": "text", // В зависимости от указанного типа будут
// предложены для выбора поля разного типа. numeric - текстовые и числовые
// поля, text - текстовые поля, url - поля типа текст и ссылка
        "manual": true, // true - пользователь должен ввести значение,
// false - пользователь выбирает значение поля
      },
      "link_to": {
        "name": "settings.link",
        "default_value": "www.amocrm.com",
        "type": "url",
      }
    }
  }
}
```

![](https://i.postimg.cc/pXp83zcS/new-salesbot.png)

### _Файл script.js_

Настройки каждого из handler’ов прописываются в файле manifest.json, а затем уже в готовом виде используются в коде salesbot

Все допустимые параметры handler размещены здесь – [Обработчики Salesbot](/digital_pipeline/salesbot#handlers.html)

События в callbacks:

#### onSalesbotDesignerSave

Метод срабатывает, когда пользователь в конструкторе Salesbot размещает один из хендлеров, описанных в manifest.json Метод должен вернуть строку вида JSON кода salesbot’а

Принимает на вход:

*   handler\_code – Код хендлера объекта в объекте salesbot\_designer
*   params – Передаются настройки виджета формата

```javascript
{
  "text": "Hello, i am Salesbot!",
  "link_to": "www.amocrm.com"
}
```

#### Пример работы метода

```javascript
onSalesbotDesignerSave: function (handler_code, params) {
  var salesbot_source = {
      question: [],
      require: [],
    },
    values = [];
  salesbot_source.question.push({ type: 'text' });

  $.each(params, (param) => {
    values.push(param);
  });

  salesbot_source.question.push({
    values: values,
  });

  salesbot_source.question.push({ accept_unsorted: 'false' });
  return JSON.stringify([salesbot_source]);
};
```

#### salesbotDesignerSettings

Метод рендера содержимого окна настроек виджета, вызываемого из конфигуратора salesbot’a. Метод может вернуть объект с ключом exists, в котором будут содержаться возможные выходы из блока виджета в боте. В массиве exists должны содержаться объекты с ключами code (код выхода) и title (Название выхода).

Принимает на вход:

*   body – Объект DOM
*   renderRow – Функция описана ниже
*   params – Настройки уже созданного хендлера

```javascript
function(caption) {
  return twig({
    ref: '/tmpl/salesbot_designer/controls/widget_param.twig',
  }).render({
    caption: caption,
    is_widget: true,
  });
}
```

#### Пример c jQuery

```javascript
salesbotDesignerSettings: function ($body, renderRow, params) {
  var use_catalog =
      $body
        .find('[data-field-name="invoice_catalog"][name = "value_manual"]')
        .val() == 'true',
    $catalog_switcher = $(renderRow())
      .append(self.langs.invoice_catalog)
      .append(
        self.render(
          {
            ref: '/tmpl/controls/switcher.twig',
          },
          {
            checked: use_catalog,
            custom_class_name: 'switcher_blue',
            id: 'stripe_invoice_catalog',
          },
        ),
      );
  return {
    exits: [
      { code: 'success', title: self.i18n('salesbot').success_callback_title },
      { code: 'fail', title: self.i18n('salesbot').fail_callback_title },
    ],
  };
}
```

#### Пример интеграции с хуками для Salesbot

```javascript
salesbotDesignerSettings: function ($body, rowTemplate, params) {
    // Логика рендера

  return {
    exits: [
      { code: 'success', title: self.i18n('salesbot').success_callback_title },
      { code: 'fail', title: self.i18n('salesbot').fail_callback_title },
    ],
  };
},

onSalesbotDesignerSave: function (handler_code, params) {
  var request_data = {
    message: params.message,
  };

  if (APP.getBaseEntity() === 'customers') {
    request_data.customer = '{{customer.id}}';
  } else {
    request_data.lead = '{{lead.id}}';
  }

  return JSON.stringify([
    {
      question: [
        {
          handler: 'widget_request',
          params: {
            url: 'https://example.com/webhook',
            data: request_data,
          },
        },
        {
          handler: 'goto',
          params: {
            type: 'question',
            step: 1,
          },
        },
      ],
    },
    {
      question: [
        {
          handler: 'conditions',
          params: {
            logic: 'and',
            conditions: [
              {
                term1: '{{json.status}}',
                term2: 'success',
                operation: '=',
              },
            ],
            result: [
              {
                handler: 'exits',
                params: {
                  value: 'success',
                },
              },
            ],
          },
        },
        {
          handler: 'exits',
          params: {
            value: 'fail',
          },
        },
      ],
    },
  ]);
},
```
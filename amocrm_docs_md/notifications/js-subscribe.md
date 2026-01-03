# https://www.amocrm.ru/developers/content/notifications/js-subscribe

Подписка на уведомления

В amoCRM доступен функционал подписки на получение уведомлений.

Он доступен только для виджетов, у которых в manifest.json указан параметр – [init\_once: ‘Y’](https://www.amocrm.ru/developers/content/integrations/areas).

##### Название метода

APP.addNotificationCallback(widget\_code, callback(data))

#### Параметры

| Параметр | Обязательный | Описание |
| --- | --- | --- |
| widget\_code | Да | Код виджета, который подписывается на уведомления |
| callback(data) | Да | Функция для обработки входящих событий |

#### Пример

```

APP.addNotificationCallback('test', function (data) {
console.log(data);
});
```

#### Пример переданного параметра в callback

```

{
  "id": "6ea1aaa1-2633-5832-8550-4665242fc155",
  "entity": null,
  "linked_entity": null,
  "created_at": 1566922308,
  "updated_at": 1566922308,
  "is_read": false,
  "silent": false,
  "body": {
    "title": "Звонок",
    "icon": {
      "call": true,
      "value": "/frontend/images/interface/inbox/notifications_call.svg"
    },
    "rows": [
      {
        "style": "default",
        "text": "+79999999999",
        "class_height": "h3"
      }
    ],
    "actions": {
      "click": {
        "url": "/contacts/add/?phone=+79999999999"
      },
      "buttons": [
        {
          "url": "/contacts/add/?phone=+79999999999",
          "title": "+79999999999",
          "web_link": "/contacts/add/?phone=+79999999999",
          "absolute_link": false
        }
      ],
      "read_on_show": true
    }
  },
  "uuid": "ca6e2205-a591-40d0-bfc6-b48f31bd12fd",
  "notification_id": "6ea1aaa1-2633-5832-8550-4665242fc155",
  "click": {
    "type": "url",
    "value": "/contacts/add/?phone=+79999999999"
  },
  "web_link": "/contacts/add/?phone=+79999999999",
  "absolute_link": false,
  "buttons": [
    {
      "url": "/contacts/add/?phone=+79999999999",
      "title": "+79999999999",
      "web_link": "/contacts/add/?phone=+79999999999",
      "absolute_link": false
    }
  ],
  "notification": true
}
```
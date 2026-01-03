# https://www.amocrm.ru/developers/content/integrations/amoforms-widgets

Виджеты в веб-формах

### Возможности и принципы работы виджетов в веб-формах

Начиная с релиза “Весна 2021”, мы добавили возможность добавлять виджеты в веб-формы

**Начало работы**

Чтобы существующий или новый виджет начал поддерживать функционал работы в веб-формах, вам необходимо добавить новый объект amoforms\_settings и указать дополнительный location amoforms в [файле manifest.json](/developers/content/integrations/structure#manifest).

Location **amoforms**, говорит о том, что виджет готов к работе в веб-формах

#### Параметры объекта amoforms\_settings

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| title | string | Ключ в ланг файле для отображения названия пункта виджета в веб-формах. **Обязательный параметр** |
| required | boolean | Обязательность в веб-формах, прежде чем клиент нажмет обычную кнопку “Отправить”, ему необходимо нажать на кнопку виджета. **Необязательный параметр** |
| error\_text | string | Ключ в ланг файле для отображения ошибки виджета в веб-формах. **Необязательный параметр** |

**Обработка данных клиента**

После того, как клиент нажмет на кнопку виджета, вы можете обработать данные. Для этого необходимо реализовать файл amoforms.js на одном уровне с script.js

#### Пример amoforms.js

```

        
amoFormsWidget(function (params) {
    var result = {};

    console.log(params); // данные о веб-форме
    alert('Модалка');

    setTimeout(() => {
        result.safasf = 123;
    }, 1000);

    // эту функцию мы выполним,
    // когда пользователь нажмет на кнопку отправить
    return function (FORM_REQUEST_ID) {
        // FORM_REQUEST_ID - идентификатор заявки формы
        // его же мы пришлем в хуке при создании/обновлении сделки
        // для этого, вам необходимо подписаться на хуки в Настройки -> Интеграции -> Webhooks
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                // отправляем
                console.log('send data to server', result, FORM_REQUEST_ID);

                resolve({ status: "ok", request_id: FORM_REQUEST_ID });
            }, 2000);
        });
    };
});
        
```

#### Пример входных данных amoFormsWidget, если это обычная веб-форма

```

        
{
    "payload": {
        "accountHash": "7BVxbn2TyWyZuWqTOPBNqlzlxIH7s9RnizIR0oNpFk/BVeUgXyA3bj9lNzXDqT2k",
        "entity": {}
    }
}
        
```

#### Пример входных данных amoFormsWidget, если это индивидуальная или реферальная анкета

```

        
{
    "payload": {
        "accountHash": "7BVxbn2TyWyZuWqTOPBNqlzlxIH7s9RnizIR0oNpFk8OTupMxh4pUpSNzgIBl6dx",
        "entity": {
            "entity_type": 2,
            "entity_id": 10423467
        }
    }
}
        
```

#### Пример расшифровки accountHash с помощью PHP

```

        
$accountHash = '7BVxbn2TyWyZuWqTOPBNqlzlxIH7s9RnizIR0oNpFk8OTupMxh4pUpSNzgIBl6dx'; //Зашифрованный идентификатор аккаунта и формы
$clientSecret = 'PhYB7AUmMYr8InTALNYfvePZY33B6Vqs7UeFyM3sUIMHQMuedGlfX6r8vaSSASDsd'; //client_secret вашей интеграции
$decrypt = openssl_decrypt($accountHash, 'aes-256-cbc', $clientSecret);
var_dump($decrypt);

// Output:
string(40) "{"account_id":12345678,"form_id":12345}"
        
```
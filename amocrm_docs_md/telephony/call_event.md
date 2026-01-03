<!-- https://www.amocrm.ru/developers/content/telephony/call_event -->

# Уведомление о звонке

С помощью метода API можно добавлять уведомление о том, что в данный момент происходит звонок по определенному номеру телефона.

![](https://i.postimg.cc/mkS16pm7/phone-call.png)

При этом система автоматически найдет контакт или компанию с этим номером телефона, а также все связанные сущнонсти и покажет в уведомлении одну из них со следующим приоритетом:

*   если у контакта/компании есть одна активная сделка, и нет связанных покупателей то будет показана сделка
*   если у контакта/компании есть один покупатель и нет активных сделок, то будет показан покупатель
*   в случае если у контакта/компании более одной активной сделки/покупателя или связанные сущности отсутствуют, то будет показана карточка контакта/компании

Если же такого номера в системе еще нет, то в уведомлении будет предложено создать контакт с этим номером.

Этот способ уведомления о звонке позволит не делать лишних запросов на поиск сущностей по номеру телефона через API. Что значительно оптимизирует работу интегрируемых телефоний. Теперь достаточно создать запрос через бэкэнд к данному API методу, передав номер телефона и список пользователей, которые сразу в аккаунте получат уведомление о звонке. И также по описанному выше алгоритму, получат в уведомлении наиболее актуальную в данный момент сущность, связанную с переданным номером телефона.

##### URL метода

_POST /api/v2/events/_

#### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| type _require_ | string | Тип уведомления – phone\_call |
| users | array | int | string | Id пользователей для которых будет отправлено уведомление. Если не передавать этот параметр, то уведомление будет отправлено для всех пользователей |
| phone\_number _require_ | string | Номер телефона на который поступает звонок. Можно передавать в любом формате |

#### Пример запроса

Приведём пример запроса на добавление уведомления.

```json
{
   add: [
      {
         type: "phone_call",
         phone_number: "+79998885533",
         users: [88888, 99999]
      }
   ]
}
```

#### Описание параметров ответа

| Параметр | Тип | Описание |
| --- | --- | --- |
| element\_id | int | null | Уникальный идентификатор сущности для которой было вызвано уведомление, если сущность не была найдена то вернется null |
| element\_type | int | null | Тип сущности для которой было вызвано уведомление, если сущность не была найдена то вернется null |
| uid | string | Уникальный идентификатор уведомления |
| phone\_number | string | Номер телефона по которому вызвано уведомление |

Response Headeres содержит следующие заголовки:

*   Content-Type:application/hal+json

#### Пример ответа

```json
{
   _links: {
      self: {
         href: "/api/v2/events",
         method: "post"
      }
   },
   _embedded: {
      items: [
         {
            element_id: 1234565,
            element_type: 2,
            uid: "0e3455ff-67aa-4779-bebe-66ddc038a4ee",
            phone_number: "+79998885533"
        }
      ]
   }
}
```

Приведём пример запроса для добавления уведомлений о звонке.

#### Пример интеграции на фронтенде

```js
define(['jquery'], function($){
  // Пример виджета, добавляющего уведомления о звонке при рендере
    var CustomWidget = function () {
      var self = this,
          data = {
            add: [{
            type: "phone_call", //тип уведомления
            phone_number: "+78005553535", //номер, на который поступает звонок
            users: [Object.keys(APP.constant('account').users)[0]]
              // id пользователей, которым придет уведомление. Если не указывать, то придет всем пользователям в аккаунте
              // Получить массив id пользователей аккаунта следующим образом: Object.keys(APP.constant('account').users)
            }]
          };
          this.callbacks = {
            render: function() {
              $.ajax({
                url: '/api/v2/events/',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(data)
              }).then(function(res) {
                // res.element_id - уникальный id сущности, для которой было вызвано уведомление
               // res.element_type - тип сущности для которой было вызвано уведомление
               // res.uid - id уведомления
               // res.phone_number - номер телефона, по которому вызвано уведомление
              });

              return true;
            },
            init: function() {
              console.log('init');

              return true;
            },
            settings: function($modal_body) {

              return true;
            },
            onSave: function(){
              console.log('click');

              return true;
            }
          };

        return this;
    };

return CustomWidget;
});
```

#### Пример интеграции на бэкенде

```php
$calls_event['add'] = [
    [
        'phone_number' => '+79998885533',
        'users' => [88888, 99999],
        'type' => 'phone_call'
    ]
];

#Формируем ссылку для запроса
$link = 'https://mysubdomain.amocrm.ru/api/v2/events';

$curl = curl_init(); #Сохраняем дескриптор сеанса cURL
#Устанавливаем необходимые опции для сеанса cURL
curl_setopt($curl, CURLOPT_POST, TRUE);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($curl, CURLOPT_USERAGENT, 'amoCRM-API-client/1.0');
curl_setopt($curl, CURLOPT_HEADER, FALSE);
curl_setopt($curl, CURLOPT_TIMEOUT, 10);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($curl, CURLOPT_URL, $link);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($calls_event));
$out = curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
$code = (int)$code;

$response = json_decode($out, TRUE);

if (count($response ['_embedded'] ['items']) > 0 ) {
    $output .= 'Успешно добавленные звонки:' . PHP_EOL;
    foreach ($response ['_embedded'] ['items'] as $v) {
        $output .= $v . PHP_EOL;
    }
}
```
# https://www.amocrm.ru/developers/content/chats/chat-api-reference

Методы API чатов

В данном разделе собраны все методы для работы с API чатов.

### Оглавление

* [Подключение канала чата в аккаунте](#Подключение-канала-чата-в-аккаунте)
* [Отключение канала чата в аккаунте](#Отключение-канала-чата-в-аккаунте)
* [Создание нового чата](#Создание-нового-чата)
* [Отправка, редактирование или импорт сообщения](#Отправка-редактирование-или-импорт-сообщения)
* [Обновление статуса доставки сообщения](#Обновление-статуса-доставки-сообщения)
* [Получение истории сообщений по чату](#Получение-истории-сообщений-по-чату)
* [Передача информации о печатании](#Передача-информации-о-печатании)
* [Отправка или снятие реакции](#Отправка-или-снятие-реакции)
* [Отправка комментария](#Отправка-комментария)

### Подключение канала чата в аккаунте

#### Метод

*POST /v2/origin/custom/{channel.id}/connect*

#### Описание

Чтобы подключить аккаунт к каналу чатов, вам необходимо выполнить POST запрос, передав в теле запроса ID подключаемого аккаунта.  
В ответ вы получите уникальный scope\_id аккаунта для этого канала, который будет использоваться в дальнейшем при отправке сообщений.

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

Все поля являются обязательными

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| account\_id | string | ID аккаунта в API чатов. [Подробнее о том, как его получить](/developers/content/chats/chat-start#Получение-ID-аккаунта-в-сервисе-чатов) |
| hook\_api\_version | string | Версия хука, который будет приходить интеграции при исходящих сообщениях. В настройках канала чата, для указанной версии должен быть прописан адрес хука. По умолчанию v1. Доступные значения: v1, v2. |
| title | string | Необязательный параметр. Отображаемое название канала в подключаемом аккаунте. По умолчанию – имя канала |
| is\_time\_window\_disabled | bool | Необязательный параметр. Значение по умолчанию false. Если у вас включено временное окно канала, то используя данный параметр вы можете выключить его для аккаунта. |

#### Пример запроса

```
{
  "account_id": "af9945ff-1490-4cad-807d-945c15d88bec",
  "title": "ChatIntegration",
  "hook_api_version": "v2",
  "is_time_window_disabled": true
}
```

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Канал успешно подключен |
| 404 | Канал не существует |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод вернет переданные поля запроса, и scope\_id который понадобится для дальнейшей работы сообщениями.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| account\_id | string | ID аккаунта в API чатов |
| hook\_api\_version | string | Версия формата хука, который будет приходить интеграции при исходящих сообщениях. В настройках канала чата, для указанной версии должен быть прописан адрес хука |
| title | string | Отображаемое название канала в подключаемом аккаунте |
| scope\_id | string | Идентификатор подключения канала для конкретного аккаунта |
| is\_time\_window\_disabled | bool | Параметр, обозначающий, отключено ли временное окно на ответ |

#### Пример ответа

```
{
  "account_id": "af9945ff-1490-4cad-807d-945c15d88bec",
  "scope_id": "f90ba33d-c9d9-44da-b76c-c349b0ecbe41_af9945ff-1490-4cad-807d-945c15d88bec",
  "title": "ChatIntegration",
  "hook_api_version": "v2",
  "is_time_window_disabled": true
}
```

#### Пример реализации запроса

```
<?php

$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'POST';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/f90ba33d-c9d9-44da-b76c-c349b0ecbe41/connect';

$url = "https://amojo.amocrm.ru" . $path;

$body = [
    'account_id' => 'af9945ff-1490-4cad-807d-945c15d88bec',
    'title' => 'ScopeTitle', //Название вашего канала, отображаемое пользователю
    'hook_api_version' => 'v2',
];
$requestBody = json_encode($body);
$checkSum = md5($requestBody);

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}
echo PHP_EOL . $requestBody . PHP_EOL;

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
    echo $response . PHP_EOL;
}
```

### Отключение канала чата в аккаунте

#### Метод

*DELETE /v2/origin/custom/{channel.id}/disconnect*

#### Описание

После отключение канала, интеграция перестанет получать хуки, отправленным в аккаунте по каналу.  
Так же перестанет выводиться "Написать первым" (по истечению кеша фронта) в карточке сделки.

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

Все поля являются обязательными

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| account\_id | string | ID аккаунта в API Чатов |

#### Пример запроса

```
{
  "account_id": "af9945ff-1490-4cad-807d-945c15d88bec"
}
```

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Канал успешно отключен |
| 404 | Канал не существует |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод не возвращает тела ответа

#### Пример реализации запроса

```
<?php

$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'POST';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/f90ba33d-c9d9-44da-b76c-c349b0ecbe41/disconnect';

$url = "https://amojo.amocrm.ru" . $path;

$body = [
    'account_id' => 'af9945ff-1490-4cad-807d-945c15d88bec',
];
$requestBody = json_encode($body);
$checkSum = md5($requestBody);

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}
echo PHP_EOL . $requestBody . PHP_EOL;

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
}
```

### Создание нового чата

#### Метод

*POST /v2/origin/custom/{scope\_id}/chats*

#### Описание

Метод позволяет создать чат до передачи первого сообщения.  
Это может понадобиться если сделка с контактом уже существует и создавать неразобранное не нужно.  
Чат без сообщений не будет отображаться в аккаунте.  
Также можно указать источник чата, тогда при первом входящем сообщения по чату неразобранное будет создано в воронке, согласно информации, в которой находится источник.

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

Создаст чат для указанного идентификатора, если для conversation\_id чат уже существует, вернет его id. Массив user обязателен.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| conversation\_id | string | Идентификатор чата на стороне интеграции |
| source[external\_id] | string | Идентификатор источника чата на стороне интеграции (подробнее смотрите в разделе [Источники](/developers/content/crm_platform/sources-api). Длина поля до 40 символов, можно использовать любые печатные ascii символы и пробел.  Необязательное поле. Если указывать источник не требуется, то поле source передавать не требуется. |
| user[id] | string | Идентификатор участника чата на стороне интеграции, обязательное поле |
| user[name] | string | Имя участника чата, обязательное поле |
| user[avatar] | string | Ссылка на аватар участника чата, необязательное поле. Ссылка должен быть доступна для запроса из вне и отдавать медиа файл для скачивания |
| user[profile][phone] | string | Телефон пользователя. Необязательное поле |
| user[profile][email] | string | Email пользователя. Необязательное поле |
| user[profile\_link] | string | Ссылка на профиль участника чата в сторонней чат системе, необязательное поле |

#### Пример запроса

```
{
    "conversation_id": "skc-8e3e7640-49af-4448-a2c6-d5a421f7f217",
    "source": {
      "external_id":"78001234567"
    },
    "user": {
        "id": "sk-1376265f-86df-4c49-a0c3-a4816df41af9",
        "avatar": "https://example.com/users/avatar.png",
        "name": "Example Client",
        "profile": {
            "phone": "79151112233",
            "email": "example.client@example.com"
        },
        "profile_link": "https://example.com/profile/example.client"
    }
}
```

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Чат успешно создан |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод вернет ID чата и переданные поля участника чата

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | string | Идентификатор чата в API чатов |
| user[id] | string | Идентификатор участника чата в API чатов |
| user[client\_id] | string | Идентификатор участника чата на стороне интеграции, для пользователей из amoCRM поле отсутствует (Поле передается в запросе в ключе `user[id]`) |
| user[name] | string | Имя участника чата |
| user[avatar] | string | Ссылка на аватар, если была передана, или пустое поле |
| user[phone] | string | Телефон пользователя, если был передан. Поле отсутствует, если данные не передавались |
| user[email] | string | Email пользователя, если был передан. Поле отсутствует, если данные не передавались |

#### Пример ответа

```
{
  "id": "6cbab3d5-c4c1-46ff-b710-ad59ad10805f",
  "user": {
    "id": "86a0caef-41ec-49ac-814b-b27da2cea267",
    "client_id": "sk-1376265f-86df-4c49-a0c3-a4816df41af9",
    "name": "Example Client",
    "avatar": "https:/example.com/users/avatar.png",
    "phone": "79151112233",
    "email": "example.client@example.com"
  }
}
```

#### Пример реализации запроса

```
<?php
$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'POST';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81/chats';

$url = "https://amojo.amocrm.ru" . $path;

$body = [
    'conversation_id' => 'my_integration-8e3e7640-49af-4448-a2c6-d5a421f7f217',
    'user' => [
        'id' => 'my_integration-1376265f-86df-4c49-a0c3-a4816df41af9',
        'avatar' => 'https://example.com/users/avatar.png',
        'name' => 'Example Client',
        'profile' => [
            'phone' => '79151112233',
            'email' => 'example.client@example.com',
        ],
        'profile_link' => 'https://example.com/profile/example.client',
    ],
    'account_id' => 'af9945ff-1490-4cad-807d-945c15d88bec',
];

$requestBody = json_encode($body);
$checkSum = md5($requestBody);

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}
echo PHP_EOL . $requestBody . PHP_EOL;

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
    echo $result;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
    echo $response . PHP_EOL;
}
```

### Отправка, редактирование или импорт сообщения

#### Метод

*POST /v2/origin/custom/{scope\_id}*

#### Описание

Метод позволяет передавать входящие и исходящие сообщения (историю переписки или сообщения, которые были отправлены в стороннем приложении), а так же позволяет редактировать сообщения.

Метод создаст сообщение и при необходимости сам чат для указанного msgid и conversation\_id соответственно.  
Структура полей receiver и sender идентичная.

Сообщение может быть адресовано:

| Тип сообщения | Когда стоит использовать | Какие параметры нужно передавать |
| --- | --- | --- |
| входящее от клиента | клиент прислал сообщение в подключенный канал | заполняется только поле `payload[sender]`, поле `payload[receiver]` не передается |
| исходящее клиенту от пользователя amoCRM | менеджер написал сообщение клиенту, мы точно можем идентифицировать, кто именно отправлял сообщение | заполняются поля `payload[sender]` (информация о менеджере) и `payload[receiver]` (информация о клиенте), в поле `payload[sender][ref_id]` передается ID пользователя amoCRM в API чатов |
| исходящее клиенту от бота интеграции | менеджер написал сообщение клиенту, мы не можем идентифицировать, кто именно отправлял сообщение | заполняются поля `payload[sender]` (информация о боте) и `payload[receiver]` (информация о клиенте), в поле `payload[sender][ref_id]` передается ID бота интеграции, который был получен при регистрации канала в API чатов |

Также с помощью метода можно импортировать историю переписки не вызывая уведомлений менеджеров и создания неразобранного. Для этого необходимо передать поле `payload[silent]: true`.  
При массовом импорте старых сообщений в чат, рекомендуем передавать `payload[silent]: true` со всеми сообщениями, кроме последнего.  
В последнем сообщении (самом свежем) передаем поле `payload[silent]: false`,  
таким образом на последнее сообщение будет создано неразобранное и придет только одно уведомление, тем самым мы не создадим клиенту лишних беспокойств.

Хуки для импортируемых сообщений от бота интеграции не отправляются.

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| payload | object | [Подробное описание объекта](#Описание-объекта-payload) |
| event\_type | string | Тип события, на данный момент поддерживается только new\_message и edit\_message |

##### Описание объекта payload

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| timestamp | int | Время сообщения, метка unix |
| msec\_timestamp | int | Время сообщения в миллисекундах |
| conversation\_id | string | Идентификатор чата на стороне интеграции |
| conversation\_ref\_id | string | Идентификатор чата на стороне amoCRM, необязательное поле. Необходимо передавать, когда клиент ответит на сообщение отправленное с помощью "Написать первым", чтобы API чатов связало чат на вашей стороне с чатом в системе. |
| silent | bool | Нужно ли создавать неразобранное и отправлять уведомление по сообщению в аккаунте amoCRM. При редактировании сообщения неразобранное не создаётся и уведомление не отправляется. |
| source | object | Необязательное поле. [Подробное описание объекта](#Описание-объекта-source). Если указывать конкретный источник не требуется, то поле source передавать не требуется. При редактировании сообщения поле будет пригнорировано. |
| sender | object | Отправитель сообщения. [Подробное описание объекта](#Описание-объекта-sender-и-receiver). При редактировании сообщения поле будет пригнорировано. |
| receiver | object | Получатель сообщения. [Подробное описание объекта](#Описание-объекта-sender-и-receiver). При редактировании сообщения поле будет пригнорировано. |
| id | string | Идентификатор сообщения чата на стороне amoCRM, необязательное поле. Может передаваться только при редактирование сообщение. |
| msgid | string | Идентификатор сообщения чата на стороне интеграции. Если при редактировании сообщения передан вместе с id, то msgid будет установлен в качестве идентификатора сообщения на стороне интеграции. |
| message | object | Обязательное поле. Объект входящего сообщения. [Подробное описание объекта](#Описание-объекта-message). |
| reply\_to | object | Необязательное поле. Объект цитаты c ответом. [Подробное описание объекта](#Описание-объекта-reply_to). При редактировании сообщения поле будет пригнорировано. |
| forwards | object | Необязательное поле. Объект цитаты с перессылкой. [Подробное описание объекта](#Описание-объекта-forwards). При редактировании сообщения поле будет пригнорировано. |

##### Описание объекта source

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| external\_id | string | Необязательное поле. Идентификатор источника чата на стороне интеграции (подробнее смотрите в разделе [Источники](/developers/content/crm_platform/sources-api)). Длина поля 40 символов, можно использовать любые печатные ascii символы и пробел.  Если указывать источник не требуется, то поле source передавать не требуется. |

##### Описание объекта sender и receiver

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | string | Обязательное поле. Идентификатор участника чата на стороне интеграции |
| ref\_id | string | Необязательное поле. Идентификатор участника чата на стороне API Чатов, опциональное поле |
| name | string | Обязательное поле. Имя участника чата |
| avatar | string | Необязательное поле. Ссылка на аватар участника чата. Ссылка должен быть доступна для сторонних ресурсов и отдавать изображение для скачивания |
| profile | object | Необязательное поле. Профиль участника чата. [Подробное описание объекта](#Описание-объекта-senderprofile-и-receiverprofile) |
| profile\_link | string | Необязательное поле. Ссылка на профиль участника чата в сторонней чат системе |

##### Описание объекта sender.profile и receiver.profile

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| phone | string | Необязательное поле. Телефон. При создании нового неразобранного будет добавлен в данные контакта |
| email | string | Необязательное поле. Email. При создании нового неразобранного будет добавлен в данные контакта |

##### Описание объекта message

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| type | string | Обязательное поле. Тип сообщений, может быть одним из списка: text, contact, file, video, picture, voice, audio, sticker, location |
| text | string | Для типа text обязательное поле. Для других типов сообщений может быть пустым |
| media | string | Ссылка на картинку, файл, видео, аудио, голосовое сообщение или стикер в зависимости от типа сообщения. Ссылка должна быть доступна для скачивания. Необязательное поле, если при редактировании сообщения файл не меняется. |
| file\_name | string | Название файла. Обязательно для типов: file, video, picture. Необязательное поле, если при редактировании сообщения файл не меняется. |
| file\_size | int | Размер файла, доступного по ссылке в поле media, в байтах. Обязательно для типов: file, video, picture. Необязательное поле, если при редактировании сообщения файл не меняется. |
| sticker\_id | string | Необязательное поле. Универсальный для всех аккаунтов идентификатор посылаемого стикера. |
| location | object | Обязательное поля для сообщений типа location (геопозиция). [Подробное описание объекта](#Описание-объекта-messagelocation) |
| contact | object | Обязательное поля для сообщений типа contact (контактные данные). [Подробное описание объекта](#Описание-объекта-messagecontact) |
| callback\_data | string | Необязательное поле. Необходимо передавать для сообщений WhatsApp List Message, для корректного срабатывания бота. |
| delivery\_status | object | Необязательное поле. Может передаватся только при редактировании сообщения. Объект статуса доставки сообщения. [Подробное описание объекта](#описание-объекта-delivery_status). |
| media\_duration | int | Необязательное поле. Длительность видео/аудио/голосовых сообщений в секундах |
| shared\_post | object | Необязательное поле. Пост, которым поделился пользователь. [Подробное описание объекта](#описание-объекта-messageshared_post) |

##### Описание объекта message.contact

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Обязательное поле. Имя контакта |
| phone | string | Обязательное поле. Телефон контакта |

##### Описание объекта message.location

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| lon | float | Обязательное поле. Долгота |
| lat | float | Обязательное поле. Широта |

##### Описание объекта message.shared\_post

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| url | string | Ссылка на пост |
| preview\_link | string | Необязательное поле. Временная ссылка на картинку с превью. Используется, когда ссылка на превью временная и нужно скачать изображание в amoCRM. |
| preview\_permalink | string | Необязательное поле. Постоянная ссылка на картинку с превью. Используется, когда ссылка на превью постоянная и не нужно загружать изображение в amoCRM. |
| type | string | Тип поста. На данный момент поддерживаем только "post" |
| site\_name | string | Необязательное поле. Подпись под постом. |

Если передан preview\_link вместе с preview\_permalink, то приоритетным будет preview\_permalink.

##### Описание объекта reply\_to

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| message | object | Обязательное поле. Объект вложенного сообщения. Сообщение из цитаты с ответом может принадлежать только тому же чату, что и отправляемое сообщение. [Подробное описание объекта](#Описание-объекта-embedded_message). |

##### Описание объекта forwards

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| messages | array | Обязательное поле. Массив объектов вложенных сообщений, на данный момент нельзя переслать более 1 сообщения. Сообщения из цитаты с перессылкой могут принадлежать любому внешнему чату, что принадлежит интеграции. [Подробное описание объекта](#Описание-объекта-embedded_message). |
| conversation\_ref\_id | string | Необязательное поле. Идентификатор чата на стороне API чатов. Чат обязательно должен принадлежать интеграции |
| conversation\_id | string | Необязательное поле. Идентификатор чата на стороне интеграции. |

##### Описание объекта embedded\_message

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | string | Идентификатор цитируемого сообщения на стороне API Чатов, если передан, то остальные поля заполнять не обязательно, они будут определены автоматически, также в случае передачи идентификатора будет работать подскролл к сообщению, если чат находится в той же карточке |
| msgid | string | Идентификатор цитируемого сообщения на стороне интеграции, если передан, то остальные поля заполнять не обязательно, они будут определены автоматически, также в случае передачи идентификатора будет работать подскролл к сообщению, если чат находится в той же карточке |
| type | string | Обязательное, если не передан идентификатор, Тип сообщений, может быть одним из списка: text, contact, file, video, picture, voice, audio, sticker, location |
| text | string | Для типа text обязательное, если не передан идентификатор. Для других типов сообщений может быть пустым |
| file\_name | string | Название файла. Необязательное |
| file\_size | int | Размер файла в байтах. Необязательное |
| media\_duration | int | Длительность для видео/аудио/голосовых сообщений. Необязательное |
| location | object | Обязательное для сообщений типа location (геопозиция), если не передан идентификатор. [Подробное описание объекта](#Описание-объекта-messagelocation) |
| contact | object | Обязательное для сообщений типа contact (контактные данные), если не передан идентификатор. [Подробное описание объекта](#Описание-объекта-messagecontact) |
| timestamp | int | Обязательное, если не передан идентификатор, Время сообщения, метка unix |
| msec\_timestamp | int | Обязательное, если не передан идентификатор, Время сообщения в миллисекундах |
| sender | object | Обязательное, если не передан идентификатор, Отправитель сообщения (короткая версия). [Подробное описание объекта](#Описание-объекта-embedded_user). |

##### Описание объекта embedded\_user

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | string | Идентификатор отправителя на стороне интеграции, если передан, то остальные поля заполнять не обязательно, они будут определены автоматически |
| ref\_id | string | Идентификатор отправителя на стороне API Чатов, если передан, то остальные поля заполнять не обязательно, они будут определены автоматически |
| name | string | Обязательное, если не передан идентификатор, Имя отправителя |

##### Описание объекта delivery\_status

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| status\_code | int | Статус отправки. Доступные статусы описаны в [Обновление статуса доставки сообщения](#Обновление-статуса-доставки-сообщения) |
| error\_сode | int | Тип ошибки. Доступные типы описаны в [Обновление статуса доставки сообщения](#Обновление-статуса-доставки-сообщения) |
| error | string | Текст ошибки. Будет отображаться пользователю. |

#### Пример запроса

##### Пример входящего сообщения от клиента

```
{
  "event_type": "new_message",
  "payload": {
    "timestamp": 1639604761,
    "msec_timestamp": 1639604761694,
    "msgid": "my_int-5f2836a8ca475",
    "conversation_id": "my_int-d5a421f7f217",
    "sender": {
      "id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8",
      "avatar": "https://example.com/users/avatar.png",
      "profile": {
        "phone": "+79151112233",
        "email": "example.client@example.com"
      },
      "profile_link": "https://example.com/profile/example.client",
      "name": "Вася клиент"
    },
    "message": {
      "type": "text",
      "text": "Сообщение от клиента"
    },
    "silent": false
  }
}
```

##### Пример исходящего сообщения от менеджера, когда мы можем идентифицировать отправителя

```
{
  "event_type": "new_message",
  "payload": {
    "timestamp": 1639604903,
    "msec_timestamp": 1639604903161,
    "msgid": "my_int-5f2836a8ca476",
    "conversation_id": "my_int-d5a421f7f217",
    "sender": {
      "id": "my_int-manager1_user_id",
      "name": "Имя менеджера",
      "ref_id": "76fc2bea-902f-425c-9a3d-dcdac4766090"
    },
    "receiver": {
      "id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8",
      "avatar": "https://example.com/users/avatar.png",
      "name": "Вася клиент",
      "profile": {
        "phone": "+79151112233",
        "email": "example.client@example.com"
      },
      "profile_link": "https://example.com/profile/example.client"
    },
    "message": {
      "type": "text",
      "text": "Сообщение от менеджера 76fc2bea-902f-425c-9a3d-dcdac4766090"
    },
    "silent": true
  }
}
```

##### Пример исходящего сообщения от менеджера, когда мы не можем идентифицировать отправителя (исходящее от имени бота канала)

```
{
  "event_type": "new_message",
  "payload": {
    "timestamp": 1639605194,
    "msec_timestamp": 1639605194102,
    "msgid": "my_int-5f2836a8ca477",
    "conversation_id": "my_int-d5a421f7f217",
    "sender": {
      "id": "my_int-bot_user_id",
      "name": "Bot",
      "ref_id": "f1910c7f-b1e0-4184-bd09-c7def2a9109a"
    },
    "receiver": {
      "id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8",
      "avatar": "https://example.com/users/avatar.png",
      "name": "Вася клиент",
      "profile": {
        "phone": "+79151112233",
        "email": "example.client@example.com"
      },
      "profile_link": "https://example.com/profile/example.client"
    },
    "message": {
      "type": "text",
      "text": "Сообщение от бота канала f1910c7f-b1e0-4184-bd09-c7def2a9109a"
    },
    "silent": true
  }
}
```

##### Пример редактирования текстового сообщения

```
{
  "event_type": "edit_message",
  "payload": {
    "timestamp": 1639605194,
    "msec_timestamp": 1639605194102,
    "msgid": "my_int-5f2836a8ca477",
    "conversation_id": "my_int-d5a421f7f217",
    "message": {
      "type": "text",
      "text": "Отредактированная версия сообщения"
    }
  }
}
```

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Сообщение принято для обработки |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод вернет объект с информацией о созданном сообщении в API чатов. Сообщение появится в чате после обработки.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| new\_message[conversation\_id] | string | Идентификатор диалога |
| new\_message[sender\_id] | string | Идентификатор отправителя сообщения |
| new\_message[receiver\_id] | string|null | Идентификатор получателя сообщения |
| new\_message[msgid] | string | Идентификатор сообщения в API чатов |
| new\_message[ref\_id] | string | Идентификатор сообщения на стороне интеграции |

#### Пример ответа

```
{
  "new_message": {
    "conversation_id": "my_int-d5a421f7f217",
    "sender_id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8",
    "receiver_id": "123e4567-e89b-12d3-a456-426614174000",
    "msgid": "8f1176d7-c357-42b0-b944-a15d537a27d3",
    "ref_id": "my_int-5f2836a8ca468",
  }
}
```

#### Пример реализации запроса

```
<?php
$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'POST';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81';

$url = "https://amojo.amocrm.ru" . $path;

$body = [
    'event_type' => 'new_message',
    'payload' => [
        'timestamp' => time(),
        'msec_timestamp' => round(microtime(true) * 1000),
        'msgid' => 'my_int-5f2836a8ca475',
        'conversation_id' => 'my_int-d5a421f7f217',
        'sender' => [
            'id' => 'my_int-1376265f-86df-4c49-a0c3-a4816df41af8',
            'avatar' => 'https://shard210new.amocrm.ru/v3/users/49c3d73a-0358-11e8-b48c-1866da4cd631/avatar/',
            'profile' => [
                'phone' => '+79151112233',
                'email' => 'example.client@example.com',
            ],
            'profile_link' => 'https://example.com/profile/example.client',
            'name' => 'Вася клиент',
        ],
        'message' => [
            'type' => 'text',
            'text' => 'Сообщение от клиента',
        ],
        'silent' => false,
    ],
];

$requestBody = json_encode($body);
$checkSum = md5($requestBody);

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}
echo PHP_EOL . $requestBody . PHP_EOL;

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
    echo $result;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
    echo $response . PHP_EOL;
}
```

### Обновление статуса доставки сообщения

#### Метод

*POST /v2/origin/custom/{scope\_id}/{msgid}/delivery\_status*

#### Описание

Метод позволяет обновить статус доставки у конкретного сообщения

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

Все поля являются обязательными

| Параметр | Тип | Описание |
| --- | --- | --- |
| status\_code | int | Статус отправки. Доступные статусы описаны ниже |
| error\_сode | int | Тип ошибки. Доступные типы описаны ниже. Обязателен только при status\_code = -1 |
| error | string | Текст ошибки. Будет отображаться пользователю. Обязателен только при status\_code = -1 |

| Статус | Когда должен быть использован статус | Enum значение статуса |
| --- | --- | --- |
| Отправлено | Сообщение было отправлено из amoCRM | – |
| Доставлено | Сообщение было доставлено до адресата | 1 |
| Прочитано | Сообщение было прочитано адресатом | 2 |
| Ошибка | Сообщение не было доставлено | -1 |

| Код ошибки | Когда должна быть передан код |
| --- | --- |
| 901 | Пользователь удалил переписку |
| 902 | Интеграция отключена на стороне канала |
| 903 | Внутрення ошибка сервера |
| 904 | Невозможно создать переписку (Например, пользователь не зарегистрирован в WhatsApp) |
| 905 | Любая другая, вместе с данным кодом ошибки необходимо передать текст ошибки |

#### Пример запроса

```
{
  "status_code": -1,
  "error_code": 905,
  "error": "Error text"
}
```

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Статус успешно обновлен |
| 404 | Сообщения не существует |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

При успешном приеме информации, метод не возвращает ответ

#### Пример реализации запроса

```
<?php

$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'POST';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81/079e44fb-fc22-476b-9e8a-421b688ec53b/delivery_status';

$url = "https://amojo.amocrm.ru" . $path;

$body = [
    'msgid' => '079e44fb-fc22-476b-9e8a-421b688ec53b',
    'delivery_status' => -1,
    'error_code' => 905,
    'error' => 'Error text'
];

$requestBody = json_encode($body);
$checkSum = md5($requestBody);

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}
echo PHP_EOL . $requestBody . PHP_EOL;

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
    echo $result;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
    echo $response . PHP_EOL;
}
```

### Получение истории сообщений по чату

#### Метод

*GET /v2/origin/custom/{scope\_id}/chats/{conversation\_id}/history*

#### Описание

Метод позволяет получить список сообщений в конкретном чате.  
conversation\_id можно получить или при создании чата через метод создания чатов, или в вебхуке о сообщении.

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса, в случае GET запроса – от пустой строки*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### GET параметры

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| offset | int | Оффсет выборки сообщений (сколько записей от начала выборки пропускаем) |
| limit | int | Количество возвращаемых сущностей за один запрос (Максимум – 50) |

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 204 | Чат не существует или сообщения отсутствуют |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает коллекцию сообщений в ключе messages.

Структура полей sender и receiver идентична.  
Для внешних получателей/отправителей будет возвращаться информация по профилю и client\_id – идентификатор пользователя на стороне интеграции.  
Пустые значения могут быть опущены из тела запроса.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| timestamp | int | Временная метка отправки сообщения |
| msec\_timestamp | int | Временная метка отправки сообщения в миллисекундах |
| receiver[id] sender[id] | string | ID получателя/отправителя сообщения в API Чатов |
| receiver[name] sender[name] | string | Имя получателя/отправителя сообщения в API Чатов |
| receiver[client\_id] sender[client\_id] | string | ID получателя/отправителя сообщения на стороне инетграции |
| receiver[avatar] sender[avatar] | string | Ссылка на аватар получателя/отправителя, если была передана при создании |
| receiver[phone] sender[phone] | string | Телефон получателя/отправителя, если был передан при создании |
| receiver[email] sender[email] | string | Email получателя/отправителя, если был передан при создании |
| message[id] | string | ID сообщения в API чатов |
| message[client\_id] | string | ID сообщения на стороне интеграции |
| message[type] | string | Тип сообщения |
| message[text] | string | Текст сообщения |
| message[media] | string | Ссылка на файл в сообщении |
| message[thumbnail] | string | Ссылка на превью медиа в сообщении |
| message[file\_name] | string | Имя файла |
| message[file\_size] | int | Размер файла в байтах |
| message[media\_group\_id] | string | Идентификатор группы медиа сообщений. Если пользователь отправляет одно сообщение с несколькими вложениями, мы разобьем сообщение на несколько, но медиафайлы будут объединены в одну группу |
| message[location] | object | Геолокация. [Подробное описание объекта](#Описание-объекта-messagelocation) |
| message[contact] | object | Контактные данные. [Подробное описание объекта](#Описание-объекта-messagecontact) |

#### Пример ответа

```
{
  "messages": [
    {
      "timestamp": 1596470953,
      "sender": {
        "id": "d8d9f9c4-9611-4794-a136-a253a13e1bb5",
        "name": "Менеджер Василий"
      },
      "receiver": {
        "id": "86a0caef-41ec-49ac-814b-b27da2cea267",
        "client_id": "sk-1376265f-86df-4c49-a0c3-a4816df41af9",
        "avatar": "https:/example.com/users/avatar.png",
        "name": "Example Client",
        "phone": "79151112233",
        "email": "example.client@example.com"
      },
      "message": {
        "id": "3985523d-78b3-45b7-aeaf-142405bbf1dc",
        "client_id": "skm-5f2836a8ca468",
        "type": "text",
        "text": "Да, конечно. Вы можете оплатить наличными и картой курьеру при получении.",
        "media": "",
        "thumbnail": "",
        "file_name": "",
        "file_size": 0
      }
    },
    {
      "timestamp": 1596470809,
      "sender": {
        "id": "86a0caef-41ec-49ac-814b-b27da2cea267",
        "client_id": "sk-1376265f-86df-4c49-a0c3-a4816df41af9",
        "avatar": "https:/example.com/users/avatar.png",
        "name": "Example Client",
        "phone": "79151112233",
        "email": "example.client@example.com"
      },
      "message": {
        "id": "1bf6a765-ec6f-4680-8cd5-6f2d31f78ebc",
        "client_id": "5f283618af2c8",
        "type": "text",
        "text": "Можно ли оплатить заказ при получении ?",
        "media": "",
        "thumbnail": "",
        "file_name": "",
        "file_size": 0
      }
    }
  ]
}
```

#### Пример реализации запроса

```
<?php

$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'GET';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81/chats/8b1a1828-fc4a-4874-9469-15e0d847570f/history';
$getParams = '?limit=50&offset=0';

$url = "https://amojo.amocrm.ru" . $path;

$checkSum = md5('');

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . $getParams . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url . $getParams,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
    echo $result;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
    echo $response . PHP_EOL;
}
```

### Передача информации о печатании

#### Метод

*POST /v2/origin/custom/{scope\_id}/typing*

#### Описание

Интеграция может передать информацию, что пользователь в мессенджере сейчас что-то печатает. Информация отобразится в amoCRM.

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| conversation\_id | string | ID чата на стороне интеграции |
| duration\_ms | int | Необязательный параметр. Длительность печати в миллисекундах. По умолчанию 5000 мс. |
| sender[id] | string | ID пользователя на стороне интеграции |

#### Пример запроса

```
{
  "conversation_id": "my_int-d5a421f7f218",
  "sender": {
    "id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8"
  }
}
```

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 204 | Событие принято |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод не возвращает ответ при успешном запросе.

#### Пример реализации запроса

```
<?php

$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'POST';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/f90ba33d-c9d9-44da-b76c-c349b0ecbe41/connect';

$url = "https://amojo.amocrm.ru" . $path;

$body = [
    'conversation_id' => 'my_int-d5a421f7f218',
    'sender' => [
        'id' => 'my_int-1376265f-86df-4c49-a0c3-a4816df41af8',
    ],
];
$requestBody = json_encode($body);
$checkSum = md5($requestBody);

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}
echo PHP_EOL . $requestBody . PHP_EOL;

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
    echo $response . PHP_EOL;
}
```

### Отправка или снятие реакции

#### Метод

*POST /v2/origin/custom/{scope\_id}/react*

#### Описание

Метод позволяет отправить или снять реакцию с определённого сообщения.

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

| Параметр | Тип | Описание |
| --- | --- | --- |
| conversation\_id | string | Идентификатор чата на стороне интеграции. Необязательно, если передан conversation\_ref\_id. |
| conversation\_ref\_id | string | Идентификатор чата на стороне amoCRM. Необязательно, если передан conversation\_id. |
| id | string | Идентификатор сообщения на стороне amoCRM. Необязательное поле, если передан msgid |
| msgid | string | Идентификатор сообщения на стороне интеграции. Необязательно поле, если передан id |
| user[id] | string | Идентификатор пользователя, пославшего/снявшего реакцию на стороне интеграции |
| user[ref\_id] | string | Идентификатор пользователя, пославшего/снявшего реакцию на стороне amoCRM. Обязательное поле при проставлении реакции от имени менеджера |
| type | string | Тип действия: react, unreact |
| emoji | string | Реакция пользователя. Необязательное поле |

#### Пример запроса

```
{
  "conversation_id": "my_integration-8e3e7640-49af-4448-a2c6-d5a421f7f217",
  "msgid": "fbd27636-0c4b-11ea-8d71-362b9e155667",
  "user": {
    "id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8"
  },
  "type": "react",
  "emoji": "😍"
}
```

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Реакция принята для обработки |
| 404 | Сообщение не существует |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

При успешном приеме информации, метод не возвращает ответ

#### Пример реализации запроса

```
<?php

$secret = '5a44c5dff55f3c15a4cce8d7c4cc27e207c7e189';
$method = 'POST';
$contentType = 'application/json';
$date = date(DateTimeInterface::RFC2822);
$path = '/v2/origin/custom/344a5002-f8ca-454d-af3d-396180102ac7_52e591f7-c98f-4255-8495-827210138c81/079e44fb-fc22-476b-9e8a-421b688ec53b/react';

$url = "https://amojo.amocrm.ru" . $path;

$body = [
    'msgid' => '079e44fb-fc22-476b-9e8a-421b688ec53b',
    'user' => [
      'id' => 'my_int-1376265f-86df-4c49-a0c3-a4816df41af8',
    ],
    'type' => 'react',
    'emoji' => '😍'
];

$requestBody = json_encode($body);
$checkSum = md5($requestBody);

$str = implode("\n", [
    strtoupper($method),
    $checkSum,
    $contentType,
    $date,
    $path,
]);

$signature = hash_hmac('sha1', $str, $secret);

$headers = [
    'Date' => $date,
    'Content-Type' => $contentType,
    'Content-MD5' => strtolower($checkSum),
    'X-Signature' => strtolower($signature),
];

$curlHeaders = [];
foreach ($headers as $name => $value) {
    $curlHeaders[] = $name . ": " . $value;
}

echo $method . ' ' . $url . PHP_EOL;
foreach ($curlHeaders as $header) {
    echo $header . PHP_EOL;
}
echo PHP_EOL . $requestBody . PHP_EOL;

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 5,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => $method,
    CURLOPT_POSTFIELDS => $requestBody,
    CURLOPT_HTTPHEADER => $curlHeaders,
]);

$response = curl_exec($curl);
$err = curl_error($curl);
$info = curl_getinfo($curl);
curl_close($curl);
if ($err) {
    $result = "cURL Error #:" . $err;
    echo $result;
} else {
    echo "Status: " . $info['http_code'] . PHP_EOL;
    echo $response . PHP_EOL;
}
```

### Отправка комментария

#### Метод

*POST /v2/origin/custom/{scope\_id}*

#### Описание

Метод позволяет передавать входящие и исходящие (ответы на комментарии, которые были отправлены в стороннем приложении) комментарии.

Основное отличие отправки комментариев от отправки сообщений заключается в добавлении в запрос поля post,  
которое содержит id публикации на стороне интеграции.

Метод создаст комментарий и, при необходимости, сам чат для указанного msgid и conversation\_id соответственно.  
Комментарии будут создаваться в одном чате с личными сообщениями, но в разных беседах.  
Для каждого комментируемого поста будет создана беседа, содержащая все комментарии от клиента.  
Структура полей receiver и sender идентична.

Сообщение может быть адресовано:

| Тип сообщения | Когда стоит использовать | Какие параметры нужно передавать |
| --- | --- | --- |
| входящее от клиента | клиент прислал сообщение в подключенный канал | заполняется только поле `payload[sender]`, поле `payload[receiver]` не передается |
| исходящее клиенту от пользователя amoCRM | менеджер написал сообщение клиенту, мы точно можем идентифицировать, кто именно отправлял сообщение | заполняются поля `payload[sender]` (информация о менеджере) и `payload[receiver]` (информация о клиенте), в поле `payload[sender][ref_id]` передается ID пользователя amoCRM в API чатов |

#### Ограничения

Требуется заголовки Date, Content-Type, Content-MD5, X-Signature

#### Заголовок запроса

*Content-Type: application/json*  
*Date: текущее время в формате RFC 2822 (например: Mon, 03 Oct 2020 15:11:21 +0000)*  
*Content-MD5: md5 хэш от тела запроса*  
*X-Signature: HMAC-SHA1 код с секретным ключом канала*

#### Параметры запроса

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| payload | object | [Подробное описание объекта](#Описание-объекта-payload-для-комментариев) |
| event\_type | string | Тип события, на данный момент поддерживается только new\_message |

##### Описание объекта payload для комментариев

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| timestamp | int | Время сообщения, метка unix |
| msec\_timestamp | int | Время сообщения в миллисекундах |
| conversation\_id | string | Идентификатор чата на стороне интеграции |
| silent | bool | Нужно ли создавать неразобранное и отправлять уведомление по сообщению в аккаунте amoCRM. При редактировании сообщения неразобранное не создаётся и уведомление не отправляется. |
| source | object | Необязательное поле. [Подробное описание объекта](#Описание-объекта-source). Если указывать конкретный источник не требуется, то поле source передавать не требуется. |
| sender | object | Отправитель сообщения. [Подробное описание объекта](#Описание-объекта-sender-и-receiver). |
| receiver | object | Получатель сообщения. [Подробное описание объекта](#Описание-объекта-sender-и-receiver). |
| msgid | string | Идентификатор сообщения чата на стороне интеграции. |
| message | object | Обязательное поле. Объект входящего сообщения. [Подробное описание объекта](#Описание-объекта-message-для-комментариев). |

##### Описание объекта message для комментариев

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| type | string | Обязательное поле. Тип сообщений, может быть одним из списка: text, contact, file, video, picture, voice, audio, sticker, location |
| text | string | Для типа text обязательное поле. Для других типов сообщений может быть пустым |
| media | string | Ссылка на картинку, файл, видео, аудио, голосовое сообщение или стикер в зависимости от типа сообщения. Ссылка должна быть доступна для скачивания. Необязательное поле, если при редактировании сообщения файл не меняется. |
| media\_duration | int | Необязательное поле. Длительность для видео/аудио/голосовых сообщений в секундах. |
| file\_name | string | Название файла. Обязательно для типов: file, video, picture. Необязательное поле, если при редактировании сообщения файл не меняется. |
| file\_size | int | Размер файла, доступного по ссылке в поле media, в байтах. Обязательно для типов: file, video, picture. Необязательное поле, если при редактировании сообщения файл не меняется. |
| sticker\_id | string | Необязательное поле. Универсальный для всех аккаунтов идентификатор посылаемого стикера. |
| location | object | Обязательное поля для сообщений типа location (геопозиция). [Подробное описание объекта](#Описание-объекта-messagelocation) |
| contact | object | Обязательное поля для сообщений типа contact (контактные данные). [Подробное описание объекта](#Описание-объекта-messagecontact) |
| post | object | Необязательное поле. Необходимо передавать для комментариев. [Подробное описание объекта](#Описание-объекта-messagepost) |

##### Описание объекта message.post

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | string | Обязательное поле. Уникальный идентификатор поста в интеграции |
| url | string | Обязательное поле. Ссылка на пост в источнике |
| preview\_url | string | Ссылка на превью если ttl ссылки ограничен |
| preview\_permalink | string | Ссылка на превью если ссылка постоянная |
| username | string | Пользователя опубликовавшего пост |
| caption | string | Описание поста |

#### Пример запроса

##### Пример входящего комметария от клиента

```
{
  "event_type": "new_message",
  "payload": {
    "timestamp": 1639604761,
    "msec_timestamp": 1639604761694,
    "msgid": "my_int-5f2836a8ca475",
    "conversation_id": "my_int-d5a421f7f217",
    "sender": {
      "id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8",
      "avatar": "https://example.com/users/avatar.png",
      "profile": {
        "phone": "+79151112233",
        "email": "example.client@example.com"
      },
      "profile_link": "https://example.com/profile/example.client",
      "name": "Вася клиент"
    },
    "message": {
      "type": "text",
      "text": "Сообщение от клиента",
      "post": {
        "id": "my-int-376265",
        "url": "https://www.example.com/@example/video/7490",
        "preview_url": "https://example/1/preview.png",
        "preview_permalink": "https://example/2/preview.png",
        "username": "post creator",
        "caption": "описание поста"
      }
    },
    "silent": false
  }
}
```

##### Пример ответа на комментарий от менеджера

```
{
  "event_type": "new_message",
  "payload": {
    "timestamp": 1639604903,
    "msec_timestamp": 1639604903161,
    "msgid": "my_int-5f2836a8ca476",
    "conversation_id": "my_int-d5a421f7f217",
    "sender": {
      "id": "my_int-manager1_user_id",
      "name": "Имя менеджера",
      "ref_id": "76fc2bea-902f-425c-9a3d-dcdac4766090"
    },
    "receiver": {
      "id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8",
      "avatar": "https://example.com/users/avatar.png",
      "name": "Вася клиент",
      "profile": {
        "phone": "+79151112233",
        "email": "example.client@example.com"
      },
      "profile_link": "https://example.com/profile/example.client"
    },
    "message": {
      "type": "text",
      "text": "комментарий от менеджера 76fc2bea-902f-425c-9a3d-dcdac4766090",
      "post": {
        "id": "my-int-376265",
        "url": "https://www.example.com/@example/video/7490",
        "preview_url": "https://example/1/preview.png",
        "preview_permalink": "https://example/2/preview.png",
        "username": "post creator",
        "caption": "описание поста"
      }
    },
    "silent": true
  }
}
```

#### Заголовок типа данных при успешном результате

*Content-Type: application/json*

#### Заголовок типа данных при ошибке

*Content-Type: application/json*

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Сообщение принято для обработки |
| 403 | Подпись запроса некорректная |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод вернет объект с информацией о созданном сообщении в API чатов. Сообщение появится в чате после обработки.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| new\_message[conversation\_id] | string | Идентификатор диалога |
| new\_message[sender\_id] | string | Идентификатор отправителя сообщения |
| new\_message[receiver\_id] | string|null | Идентификатор получателя сообщения |
| new\_message[msgid] | string | Идентификатор сообщения в API чатов |
| new\_message[ref\_id] | string | Идентификатор сообщения на стороне интеграции |

#### Пример ответа

```
{
  "new_message": {
    "conversation_id": "my_int-d5a421f7f217",
    "sender_id": "my_int-1376265f-86df-4c49-a0c3-a4816df41af8",
    "receiver_id": "123e4567-e89b-12d3-a456-426614174000",
    "msgid": "8f1176d7-c357-42b0-b944-a15d537a27d3",
    "ref_id": "my_int-5f2836a8ca468",
  }
}
```
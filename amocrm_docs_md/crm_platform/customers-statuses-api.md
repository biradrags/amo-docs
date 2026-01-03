<!-- https://www.amocrm.ru/developers/content/crm_platform/customers-statuses-api -->

# Статусы и сегменты покупателей

В данном разделе описываются доступные методы для работы с этапами и сегментами покупателей

### Оглавление

*   [Общая информация](/crm_platform/customers-statuses-api#common-info.html)
*   [Список статусов покупателей](/crm_platform/customers-statuses-api#customers-statuses-list.html)
*   [Получение статуса покупателей по ID](/crm_platform/customers-statuses-api#customer-status-detail.html)
*   [Добавление статусов в воронку](/crm_platform/customers-statuses-api#customers-statuses-add.html)
*   [Редактирование статуса покупателей](/crm_platform/customers-statuses-api#customers-status-edit.html)
*   [Удаление статуса покупателей](/crm_platform/customers-statuses-api#customer-status-delete.html)
*   [Список сегментов покупателей](/crm_platform/customers-statuses-api#segments-list.html)
*   [Получение сегмента покупателей по ID](/crm_platform/customers-statuses-api#segment-detail.html)
*   [Добавление сегмента покупателей](/crm_platform/customers-statuses-api#segment-add.html)
*   [Редактирование сегмента покупателей](/crm_platform/customers-statuses-api#segment-edit.html)
*   [Удаление сегмента покупателей](/crm_platform/customers-statuses-api#segment-delete.html)
*   [Доступные цвета статусов](/crm_platform/customers-statuses-api#customers-statuses-colors.html)
*   [Доступные цвета сегментов](/crm_platform/customers-statuses-api#segments-colors.html)

### Общая информация

В покупателях доступно 2 режима – динамическая сегментация и периодичность.  
При использовании периодичности покупатель находится только в 1 статусе и может переходить между ними в зависимости от условий, даты следующей покупки, ожидаемой суммы покупки.  
При использовании динамический сегментации покупатель может находится в нескольких сегментах одновременно. У каждого сегмента есть свои условия входа и выхода, а также дополнительные поля.  
В данный момент недоступно редактирование и создание условий через API как для статусов, так и для сегментов.

*   При режиме периодичности доступно не более 30 статусов, включая системные.
*   При режиме сегментации доступно не более 100 сегментов.
*   У сегментов может быть не более 30 дополнительных полей.

### Список статусов покупателей

#### Метод

_GET /api/v4/customers/statuses_

#### Описание

Метод позволяет получить список статусов покупателей в аккаунте.

#### Ограничения

Метод доступен всем пользователям аккаунта.

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |
| 422 | Не включен функционал периодических покупок для покупателей |

#### Параметры ответа

Метод возвращает коллекцию моделей статусов, рассмотрим ниже свойства статуса.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID статуса |
| name | string | Название статуса |
| sort | int | Сортировка статуса |
| is\_default | bool | Является ли статус стандартным |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#customers-statuses-colors.html) |
| type | int | Тип статуса (0 – обычный статус, 1 – ожидается покупка, 2 – не купили, 3 – закрытый, 4 – купили недавно) |
| conditions | array | Условия перехода в статус |
| account\_id | int | ID аккаунта, в котором находится статус |

#### Пример ответа

```
{
    "_total_items": 6,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/customers/statuses"
        }
    },
    "_embedded": {
        "statuses": [
            {
                "id": 4740010,
                "name": "Recently purchased",
                "sort": 0,
                "is_default": true,
                "conditions": [],
                "color": "#ccff66",
                "type": 4,
                "account_id": 28805383,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/statuses/4740010"
                    }
                }
            },
            {
                "id": 4740013,
                "name": "Stage 1",
                "sort": 1,
                "is_default": false,
                "conditions": [],
                "color": "#fd5598",
                "type": 0,
                "account_id": 28805383,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/statuses/4740013"
                    }
                }
            },
            {
                "id": 4740025,
                "name": "Expected purchase",
                "sort": 2,
                "is_default": true,
                "conditions": [
                    [
                        {
                            "type": "before_purchase",
                            "match": {
                                "value": 0
                            },
                            "conditions": [
                                {
                                    "value": 0
                                }
                            ]
                        }
                    ]
                ],
                "color": "#99ccff",
                "type": 3,
                "account_id": 28805383,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/statuses/4740025"
                    }
                }
            },
            {
                "id": 4740028,
                "name": "Did not purchase",
                "sort": 4,
                "is_default": true,
                "conditions": [],
                "color": "#fd5598",
                "type": 2,
                "account_id": 28805383,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/statuses/4740028"
                    }
                }
            },
            {
                "id": 4740031,
                "name": "Closed",
                "sort": 5,
                "is_default": true,
                "conditions": [
                    [
                        {
                            "type": "after_today",
                            "match": {
                                "value": 60
                            },
                            "conditions": [
                                {
                                    "value": 60
                                }
                            ]
                        }
                    ]
                ],
                "color": "#d5d8db",
                "type": 3,
                "account_id": 28805383,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/statuses/4740031"
                    }
                }
            }
        ]
    }
}
```

### Получение статуса покупателей по ID

#### Метод

_GET /api/v4/customers/statuses/{id}_

#### Описание

Метод позволяет получить модель статуса покупателя в аккаунте по ID статуса.

#### Ограничения

Метод доступен всем пользователям аккаунта.

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |
| 422 | Не включен функционал периодических покупок для покупателей |

#### Параметры ответа

Метод возвращает модель статуса, рассмотрим ниже свойства статуса.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID статуса |
| name | string | Название статуса |
| sort | int | Сортировка статуса |
| is\_default | bool | Является ли статус стандартным |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#customers-statuses-colors.html) |
| type | int | Тип статуса (0 – обычный статус, 1 – ожидается покупка, 2 – не купили, 3 – закрытый, 4 – купили недавно) |
| conditions | array | Условия перехода в статус |
| account\_id | int | ID аккаунта, в котором находится воронка |

#### Пример ответа

```
{
    "id": 4051135,
    "name": "Статус покупателя для примера",
    "sort": 2,
    "is_default": false,
    "conditions": [
        [
            {
                "type": "tag",
                "options": {
                    "name": "Теги"
                },
                "logic_operator": "or",
                "conditions": [
                    {
                        "id": 174727,
                        "name": "Условие"
                    }
                ],
                "match": {
                    "value": [
                        174727
                    ],
                    "logic": "or"
                },
                "tmpl": "tag_customers"
            }
        ],
        []
    ],
    "color": "#ccc8f9",
    "type": 0,
    "account_id": 321321,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/customers/statuses/4051135"
        }
    }
}
```

### Добавление статусов в воронку

#### Метод

_POST /api/v4/customers/statuses_

#### Описание

Метод позволяет добавлять статусы покупателей в аккаунт пакетно.

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название статуса. Обязательный параметр |
| sort | int | Сортировка статуса. Обязательный параметр |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#customers-statuses-colors.html). Необязательный параметр |
| request\_id | string | Поле, которое вернется вам в ответе без изменений и не будет сохранено. Необязательный параметр |

#### Пример запроса

```
[
    {
        "name": "Новый статус",
        "sort": 100,
        "color": "#fffeb2"
    },
    {
        "name": "Новый статус 2",
        "sort": 200,
        "color": "#fffeb2"
    }
]
```

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Статусы были успешно созданы |
| 422 | Переданные данные не могут быть обработаны. Подробности доступны в теле ответа |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает коллекцию статусов, которые были созданы.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID статуса |
| request\_id | string | Строка переданная при запросе или порядковый указатель, если параметр не передан |

#### Пример ответа

```
{
    "_total_items": 2,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/customers/statuses"
        }
    },
    "_embedded": {
        "statuses": [
            {
                "id": 5649280,
                "request_id": "0",
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/statuses/5649280"
                    }
                }
            },
            {
                "id": 5649283,
                "request_id": "1",
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/statuses/5649283"
                    }
                }
            }
        ]
    }
}
```

### Редактирование статуса покупателей

#### Метод

_PATCH /api/v4/customers/statuses/{id}_

#### Описание

Метод позволяет редактировать статус покупателей в аккаунте.

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

Для редактирования статуса необходимо передать хотя бы один параметр

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название статуса |
| sort | int | Сортировка статуса |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#customers-statuses-colors.html) |
| request\_id | string | Поле, которое вернется вам в ответе без изменений и не будет сохранено |

#### Пример запроса

```
{
    "name": "Новое название для статуса",
    "color": "#c1e0ff"
}
```

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Статус был успешно изменен |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает модель статуса, который были изменена. Параметры аналогичны тем, что возвращаются при запросе списка статусов.

#### Пример ответа

```
{
    "id": 5649280,
    "name": "Новое название для статуса",
    "sort": 5,
    "is_default": false,
    "conditions": [],
    "color": "#c1e0ff",
    "type": 0,
    "account_id": 28805383,
    "request_id": "0",
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/customers/statuses/5649280"
        }
    }
}
```

### Удаление статуса покупателей

#### Метод

_DELETE /api/v4/customers/statuses/{id}_

#### Описание

Метод позволяет удалить статус покупателей в аккаунте.

#### Ограничения

*   Метод доступен только с правами администратора аккаунта
*   Для удаления не доступны системные статусы
*   Покупатели будут перенесены в другие статусы, в зависимости от условий, в течении некоторого времени, после удаления

#### Заголовок запроса

_Content-Type: application/json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 204 | Статус был успешно удален |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод не возвращает тело

### Список сегментов покупателей

#### Метод

_GET /api/v4/customers/segments_

#### Описание

Метод позволяет получить список сегментов покупателей в аккаунте.

#### Ограничения

Метод доступен всем пользователям аккаунта.

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |
| 422 | Не включен функционал периодических покупок для покупателей |

#### Параметры ответа

Метод возвращает коллекцию моделей статусов, рассмотрим ниже свойства статуса.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID статуса |
| created\_at | int | Дата создания сегмента, передается в Unix Timestamp |
| updated\_at | int | Дата изменения сегмента, передается в Unix Timestamp |
| name | string | Название сегмента |
| customers\_count | int | Количество покупателей в сегменте |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#segments-colors.html) |
| custom\_fields\_values | array|null | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного сегмента |
| available\_products\_price\_types | array|null | Массив, содержащий ID дополнительных полей каталогов типа Цена, доступных для данного сегмента |
| account\_id | int | ID аккаунта, в котором находится сегмент |

#### Пример ответа

```
{
    "_total_items": 2,
    "_page": 1,
    "_page_count": 1,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/customers/segments?page=1&limit=50"
        }
    },
    "_embedded": {
        "segments": [
            {
                "id": 51,
                "created_at": 1589615328,
                "updated_at": 1591089010,
                "account_id": 28805383,
                "name": "Сегмент 1",
                "color": "6610f2",
                "available_products_price_types": [
                    288891
                ],
                "customers_count": 0,
                "custom_fields_values": [
                    {
                        "values": [
                            {
                                "value": true
                            }
                        ],
                        "field_id": 269471,
                        "field_name": "Поле Чекбокс",
                        "field_code": "MYSUPERCHECKBOX",
                        "field_type": "checkbox"
                    },
                    {
                        "values": [
                            {
                                "value": "Значение 1",
                                "enum_id": 381857
                            }
                        ],
                        "field_id": 269473,
                        "field_name": "Поле Список",
                        "field_code": null,
                        "field_type": "select"
                    },
                    {
                        "values": [
                            {
                                "value": "12424"
                            }
                        ],
                        "field_id": 272427,
                        "field_name": "Поле текст",
                        "field_code": null,
                        "field_type": "text"
                    }
                ],
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/segments/51"
                    }
                }
            },
            {
                "id": 21,
                "created_at": 1587376544,
                "updated_at": 1587376544,
                "account_id": 28805383,
                "name": "Сегмент 2",
                "color": "4a001f",
                "available_products_price_types": [
                    271211
                ],
                "customers_count": 0,
                "custom_fields_values": [],
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/segments/21"
                    }
                }
            }
        ]
    }
}
```

### Получение сегмента покупателей по ID

#### Метод

_GET /api/v4/customers/segments/{id}_

#### Описание

Метод позволяет получить модель сегмента покупателя в аккаунте по ID.

#### Ограничения

Метод доступен всем пользователям аккаунта.

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |
| 422 | Не включен функционал сегментации для покупателей |

#### Параметры ответа

Метод возвращает модель сегмента, рассмотрим ниже свойства сегмента.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID статуса |
| created\_at | int | Дата создания сегмента, передается в Unix Timestamp |
| updated\_at | int | Дата изменения сегмента, передается в Unix Timestamp |
| name | string | Название сегмента |
| customers\_count | int | Количество покупателей в сегменте |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#segments-colors.html) |
| custom\_fields\_values | array|null | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного сегмента |
| available\_products\_price\_types | array|null | Массив, содержащий ID дополнительных полей каталогов типа Цена, доступных для данного сегмента |
| account\_id | int | ID аккаунта, в котором находится сегмент |

#### Пример ответа

```
{
    "id": 51,
    "created_at": 1589615328,
    "updated_at": 1591089010,
    "account_id": 28805383,
    "name": "Новый сегмент",
    "color": "6610f2",
    "available_products_price_types": [
        288891
    ],
    "customers_count": 0,
    "custom_fields_values": [
        {
            "values": [
                {
                    "value": true
                }
            ],
            "field_id": 269471,
            "field_name": "Поле Чекбокс",
            "field_code": "MYSUPERCHECKBOX",
            "field_type": "checkbox"
        },
        {
            "values": [
                {
                    "value": "Значение 1",
                    "enum_id": 381857
                }
            ],
            "field_id": 269473,
            "field_name": "Поле Список",
            "field_code": null,
            "field_type": "select"
        },
        {
            "values": [
                {
                    "value": "12424"
                }
            ],
            "field_id": 272427,
            "field_name": "Поле текст",
            "field_code": null,
            "field_type": "text"
        }
    ],
    "_links": {
        "self": {
            "href": "https://shard151.amocrm.ru/api/v4/customers/segments/51"
        }
    }
}
```

### Добавление сегмента покупателей

#### Метод

_POST /api/v4/customers/segments_

#### Описание

Метод позволяет добавлять сегмент покупателей в аккаунте.

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

Для создания сегмента необходимо передать как минимум один обязательный параметр name

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название сегмента |
| available\_products\_price\_types | array | Доступные цены. Массив из ID полей каталогов типа цена |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#segments-colors.html) |
| custom\_fields\_values | array|null | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного сегмента. [Примеры заполнения полей](/crm_platform/custom-fields#cf-fill-examples.html) |

#### Пример запроса

```
{
    "name": "Сегмент для примера",
    "color": "ae003f",
    "custom_fields_values": [
        {
            "field_id": 245035,
            "field_name": "Описание сегмента",
            "values": [
                {
                    "value": "Этот сегмент создан для примера"
                }
            ]
        },
        {
            "field_id": 245351,
            "values": [
                {
                    "enum_id": 387477
                }
            ]
        }
    ]
}
```

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Сегмент был успешно создан |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает модель сегмента, который был создан. Параметры аналогичны тем, что возвращаются при запросе списка сегментов.

#### Пример ответа

```
{
    "id": 17,
    "created_at": 1589462149,
    "updated_at": 1589462149,
    "account_id": 123123,
    "name": "Сегмент для примера",
    "color": "ae003f",
    "available_products_price_types": [],
    "customers_count": 0,
    "custom_fields_values": [
        {
            "values": [
                {
                    "value": "Этот сегмент создан для примера"
                }
            ],
            "field_id": 245035,
            "field_name": "Описание сегмента",
            "field_code": null,
            "field_type": "text"
        },
        {
            "values": [
                {
                    "value": "Значение мультиселекта",
                    "enum_id": 387477
                }
            ],
            "field_id": 245351,
            "field_name": "Мультиселект поле",
            "field_code": null,
            "field_type": "multiselect"
        }
    ],
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/customers/segments/17"
        }
    }
}
```

### Редактирование сегмента покупателей

#### Метод

_PATCH /api/v4/customers/segments/{id}_

#### Описание

Метод позволяет редактировать сегмент покупателей в аккаунте.

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

Для редактирования сегмента необходимо передать хотя бы один параметр

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название сегмента |
| available\_products\_price\_types | array | Доступные цены. Массив из ID полей каталогов типа цена |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/customers-statuses-api#segments-colors.html) |
| custom\_fields\_values | array|null | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного сегмента. [Примеры заполнения полей](/crm_platform/custom-fields#cf-fill-examples.html) |
| request\_id | string | Поле, которое вернется вам в ответе без изменений и не будет сохранено |

#### Пример запроса

```
{
    "name": "Новое имя для сегмента",
    "color": "ae003f",
    "custom_fields_values": [
        {
            "field_id": 245035,
            "field_name": "Описание сегмента",
            "values": [
                {
                    "value": "Новое описание для сегмента"
                }
            ]
        }
    ]
}
```

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Сегмент был успешно изменен |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает модель сегмента, который был изменен. Параметры аналогичны тем, что возвращаются при запросе списка сегментов.

#### Пример ответа

```
{
    "id": 17,
    "created_at": 1589462149,
    "updated_at": 1589463844,
    "account_id": 123123,
    "name": "Новое имя для сегмента",
    "color": "ae003f",
    "available_products_price_types": [],
    "customers_count": 0,
    "custom_fields_values": [
        {
            "values": [
                {
                    "value": "Новое описание для сегмента"
                }
            ],
            "field_id": 245035,
            "field_name": "Описание сегмента",
            "field_code": null,
            "field_type": "text"
        },
    ],
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/customers/segments/17"
        }
    }
}
```

### Удаление сегмента покупателей

#### Метод

_DELETE /api/v4/customers/segments/{id}_

#### Описание

Метод позволяет удалить сегмент покупателей в аккаунте.

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 204 | Сегмент был успешно удален |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод не возвращает тело

### Доступные цвета статусов

| Цвет | Номер цвета |
| --- | --- |
|  | #fffeb2 |
|  | #fffd7f |
|  | #fff000 |
|  | #ffeab2 |
|  | #ffdc7f |
|  | #ffce5a |
|  | #ffdbdb |
|  | #ffc8c8 |
|  | #ff8f92 |
|  | #d6eaff |
|  | #c1e0ff |
|  | #98cbff |
|  | #ebffb1 |
|  | #deff81 |
|  | #87f2c0 |
|  | #f9deff |
|  | #f3beff |
|  | #ccc8f9 |
|  | #eb93ff |
|  | #f2f3f4 |
|  | #e6e8ea |

### Доступные цвета сегментов

| Цвет | Номер цвета |
| --- | --- |
|  | 10599d |
|  | 2176ff |
|  | 006acc |
|  | 07a0c3 |
|  | 247ba0 |
|  | 177e89 |
|  | 046e8f |
|  | 598381 |
|  | 0c7c59 |
|  | 495f41 |
|  | 00a44b |
|  | 08605f |
|  | bf2600 |
|  | 06d6a0 |
|  | e14945 |
|  | 79b473 |
|  | ae003f |
|  | a2ad59 |
|  | cd0f53 |
|  | 8e936d |
|  | 832161 |
|  | 2e5339 |
|  | bf126f |
|  | 6f7c12 |
|  | ff5376 |
|  | dd1c1a |
|  | bb304e |
|  | 631d76 |
|  | 9d2b32 |
|  | 4a001f |
|  | b118c8 |
|  | 6a0f49 |
|  | 6610f2 |
|  | b38a58 |
|  | 8963ba |
|  | 4b3666 |
|  | 932f6d |
|  | 6b2d5c |
|  | 6461a0 |
|  | 4f517d |
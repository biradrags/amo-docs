<!-- https://www.amocrm.ru/developers/content/crm_platform/leads_pipelines -->

# Воронки и этапы

В данном разделе описываются доступные методы для работы с воронками и этапами сделок

### Оглавление

*   [Общая информация](/crm_platform/leads_pipelines#%D0%9E%D0%B1%D1%89%D0%B0%D1%8F-%D0%B8%D0%BD%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%86%D0%B8%D1%8F.html)
*   [Список воронок сделок](/crm_platform/leads_pipelines#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BE%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%BE%D0%BA.html)
*   [Получение воронки сделок по ID](/crm_platform/leads_pipelines#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8-%D1%81%D0%B4%D0%B5%D0%BB%D0%BE%D0%BA-%D0%BF%D0%BE-ID.html)
*   [Добавление воронок](/crm_platform/leads_pipelines#%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BE%D0%BA.html)
*   [Редактирование воронки](/crm_platform/leads_pipelines#%D0%A0%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8.html)
*   [Удаление воронки](/crm_platform/leads_pipelines#%D0%A3%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8.html)
*   [Список статусов воронки сделок](/crm_platform/leads_pipelines#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8-%D1%81%D0%B4%D0%B5%D0%BB%D0%BE%D0%BA.html)
*   [Получение статуса воронки сделок по ID](/crm_platform/leads_pipelines#%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8-%D1%81%D0%B4%D0%B5%D0%BB%D0%BE%D0%BA-%D0%BF%D0%BE-ID.html)
*   [Добавление статусов в воронку](/crm_platform/leads_pipelines#%D0%94%D0%BE%D0%B1%D0%B0%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2-%D0%B2-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D1%83.html)
*   [Редактирование статуса воронки](/crm_platform/leads_pipelines#%D0%A0%D0%B5%D0%B4%D0%B0%D0%BA%D1%82%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8.html)
*   [Удаление статуса воронки](/crm_platform/leads_pipelines#%D0%A3%D0%B4%D0%B0%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%B0-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8.html)
*   [Доступные цвета статусов](/crm_platform/leads_pipelines#%D0%94%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D1%86%D0%B2%D0%B5%D1%82%D0%B0-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2.html)

### Общая информация

*   В каждой воронке есть 3 системных статуса: Неразобранное, Успешно реализовано (ID = 142), Закрыто и не реализовано (ID = 143)
*   В аккаунте может быть не более 50 воронок.
*   В одной воронке может быть не более 100 статусов, включая системные.

### Список воронок сделок

#### Метод

_GET /api/v4/leads/pipelines_

#### Описание

Метод позволяет получить список воронок сделок в аккаунте.

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

#### Параметры ответа

Метод возвращает коллекцию моделей воронок, рассмотрим ниже свойства воронки.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID воронки |
| name | string | Название воронки |
| sort | int | Сортировка воронки |
| is\_main | bool | Является ли воронка главной |
| is\_unsorted\_on | bool | Включено ли неразобранное в воронке |
| is\_archive | bool | Является ли воронка архивной |
| account\_id | int | ID аккаунта, в котором находится воронка |
| \_embedded\[statuses\] | array | Данные статусов, имеющихся в воронке. Подробней о статусах читайте [ниже](/crm_platform/leads_pipelines#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8-%D1%81%D0%B4%D0%B5%D0%BB%D0%BE%D0%BA.html) |

#### Пример ответа

```json
{
    "_total_items": 1,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/leads/pipelines"
        }
    },
    "_embedded": {
        "pipelines": [
            {
                "id": 3177727,
                "name": "Воронка",
                "sort": 1,
                "is_main": true,
                "is_unsorted_on": true,
                "is_archive": false,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727"
                    }
                },
                "_embedded": {
                    "statuses": [
                        {
                            "id": 32392156,
                            "name": "Неразобранное",
                            "sort": 10,
                            "is_editable": false,
                            "pipeline_id": 3177727,
                            "color": "#c1c1c1",
                            "type": 1,
                            "account_id": 12345678,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392156"
                                }
                            }
                        },
                        {
                            "id": 32392159,
                            "name": "Первичный контакт",
                            "sort": 20,
                            "is_editable": true,
                            "pipeline_id": 3177727,
                            "color": "#99ccff",
                            "type": 0,
                            "account_id": 12345678,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392159"
                                }
                            }
                        },
                        {
                            "id": 32392165,
                            "name": "Принимают решение",
                            "sort": 30,
                            "is_editable": true,
                            "pipeline_id": 3177727,
                            "color": "#ffcc66",
                            "type": 0,
                            "account_id": 12345678,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392165"
                                }
                            }
                        },
                        {
                            "id": 142,
                            "name": "Успешно реализовано",
                            "sort": 10000,
                            "is_editable": false,
                            "pipeline_id": 3177727,
                            "color": "#CCFF66",
                            "type": 0,
                            "account_id": 12345678,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/142"
                                }
                            }
                        },
                        {
                            "id": 143,
                            "name": "Закрыто и не реализовано",
                            "sort": 11000,
                            "is_editable": false,
                            "pipeline_id": 3177727,
                            "color": "#D5D8DB",
                            "type": 0,
                            "account_id": 12345678,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/143"
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Получение воронки сделок по ID

#### Метод

_GET /api/v4/leads/pipelines/{id}_

#### Описание

Метод позволяет получить модель воронки сделок.

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

#### Параметры ответа

Метод возвращает модель воронки, рассмотрим ниже свойства воронки.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID воронки |
| name | string | Название воронки |
| sort | int | Сортировка воронки |
| is\_main | bool | Является ли воронка главной |
| is\_unsorted\_on | bool | Включено ли неразобранное в воронке |
| is\_archive | bool | Является ли воронка архивной |
| account\_id | int | ID аккаунта, в котором находится воронка |
| \_embedded\[statuses\] | array | Данные статусов, имеющихся в воронке. Подробней о статусах читайте [ниже](/crm_platform/leads_pipelines#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8-%D1%81%D0%B4%D0%B5%D0%BB%D0%BE%D0%BA.html) |

#### Пример ответа

```json
{
    "id": 3177727,
    "name": "Воронка",
    "sort": 1,
    "is_main": true,
    "is_unsorted_on": true,
    "is_archive": false,
    "account_id": 28847170,
    "_links": {
        "self": {
            "href": "https://shard152.amocrm.ru/api/v4/leads/pipelines/3177727"
        }
    },
    "_embedded": {
        "statuses": [
            {
                "id": 32392156,
                "name": "Неразобранное",
                "sort": 10,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#c1c1c1",
                "type": 1,
                "account_id": 28847170,
                "_links": {
                    "self": {
                        "href": "https://shard152.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392156"
                    }
                }
            },
            {
                "id": 32392159,
                "name": "Первичный контакт",
                "sort": 20,
                "is_editable": true,
                "pipeline_id": 3177727,
                "color": "#99ccff",
                "type": 0,
                "account_id": 28847170,
                "_links": {
                    "self": {
                        "href": "https://shard152.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392159"
                    }
                }
            },
            {
                "id": 32392165,
                "name": "Принимают решение",
                "sort": 30,
                "is_editable": true,
                "pipeline_id": 3177727,
                "color": "#ffcc66",
                "type": 0,
                "account_id": 28847170,
                "_links": {
                    "self": {
                        "href": "https://shard152.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392165"
                    }
                }
            },
            {
                "id": 142,
                "name": "Успешно реализовано",
                "sort": 10000,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#CCFF66",
                "type": 0,
                "account_id": 28847170,
                "_links": {
                    "self": {
                        "href": "https://shard152.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/142"
                    }
                }
            },
            {
                "id": 143,
                "name": "Закрыто и не реализовано",
                "sort": 11000,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#D5D8DB",
                "type": 0,
                "account_id": 28847170,
                "_links": {
                    "self": {
                        "href": "https://shard152.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/143"
                    }
                }
            }
        ]
    }
}
```

### Добавление воронок

#### Метод

_POST /api/v4/leads/pipelines_

#### Описание

Метод позволяет добавлять воронки в аккаунт пакетно.

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название воронки. Обязательный параметр |
| sort | int | Сортировка воронки. Обязательный параметр |
| is\_main | bool | Является ли воронка главной. Обязательный параметр |
| is\_unsorted\_on | bool | Включено ли неразобранное в воронке. Обязательный параметр |
| \_embedded\[statuses\] | array | Данные статусов, имеющихся в воронке. Вы можете передать названия для системных статусов 142 и 143 при создании воронки. Подробней о статусах читайте [ниже](/crm_platform/leads_pipelines#%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2-%D0%B2%D0%BE%D1%80%D0%BE%D0%BD%D0%BA%D0%B8-%D1%81%D0%B4%D0%B5%D0%BB%D0%BE%D0%BA.html) |
| request\_id | string | Поле, которое вернется вам в ответе без изменений и не будет сохранено. Необязательный параметр |

#### Пример запроса

```json
[
    {
        "name": "Воронка доп продаж",
        "is_main": false,
        "is_unsorted_on": true,
        "sort": 20,
        "request_id": "123",
        "_embedded": {
            "statuses": [
                {
                    "id": 142,
                    "name": "Мое название для успешных сделок"
                },
                {
                    "name": "Первичный контакт",
                    "sort": 10,
                    "color": "#fffeb2"
                }
            ]
        }
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
| 200 | Воронки были успешно созданы |
| 422 | Переданные данные не могут быть обработаны. Подробности доступны в теле ответа |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает коллекцию воронок, которые были созданы. Параметры аналогичны тем, что возвращаются при запросе списка воронок.

#### Пример ответа

```json
{
    "_total_items": 1,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/leads/pipelines"
        }
    },
    "_embedded": {
        "pipelines": [
            {
                "id": 3270358,
                "name": "Воронка для примера",
                "sort": 1,
                "is_main": true,
                "is_unsorted_on": false,
                "account_id": 1415131,
                "request_id": "123",
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3270358"
                    }
                },
                "_embedded": {
                    "statuses": [
                        {
                            "id": 3304,
                            "name": "Неразобранное",
                            "sort": 10,
                            "is_editable": false,
                            "pipeline_id": 3270358,
                            "color": "#c1c1c1",
                            "type": 1,
                            "account_id": 1415131,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3270358/statuses/3304"
                                }
                            }
                        },
                        {
                            "id": 3303,
                            "name": "Первичный контакт",
                            "sort": 20,
                            "is_editable": true,
                            "pipeline_id": 3270358,
                            "color": "#fffeb2",
                            "type": 0,
                            "account_id": 1415131,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3270358/statuses/3303"
                                }
                            }
                        },
                        {
                            "id": 142,
                            "name": "Мое название для успешных сделок",
                            "sort": 10000,
                            "is_editable": false,
                            "pipeline_id": 3270358,
                            "color": "#CCFF66",
                            "type": 0,
                            "account_id": 1415131,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3270358/statuses/142"
                                }
                            }
                        },
                        {
                            "id": 143,
                            "name": "Закрыто и не реализовано",
                            "sort": 11000,
                            "is_editable": false,
                            "pipeline_id": 3270358,
                            "color": "#D5D8DB",
                            "type": 0,
                            "account_id": 1415131,
                            "_links": {
                                "self": {
                                    "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3270358/statuses/143"
                                }
                            }
                        }
                    ]
                }
            }
        ]
    }
}
```

### Редактирование воронки

#### Метод

_PATCH /api/v4/leads/pipelines/{id}_

#### Описание

Метод позволяет редактировать воронку в аккаунте.

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

При редактировании воронки, необходимо передать хотя бы один параметр

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название роли |
| sort | int | Сортировка воронки |
| is\_main | bool | Является ли воронка главной |
| is\_unsorted\_on | bool | Включено ли неразобранное в воронке |

#### Пример запроса

```json
{
    "name": "Новое название для воронки",
    "is_main": false,
    "is_unsorted_on": false,
    "sort": 100
}
```

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Воронка была успешно изменена |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает модель воронки, которая были изменена. Параметры аналогичны тем, что возвращаются при запросе списка воронок.

#### Пример ответа

```json
{
    "id": 3177727,
    "name": "Новое название для воронки",
    "sort": 1000,
    "is_main": false,
    "is_unsorted_on": false,
    "is_archive": false,
    "account_id": 12345678,
    "request_id": "0",
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727"
        }
    },
    "_embedded": {
        "statuses": [
            {
                "id": 32392159,
                "name": "Первичный контакт",
                "sort": 20,
                "is_editable": true,
                "pipeline_id": 3177727,
                "color": "#99ccff",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392159"
                    }
                }
            },
            {
                "id": 32392165,
                "name": "Принимают решение",
                "sort": 30,
                "is_editable": true,
                "pipeline_id": 3177727,
                "color": "#ffcc66",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392165"
                    }
                }
            },
            {
                "id": 142,
                "name": "Успешно реализовано",
                "sort": 10000,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#CCFF66",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/142"
                    }
                }
            },
            {
                "id": 143,
                "name": "Закрыто и не реализовано",
                "sort": 11000,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#D5D8DB",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/143"
                    }
                }
            }
        ]
    }
}
```

### Удаление воронки

#### Метод

_DELETE /api/v4/leads/pipelines/{id}_

#### Описание

Метод позволяет удалить воронку в аккаунте.

#### Ограничения

*   Метод доступен только с правами администратора аккаунта
*   Нельзя удалить последнюю воронку в аккаунте
*   Нельзя удалить воронку, в которой есть сделки

#### Заголовок запроса

_Content-Type: application/json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 204 | Воронка была успешно удалена |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод не возвращает тело

### Список статусов воронки сделок

#### Метод

_GET /api/v4/leads/pipelines/{pipeline\_id}/statuses_

#### Описание

Метод позволяет получить список статусов воронки сделок в аккаунте.

#### Ограничения

Метод доступен всем пользователям аккаунта.

#### GET параметры

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| with | string | Данный параметр принимает строку, в том числе из нескольких значений, указанных через запятую. Данный метод поддерживает [следующие параметры](/crm_platform/leads_pipelines#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B-%D0%B4%D0%BB%D1%8F-GET-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%B0-with.html). |

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |

#### Параметры ответа

Метод возвращает коллекцию моделей статусов, рассмотрим ниже свойства статуса.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID статуса |
| name | string | Название статуса |
| sort | int | Сортировка статуса |
| is\_editable | bool | Доступен ли статус для редактирования |
| pipeline\_id | int | ID воронки, в которой находится статус |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/leads_pipelines#statuses-colors.html) |
| type | int | Тип статуса (1 – неразобранное, 0 – обычный статус) |
| account\_id | int | ID аккаунта, в котором находится воронка |
| descriptions | array | **Требуется GET параметр with.** Описания статуса |
| descriptions\[0\] | object | Модель описания статуса |
| descriptions\[0\]\[id\] | int | ID описания статуса |
| descriptions\[0\]\[account\_id\] | int | ID аккаунта |
| descriptions\[0\]\[created\_at\] | string | Время создания статуса в формате YYYY-MM-DD HH:MM:SS |
| descriptions\[0\]\[updated\_at\] | string | Время последнего обновления статуса в формате YYYY-MM-DD HH:MM:SS |
| descriptions\[0\]\[created\_by\] | int | ID пользователя создавшего описание, 0 – апи |
| descriptions\[0\]\[updated\_by\] | int | ID пользователя обновившего описание, 0 – апи |
| descriptions\[0\]\[pipeline\_id\] | int | ID воронки описания статуса |
| descriptions\[0\]\[status\_id\] | int | ID статуса описания статуса |
| descriptions\[0\]\[level\] | string | Уровень пользователей которым показывается описание статуса |
| descriptions\[0\]\[description\] | string | Описание статуса |

#### Пример ответа

```json
{
    "_total_items": 5,
    "_embedded": {
        "statuses": [
            {
                "id": 32392156,
                "name": "Неразобранное",
                "sort": 10,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#c1c1c1",
                "type": 1,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392156"
                    }
                },
                "descriptions": []
            },
            {
                "id": 32392159,
                "name": "Первичный контакт",
                "sort": 20,
                "is_editable": true,
                "pipeline_id": 3177727,
                "color": "#99ccff",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392159"
                    }
                },
                "descriptions": [
                    {
                        "account_id": 12345678,
                        "created_at": "2023-05-05 09:38:00",
                        "created_by": 12345,
                        "description": "Описание статуса \"Первичный контакт\" для новичка",
                        "id": 489,
                        "level": "newbie",
                        "pipeline_id": 3177727,
                        "status_id": 32392159,
                        "updated_at": "2023-05-05 09:38:00",
                        "updated_by": null
                    },
                    {
                        "account_id": 12345678,
                        "created_at": "2023-05-05 09:38:00",
                        "created_by": 0,
                        "description": "Описание статуса \"Первичный контакт\" для кандидата",
                        "id": 491,
                        "level": "candidate",
                        "pipeline_id": 3177727,
                        "status_id": 32392159,
                        "updated_at": "2023-05-05 09:38:00",
                        "updated_by": 12345
                    },
                    {
                        "account_id": 12345678,
                        "created_at": "2023-05-05 09:38:00",
                        "created_by": 123456,
                        "description": "Описание статуса \"Первичный контакт\" для мастера",
                        "id": 493,
                        "level": "master",
                        "pipeline_id": 3177727,
                        "status_id": 32392159,
                        "updated_at": "2023-05-05 09:38:00",
                        "updated_by": 123457
                    }
                ]
            },
            {
                "id": 32392165,
                "name": "Принимают решение",
                "sort": 30,
                "is_editable": true,
                "pipeline_id": 3177727,
                "color": "#ffcc66",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392165"
                    }
                },
                "descriptions": []
            },
            {
                "id": 142,
                "name": "Успешно реализовано",
                "sort": 10000,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#CCFF66",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/142"
                    }
                },
                "descriptions": []
            },
            {
                "id": 143,
                "name": "Закрыто и не реализовано",
                "sort": 11000,
                "is_editable": false,
                "pipeline_id": 3177727,
                "color": "#D5D8DB",
                "type": 0,
                "account_id": 12345678,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/143"
                    }
                },
                "descriptions": []
            }
        ]
    }
}
```

### Получение статуса воронки сделок по ID

#### Метод

_GET /api/v4/leads/pipelines/{pipeline\_id}/statuses/{id}_

#### Описание

Метод позволяет получить модель статуса воронки сделок в аккаунте по ID статуса.

#### Ограничения

Метод доступен всем пользователям аккаунта.

#### GET параметры

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| with | string | Данный параметр принимает строку, в том числе из нескольких значений, указанных через запятую. Данный метод поддерживает [следующие параметры](/crm_platform/leads_pipelines#%D0%9F%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B-%D0%B4%D0%BB%D1%8F-GET-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D1%8B-with.html). |

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |

#### Параметры ответа

Метод возвращает модель статуса, рассмотрим ниже свойства статуса.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID статуса |
| name | string | Название статуса |
| sort | int | Сортировка статуса |
| is\_editable | bool | Доступен ли статус для редактирования |
| pipeline\_id | int | ID воронки, в которой находится статус |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/leads_pipelines#statuses-colors.html) |
| type | int | Тип статуса (1 – неразобранное, 0 – обычный статус) |
| account\_id | int | ID аккаунта, в котором находится воронка |
| descriptions | array | **Требуется GET параметр with.** Описания статуса |
| descriptions\[0\] | object | Модель описания статуса |
| descriptions\[0\]\[id\] | int | ID описания статуса |
| descriptions\[0\]\[account\_id\] | int | ID аккаунта |
| descriptions\[0\]\[created\_at\] | string | Время создания статуса в формате YYYY-MM-DD HH:MM:SS |
| descriptions\[0\]\[updated\_at\] | string | Время последнего обновления статуса в формате YYYY-MM-DD HH:MM:SS |
| descriptions\[0\]\[created\_by\] | int | ID пользователя создавшего описание, 0 – апи |
| descriptions\[0\]\[updated\_by\] | int | ID пользователя обновившего описание, 0 – апи |
| descriptions\[0\]\[pipeline\_id\] | int | ID воронки описания статуса |
| descriptions\[0\]\[status\_id\] | int | ID статуса описания статуса |
| descriptions\[0\]\[level\] | string | Уровень пользователей которым показывается описание статуса |
| descriptions\[0\]\[description\] | string | Описание статуса |

#### Пример ответа

```json
{
    "id": 32392159,
    "name": "Первичный контакт",
    "sort": 20,
    "is_editable": true,
    "pipeline_id": 3177727,
    "color": "#99ccff",
    "type": 0,
    "account_id": 12345678,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392159"
        }
    },
    "descriptions": [
        {
            "account_id": 12345678,
            "created_at": "2023-05-05 09:38:00",
            "created_by": 12345,
            "description": "Описание статуса \"Первичный контакт\" для новичка",
            "id": 489,
            "level": "newbie",
            "pipeline_id": 3177727,
            "status_id": 32392159,
            "updated_at": "2023-05-05 09:38:00",
            "updated_by": null
        },
        {
            "account_id": 12345678,
            "created_at": "2023-05-05 09:38:00",
            "created_by": 12345,
            "description": "Описание статуса \"Первичный контакт\" для кандидата",
            "id": 491,
            "level": "candidate",
            "pipeline_id": 3177727,
            "status_id": 32392159,
            "updated_at": "2023-05-05 09:38:00",
            "updated_by": 12345
        },
        {
            "account_id": 12345678,
            "created_at": "2023-05-05 09:38:00",
            "created_by": 12345,
            "description": "Описание статуса \"Первичный контакт\" для мастера",
            "id": 493,
            "level": "master",
            "pipeline_id": 3177727,
            "status_id": 32392159,
            "updated_at": "2023-05-05 09:38:00",
            "updated_by": 12345
        }
    ]
}
```

#### Параметры для GET-параметра with

| Параметр | Описание |
| --- | --- |
| descriptions | Добавляет в ответ описания статуса |

### Добавление статусов в воронку

#### Метод

_POST /api/v4/leads/pipelines/{pipeline\_id}/statuses_

#### Описание

Метод позволяет добавлять статусы воронки в аккаунт пакетно.  
Можно передать описания статусов (опционально).  
Существуют следующие ограничения для описаний статусов:

*   Можно создать только 3 описания статуса для разных уровней пользователя
*   Нельзя передавать один и тот же уровень в разных описаниях
*   Максимальная длинна описания 1000 символов
*   Можно передавать эмоджи в описаниях
*   Можно передавать следующие уровни в описаниях: newbie candidate master

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название статуса. Обязательный параметр |
| sort | int | Сортировка статуса. Обязательный параметр |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/leads_pipelines#%D0%94%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D1%86%D0%B2%D0%B5%D1%82%D0%B0-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2.html). Необязательный параметр |
| request\_id | string | Поле, которое вернется вам в ответе без изменений и не будет сохранено. Необязательный параметр |
| descriptions | array | Описания статуса. Необязательный параметр |
| descriptions\[0\] | object | Модель описания статуса |
| descriptions\[0\]\[level\] | string | Уровень пользователей для которых показывается описание статуса |
| descriptions\[0\]\[description\] | string | Описание статуса |

#### Пример запроса

```json
[
    {
        "name": "Новый этап",
        "sort": 100,
        "color": "#fffeb2",
        "descriptions": [
            {
                "level": "newbie",
                "description": "Описание статуса \"Новый этап\" для новичка"
            },
            {
                "level": "candidate",
                "description": "Описание статуса \"Новый этап\" для кандидата"
            },
            {
                "level":"master",
                "description": "Описание статуса \"Новый этап\" для мастера"
            }
        ]
    },
    {
        "name": "Новый этап 2",
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

Метод возвращает коллекцию статусов, которые были созданы. Параметры аналогичны тем, что возвращаются при запросе списка статусов.

#### Пример ответа

```json
{
    "_total_items": 2,
    "_embedded": {
        "statuses": [
            {
                "id": 33035290,
                "name": "Новый этап",
                "sort": 60,
                "is_editable": true,
                "pipeline_id": 3270355,
                "color": "#fffeb2",
                "type": 0,
                "account_id": 1415131,
                "request_id": "0",
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3270355/statuses/33035290"
                    }
                },
                "descriptions": [
                    {
                        "account_id": 1415131,
                        "created_at": "2023-05-05 09:38:00",
                        "created_by": 0,
                        "description": "Описание статуса \"Новый этап\" для новичка",
                        "id": 495,
                        "level": "newbie",
                        "pipeline_id": 3270355,
                        "status_id": 33035290,
                        "updated_at": "2023-05-05 09:38:00",
                        "updated_by": null
                    },
                    {
                        "account_id": 1415131,
                        "created_at": "2023-05-05 09:38:00",
                        "created_by": 0,
                        "description": "Описание статуса \"Новый этап\" для кандидата",
                        "id": 497,
                        "level": "candidate",
                        "pipeline_id": 3270355,
                        "status_id": 33035290,
                        "updated_at": "2023-05-05 09:38:00",
                        "updated_by": null
                    },
                    {
                        "account_id": 1415131,
                        "created_at": "2023-05-05 09:38:00",
                        "created_by": 0,
                        "description": "Описание статуса \"Новый этап\" для мастера",
                        "id": 499,
                        "level": "master",
                        "pipeline_id": 3270355,
                        "status_id": 33035290,
                        "updated_at": "2023-05-05 09:38:00",
                        "updated_by": null
                    }
                ]
            },
            {
                "id": 33035293,
                "name": "Новый этап 2",
                "sort": 70,
                "is_editable": true,
                "pipeline_id": 3270355,
                "color": "#fffeb2",
                "type": 0,
                "account_id": 1415131,
                "request_id": "1",
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3270355/statuses/33035293"
                    }
                },
                "descriptions": []
            }
        ]
    }
}
```

### Редактирование статуса воронки

#### Метод

_PATCH /api/v4/leads/pipelines/{pipeline\_id}/statuses/{id}_

#### Описание

Метод позволяет редактировать статус воронки в аккаунте.  
Можно передать описания статусов (опционально).  
Существуют следующие ограничения для описаний статусов:

*   Можно создать только 3 описания статуса для разных уровней пользователя
*   Нельзя передавать один и тот же уровень в разных описаниях
*   Максимальная длинна описания 1000 символов
*   Можно передавать эмоджи в описаниях
*   Можно передавать следующие уровни в описаниях: newbie candidate master
*   Для редактирования описания надо передать id описания, уровень и новое описание
*   Для создания описания id передавать не надо
*   Для удаления описания надо передать id описания, уровень и не передавать описание

#### Ограничения

Метод доступен только с правами администратора аккаунта.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

При редактировании статуса, необходимо передать хотя бы один параметр

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название статуса |
| sort | int | Сортировка статуса |
| color | string | Цвет статуса. [Доступные цвета](/crm_platform/leads_pipelines#%D0%94%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D1%8B%D0%B5-%D1%86%D0%B2%D0%B5%D1%82%D0%B0-%D1%81%D1%82%D0%B0%D1%82%D1%83%D1%81%D0%BE%D0%B2.html) |
| descriptions | array | Описания статуса. Необязательный параметр |
| descriptions\[0\] | object | Модель описания статуса |
| descriptions\[0\]\[id\] | int | ID описания статуса. Необязательный параметр, если не передавать, то описание просто будет перезаписано |
| descriptions\[0\]\[level\] | string | Уровень пользователей для которых показывается описание статуса |
| descriptions\[0\]\[description\] | string | Описание статуса. Необязательный параметр |

#### Пример запроса

```json
{
    "name": "Новое название для статуса",
    "color": "#c1e0ff",
    "descriptions": [
        {
            "level": "newbie",
            "description": "Описание статуса \"Новое название для статуса\" для новичка"
        },
        {
            "id": 497,
            "level": "candidate",
            "description": "Новое описание статуса \"Новое название для статуса\" для кандидата"
        },
        {
            "id": 499,
            "level":"master"
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
| 200 | Статус был успешно изменен |
| 403 | Не хватает прав для вызова данного метода |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает модель статуса, который были изменена. Параметры аналогичны тем, что возвращаются при запросе списка статусов.

#### Пример ответа

```json
{
    "id": 32392165,
    "name": "Новое название для статуса",
    "sort": 20,
    "is_editable": true,
    "pipeline_id": 3177727,
    "color": "#c1e0ff",
    "type": 0,
    "account_id": 12345678,
    "request_id": "0",
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/leads/pipelines/3177727/statuses/32392165"
        }
    },
    "descriptions": [
        {
            "account_id": 12345678,
            "created_at": "2023-05-05 09:48:00",
            "created_by": 0,
            "description": "Описание статуса \"Новое название для статуса\" для новичка",
            "id": 501,
            "level": "newbie",
            "pipeline_id": 3177727,
            "status_id": 32392165,
            "updated_at": "2023-05-05 09:48:00",
            "updated_by": null
        },
        {
            "account_id": 12345678,
            "created_at": "2023-05-05 09:38:00",
            "created_by": 12345,
            "description": "Новое описание статуса \"Новое название для статуса\" для кандидата",
            "id": 497,
            "level": "candidate",
            "pipeline_id": 3177727,
            "status_id": 32392165,
            "updated_at": "2023-05-05 09:48:00",
            "updated_by": 0
        }
    ]
}
```

### Удаление статуса воронки

#### Метод

_DELETE /api/v4/leads/pipelines/{pipeline\_id}/statuses/{id}_

#### Описание

Метод позволяет удалить статус в аккаунте.

#### Ограничения

*   Метод доступен только с правами администратора аккаунта
*   Сделки, который находятся в этапе – будут переведены в первый этап воронки

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
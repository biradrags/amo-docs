<!-- https://www.amocrm.ru/developers/content/crm_platform/contacts-and-companies -->

# Контакты

В данном разделе описываются доступные методы для работы с сущностью контакта

### Оглавление

*   [Список контактов](/crm_platform/contacts-and-companies#contacts-list.html)
    
*   [Получение контакта по ID](/crm_platform/contacts-and-companies#contact-detail.html)
    
*   [Добавление контактов](/crm_platform/contacts-and-companies#contacts-add.html)
    
*   [Редактирование контактов](/crm_platform/contacts-and-companies#contacts-edit.html)
    
*   [Привязка чатов к контактам](/crm_platform/contacts-and-companies#contacts-chat-connect.html)
    
*   [Получение списка чатов контакта](/crm_platform/contacts-and-companies#contacts-chat-list.html)
    

### Список контактов

#### Метод

_GET /api/v4/contacts_

#### Описание

Метод позволяет получить список контактов в аккаунте.

#### Ограничения

Метод доступен в соответствии с правами пользователя.

#### GET параметры

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| with | string | Данный параметр принимает строку, в том числе из нескольких значений, указанных через запятую. [Данный метод поддерживает следующие параметры.](/crm_platform/contacts-and-companies#with-88398e14-be90-44b7-91e0-6371e268833b-params.html) |
| page | int | Страница выборки |
| limit | int | Количество возвращаемых сущностей за один запрос (Максимум – 250) |
| query | string  
int | Поисковый запрос (Осуществляет поиск по заполненным полям сущности) |
| filter | object | Фильтр. Подробней про фильтры читайте в [отдельной статье](/crm_platform/filters-api.html) |
| order | object | Сортировка результатов списка.  
Доступные поля для сортировки: updated\_at, id.  
Доступные значения для сортировки: asc, desc.  
Пример: /api/v4/contacts?order\[updated\_at\]=asc |

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |
| 402 | Аккаунт не оплачен |

#### Параметры ответа

Метод возвращает коллекцию моделей контактов, рассмотрим ниже свойства контакта.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID контакта |
| name | string | Название контакта |
| first\_name | string | Имя контакта |
| last\_name | string | Фамилия контакта |
| responsible\_user\_id | int | ID пользователя, ответственного за контакт |
| group\_id | int | ID группы, в которой состоит ответственны пользователь за контакт |
| created\_by | int | ID пользователя, создавший контакт |
| updated\_by | int | ID пользователя, изменивший контакт |
| created\_at | int | Дата создания контакта, передается в Unix Timestamp |
| updated\_at | int | Дата изменения контакта, передается в Unix Timestamp |
| is\_deleted | bool | Удален ли элемент |
| closest\_task\_at | int | Дата ближайшей задачи к выполнению, передается в Unix Timestamp |
| custom\_fields\_values | array  
null | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного контакта |
| account\_id | int | ID аккаунта, в котором находится контакт |
| \_embedded | object | Данные вложенных сущностей |
| \_embedded\[tags\] | array | Данные тегов, привязанных к контакту |
| \_embedded\[tags\]\[0\] | object | Модель тега, привязанного к контакту |
| \_embedded\[tags\]\[0\]\[id\] | int | ID тега |
| \_embedded\[tags\]\[0\]\[name\] | string | Название тега |
| \_embedded\[tags\]\[0\]\[color\] | null | Цвет тега, доступен только для сделок |
| \_embedded\[companies\] | array | Данные компании, привязанной к контакту. В массиве всегда 1 объект |
| \_embedded\[companies\]\[0\] | object | Данные компании |
| \_embedded\[companies\]\[0\]\[id\] | int | ID компании, привязанной к контакту |
| \_embedded\[customers\] | array | **Требуется GET параметр with.** Данные покупателей, привязанных к контакту |
| \_embedded\[customers\]\[0\] | object | Данные покупателя |
| \_embedded\[customers\]\[0\]\[id\] | int | ID покупателя |
| \_embedded\[leads\] | array | **Требуется GET параметр with.** Данные сделок, привязанных к контакту |
| \_embedded\[leads\]\[0\] | object | Данные сделки |
| \_embedded\[leads\]\[0\]\[id\] | int | ID сделки |
| \_embedded\[catalog\_elements\] | array | **Требуется GET параметр with.** Данные элементов списков, привязанных к контакту |
| \_embedded\[catalog\_elements\]\[0\] | object | Данные элемента списка, привязанного к контакту |
| \_embedded\[catalog\_elements\]\[0\]\[id\] | int | ID элемента, привязанного к контакту |
| \_embedded\[catalog\_elements\]\[0\]\[metadata\] | object | Мета-данные элемента |
| \_embedded\[catalog\_elements\]\[0\]\[quantity\] | int  
float | Количество элементов у контакта |
| \_embedded\[catalog\_elements\]\[0\]\[catalog\_id\] | int | ID списка, в котором находится элемент |
| \_embedded\[catalog\_elements\]\[0\]\[price\_id\] | int | ID поля типа Цена, которое установлено для привязанного элемента в сущности |

#### Пример ответа

```json
{
    "_page": 1,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/contacts?limit=2&page=1"
        },
        "next": {
            "href": "https://example.amocrm.ru/api/v4/contacts?limit=2&page=2"
        }
    },
    "_embedded": {
        "contacts": [
            {
                "id": 7143599,
                "name": "1",
                "first_name": "",
                "last_name": "",
                "responsible_user_id": 504141,
                "group_id": 0,
                "created_by": 504141,
                "updated_by": 504141,
                "created_at": 1585758065,
                "updated_at": 1585758065,
                "closest_task_at": null,
                "custom_fields_values": null,
                "account_id": 28805383,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/contacts/7143599"
                    }
                },
                "_embedded": {
                    "tags": [],
                    "companies": []
                }
            },
            {
                "id": 7767065,
                "name": "dsgdsg",
                "first_name": "",
                "last_name": "",
                "responsible_user_id": 504141,
                "group_id": 0,
                "created_by": 504141,
                "updated_by": 504141,
                "created_at": 1586359590,
                "updated_at": 1586359590,
                "closest_task_at": null,
                "custom_fields_values": null,
                "account_id": 28805383,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/contacts/7767065"
                    }
                },
                "_embedded": {
                    "tags": [],
                    "companies": []
                }
            }
        ]
    }
}
```

#### Параметры для GET-параметра with

| Параметр | Описание |
| --- | --- |
| catalog\_elements | Добавляет в ответ связанные с контактами элементы списков |
| leads | Добавляет в ответ связанные с контактами сделки |
| customers | Добавляет в ответ связанных с контактами покупателей |

### Получение контакта по ID

#### Метод

_GET /api/v4/contacts/{id}_

#### Описание

Метод позволяет получить данные конкретного контакта по ID.

#### Ограничения

Метод доступен в соответствии с правами пользователя.

#### GET параметры

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| with | string | Данный параметр принимает строку, в том числе из нескольких значений, указанных через запятую. [Данный метод поддерживает следующие параметры.](/crm_platform/contacts-and-companies#with-03cd15fc-1b19-487c-93c5-99f959628f45-params.html) |

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 204 | Контакт с указанным ID не существует |
| 401 | Пользователь не авторизован |

#### Параметры ответа

Метод возвращает модель контакта, рассмотрим ниже её свойства.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID контакта |
| name | string | Название контакта |
| first\_name | string | Имя контакта |
| last\_name | string | Фамилия контакта |
| responsible\_user\_id | int | ID пользователя, ответственного за контакт |
| group\_id | int | ID группы, в которой состоит ответственны пользователь за контакт |
| created\_by | int | ID пользователя, создавший контакт |
| updated\_by | int | ID пользователя, изменивший контакт |
| created\_at | int | Дата создания контакта, передается в Unix Timestamp |
| updated\_at | int | Дата изменения контакта, передается в Unix Timestamp |
| is\_deleted | bool | Удален ли элемент |
| closest\_task\_at | int | Дата ближайшей задачи к выполнению, передается в Unix Timestamp |
| custom\_fields\_values | array  
null | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного контакта |
| account\_id | int | ID аккаунта, в котором находится контакт |
| \_embedded | object | Данные вложенных сущностей |
| \_embedded\[tags\] | array | Данные тегов, привязанных к контакту |
| \_embedded\[tags\]\[0\] | object | Модель тега, привязанного к контакту |
| \_embedded\[tags\]\[0\]\[id\] | int | ID тега |
| \_embedded\[tags\]\[0\]\[name\] | string | Название тега |
| \_embedded\[tags\]\[0\]\[color\] | null | Цвет тега, доступен только для сделок |
| \_embedded\[companies\] | array | Данные компании, привязанной к контакту. В массиве всегда 1 объект |
| \_embedded\[companies\]\[0\] | object | Данные компании |
| \_embedded\[companies\]\[0\]\[id\] | int | ID компании, привязанной к контакту |
| \_embedded\[customers\] | array | **Требуется GET параметр with.** Данные покупателей, привязанных к контакту |
| \_embedded\[customers\]\[0\] | object | Данные покупателя |
| \_embedded\[customers\]\[0\]\[id\] | int | ID покупателя |
| \_embedded\[leads\] | array | **Требуется GET параметр with.** Данные сделок, привязанных к контакту |
| \_embedded\[leads\]\[0\] | object | Данные сделки |
| \_embedded\[leads\]\[0\]\[id\] | int | ID сделки |
| \_embedded\[catalog\_elements\] | array | **Требуется GET параметр with.** Данные элементов списков, привязанных к контакту |
| \_embedded\[catalog\_elements\]\[0\] | object | Данные элемента списка, привязанного к контакту |
| \_embedded\[catalog\_elements\]\[0\]\[id\] | int | ID элемента, привязанного к контакту |
| \_embedded\[catalog\_elements\]\[0\]\[metadata\] | object | Мета-данные элемента |
| \_embedded\[catalog\_elements\]\[0\]\[quantity\] | int  
float | Количество элементов у контакта |
| \_embedded\[catalog\_elements\]\[0\]\[catalog\_id\] | int | ID списка, в котором находится элемент |
| \_embedded\[catalog\_elements\]\[0\]\[price\_id\] | int | ID поля типа Цена, которое установлено для привязанного элемента в сущности |

#### Пример ответа

```json
{
    "id": 3,
    "name": "Иван Иванов",
    "first_name": "Иван",
    "last_name": "Иванов",
    "responsible_user_id": 504141,
    "group_id": 0,
    "created_by": 504141,
    "updated_by": 504141,
    "created_at": 1582117331,
    "updated_at": 1590943929,
    "closest_task_at": null,
    "custom_fields_values": [
        {
            "field_id": 3,
            "field_name": "Телефон",
            "field_code": "PHONE",
            "field_type": "multitext",
            "values": [
                {
                    "value": "+79123",
                    "enum_id": 1,
                    "enum": "WORK"
                }
            ]
        }
    ],
    "account_id": 28805383,
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/contacts/3"
        }
    },
    "_embedded": {
        "tags": [],
        "leads": [
            {
                "id": 1,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/1"
                    }
                }
            },
            {
                "id": 3916883,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/leads/3916883"
                    }
                }
            }
        ],
        "customers": [
            {
                "id": 134923,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/customers/134923"
                    }
                }
            }
        ],
        "catalog_elements": [],
        "companies": [
            {
                "id": 1,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/companies/1"
                    }
                }
            }
        ]
    }
}
```

#### Параметры для GET-параметра with

| Параметр | Описание |
| --- | --- |
| catalog\_elements | Добавляет в ответ связанные с контактами элементы списков |
| leads | Добавляет в ответ связанные с контактами сделки |
| customers | Добавляет в ответ связанных с контактами покупателей |

### Добавление контактов

#### Метод

_POST /api/v4/contacts_

#### Описание

Метод позволяет добавлять контакты в аккаунт пакетно.

#### Ограничения

Метод доступен в соответствии с правами пользователя.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

Обязательные поля отсутствуют

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| name | string | Название контакта |
| first\_name | string | Имя контакта |
| last\_name | string | Фамилия контакта |
| responsible\_user\_id | int | ID пользователя, ответственного за контакт |
| created\_by | int | ID пользователя, создавший контакт |
| updated\_by | int | ID пользователя, изменивший контакт |
| created\_at | int | Дата создания контакта, передается в Unix Timestamp |
| updated\_at | int | Дата изменения контакта, передается в Unix Timestamp |
| custom\_fields\_values | array | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного контакта. [Примеры заполнения полей](/crm_platform/custom-fields#cf-fill-examples.html) |
| tags\_to\_add | array | Массив тегов для добавления. |
| tags\_to\_add\[0\] | object | Модель тега для добавления. |
| tags\_to\_add\[0\]\[id\] | array | ID тега для добавления. Важно передать или id или name. |
| tags\_to\_add\[0\]\[name\] | array | Название тега для добавления. Важно передать или id или name. |
| \_embedded | object | Данные вложенных сущностей |
| \_embedded\[tags\] | array | Данные тегов, привязанных к контакту |
| \_embedded\[tags\]\[0\] | object | Модель тега, привязанного к контакту |
| \_embedded\[tags\]\[0\]\[id\] | int | ID тега |
| \_embedded\[tags\]\[0\]\[name\] | string | Название тега |
| request\_id | string | Поле, которое вернется вам в ответе без изменений и не будет сохранено. Поле не является обязательным |

#### Пример запроса

```json
[
    {
        "first_name": "Петр",
        "last_name": "Смирнов",
        "custom_fields_values": [
            {
                "field_id": 271316,
                "values": [
                    {
                        "value": "Директор"
                    }
                ]
            }
        ]
    },
    {
        "name": "Владимир Смирнов",
        "created_by": 47272,
        "tags_to_add": [
            {
                "name": "Тег контакта"
            }
        ]
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
| 200 | Контакты были успешно созданы |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает коллекцию контактов, которые были созданы.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID контакта |
| request\_id | string | Строка переданная при запросе или порядковый указатель, если параметр не передан |

#### Пример ответа

```json
{
  "_links": {
    "self": {
      "href": "https://example.amocrm.ru/api/v4/contacts"
    }
  },
  "_embedded": {
    "contacts": [
      {
        "id": 40401635,
        "request_id": "0",
        "_links": {
          "self": {
            "href": "https://example.amocrm.ru/api/v4/contacts/40401635"
          }
        }
      },
      {
        "id": 40401636,
        "request_id": "1",
        "_links": {
          "self": {
            "href": "https://example.amocrm.ru/api/v4/contacts/40401636"
          }
        }
      }
    ]
  }
}
```

### Редактирование контактов

#### Метод

_PATCH /api/v4/contacts_

#### Описание

Метод позволяет редактировать контакты пакетно.  
Также вы можете добавить ID контакта в метод для редактирования конкретного контакта (/api/v4/contacts/{id}).  
При редактировании пакетно передается массив из объектов-контактов, при редактировании одного контакта, передается просто модель контакта.

#### Ограничения

Метод доступен в соответствии с правами пользователя.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

Обязательные поля отсутствуют

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID контакта |
| name | string | Название контакта |
| first\_name | string | Имя контакта |
| last\_name | string | Фамилия контакта |
| responsible\_user\_id | int | ID пользователя, ответственного за контакт |
| created\_by | int | ID пользователя, создавший контакт |
| updated\_by | int | ID пользователя, изменивший контакт |
| created\_at | int | Дата создания контакта, передается в Unix Timestamp |
| updated\_at | int | Дата изменения контакта, передается в Unix Timestamp |
| custom\_fields\_values | array | Массив, содержащий информацию по значениям дополнительных полей, заданных для данного контакта. [Примеры заполнения полей](/crm_platform/custom-fields#cf-fill-examples.html) |
| tags\_to\_add | array | Массив тегов для добавления. |
| tags\_to\_add\[0\] | object | Модель тега для добавления. |
| tags\_to\_add\[0\]\[id\] | array | ID тега для добавления. Важно передать или id или name. |
| tags\_to\_add\[0\]\[name\] | array | Название тега для добавления. Важно передать или id или name. |
| tags\_to\_delete | array | Массив тегов для удаления. |
| tags\_to\_delete\[0\] | object | Модель тега для удаления. |
| tags\_to\_delete\[0\]\[id\] | array | ID тега для удаления. Важно передать или id или name. |
| tags\_to\_delete\[0\]\[name\] | array | Название тега для удаления. Важно передать или id или name. |
| \_embedded | object | Данные вложенных сущностей |
| \_embedded\[tags\] | array | Данные тегов, привязанных к контакту |
| \_embedded\[tags\]\[0\] | object | Модель тега, привязанного к контакту |
| \_embedded\[tags\]\[0\]\[id\] | int | ID тега |
| \_embedded\[tags\]\[0\]\[name\] | string | Название тега |

#### Пример запроса

```json
{
  "id": 3,
  "first_name": "Иван",
  "last_name": "Иванов",
  "custom_fields_values": [
    {
      "field_id": 66192,
      "field_name": "Телефон",
      "values": [
        {
          "value": "79999999999",
          "enum_code": "WORK"
        }
      ]
    }
  ],
  "tags_to_delete": [
    {
      "id": 145471
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
| 200 | Контакты были успешно изменены |
| 401 | Пользователь не авторизован |
| 400 | Переданы некорректные данные. Подробности доступны в теле ответа |

#### Параметры ответа

Метод возвращает коллекцию контактов, которые были изменены.

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID контакта |
| updated\_at | int | Unix Timestamp изменения контакта |

#### Пример ответа

```json
{
    "_links": {
        "self": {
            "href": "https://example.amocrm.ru/api/v4/contacts"
        }
    },
    "_embedded": {
        "contacts": [
            {
                "id": 3,
                "name": "Иван Иванов",
                "updated_at": 1590945248,
                "_links": {
                    "self": {
                        "href": "https://example.amocrm.ru/api/v4/contacts/3"
                    }
                }
            }
        ]
    }
}
```

### Привязка чатов к контактам

#### Метод

_POST /api/v4/contacts/chats_

#### Описание

Метод позволяет привязать чат к контакту. Чат может быть привязан только к 1 контакту, в тоже время контакт может быть  
привязан к нескольким чатам.

#### Ограничения

Метод доступен с правами администратора аккаунта.  
В настройках канала должен быть указан uuid интеграции, которая запрашивает метод.  
Интеграция может менять привязку чатов только по каналам, к которым она имеет доступ.  
Не должны передаваться никакие сессионые куки, иначе метод вернет ошибку.

#### Заголовок запроса

_Content-Type: application/json_

#### Параметры запроса

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| chat\_id | string | Данный параметр принимает массив строк, uuid идентификаторов чатов |
| contact\_id | int | Данный параметр принимает массив чисел, id контактов |
| request\_id | string | Поле, которое вернется вам в ответе без изменений и не будет сохранено. Поле не является обязательным |

#### Пример запроса

```json
[
    {
        "contact_id": 3102959,
        "chat_id":"6cbab3d5-c4c1-46ff-b710-ad59ad10805f"
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
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |

#### Параметры ответа

Метод возвращает коллекцию связей

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID связи контакта и чата (может меняться при изменении привязки чата к контакту) |
| contact\_id | int | ID контакта |
| chat\_id | string | ID чата |
| request\_id | string | Строка переданная при запросе или порядковый указатель, если параметр не передан |

#### Пример ответа

```json
{
    "_total_items": 1,
    "_embedded": {
        "chats": [
            {
                "chat_id": "6cbab3d5-c4c1-46ff-b710-ad59ad10805f",
                "contact_id": 3102959,
                "id": 26219,
                "request_id": "0"
            }
        ]
    }
}
```

### Получение списка чатов контакта

#### Метод

_GET /api/v4/contacts/chats_

#### Описание

Метод позволяет получить список чатов, которые относятся к контактам. Или список контактов к которым привязан чат.  
Если чат относится к неразобранному, метод вернет id контакта в этом неразобранном.

#### Ограничения

Метод доступен с правами администратора аккаунта.  
В настройках канала должен быть указан uuid интеграции, которая запрашивает метод.  
Интеграция может запросить только чаты по каналам, к которым она имеет доступ. Таким образом внутренние чаты между пользователями аккаунта выводится не будут.  
Не должны передаваться никакие сессионые куки, иначе метод вернет ошибку.

#### GET параметры

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| chat\_id | string | Данный параметр принимает массив строк, uuid идентификаторов чатов |
| contact\_id | int | Данный параметр принимает массив чисел, id контактов |

#### Заголовок типа данных при успешном результате

_Content-Type: application/hal+json_

#### Заголовок типа данных при ошибке

_Content-Type: application/problem+json_

#### HTTP коды ответа

| Код ответа | Условие |
| --- | --- |
| 200 | Запрос выполнен успешно |
| 401 | Пользователь не авторизован |
| 400 | Переданы не верные данные в запросе. Подробности в теле ответа |

#### Параметры ответа

Метод возвращает коллекцию связей

| Параметр | Тип данных | Описание |
| --- | --- | --- |
| id | int | ID связи контакта и чата (может меняться при изменении привязки чата к контакту) |
| contact\_id | int | ID контакта |
| chat\_id | string | ID чата |

#### Пример ответа

```json
{
    "_total_items": 1,
    "_embedded": {
        "chats": [
            {
                "chat_id": "6cbab3d5-c4c1-46ff-b710-ad59ad10805f",
                "contact_id": 3102959,
                "id": 26219
            }
        ]
    }
}
```
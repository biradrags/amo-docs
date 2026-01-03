<!-- https://www.amocrm.ru/developers/content/integrations/fields -->

# Типы полей раздела settings manifest.json

Типы полей

Разберем возможные типы полей, которые можно указывать в разделе settings файла manifest.json. Все возможные типы перечислены в таблице, с описанием их свойств, по каждому типу приведены примеры использования его в manifest.json и, если это необходимо, пример файла локализации из папки i18n/

| Тип | Описание |
| --- | --- |
| text | Текстовое поле |
| pass | Поле для ввода пароля |
| users | Будет выведен список пользователей системы с 1 текстовым полем на каждого, требуется в случае  
если нужно  
ввести какую-то информацию по каждому сотруднику, например внутренний телефонный номер для IP-телефонии |
| users\_lp | Будет выведен список пользователей системы с 2 полями (login,password) на каждого. |
| custom | Поля типа custom, подробно рассмотрены а разделе  
[Расширенные настройки виджета](/developers/content/integrations/custom_settings). |

Ниже приведены примеры применения типов полей в файле manifest.json

**Типы полей text и pass.**

#### Пример описания в manifest.json.

    {
      "widget": {
        "name": "widget.name",
        "description": "widget.description",
        "short_description": "widget.short_description",
        "code": "new_widget",
        "secret_key": "57009cb5048a72191f25b01355c17d10dc349df20d4fe2ad0c69930223e13955",
        "version": "1.0.0",
        "interface_version": 2,
        "init_once": false,
        "locale": [
          "ru",
          "en"
        ],
        "installation": true
      },
      "locations": [
        "ccard-1",
        "clist-1"
      ],
      "settings": {
        "login": {
          "name": "settings.login", //указывает на файл локализации, в папке i18n
          "type": "text", //тип: текстовое поле
          "required": false
        },
        "password": {
          "name": "settings.password", //указывает на файл локализации, в папке i18n
          "type": "pass", //тип: пароль
          "required": false
        }
      }
    }

i18n/en.json в данном случае должен иметь следующий вид:

    {
      "widget": {
        "name": "Test widget",
        "short_description": "Short one",
        "description": "ENGLISH: #SUBDOMAIN# #HOST# #LOGIN# #API_HASH# #USER_ID# #ACCOUNT_ID# # LINK # http: //example.test/link_to_copy#/LINK# Lorem ipsum dolor sit amet,  consectetur adipiscing elit.  Quisque posuere tristique nisl vitae fringilla. Nam purus tellus, vestibulum at interdum id, cursus sed lacus.Pellentesque vitae ligula sem. Proin imperdiet luctus arcu sed vulputate. Pellentesque malesuada tincidunt lectus eu congue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames."
      },
      "settings": {
        "login": "User login",
        "password": "User password"
      }
    }

#### Тип поля users.

Рассмотрим пример поля типа:  
**users**. Этот тип поля используется когда необходимо представить список пользователей системы с текстовыми полями, требуется в случае если нужно ввести какую-то информацию по каждому сотруднику, например внутренний телефонный номер для IP-телефонии. Ниже приведен пример файла **manifest.json**.

В последующих примерах для краткости опущены содержания частей widget,  
locations и других, их значения аналогичны предыдущим примерам.

    {
      "widget": {},
      "locations": [],
      "settings": {
        "login": {},
        "password": {},
        "phones": {
          "name": "settings.user_phones",
          "type": "users",
          "required": true
        }
      }
    }

**i18n/en.json**  
в данном случае должен иметь следующий вид:

    {
      "widget": {},
      "settings": {
        "login": "User login",
        "password": "User password",
        "user_phones": "Phones list"
      }
    }

#### Тип поля users\_lp.

Данный тип поля является расширенной версией поля **users**. Отличие состоит в том, что по каждому пользователю предоставляется два поля, а не одно как в случае с users. Используется, когда по каждому сотруднику необходимо предоставить пары значений, например: login-password. Ниже приведен пример файла **manifest.json**.

    {
      "widget": {},
      "locations": [],
      "settings": {
        "auth_data": {
          "name": "settings.auth_data",
          "type": "users_lp",
          "required": false
        }
      }
    }

Так же существует возможность добавлять пользовательские поля типа custom. Эта возможность подробно рассмотрена в разделе [Расширенные настройки виджета](/developers/content/integrations/custom_settings)

[JS-Виджет](/developers/content/integrations/script_js)
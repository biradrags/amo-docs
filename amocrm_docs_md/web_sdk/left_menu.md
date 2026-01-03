<!-- https://www.amocrm.ru/developers/content/web_sdk/left_menu -->

# https://www.amocrm.ru/developers/content/web_sdk/left_menu

Левое меню и подразделы

amoCRM позволяет виджетам добавлять собственные пункты в главное меню. Разработка этого функционала осуществляется только в публичных интеграциях при наличии технического аккаунта. При установке виджета с такой возможностью в аккаунте пользователя в левом меню появится новый пункт виджета.

Визуально такой пункт будет отличаться от системных, чтобы пользователь понимал, что данная функциональность не является штатной, пример показан на скриншоте ниже.

![](https://i.postimg.cc/13wrYvKH/image1.jpg)

Итак, чтобы добавить собственный пункт меню необходимо добавить следующие строки в **manifest.json**

    {
      ...
    
      "locations": [
        "widget_page"
      ],
      "left_menu": {
        "realty_widget_code": {
          "title": "lang.code",
          "icon": "images/home_page.svg",
          "submenu": {
            "sub_item_code_1": {
              "title": "lang.code", // код лэнга подпункта
              "sort": 2
            },
            "sub_item_code_2": {
              "title": "lang.code",
              "sort": 1
            }
          }
        }
      },
    
      ...
    }

Как видим обязательно нужно добавить **widget\_page** в список локейшнов виджета, далее появляется свойство **left\_menu**, ключ **realty\_widget\_code** это код пункта меню, также у пункта меню могут быть подпункты, в таком случае страница пункта виджета будет иметь дочернее меню как на скриншоте ниже. Сортировкой подпунктов можно управлять с помощью свойства **sort**.

![](https://i.postimg.cc/T3MrmrXW/image2.jpg)

По умолчанию пункт меню добавляется после раздела настройки в конец главного меню, однако, у виджета есть возможность управлять своим положением, например, можно поставить пункт виджета после раздела "Сделки":

    {
      ...
      "left_menu": {
        "realty_widget_code": {
          "title": "lang.code",
          "icon": "images/home_page.svg",
          "sort": {
            "after": "leads"
          },
          "submenu": {
            "sub_item_code_1": {
              "title": "lang.code"
            },
            "sub_item_code_2": {
              "title": "lang.code"
            }
          }
        }
      }
    
      ...
    }

Список кодов системных меню, которые можно указать в качестве значения **after**:

*   dashboard
*   leads
*   customers
*   tasks
*   catalogs
*   mail
*   stats
*   settings

Помимо собственного пункта меню виджет может добавить подпункты в системные меню "Аналитики" (**stats**) и "Настроек" (**settings**), вот пример кода в **manifest.json** для добавления нового пункта в меню раздела "Аналитика":

    {
      ...
    
      "left_menu": {
        "stats": {
          "submenu": {
            "custom_sub_item_1": {
              "title": "lang.code"
            },
            "custom_sub_item_2": {
              "title": "lang.code"
            }
          }
        }
      },
    
      ...
    }

Также виджет может скрывать системные пункты меню, кроме пункта "Настройки", в данном случае manifest.json должен выглядеть так:

    {
      ...
    
      "left_menu": {
        "stats": {
          "is_hidden": true
        },
        "mail": {
          "is_hidden": true
        }
      }
    
      ...
    }

Список кодов системных меню, которые поддерживают скрытие:

*   dashboard
*   leads
*   customers
*   tasks
*   catalogs
*   mail
*   stats

Для обработки клика по пунктам меню в виджете предусмотрен специальный колбэк **initMenuPage**, данный колбэк на вход принимает объект следующего вида:

    {
        "location": "widget_page", // "stats" or "settings"
        "item_code": "custom_item_1", // только в созданных пунктах левого меню
        "subitem_code": "sub_item_1" // код подпункта
    }

В location приходит обозначение сущности, в которой находится пункт меню, как мы уже знаем пункт меню может быть добавлен как дочерний в системные разделы.

В item\_code – код пункта меню, в subitem\_code код подпункта, если пользователь перешел в дочерний пункт меню.

Пример реализации колбэка **initMenuPage**:

    this.callbacks = {
      /**
      * Метод срабатывает, когда пользователь переходит на кастомную страницу виджета.
      * Мы должны отрендерить страницу в зависимости от состоянии страницы.
      *
      * @param params - Передается текущее состояние страницы. Формат такой:
      * {
      *     location: 'widget-page', // текущая локация
      *     item_code: 'custom_item_1', // ключ, который был указан в manifest.json
      *     subitem_code: 'custom_sub_item_3' // ключ подпункта, который был указан в manifest.json
      * }
      */
      initMenuPage: _.bind(function (params) {
      switch (params.location) {
        case 'stats': // в этом случае item_code, мы не получим
          switch (params.subitem_code) {
            case 'sub_item_1':
              self.getTemplate(
                'stats__sub_item_1',
                {},
                function (template) {
                  $('#work-area-' + self.get_settings().widget_code).html('Пункт Аналитика, подпункт 1');
                });
              break;
    
            case 'sub_item_2':
              self.getTemplate(
                'stats__sub_item_2',
                {},
                function (template) {
                  $('#work-area-' + self.get_settings().widget_code).html('Пункт Аналитика, подпункт 2');
                });
              break;
          }
    
          break;
    
        case 'settings': // в этом случае item_code, мы не получим
          // noop
          break;
    
        case 'widget_page':
          switch (params.item_code) {
            case 'custom_item_3':
              switch (params.subitem_code) {
                case 'sub_item_1':
                  self.getTemplate(
                    'custom_item_3__sub_item_1',
                    {},
                    function (template) {
                      $('#work-area-' + self.get_settings().widget_code).html('Пункт 3, подпункт 1');
                    });
                  break;
    
                // etc.
              }
    
              break;
    
              // etc.
          }
    
          break;
      }
      }, self),
    }
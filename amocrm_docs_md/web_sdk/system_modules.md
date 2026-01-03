<!-- https://www.amocrm.ru/developers/content/web_sdk/system_modules -->

# Системные модули

### Оглавление

*   [Вендорные модули](/web_sdk/system_modules#%D0%92%D0%B5%D0%BD%D0%B4%D0%BE%D1%80%D0%BD%D1%8B%D0%B5-%D0%BC%D0%BE%D0%B4%D1%83%D0%BB%D0%B8.html)
*   [Модули amoCRM](/web_sdk/system_modules#%D0%9C%D0%BE%D0%B4%D1%83%D0%BB%D0%B8-amoCRM.html)
*   [Объект Modal для работы с модальным окном](/web_sdk/system_modules#%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-Modal-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B-%D1%81-%D0%BC%D0%BE%D0%B4%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%BC-%D0%BE%D0%BA%D0%BD%D0%BE%D0%BC.html)

### Вендорные модули

Для того, чтобы сократить количество загружаемых ресурсов из сети и ускорить работу amoCRM в браузере клиента, виджеты могут использовать вендорные библиотеки, предоставляемые системой.

| Модуль | Версия | Ссылка на NPM |
| --- | --- | --- |
| underscore | 1.9.1 | [https://www.npmjs.com/package/underscore](https://www.npmjs.com/package/underscore) |
| backbone | 1.1.2 | [https://www.npmjs.com/package/backbone](https://www.npmjs.com/package/backbone) |
| jquery | 2.1.3 | [https://www.npmjs.com/package/jquery](https://www.npmjs.com/package/jquery) |
| twigjs | 0.8.9 | [https://www.npmjs.com/package/twigjs](https://www.npmjs.com/package/twigjs) |
| browser-detect | 0.2.28 | [https://www.npmjs.com/package/browser-detect](https://www.npmjs.com/package/browser-detect) |
| chartjs | 2.9.2 | [https://www.npmjs.com/package/chart.js](https://www.npmjs.com/package/chart.js) |
| colorpicker | 3.0.0 | [https://www.npmjs.com/package/jquery-colpick](https://www.npmjs.com/package/jquery-colpick) |
| rangeslider | 2.3.2 | [https://www.npmjs.com/package/rangeslider.js](https://www.npmjs.com/package/rangeslider.js) |
| clipboard | 1.5.10 | [https://www.npmjs.com/package/clipboard](https://www.npmjs.com/package/clipboard) |
| cocktail | 0.5.15 | [https://www.npmjs.com/package/backbone.cocktail](https://www.npmjs.com/package/backbone.cocktail) |
| accounting | 0.3.2 | [https://www.npmjs.com/package/accounting](https://www.npmjs.com/package/accounting) |
| device | 0.8.0 | [https://www.npmjs.com/package/current-device](https://www.npmjs.com/package/current-device) |
| enquire | 2.1.1 | [https://www.npmjs.com/package/enquire.js](https://www.npmjs.com/package/enquire.js) |
| FileAPI | 2.0.5 | [https://www.npmjs.com/package/fileapi](https://www.npmjs.com/package/fileapi) |
| google-libphonenumber | 3.0.0 | [https://www.npmjs.com/package/google-libphonenumber](https://www.npmjs.com/package/google-libphonenumber) |
| jplayer | 2.9.2 | [https://www.npmjs.com/package/jplayer](https://www.npmjs.com/package/jplayer) |
| js-uuid | 0.0.6 | [https://www.npmjs.com/package/js-uuid](https://www.npmjs.com/package/js-uuid) |
| fullcalendar | 2.3.1 | [https://www.npmjs.com/package/fullcalendar](https://www.npmjs.com/package/fullcalendar) |
| moment | 2.24.0 | [https://www.npmjs.com/package/moment](https://www.npmjs.com/package/moment) |
| pubsub | 1.5.3 | [https://www.npmjs.com/package/pubsub-js](https://www.npmjs.com/package/pubsub-js) |
| steady | 2.0.0 | [https://www.npmjs.com/package/steady](https://www.npmjs.com/package/steady) |
| store | 1.3.20 | [https://www.npmjs.com/package/store](https://www.npmjs.com/package/store) |
| cropperjs | 1.2.2 | [https://www.npmjs.com/package/cropperjs](https://www.npmjs.com/package/cropperjs) |
| virtualized-list | 2.2.0 | [https://www.npmjs.com/package/virtualized-list](https://www.npmjs.com/package/virtualized-list) |
| quill | 1.3.6 | [https://www.npmjs.com/package/quill](https://www.npmjs.com/package/quill) |
| intl\_tel\_input | 3.7.1 | [https://www.npmjs.com/package/intl-tel-input](https://www.npmjs.com/package/intl-tel-input) |

Можно использовать любую из этих библиотек в соответствии с API указанной версии, ознакомиться с API можно по ссылкам на NPM. Для использования в своем виджете укажите код модуля из таблицы в зависимостях виджета в **script.js**:

```javascript
define(['jquery', 'moment'], function ($, moment) {
  $('#my_widget_selector').css('color', 'red');

  console.log(moment().format('DD-MM-YYYY'));
});
```

### Модули amoCRM

Помимо внешних модулей виджеты могут использовать некоторые части amoCRM для более нативной интеграции в систему.

Наверное, самый часто используемый модуль это модальное окно (**lib/components/base/modal**). Вот пример его использования в **script.js**:

```javascript
define(['jquery', 'underscore', 'lib/components/base/modal'], function ($, _, Modal) {
 return function () {
   var self = this;

   this.callbacks = {
     init: function () { return true; },
     bind_actions: function () {
       $(document).on(
         'click.' + self.get_settings().widget_code,
         '.my_widget_button',
         function () {
           new Modal({
             // собственный класс для модального окна,
             // если нужно в нем поменять какие-то стили
             class_name: '',

             // метод, отрабатывающий при
             // готовности модального окна
             // получает в параметр jQuery-объект $modal_body
             // тела модального окна, все внутренности
             // окна будут в нем
             init: _.noop,

             // кастомный `destroy`, может вернуть `false`,
             // тогда закрытия окна не произойдет
             destroy: _.noop,

             // контейнер, куда попадет
             // модальное окно и относительно
             // какого элемента будет центрироваться
             container: document.body,

             // если нужно запретить закрытие модального окна
             // по клику на оверлэе, просто передаем в options
             // `disable_overlay_click`
             disable_overlay_click: false,

             // если нужно запретить закрытие модального окна
             // по нажатию на escape
             disable_escape_keydown: false,

             // если нужно запретить дефолтную обработку enter
             disable_enter_keydown: false,

             // параметр отвечает за анимацию всплывания
             // модального окна, если передать `true`,
             // то оно запустится с анимацией увеличения и появления
             init_animation: false,

             // по умолчанию оверлей у модалок белый,
             // изменить если нужен темный оверлей
             default_overlay: false,

             // элемент, который получает фокус,
             // по умолчанию это кнопка акцепта. нужен для того,
             // чтобы снимать фокус с кнопки вызвавшей событие
             focus_element: '.js-modal-accept',
           });
         }
       )
     },
     render: function () { return true; },
     destroy: function () {
       $(document).off('.' + self.get_settings().widget_code);

       return true;
     },
     settings: function () { return true; },
     onSave: function () { return true; }
   }
 };
});
```

### Объект Modal для работы с модальным окном

Для работы с ним необходимо:

1.  Подключить в файле script.js
2.  Вызвать модальное окно в момент когда оно должно появиться
3.  Передать необходимые параметры при вызове

В данном примере показано использование объекта модального окна Modal

Отдельный пример приведен ниже.

```javascript
define(['jquery', 'lib/components/base/modal'], function ($, Modal) {
    var CustomWidget = function () {
        this.callbacks = {
            // ...
            bind_actions: function () {
                // ...
                var data = '<h1>Test</h1><p>Some text</p>';
                modal = new Modal({
                    class_name: 'modal-window',
                    init: function ($modal_body) {
                        var $this = $(this);
                        $modal_body
                            .trigger('modal:loaded') // запускает отображение модального окна
                            .html(data)
                            .trigger('modal:centrify')  // настраивает модальное окно
                            .append('');
                    },
                    destroy: function () {
                    }
                });
                // ...
                return true;
            }
        }
    }
    return CustomWidget;
});
```

Для работы с объектом модальное окно необходимо подключить его через require (define в начале script.js) и передать параметры : class\_name, init() , destroy(). В init передаются данные для отображения в модальном окне и события trigger для того, чтобы запустить методы объекта Modal и вывести модальное окно в DOM.

#### Параметры

| Параметр | Описание |
| --- | --- |
| class\_name | Дополнительные классы для модального окна |
| can\_centrify | костыльный параметр центровки для мобильных устройств некоторые модальные окна нужно специаль перецентрировать после закрытия клавиатуры на мобильном планшете |
| init | метод, отрабатывающий при готовности модального окна получает в параметр jQuery-объект $modal\_body тела модального окна, все внутренности окна будут в нем |
| destroy | кастомный \`destroy\`, может вернуть \`false\`, тогда закрытия окна не произойдет |
| container | контейнер, куда попадет модальное окно и относительно какого элемента будет центрироваться |
| disable\_overlay\_click | если нужно запретить закрытие модального окна по клику на оверлэе, просто передаем в options \`disable\_overlay\_click\` |
| disable\_escape\_keydown | если нужно запретить закрытие модального окна по нажатию на escape |
| disable\_enter\_keydown | если нужно запретить дефолтную обработку enter |
| init\_animation | параметр отвечает за анимацию всплывания модального окна, если передать \`true\`, то оно запустится с анимацией увеличения и появления |
| default\_overlay | по умолчанию оверлей у модалок белый, изменить если нужен темный оверлей |
| preload\_templates | шаблоны для прелоада, можно передать массив необходимых шаблонов twig для подгрузки |
| focus\_element | элемент, который получает фокус, по умолчанию это кнопка акцепта. нужен для того, чтобы снимать фокус с кнопки вызвавшей событие |
| centrify\_animation | нужна ли анимация при центрировании модального окна |
| disable\_cancel\_click | отключает закрытие модального окна по крестику и оверлею |
| disable\_resize | отключить ресайз модального окна при инициализации |
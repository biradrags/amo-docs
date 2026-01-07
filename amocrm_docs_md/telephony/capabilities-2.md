<!-- https://www.amocrm.ru/developers/content/telephony/capabilities-2 -->

# Возможности

Телефония в amoCRM – это интеграция amoCRM со сторонней компанией, предоставляющей услугу виртуальной телефонии, посредством виджетов.

Суть интеграции amoCRM и виртуальной АТС заключается в том, что по определенным событиям происходит обмен данными. Таких событий несколько, из них формируются возможности, дальше мы рассмотрим каждую возможность в подробности и приведём примеры их реализации.

### Карточка входящего звонка

В системе amoCRM реализована возможность выводить в левом нижнем углу окошко с уведомлением. Как пример использования можно назвать уведомление о входящем звонке вызываемой телефонией.

#### Существует два основных способа создания уведомлений о звонке:

Создание уведомления с помощью публичного метода API [POST /api/v2/events](/telephony/call_event.html). Данный метод автоматически найдет сущность(контакт/компанию/сделку/покупателя) по переданному номеру телефона и отобразит уведомление с этой сущностью для нужного сотрудника. Если же сущности с таким номером еще нет в базе, то уведомление будет содержать в себе ссылку на создание нового контакта с этим номером.

Другой способ – это создание уведомлений с помощью JS части виджета. Непосредственно в момент поступления звонка на телефон сотрудника, виртуальная АТС имеет возможность запросить через API amoCRM информацию о звонящем контакте и передать ее сотруднику. Для осуществления поиска необходимо использовать метод [GET /api/v4/contacts](/api/contacts.html), передавая в параметр query телефонный номер. Как и все методы API, данный метод вызываются из-под авторизованного пользователя, а соответственно учитываются права пользователя на доступ к контактам. Т.е. для определения номера данный контакт должен быть в базе amoCRM и у соответствующего пользователя должны быть права на просмотр нужной карточки контакта.

Обязательно нужно ставить минимальный timeout на отработку запроса, т.к. иначе, в случае деградации связи между АТС и amoCRM, возможны проблемы со звонками.

Для доставки информации о входящем звонке до JS-скрипта на стороне клиента обычно используются технологии web- sockets, когда между клиентом и сервером устанавливается постоянное соединение и подписка на события. Можно использовать технологию периодических обращений через JS на сторонний сервер. Для этого раз в несколько секунд на стороне клиента подгружается JS-файл с целевого сервера, где определяется массив с состоянием канала (есть вызов, нет вызова для конкретного внутреннего телефона сотрудника).

Выбор метода зависит от технической возможности на стороне виртуальной АТС поддерживать web-sockets соединение. При этом необходимо учитывать внутренние номера сотрудников и их соответствие авторизованным в amoCRM пользователям, просматривающим интерфейс.

#### Пример карточки входящего звонка

![](https://i.postimg.cc/d0crWCBR/Screenshot-10-1.png)

Для реализации карточки входящего звонка можно использовать предусмотренный объект. В примере функция, созданная для работы с ним.

#### Пример

```javascript
/* script.js */
self.add_call_notify = function (data) {
  var w_name = self.i18n('widget').name,
    date_now = Math.ceil(Date.now() / 1000),
    lang = self.i18n('settings'),
    n_data = {
      from: data.from,
      to: data.to,
      duration: data.duration,
      link: data.link,
      text: w_name + ': ' + data.text,
      date: date_now,
      element: data.element,
      click_link: data.element && data.element.id > 0 ? '' : "/contacts/add/?phone=" + data.from, //ваша ссылка
    };

  /* Делаем проверку, существует ли ID контакта, совершающего входящий вызов */
  if (n_data.element.id > 0) { //Если ID существует, формируем ссылку на данный контакт в amoCRM
    var text = 'Вам звонит:' + n_data.element.name + 'Перейти в карту контакта';
    n_data.text = text;
    n_data.from = data.from;
    if (n_data.from.length < 4) { //Проверка на внутренний номер
      n_data.header = 'Внутренний номер: ' + data.from + ' ';
    } else {
      n_data.header = 'Входящий вызов: ' + data.from + ' ';
    }
  }

  AMOCRM.notifications.add_call(n_data);
};

/* Далее данные, имитирующие поступающую информацию */
var notify_data = {};
notify_data.from = '+7 (999) 111 22 33';
notify_data.to = 'Смирнов Алексей';
notify_data.element = {id: 1003619, type: "contact"};

self.add_call_notify(notify_data);
```

Параметр text является обязательным для передачи в функцию add\_call.

Для того, чтобы найти информацию по контакту имея только номер телефона входящего вызова, можно использовать метод GET /api/v4/contacts с параметром query.

#### Пример

```javascript
/* script.js */
function get_value_by_trace(obj,params) {
  value = params.split(".").every(function(key) {
      return obj = obj[key]
  }) && obj;
  return value ? value : '';
};

var notifications_data = {};
var number = 89995551122 // Номер телефона

$.get('/api/v4/contacts?query=' + number , function(res) {
  if (typeof res !== "undefined") {
    notifications_data.id = get_value_by_trace(res, '_embedded.contacts.0.id');
    notifications_data.name = get_value_by_trace(res, '_embedded.contacts.0.name');
    notifications_data.company = get_value_by_trace(res, '_embedded.contacts.0._embedded.companies.0.name');
  }
});
```

Важно помнить, что необходимо объявить область подключения виджета в manifest.json. Для выполнения функции карточки входящего звонка, рекомендуется задать область everywhere. Определив тем самым, что ваш виджет будет срабатывать в любой области amoCRM, это позволит получать уведомления о входящем звонке вне зависимости от того, какую работу выполняет пользователь в amoCRM. Подробнее об областях подключения читайте [здесь](/integrations/areas.html).

#### Пример

```javascript
/* manifest.json */
"locations": [ "everywhere" ]
```

Так же можно вывести информацию о совершённом звонке, передав входящие данные:

#### Пример

```javascript
var notify_data = {};
notify_data.from = 'Петрова Анна';
notify_data.to = 'Смирнов Алексей';
notify_data.element = {id: 1003619, type: "contact"};
notify_data.duration = 60;
notify_data.link = 'https://example.com/dialog.mp3';
notify_data.text = 'Widget text';
```

#### Пример изменённых входных данных

![](https://i.postimg.cc/RZ7NZD7f/incoming-call-3.png)

### Создание карточки контакта

В системе amoCRM есть возможность создать карточку контакта, в случае если входящий вызов поступает с контакта, которого ещё нет в вашем аккаунте.

#### Пример уведомления

![](https://i.postimg.cc/MTTTtZhb/incoming-new-contact.png)

Для реализации этой возможности необходимо внести изменения в метод, описанный в <<Карточке входящего контакта>>.

#### Пример

```javascript
self.add_call_notify = function(data) {
  var w_name = self.i18n('widget').name,
    date_now =
    Math.ceil(Date.now() / 1000),
    lang = self.i18n('notifications'),
    text,
    n_data = {
      to: data.to,
      duration: data.duration,
      date: date_now,
      element: data.element
    };

  // Делаем проверку, существует ли ID контакта, совершающего входящий вызов
  if (n_data.element.id > 0) { // Если ID существует, формируем ссылку на данный контакт в amoCRM
    text = 'Вам звонит: ' + n_data.element.name + '<a href="/contacts/detail/' + n_data.element.id + '">Перейти в карту контакта</a>';
    n_data.text = text;
    n_data.from = data.from;
    if (n_data.from.length < 4) { // Проверка на внутренний номер
      n_data.header = 'Внутренний номер: ' + data.from + '';
    } else {
      n_data.header = 'Входящий вызов: ' + data.from + '';
    }
  } else { // Если ID не существует, формируем ссылку на создание нового контакта
    text = '<a href="/contacts/add/?phone=' + data.from + '">Создать контакт</a>';
    n_data.text = text;
    n_data.header = 'Входящий вызов ' + data.from; // Обратите внимание, в случае создания нового контакта, n_data.from не заполняется!
  }
  AMOCRM.notifications.add_call(n_data);
};

/* Далее данные, имитирующие поступающую информацию */
var notify_data = {};
notify_data.from = '+7 (998) 444 55 66';
notify_data.to = 'User Name';
self.add_call_notify(notify_data);
```

### Умная переадресация

При поступлении звонка, кроме информации об имени звонящего, вы также можете получить ID пользователя amoCRM, ответственного за карточку звонящего контакта. Из информации об аккаунте вы можете получить телефонный номер ответственного сотрудника и произвести переадресацию вызова именно работающему с контактом человеку.

Для реализации этой возможности вам понадобится составить несколько запросов к нашему API, чтобы в итоге получить телефонный номер сотрудника ответственного за карточку звонящего контакта.

#### Пример

```php
$phone_number = /* Номер телефона входящего вызова */ ;
$subdomain = /* Ваш аккаунт — поддомен */;
$link = 'https://'.$subdomain.'.amocrm.ru/api/v4/contacts?query='.$phone_number; // Запрос к API на поиск карточки контакта
$curl = curl_init();

# Сохраняем дескриптор сеанса cURL
# Устанавливаем необходимые опции для сеанса cURL
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_USERAGENT, 'amoCRM-API-client/1.0');
curl_setopt($curl, CURLOPT_URL, $link);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_COOKIEFILE, dirname(__FILE__).'/cookie.txt');
curl_setopt($curl, CURLOPT_COOKIEJAR, dirname(__FILE__).'/cookie.txt');
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 0);
$out = curl_exec($curl);

#Инициируем запрос к API и сохраняем ответ в переменную
$code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);
$Response = json_decode($out, true);

/* Из ответа, на запрос карточки пользователя, получаем ID ответственного пользователя */
$responsible_user_id = $Response['response']['contacts'][0]['responsible_user_id'];
```

$responsible\_user\_id будет ID пользователя, ответственного за карточку совершающего вызов контакта. Т.к. данные пользователей на аккаунте amoCRM и в базе виджета телефонии совпадают, что является одним из условий подключения виджета телефонии, вы можете перевести входящий вызов на ответственного пользователя.

### Результат звонка

Функция реализуется путём запуска модального окна, в котором можно реализовать создание новой сделки или контакта, с указанием примечания или задачи, которые будут связаны с созданной сущностью.

#### Пример результата звонка

![](https://i.postimg.cc/tRsd49Yx/call-result-example-2.png)

**Модальное окно состоит из следующих элементов:**

1.  Название окна
2.  Привязанная сущность / возможность привязки сущности(сделка/контакт/покупатель/компания)
3.  Панель записанного звонка (с указанием продолжительности звонка и возможностью прослушивания)
4.  Панель статуса завершенного звонка
5.  Окно добавления примечания

*   Если звонок исходящий на неизвестный / входящий с неизвестного номера – в заголовке будет обозначен номер телефона неизвестного абонента, а в графе привязки звонка будет пусто. При редактировании контакта будет также создана сделка. Звонок привязывается по [специальному алгоритму добавления звонков](/crm_platform/calls-api.html)
*   Если звонок входящий с известного номера, то:
*   Отобразится сделка, если у контакта только одна сделка.
*   Отобразится покупатель, если к контакту привязана только сущность покупателя.
*   Отобразится компания, если номер был занесен отдельно в графе самой компании.
*   Отобразится контакт, если у него привязаны и покупатель, и сделка или несколько сделок – то высветится окно контакта.
*   При нажатии кнопки <<Отменить>> после разговора с неизвестным контактом звонок окажется в неразобранном.

Архив с шаблоном модального окна вы можете скачать [здесь](/static/assets/developers/files/examples/call_result_modal_example.zip)

Необходимо учитывать, что для успешного запуска модального окна, скрипт вашего виджета должен начинаться так, как показано в примере ниже.

#### Пример

```javascript
define(['jquery', 'lib/components/base/modal'], function($, Modal) {
  /* Здесь скрипт вашего виджета */
});
```

Для примера реализации данной возможности, создадим модальное окно, с разметкой для ввода информации и опишем запросы к API, для занесения информации в базу данных. Подробнее о структуре запросов на добавление сущностей через запросы к API, читайте здесь.

#### Пример

```javascript
setTimeout(self.call_result, 30000); // Устанавливаем задержку вызова функции результата звонка
this.call_result = function () {
  // Составляем разметку формы вводы данных, которая будет отображаться в модальном окне
  var data = [];
  data.push(
    '<style type="text/css" style="display: none">' +
      'input[type="text"] {' +
      'border: 1px solid #696969;' +
      'border-radius: 3px;' +
      '-webkit-border-radius: 3px;' +
      '-moz-border-radius:3px;' +
      'margin: 2px;' +
      'padding: 2px' +
      '}' +
      'input[type= submit] {' +
      'background-color: #20B2AA;' +
      'border: 1px #008B8B;' +
      'border-radius: 3px;' +
      'padding: 3px' +
      '}' +
      '' +
      '<form method="post" name="lead_data" id="call_result_data">' +
      '<label for="inputs">Результат звонка + 7(999) 888-77-66</label><br/>' +
      '<div id="inputs">' +
      '<input id="contact" type="text" name="contact_name" placeholder="Имя контакта" /><br/><br/>' +
      '<input id="lead" type="text" name="lead_name" placeholder="Название сделки" /><br/><br/>' +
      '<input id="lead_note" type="text" name="note" placeholder="Примечание" /><br/><br/>' +
      '<label for="lead_task">Тип задачи</label><br/>' +
      '<select name="task_type">' +
      '<option value="1">Связаться с клиентом</option>' +
      '<option value="2">Встреча</option>' +
      '</select><br/><br/>' +
      '<label for="lead_task_deadline">Срок выполнения задачи</label><br/>' +
      '<select name="task_deadline">' +
      '<option value="86400">Сутки</option>' +
      '<option value="259200">Трое суток</option>' +
      '<option value="604800">Неделя</option>' +
      '</select><br/><br/>' +
      '<label for="lead_task_text">Поставить задачу</label><br/>' +
      '<input id="lead_task_text" type="text" name="text" placeholder="Комментарий к задаче" /><br/><br/>' +
      '</div>' +
      '<input type="submit" value="Сохранить"/>' +
      '</form>',
  );
  modal = new Modal({
    class_name: 'modal-window',
    init: function ($modal_body) {
      $modal_body
        .trigger('modal:loaded') // Запускает отображение модального окна
        .html(data)
        .trigger('modal:centrify') // Настраивает модальное окно
        .append('Отмена');
    },
    destroy: function () {},
  });

  $('#call_result_data input[type = "submit"]').click(function (e) {
    e.preventDefault();
    var data; // Переменная, которая будет содержать данные серилизации
    data = $(this).parent('form').serializeArray();
    setTimeout('$(".modal-body__close").trigger("click")', 1000);

    if (data[1]['value'] != '') {
      var complex_data = [],
        contact_data = [],
        task_data = [],
        note_data = [];

      if (data[0]['value'] != '') {
        contact_data = [
          {
            name: data[0]['value'],
          },
        ];
      }

      complex_data = JSON.stringify([
        {
          name: data[1]['value'],
          _embedded: {
            contacts: contact_data,
          },
        },
      ]);

      $.post(
        '/api/v4/leads/complex',
        complex_data,
        function (response) {
          var lead_id = response[0].id;

          if (lead_id != 0) {
            if (data[3]['value'] != '' && data[4]['value'] != '') {
              task_data = JSON.stringify([
                {
                  task_type_id: data[3]['value'],
                  text: data[5]['value'],
                  entity_id: lead_id,
                  entity_type: 'leads',
                  complete_till:
                    Math.ceil(Date.now() / 1000) + data[4]['value'],
                },
              ]);

              $.post(
                '/api/v4/tasks',
                task_data,
                function (response) {},
                'json',
              );
            }

            if (data[2]['value'] != '') {
              note_data = JSON.stringify([
                {
                  entity_id: lead_id,
                  note_type: 'common',
                  params: {
                    text: data[2]['value'],
                  },
                },
              ]);

              $.post(
                '/api/v4/leads/' + lead_id + '/notes',
                note_data,
                function (response) {},
                'json',
              );
            }
          }
        },
        'json',
      );
    }
  });
};
```

### Логирование звонка

Логирование звонков осуществляется в события соответствующей сущности, в соответствующие типы событий исходящего и входящего звонка. Если АТС поддерживает запись звонков, то пользователю может быть выведена ссылка и плеер для прослушивания записанного разговора. Для корректной работы плеера требуется, чтобы сервер, содержащий звонок, отправлял заголовок Accept-Ranges: bytes. Если этот заголовок не передаётся, перемотка звонка может быть неработоспособной.

*   через метод [POST /api/v4/calls](/crm_platform/calls-api.html)

Метод осуществляет поиск сущностей по номеру телефона автоматически. И прикрепляет звонок к одной из них по определенному алгоритму, более подробно об алгоритме логирования звонков можно прочитать в описании метода. Если сущность с переданным номером телефона не существует в базе, звонок прикреплен не будет.

#### Результат добавления звонков, отображаемый в карточке контакта

![](https://i.postimg.cc/ydGfzZRx/2023-02-07-01-49-42.png)

Есть несколько вариантов отображения информации о звонке.

**Для входящих** – обязательно должен быть передан телефон, с которого поступил звонок. Передается эта информация в свойстве `phone` и отображается в карточке.  
Также можно передать информацию кому поступил звонок, эта информация передается в свойстве `call_responsible`.  
В свойство можно передать ID пользователя amoCRM, тогда будет отображено его имя, а можно передать номер телефона или любую строку, например имя сотрудника колл-центра, который не пользуется CRM.

**Для исходящих** – обязательно должен быть передан телефон, на который поступил звонок. Передается эта информация в свойстве `phone` и отображается в карточке.  
Также можно передать информацию от кого поступил звонок, эта информация передается в свойстве `call_responsible`.  
Если звонок был совершен из amoCRM, мы рекомендуем передать в свойство ID пользователя amoCRM, тогда будет отображено его имя.  
Если звонившей не состоит в системе, можно передать номер телефона или любую строку, например имя сотрудника.

### Сообщение об ошибке

Чтобы оповещать пользователя о проблемах, возникающих в фоновых процессах, необходимо воспользоваться отдельным JS- объектом, который при вызове выведет пользователю уведомление об ошибке, к примеру, о неудавшемся подключении к серверу.

Рекомендуем использовать подобные уведомления, если JS на странице производит какие-то фоновые действия (вызываемые скрыто от пользователя, не по его вызову). В таких случаях вы можете уведомлять пользователя о том, что что-то пошло не так и какие действия ему необходимо предпринять.

#### Пример сообщения об ошибке

![](https://i.postimg.cc/Fs16mtQW/show-error-message.png)

#### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| header | string | Имя виджета будет отображаться в заголовке |
| text | string | Сообщение об ошибке |
| date | timestamp | Дата |

callbacks: объект функций обратного вызова. При добавлении нового сообщения или ошибки AJAX запрос отправляется на сервер, который возвращает номер данного сообщения в случае успешного сохранения данных, в зависимости от успешности запроса срабатывает одна из переданных функций данного объекта.

#### Пример

```javascript
var errors = AMOCRM.notifications,
  date_now = Math.ceil(Date.now() / 1000),
  header = self.get_settings().widget_NAME,
  text = 'error';
var n_data = {
    header: header, //имя виджета
    text: '<p>' + text + '</p>', // Текст уведомления об ошибке
    date: date_now //дата
  },
  callbacks = {
    done: function () {
      console.log(' done ');
    }, // Успешно добавлено и сохранено AJAX done
    fail: function () {
      console.log('fail');
    }, // AJAX fail
    always: function () {
      console.log('always');
    } // Вызывается всегда
  };
errors.add_error(n_data, callbacks);
AMOCRM.notifications.show_message_error(n_data, callbacks); // Ручной вызов вашего уведомления об ошибке.
```

### Занесение в «Неразобранное»

В amoCRM существует состояние сделки [«Неразобранное»](/crm_platform/unsorted-api.html), в которую попадают все обращения из различных интеграций, в том числе и телефонии.

В «Неразобранное» попадают входящие звонки с неизвестных номеров (в системе нет привязанного контакта), принятые пользователем, которые начинают отображаться в колонке «Неразобранное». Пользователь не может самостоятельно перевести обращение в «Неразобранное».

Неразобранное отображает краткую информацию о звонке: телефон звонившего, время звонка, длительность звонка. Звонок можно прослушать или скачать.

Подробнее о добавлении неразобранного со звонком читайте [тут](/crm_platform/unsorted-api#unsorted-add-sip.html).

#### Пример добавления звонков в "Неразобранное"

![](https://i.postimg.cc/DwPpP7Qz/unsorted-calls.png)

### Список обзвона

Существует возможность создавать списки обзвона, из списков контаков, компаний и сделок. Для этого необходимо указать желаемые для добавления элементы списка и через вкладку <<ещё>> передать выбранные элементы в ваш список обзвона.

Возможно реализовать автоматический обзвон, с указанным в настройках виджета интервалом времени. Авто-обзвон по созданному списку можно ставить на паузу или пропускать один из элементов списка и переходить к следующему.

В примере мы укажем некоторые ключевые особенности формирования списка обзвона. Полный и исчерпывающий пример реализации вы можете посмотреть самостоятельно в примере полноценного виджета телефонии, в разделе интеграции виджета телефонии, [здесь](/telephony/integration.html).

#### Пример выбора элементов

![](https://i.postimg.cc/LsyyGvbK/select-call-list.png)

#### Пример списка обзвона

![](https://i.postimg.cc/Px9S5JHS/auto-call-list.png)

Для того, чтобы сформировать список обзвона, сперва необходимо реализовать функцию выбора элементов из списка сущностей. Пример реализации выбора элементов для script.js структуры вашего виджета.

#### Пример

```javascript
this.callbacks = {
  contacts: {
    // Выбираем элементы сущностей из списков контактов или компаний
    selected: function () {
      var data = self.list_selected()['selected'],
        nothing_added = true;
      $.each(data, function (k, v) {
        (function (v) {
          var call_element = {},
            list_model = AMOCRM.data.current_list.where({
              id: v.id,
            }),
            company;
          list_model = list_model[0] || {};
          /* Получаем данные от каждого выбранного элемента */
          call_element.element_id = v.id;
          call_element.element_type = list_model.get('element_type');
          call_element.type = list_model.get('element_type');
          call_element.phone = v.phones[0] || false;
          /* Область видимости списка компаний,
                  такая же как и область видимости
                  контактов — clist. В связи с этим,
                  нам необходимо дополнительно уточнить,
                  к какой сущности относятся выбранные элементы */
          call_element.entity =
            call_element.element_type == 1 ? 'contact' : 'company';
          call_element.element = {};
          call_element.element.text = list_model.get('name')['text'];
          call_element.element.url = list_model.get('name')['url'];
          company = list_model.get('company_name') || false;
          if (company) {
            call_element.company = {};
            call_element.company.text = company.name;
            call_element.company.url = company.url;
          }
          if (call_element.phone) {
            self.__CallsList.addCall(call_element); // Передаём выбранные элементы в вашу функцию обработки, addCall не является готовым методом SDK, приведён как пример
            nothing_added = false;
            $(document).trigger('list:cookies:update');
          } else if (nothing_added && k == data.length - 1) {
            self.notifers.show_message_error({
              text: self.i18n('caller').nothing_to_add,
              without_header: true,
            });
          }
        })(v);
      });
    },
  },
  leads: {
    // Выбираем элементы из списка сделок selected:
    function() {
      var data = self.list_selected()['selected'];
      (function (data) {
        self.tools.request(
          {
            selected: data,
          },
          'get_contacts_by_leads',
          function (data) {
            data.contacts = data.contacts || [];
            if (data.contacts.length <= 0) {
              self.notifers.show_message_error({
                text: self.i18n('caller').nothing_to_add,
                without_header: true,
              });
              return;
            }
            $.each(data.contacts, function (k, v) {
              (function (v) {
                var call_element = {},
                  company = false,
                  list_model = AMOCRM.data.current_list.where({
                    id: v.id,
                  });
                list_model = list_model[0] || {};
                call_element.element_id = v.element_id;
                call_element.element_type = v.element_type;
                call_element.type = v.element_type;
                call_element.phone = v.phone || false;
                call_element.entity = v.entity;
                call_element.element = v.element;
                company = v.company || false;
                if (typeof company == 'object') {
                  call_element.company = {};
                  call_element.company.text = company.text;
                  call_element.company.url = company.url;
                }
                if (call_element.phone) {
                  self.__CallsList.addCall(call_element); // Передаём выбранные элементы в вашу функцию обработки, addCall не является готовым методом SDK, приведён как
                  пример;
                  $(document).trigger('list:cookies:update');
                }
              })(v);
            });
          },
        );
      })(data);
    },
  },
};
```

Поскольку мы рекомендуем задавать область видимости „everywhere", для всех виджетов телефонии, в manifest.json, то нет необходимости задавать дополнительные области видимости для выбора элементов из списка.

Далее нам необходимо воспроизвести выбранные элементы в виде списка. В примере мы приведём рендер шаблона формата \*.twig, со структурой самого шаблона.

#### Пример

```javascript
render: function(calls) {
  var _this = this;
  _this.widget.getTemplate(
    // Выбираем шаблон call_list
    'call_list',
    {},
    function (template, base_params) {
      _this.$el.html(
        template.render(
          _.extend(base_params, {
            list_expanded: 0,
            open_contact: !(
              cookie.get(_this.widget.params.widget_code + '_open_contact') ==
              '0'
            ),
            lang: _this.lang,
          }),
        ),
      );
      _this.$el.find('#sortable_calls_list').sortable({
        // Сортировка звонков
        items: 'div.amo__vox__implant_call__list_wrapper__list__task',
        handle: '.icon-sortable',
        axis: 'y',
        containment:
          '#vox_imp__call_list_wrapper .amo__vox__implant_call__list_wrapper__list',
        scroll: false,
        tolerance: 'pointer',
        stop: function () {
          _this.startSort();
        },
      });
      calls = calls || [];
      if (calls.length > 0) {
        _this.calls.push(calls); // Добавление в ваш массив для обзвона, calls не является готовым методом SDK, приведён как пример
      }
    },
  );
  return this;
}
```

Пример \*.twig шаблона для списка обзвона.

```twig
<div id="vox_imp__call_list_wrapper" class="\{\{ widget_code \}\}_call__list_wrapper{% if list_expanded %}
expanded{% endif %}
\{\{ widget_code \}\}">
  <div class="\{\{ widget_code \}\}_call__list_wrapper__header"> <span id="clear_call_list" class="\{\{ widget_code \}\}_call__list_wrapper__header_icon
icon-clear" title="\{\{ lang.clear \}\}"></span>
    <div class="\{\{ widget_code \}\}_call__list_wrapper__header_additional_option"> <span id="clear_call_list" class="\{\{ widget_code \}\}_call__list_wrapper__header_clear"> { { lang.clear } } </span></div>
    <span class="\{\{ widget_code \}\}_call__list_wrapper__header_name"> { { lang.call_list } } :</span>
    <div class="\{\{ widget_code \}\}_call__list_wrapper__header__switcher"> <span class="\{\{ widget_code \}\}_call__list_wrapper__header__switcher_text"> { { lang.open_contact_w_calling } } </span>
      <div class="switcher_wrapper"><label for="call_list_switcher" class="switcher
call_list_switcher
switcher__{% if
          open_contact == 1 %}on{% else %}off{% endif %}" id=""></label> <input type="checkbox" value="Y" name="call_list_switcher" id="call_list_switcher" class="switcher__checkbox"/></div>
    </div>
  </div>

  <div class="\{\{ widget_code \}\}_call__list_wrapper__hint"> { { lang.empty_calls_list } }</div>

  <div class="\{\{ widget_code \}\}_call__list_wrapper__list
custom-scroll" id="sortable_calls_list"></div>
</div>

<div class="\{\{ widget_code \}\}_call__footer \{\{ widget_code \}\}">
  <div id="vox_imp__call_list_btn" class="\{\{ widget_code \}\}_call__btn \{\{ widget_code \}\}_call__list_btn" title="\{\{ lang.call_list \}\}"> <span class="nav__notifications__counter
call_list_notifications"></span></div>

  <div class="\{\{ widget_code \}\}_call__status">
    <div class="\{\{ widget_code \}\}_call__status__contact"></div>

    <div class="\{\{ widget_code \}\}_call__status__talk"> <span class="\{\{ widget_code \}\}_call__status__talk__time"></span> <span id="vox_implant__icon_wrapper" class="\{\{ widget_code \}\}__icon_wrapper"> <span id="vox_imp__rec_call" class="\{\{ widget_code \}\}_call__status__talk__rec
rec_is_on" title="\{\{ lang.talk_recording \}\}"></span> <span id="vox_imp__play_call" class="\{\{ widget_code \}\}_call__status__queue_pause" title="\{\{ lang.pause \}\}"></span> </span></div>
  </div>

  <div class="\{\{ widget_code \}\}_call_options">
    <div id="vox_imp__mic_btn" class="\{\{ widget_code \}\}_call__btn \{\{ widget_code \}\}_call__mute_mic_btn mute_is_on" title="\{\{ lang.mute_speaker \}\}"></div>

    <div class="\{\{ widget_code \}\}_call__btn \{\{ widget_code \}\}_call__skip_btn" title="\{\{ lang.skip \}\}"></div>

    <div id="vox_imp__dial_btn" class="\{\{ widget_code \}\}_call__btn \{\{ widget_code \}\}_call__dial_btn" title="\{\{ lang.dialling \}\}"></div>

    <div id="vox_imp__hung_up_btn" class="\{\{ widget_code \}\}_call__btn \{\{ widget_code \}\}_call__phone_btn
js-hungup_call"></div>
  </div>
</div>
```

### Функция встроенного звонка (WebRTC)

WebRTC – технология, позволяющая совершать и принимать вызовы прямо в браузере. Стоит принять во внимание, что не все бразуеры или их версии поддерживают данную технологию. Подробнее узнать о поддерживаемых на данный момент браузерах можно на официальной странице технологии.

WebRTC – решение с открытым кодом, и некоторые виджеты для интеграции amoCRM с виртуальными АТС используют его.

Отображение, работающей функции совершения звонков, в различных браузерах выглядит по-разному. В Mozilla Firefox это иконка микрофона. В браузере Google Chrome активная функция отображается в виде красного знака на вкладке и иконки видеокамеры в правой части адресной строки, подтверждающей доступ к вашему микрофону.

#### Пример встроенного звонка

![](https://i.postimg.cc/jdV8VDZ5/webrtc-ex.png)

Пример работы с WebRTC в amoCRM.

#### Пример

```javascript
initYourWidget: function () {
  $.getScript('///* ссылка *//your_script.min.js', _.bind(function () { /* Обработка вашего скрипта работы с телефонией */
  }, this));
  initialize: function (params) {
    AMOCRM.widgets.notificationsPhone({
      ns:
      this.widget.ns, click: _.bind(function () {
        this.$el.toggle(); // Отображение панели работы с WebRTC
      }, this)
    });
  }
}
```
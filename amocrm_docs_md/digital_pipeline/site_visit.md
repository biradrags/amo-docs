# https://www.amocrm.ru/developers/content/digital_pipeline/site_visit

РАСШИРЯЙТЕ ВОЗМОЖНОСТИ С API

Вы можете использовать данный тип события даже со сделками, созданными через API из Ваших форм. Для того, чтобы связать сделку с конкретным посетителем сайта, Вам нужно получить идентификатор этого посетителя и передать его через API вместе с данными создаваемой сделки.

### Получение идентификатора посетителя

Для получения идентификатора посетителя нужно разместить на Вашем сайте следующий код:

```

<script type="text/javascript" id="amo_pixel_identifier_js" async="async"
        src="https://piper.amocrm.ru/pixel/js/identifier/pixel_identifier.js"></script>
```

Данный код создаст глобальный объект **AMOPIXEL\_IDENTIFIER**. С помощью метода **“getVisitorUid”** данного объекта можно получить уникальный идентификатор посетителя:

```

var visitor_uid = AMOPIXEL_IDENTIFIER.getVisitorUid ( ) ;
```

Объект **AMOPIXEL\_IDENTIFIER** доступен только после полной его загрузки и инициализации.  
Вы можете указать callback-функцию, которая будет вызвана после полной инициализации объекта **AMOPIXEL\_IDENTIFIER**.

```

window.AMOPIXEL_IDENTIFIER_PARAMS = window.AMOPIXEL_IDENTIFIER_PARAMS || { } ;
window.AMOPIXEL_IDENTIFIER_PARAMS.onload = function (pixel_identifier) {
    var visitor_uid = pixel_identifier.getVisitorUid ( ) ; // Получаем visitor_uid
    console.log ( 'visitor_uid' , visitor_uid) ;
    if (visitor_uid) {
      // Записываем его в скрытое поле формы 'visitor_uid'
      document.getElementById ( 'visitor_uid' ).value = visitor_uid;
   }
} ;
```

Полученный идентификатор можно записать в скрытое поле Вашей формы, передать на Ваш сервер, а затем создать сделку через API amoCRM с указанием “visitor\_uid”:

#### **URL метода**

POST /api/v2/leads

```

{
    "add" : [
          {
              "name" : "Заявка с сайта" ,
              "status_id" : 142 ,
              "visitor_uid" : "12345678-52d2-44c2-9e16-ba0052d9f6d6"
          }
     ]
}
```

На стороне amoCRM произойдет связывание идентификатора посетителя **“visitor\_uid”** с id созданной сделки.

Далее, при заходе клиента на отслеживаемую страницу, сделка, связанная с ним, автоматически перейдет в настроенный этап.

**Примечание:** в качестве значения поля **“visitor\_uid”** можно использовать только идентификатор, полученный от **AMOPIXEL\_IDENTIFIER**. Формат идентификатора соответствует UUID. Если передать некорректное значение, оно будет проигнорировано.
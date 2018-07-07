# DeviantPlayer

Основные возможности плеера - одновременное проигрывание нескольких плейлистов, возможность проигрывание отдельных звуков.

Плеер сделан, чтобы работать локально с музыкой, расположенной на том же компьютере. Инструкция ниже приведена для операционной системы Windows, если у вас другая, вы, вероятнее всего, разберетесь.

[Перейти к подробному описанию](#Подробное-описание)

## Требования
1. Создайте папку с музыкальными файлами и звуками на вашем устройстве (См. подробности в разделе [Организация файлов](#-Организация-файлов))

## Установка
### node.js
1. отредактируйте файл config.json, указав путь к данной папке
2. консоль - cd path/to/this/project
3. консоль - node index.js

либо

### исполняемый файл
1. поместите файл '***.bat" в папку с музыкой
2. запустите данный файл
3. запустите index.html в папке с проектом
4. на странице плеера загрузите файл DB.txt, который появился в папке с музыкой
5. Сохранить полученный файл "db.js"
6. Перезагрузить страницу

## Использование
1. После редактирования содержимого папки с музыкой выполните шаги по установке пропуская шаг 1

## Подробное описание

### 📙 Интерфейс 

Для запуска плеера откройте файл "index.html" в любимом браузере.

Так как у вас не настроена база музыки, то ничего полезного вы у себя не увидите. Но не расстраивайтесь, это лишь начало. Кроме того, посмотрите, какие красивые скриншоты:

![Основной интерфейс](/img/screenshots/main_view.jpg)

1. Несколько плейлистов, у каждого свой список воспроизведения. 
1. Кнопки звуков, при нажатии на любую воспроизводится звук из заданного набора.
1. Настройки:
    * Настройка плейлистов. Выбор плейлистов, которые будут отображаться на основном экране. [1]
    * Настройка звуков. Выбор и настройка нужных наборов звуков. [2]
    * Настройка локальной базы музыки.
    * Увеличить элементы интерфейса плейлистов.
    * Уменьшить элементы интерфейса плейлистов.
    * Скрыть списки воспроизведения во всех плейлистах.
    * Перемешать музыку в каждом плейлисте.
    * Включить/отключить плавный переход от паузы к проигрыванию (экспериментальная функция, иногда работает).

Таинственные символы возле ползунка громкости на плейлистах [1] (например "1QAZ") - это горячие клавиши управления. На клавиатуре они расположены столбцами и делают для соответствующего плейлиста следующее:
  - Увеличивает громкость
  - Уменьшает громкость
  - Начинает/заканчивает воспроизведение
  - Запускает следующий трек
 
Цифры на кнопках звуков [2] работают аналогично. При нажатии на клавишу с цифрой на боковой клавиатуре (либо [Shift] + клавиша с цифрой основной клавиатуре) сработает соответствующий ей звук.

Если зажать клавишу `Ctrl` появится экран с увеличенными кнопками звуков.
    
### 📙 Как начать пользоваться

#### 📙 Организация файлов

Для начала нужно собрать музыку, которая вам нравится и рассортировать ее по папкам. Каждая папка - отдельный плейлист.

![Структура папок с музыкой](/img/screenshots/music_folder.JPG)

Звуки собираются аналогичным образом. Например есть три звука взрыва фаербола, их нужно поместить в папку и назвать, например, "фаербол". Таки папки с наборами звуков должны лежать в общей папке "!звуки".

![Структура папок со звуками](/img/screenshots/sounds_folder.JPG)

⚠️ Название всех папок не должны содержать заглавных букв.

⚠️ Папки с музыкальными файлами не должны содержать вложенных папок - плеер их не прочтет.

Примерная структура папок и файлов:

![Структура всех папок музыки](/img/screenshots/folder_structure.JPG)


#### 📙 Создание базы музыки

Так как из браузера невозможно получить полноценный доступ к файловой системе локального компьютера, то придется создать файл с базой музыки. Для этого есть два варианта - с помощью скрипта NODE.js, либо с помощью стандартных средств Windows.

##### 📙 При помощи NODE.js

  - Запустить консоль в папке со скриптом ([папка с плеером]/node/), где лежать три файла index.js, config.json и package.json
  - Настроить скрипт создания базы
    - Открыть в текстовом редакторе файл "config.json"
    - Задать следующие значения:
      - `sMusicPath` - путь до папки, где содержатся папки с музыкой и звуками, например `"D:/Cloud/DnD/Музыка"`
      - `sSoundsFolder` - название папки, в которой лежат папки со звуками, например `"!звуки"` (папка должна лежать по адресу выше, например `"D:/Cloud/DnD/Музыка/!звуки"`)
      - `sDBpath"`- файл, куда будет сохранена база музыки. Он должен называться `"db.js"` и он должен находиться в папке с основными файлами плеера (`[папка с плеером]/js/db.js`)
  - Запустить в консоли скрипт создания базы - `node index.js`
  
⚠️  При добавлении/удалении музыки из папок, нужно будет запускать этот скрипт (последний шаг) снова, чтобы обновить базу.
  
##### 📙 При помощи [cmd](https://ru.wikipedia.org/wiki/Cmd.exe)

В этом случае, папка с папками звуков должна называться строго "!звуки" и лежать в корне папки с музыкой (как на скриншотах выше).

  - Переместить файл `"_create_music_DB.bat"` в корень папки с музыкой, например, `"D:/Cloud/DnD/Музыка/_create_music_DB.bat"`. 
  - Запустить этот файл двойным кликом.
  - Убедиться, что в папке есть (появился) файл `"DB.txt"`.
  
⚠️  При добавлении/удалении музыки из папок, нужно будет запускать этот файл и загружать в плеер (будет показано далее).
  
  
#### 📙 Загрузка базы музыки в плеер.

Если вы создавали базу с помощью NODE.js, то вам больше ничего не требуется. 

Если вы создавали базу с помощью bat-файла, то ее нужно загрузить в плеер вручную.

 - На основном экране плеера, в верхней панели нажать третью слева кнопку.
 - В открывшемся окне нажать кнопку "Загрузить файл базы музыки" [10].
 - С помощью стандартного окна открытия файла выберите файл "DB.txt" из папки с музыкой.
 - После этого плеер сформирует файл с данными, и откроется окносохранения файла. Файл нужно будет поместить в папку плеера по адресу `папка с плеером/js/db.js`.
 - после сохранения файла необходимо перезагрузить файл, чтобы настройки вступили в силу.
 
⚠️ После каждого обновления базы с музыкой, эти шаги нужно будет повторять.
 
![Настройка локальной базы](/img/screenshots/memory2.jpg)

⚠️ Если вы хотя бы раз загрузили файл таким способом, то плеер не будет воспринимать базу, создаваемую с помощью Node.js. Чтобы плеер переключился на базу из Node.js необходимо удалить локальную базу, созданную с помощью загружаемого файла. Для этого нужно нажать кнопку "Удалить локальную копию" [11]. После этого нужно обновить страницу с плеером и он попытается загрузить данные из базы созданное NODE.js.

Все настройки плеера можно сохранить в файл - просто на всякий случай, или чтоб использовать на другом устройстве. Для этого нужно нажать кнопку "Экспортировать локальные настройки" [12] и сохранить получившийся файл ("DeviantPlayer_LocalDB", хотя его можно переименовать как угодно).

Чтобы восстановить данные из полученного файла, нужно нажать кнопку "Импортировать локальные настройки" [13] и выбрать полученный ранее файл. При этом все существующие настроки будут сброшены, и применены настройки из файла.

Кнопку "Очистить локальную базу полностью" [14] лучше не нажимать. Мало ли что может произойти.
  
#### 📙 Настройка плейлистов и звуков

Для выбора плейлистов в верхней панели [3] нужно нажать кнопку с шестеренкой и откроется такое окно:

![Выбор плейлистов](/img/screenshots/music.jpg)

4. Строка с полным путем до корневой папки с музыкой. Скорее всего ее не стоит редактировать, если все работает.
5. Список доступных плейлистов, цифра - количество файлов в папке. Выбранные галочкой будут отображены на основном экране [1].

Плейлисты можно сортировать на основном экране [1], перетаскивая их за название.

Для настройки звуков, в верхней панели [3] нужно нажать вторую кнопку (с нотами).

![Выбор и настройка звуков](/img/screenshots/sounds.jpg)

6. Полный путь до папки со звуками.
7. Список доступных коллекций звуков. Их можно сортировать перетаскиванием. Кроме того, звуки можно сортировать перетаскиванием в панели [2] на основном экране.
8. Настройка иконки. Для кнопок боковой панели звуков [2] можно назначать иконки. Для этого требуется в поле [8] ввести название иконки из шрифта ["font awesome"](http://fontawesome.io/icons/), чтобы посмотреть все иконки можно нажать на вопросительный знак справа от поля [8]. Если в поле введено название существующей иконки, она отобразиться рядом с названием (как смайлик на скриншоте)
9. Список файлов в конкретной папке звуков. При нажатии на кнопку в панели звуков [2], будет воспроизведен случайных звук из списка. Цифра справа от названия файла звука показывает, сколько раз звук будет встречаться в общем списке. Чем цифра больше, чем чаще будет проигрываться именно этот звук. 

#### 📙 Группировка плейлистов

В нижней части каждого плейлиста есть выпадающий список с группами. Если нескольким плейлистам назначена одна группа, то при начале воспроизведения музыки из одного плейлиста, все остальные из этой группы будут поставленны на паузу. Иными словами, единовременно может звучать только один плейлист из группы. 

![Группировка плейлистов](/img/screenshots/groups.jpg)

Для удобства, группы обозначаются цветной полоской в верхней части плейлиста.



🤖 Плеер запоминает все настройки, если вы открываете его одним и тем же браузером, по одному и тому же адресу (из одной и той же папки).


В плеере используются сторонние библиотеки:

 - [Иконочный шрифт "font awesome"](http://fontawesome.io/icons/)
 - [Библиотека drug'n'drop "Sortable"](https://github.com/RubaXa/Sortable)
 - [Библиотека для создания и сохранения файлов "FileSaver"](https://github.com/eligrey/FileSaver.js/)

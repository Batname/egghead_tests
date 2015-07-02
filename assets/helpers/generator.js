export default function (){

  const timeLine = document.querySelector('.timeLine');
  var totalTweets = [];

  /**
  * showStats
  *
  * Populate some stats
  */

  function showStats(){
    let totalTweets = document.querySelector('.totalTweets');
    totalTweets.textContent = countProperties('user') || 0;

    let totalPhotos  = document.querySelector('.totalPhotos');
    totalPhotos.textContent = countProperties('photo') || 0;

    let totalFavourites  = document.querySelector('.totalFavourites');
    totalFavourites.textContent = countProperties('favourited') || 0;
  }


  /**
  * showTimeline
  *
  * Flesh out some sweet sweet tweet data
  * then append to the .timeLine
  */

  function showTimeline(){
    let el = document.createElement('div');

    totalTweets.forEach(function(tweet){

      let tweetElement = el.cloneNode(true);
      tweetElement.classList.add('tweet');

      let name = el.cloneNode(true);
      name.classList.add('tweet__name');
      name.textContent = tweet.user.name;

      let handle = el.cloneNode(true);
      handle.classList.add('tweet__handle');
      handle.textContent = '@' + tweet.user.handle;

      let message = el.cloneNode(true);
      message.classList.add('tweet__message');
      message.textContent = tweet.message;

      tweetElement.appendChild(name);
      tweetElement.appendChild(handle);
      tweetElement.appendChild(message);
      timeLine.appendChild(tweetElement);
    });
  }

  /**
  * countProperties
  *
  * Utility function to help us count certain props
  *
  * @param  {String} a specific prop
  * @return {Number} count
  */

  function countProperties(prop) {
    let count = 0;

    totalTweets.forEach(function(tweet){
      if (prop in tweet) count++;
    });

    return count;
  }


  /**
   * get - XHR Request
   */

  let get = function (url) {
    return function (callback) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
        let response = xhr.responseText;
        if(xhr.readyState != 4) return;
        if (xhr.status === 200) {
          callback(null, JSON.parse(response));
        }
        else {
          callback(response, null);
        }
      };
      xhr.send();
    };
  };


  /**
   * getTweets (Generator)
   */

  let getTweets = function* () {
    let data;

    try {
      // get the 1st tweet
      data = yield get('https://api.myjson.com/bins/2qjdn');
      totalTweets.push(data);

      // now get the 2nd tweet
      data = yield get('https://api.myjson.com/bins/3zjqz');
      totalTweets.push(data);

      // then get the 3rd tweet
      data = yield get('https://api.myjson.com/bins/29e3f');
      totalTweets.push(data);

      // then do the other stuff that rely on the tweet data being present
      showStats();
      showTimeline();

      console.log('All done');
    }
    catch (err) {
      console.log( "Do something with this: ", err);
    } finally{
      console.log(totalTweets);
    } 
  };


  /**
   * runGenerator
   * A function that takes a generator function and
   * recusively calls next() until `done: true
   */

  let runGenerator = function (fn) {

    let next = function (err, arg) {
      if (err) return it.throw(err);

      var result = it.next(arg);
      if (result.done) return;

      if (typeof result.value == 'function') {
        result.value(next);
      }
      else {
        next(null, result.value);
      }
    }

    let it = fn();
    return next();
  }

  // kick it off
  runGenerator(getTweets);

}

/**
 * http://habrahabr.ru/post/122620/
 * http://habd.as/tame-async-javascript-es6/
 * https://github.com/isRuslan/learn-generators
 * Генераторы можно применить для

— Красивого обхода итерируемых объектов: списков (строки в файле, результат запроса к БД, ), рекурсивного обхода деревьев (XML, HTML, Binary, и других произвольных), создание и обход Range-объектов (0..10)
— Обход access логов. Например есть несколько ротированных access-log'ов необходимо собрать информацию об объеме переданных данных 
— yield может выполнять роль точки остановки при дебаге
— Можно использовать для разбиения длинного цикла на несколько частей (как по времени так и по количеству обработанных элементов цикла)
— Генератор псевдослучайных чисел или последовательностей
— Основа для Визардов/Мастеров (пошаговый интерфейс)
— Могут использоваться для изменения поведения события (например клика на кнопку)

Преимущества генераторов

1. Выполняют вычисления по требованию
2. Не занимают лишнюю память
3. Инкапсулируют процесс получения элемента коллекции 
4. Растягивают код 
5. Генераторы можно применять как фильры, склеивая в pipeline
 */
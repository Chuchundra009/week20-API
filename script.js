const topicText = document.querySelector('#topicText');// доступ к select
const inputNum = document.querySelector('#inputNum');// доступ к полю, где надо ввести число
const btn = document.querySelector('#btn');// доступ к кнопке

const resReq = document.querySelector('#resReq');// доступ, где будет выводиться результат запроса
const errReq = document.querySelector('#errReq');// доступ, где будет выводится текст ошибки


//обработчик события, после кника на кнопку..
btn.addEventListener('click', () => {
  
  const a = topicText.value;// выбранное значение в select
  const b = inputNum.value;// доступ к числу, которое ввел пользователь

//запрос к API по ссылке + выбранное значение в select + число, введенное пользователем
  fetch('https://swapi.dev/api/' + a + '/'+ b)
    .then((response) => {
      if(response.ok) {
        return response.json()
      }
      throw new Error(response.status);// добавление ошибки, если будет проблема с ответом
    })
    .then((data) => {
        resReq.textContent = `Name: ${data.name}`;// вывод результата на страницу
        errReq.style.display = 'none';//строка с ошибкой скрыта
        resReq.style.display = 'flex';

        // условие, если цифра больше 10, меньше 0 или пустая строка то добавление новой ошибки
        if(b>10 || b<0 || b==''){
          resReq.style.display = 'none';// скрыть строку удачного результата
          errReq.style.display = 'flex';// сделать видимой строку с ошибкой
          throw new Error('Введите число от 1 до 10')
        }
    })
    // обработка ошибки
    .catch((error) => {
      console.error(error.message);

      errReq.textContent = 'Ошибка:'+ error.message;
      resReq.style.display = 'none';
      errReq.style.display = 'flex';// сделать видимой строку с ошибкой
    });



});

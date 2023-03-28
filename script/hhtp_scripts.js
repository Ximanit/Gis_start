// // Создаем новый объект XMLHttpRequest
// let xhr = new XMLHttpRequest();

// // Указываем URL и тип запроса
// xhr.open('GET', 'https://catalog.api.2gis.com/3.0/items?q=кафе&type=branch&point=137.00395936927842%2C50.54691620051855&radius=200&key=rujnfh1727', true);

// // Устанавливаем обработчик события 'load' для получения данных
// xhr.onload = function() {
//   // Если запрос успешен
//   if (xhr.status === 200) {
//     // Получаем JSON-файл
//     let data = JSON.parse(xhr.responseText);

//     // Сохраняем файл на ПК
//     // let jsonData = JSON.stringify(data);
//     // let blob = new Blob([jsonData], {type: "application/json"});
//     // let url = URL.createObjectURL(blob);
//     // let a = document.createElement('a');
//     // a.href = url;
//     // a.download = 'data.json';
//     // document.body.appendChild(a);
//     // a.click();

//     // Получаем все значения 'address_name' и сохраняем их в отдельные переменные
//     let addressNames = data.result.items.map(function(item) {
//       return item.address_name;
//     });
//     console.log(addressNames);
//   }
//   // Если запрос не удался
//   else {
//     console.log('Ошибка запроса');
//   }
// };

// // Отправляем запрос
// xhr.send();
// const radius = 2000;
// const point = "137.00395936927842,50.54691620051855";
// const key = "rujnfh1727";

// // Динамически создаем URL-строку запроса с переменной radius
// const url = `https://catalog.api.2gis.com/3.0/items?q=кафе&type=branch&point=${point}&radius=${radius}&key=${key}`;

// // Отправляем GET-запрос на сервер
// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     // Парсим JSON-файл и вытаскиваем данные
//     const items = data.result.items;
//     const addressNames = items.map(item => item.address_name);
//     console.log(addressNames);
//   })
//   .catch(error => console.error(error));

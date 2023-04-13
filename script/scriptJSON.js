const point = "137.00395936927842, 50.54691620051855"; // Координаты точки в формате "долгота,широта"
const radius = 50000; // Радиус поиска (в метрах)
const key = "rupzho5301"; // Ваш ключ для 2GIS API
//rupzho5301, rujnfh1727
let query = "кафе"; // Параметр поиска (можно изменять)
const name = "museam";

// Функция для отправки запроса и получения данных
function getData(page) {
  const pageSize = 10; // Количество объектов на странице
  const fields = "items.point,items.schedule,items.address,items.routes"; // Список полей, которые необходимо получить о каждом объекте
  const url = `https://catalog.api.2gis.com/3.0/items?q=${query}&type=branch&point=${point}&radius=50000&key=rupzho5301&page=${page}&page_size=10&fields=${fields}`;
  // const url = `https://catalog.api.2gis.com/3.0/items?q=кафе&point=137.00395936927842%2C50.54691620051855&radius=1000&sort_point=137.00395936927842%2C50.54691620051855&sort=distance&key=rujnfh1727&page=${page}&page_size=10&fields=items.point,items.schedule,items.address`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // Создаем новый объект XMLHttpRequest

    xhr.open("GET", url); // Открываем соединение

    xhr.onload = function () {
      if (xhr.status === 200) {
        // Если запрос прошел успешно
        const data = JSON.parse(xhr.responseText); // Получаем данные в формате JSON
        resolve(data); // Возвращаем данные
      } else {
        reject(
          new Error(
            `Произошла ошибка при запросе данных со страницы ${page}: ${xhr.statusText}`
          )
        );
      }
    };
    xhr.onerror = function () {
      reject(
        new Error(`Произошла ошибка при запросе данных со страницы ${page}`)
      );
    };

    xhr.send(); // Отправляем запрос на 2GIS API
  });
}

// Функция для записи данных в файл
function saveData(data) {
  const fileName = `${query}_.json`; // Имя файла для записи данных

  try {
    const existingData = JSON.parse(
      localStorage.getItem(fileName) || '{"result": {"items": []}}'
    ); // Получаем данные из localStorage и преобразуем в объект

    // Проверяем наличие свойства result
    if (!data || !data.result) {
      console.log("Произошла ошибка при чтении данных");
      return;
    }

    // Проверяем наличие свойства items
    if (!data.result.items) {
      console.log("Ответ не содержит данных об объектах");
      return;
    }

    // Добавляем новые данные к уже существующим
    existingData.result.items = existingData.result.items.concat(
      data.result.items
    );

    localStorage.setItem(fileName, JSON.stringify(existingData)); // Записываем данные в localStorage
  } catch (error) {
    console.log(
      "Произошла ошибка при записи данных в localStorage:",
      error.message
    );
  }
}

// Функция для обработки нескольких страниц данных
async function processPages() {
  let page = 1; // Номер текущей страницы

  while (true) {
    try {
      const data = await getData(page); // Получаем данные со страницы
      if (
        data === undefined ||
        !data.result ||
        !data.result.items ||
        !data.result.items.length
      )
        break; // Если данные закончились, выходим из цикла

      saveData(data); // Сохраняем данные в localStorage

      console.log(
        `Страница ${page}: получено ${data.result.items.length} объектов`
      );
      page++; // Увеличиваем номер страницы
    } catch (error) {
      console.log(error.message);
      break;
    }
  }

  console.log("Обработка страниц завершена");
}

processPages(); // Вызываем функцию для обработки нескольких страниц данных

(function () {
  const fileName = `${query}_.json`; // Имя файла, в который будут записаны данные
  const data = JSON.parse(localStorage.getItem(fileName)); // Получаем данные из localStorage

  if (!data || !data.result.items.length) {
    // Проверяем наличие данных и объектов в массиве
    console.log("Нет данных для выгрузки");
    return;
  }

  const jsonData = JSON.stringify(data); // Преобразуем объект в строку JSON

  const link = document.createElement("a"); // Создаем новый элемент <a>
  link.href = `data:text/json;charset=utf-8,${encodeURIComponent(jsonData)}`; // Устанавливаем ссылку на файл
  link.download = fileName; // Устанавливаем имя файла

  document.body.appendChild(link); // Добавляем ссылку на страницу
  link.click(); // "Нажимаем" на ссылку
  document.body.removeChild(link); // Удаляем ссылку со страницы
})();

const map = new mapgl.Map("container", {
  center: [137.00395936927842, 50.54691620051855],
  zoom: 18,
  key: "bfd8bbca-8abf-11ea-b033-5fa57aae2de7",
});

const controlContent = `
        <div class="buttonRoot" id="find-me">
            <button class="button">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"ц
                >
                    <path
                        fill="currentColor"
                        d="M17.89 26.27l-2.7-9.46-9.46-2.7 18.92-6.76zm-5.62-12.38l4.54 1.3 1.3 4.54 3.24-9.08z"
                    />
                </svg>
            </button>
        </div>
        <p id="status"></p>
`;

const control = new mapgl.Control(map, controlContent, {
  position: "topLeft",
});

let external_circle, interior_circle;

function success(pos) {
  const status = control.getContainer().querySelector("#status");
  const center = [pos.coords.longitude, pos.coords.latitude];
  let radius = prompt("Введите радиус в котором искать кафе", "");
  if (radius == "") {
    status.textContent = "";
    if (external_circle) external_circle.destroy();
    if (interior_circle) interior_circle.destroy();

    external_circle = new mapgl.Circle(map, {
      coordinates: center,
      radius: 200,

      strokeWidth: 2,
      strokeColor: "#ffffff",
      stroke2Width: 6,
    });
    interior_circle = new mapgl.CircleMarker(map, {
      coordinates: center,
      radius: 14,
      color: "#0088ff",
      strokeWidth: 4,
      strokeColor: "#ffffff",
      stroke2Width: 6,
      stroke2Color: "#0088ff55",
    });
    map.setCenter(center);
    map.setZoom(16);
    const marker = new mapgl.Marker(map, {
      coordinates: [pos.coords.longitude, pos.coords.latitude],
    });
  } else {
    status.textContent = "";
    if (external_circle) external_circle.destroy();
    if (interior_circle) interior_circle.destroy();

    external_circle = new mapgl.Circle(map, {
      coordinates: center,
      radius: radius,
      strokeWidth: 2,
      strokeColor: "#ffffff",
      stroke2Width: 6,
    });
    interior_circle = new mapgl.CircleMarker(map, {
      coordinates: center,
      radius: 14,
      color: "#0088ff",
      strokeWidth: 4,
      strokeColor: "#ffffff",
      stroke2Width: 6,
      stroke2Color: "#0088ff55",
    });
    map.setCenter(center);
    map.setZoom(16);
  }

  radius = radius;
  const point = [pos.coords.longitude, pos.coords.latitude];
  const key = "rujnfh1727";

  // Динамически создаем URL-строку запроса с переменной radius
  const url = `https://catalog.api.2gis.com/3.0/items?q=кафе&type=branch&point=${point}&radius=${radius}&key=${key}`;
  // Создаем объект запроса
  const xhr = new XMLHttpRequest();
  // Настраиваем запрос
  xhr.open("GET", url);
  // Обрабатываем ответ сервера
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Парсим полученный JSON
      const response = JSON.parse(xhr.responseText);

      // Вытаскиваем все значения address_name в отдельные переменные
      const addresses = response.result.items.map((item) => item.address_name);
      // console.log(addresses);

      const request = new XMLHttpRequest();

      const urlCity = `https://catalog.api.2gis.com/3.0/items?type=adm_div.city&lon=${pos.coords.longitude}&lat=${pos.coords.latitude}&key=${key}`;

      request.open("GET", urlCity);

      request.onload = () => {
        if (request.status === 200) {
          const json = JSON.parse(request.responseText);
          const cityName = json.result.items[0].name;
          console.log(cityName);

          // Формируем URL для следующего запроса
          const city = cityName;
          // Отправляем запросы на получение геокодированных координат и создание маркеров на карте
          for (let i = 0; i < addresses.length; i++) {
            const address = encodeURIComponent(addresses[i]);
            const geoUrl = `https://catalog.api.2gis.com/3.0/items/geocode?q=${city},${address}&fields=items.point,items.geometry.centroid&key=${key}`;

            // Создаем объект запроса
            const geoXhr = new XMLHttpRequest();

            // Настраиваем запрос
            geoXhr.open("GET", geoUrl);

            // Обрабатываем ответ сервера
            geoXhr.onload = function () {
              if (geoXhr.status === 200) {
                // Парсим полученный JSON
                const geoResponse = JSON.parse(geoXhr.responseText);

                // Проверяем, что координаты маркера существуют
                if (geoResponse.result.items[0]?.point) {
                  // Вытаскиваем координаты маркера
                  const lat = geoResponse.result.items[0].point.lat;
                  const lon = geoResponse.result.items[0].point.lon;
                  console.log(`Latitude: ${lat}, Longitude: ${lon}`);

                  //// Создаем маркер на карте
                  const marker = new mapgl.Marker(map, {
                    coordinates: [lon, lat],
                  });
                  marker.hide();
                  marker.show();
                } else {
                  console.error("Ошибка получения координат маркера");
                }
              } else {
                console.error("Ошибка запроса геокодинга");
              }
            };

            // Отправляем запрос
            geoXhr.send();
          }
        } else {
          console.error("Ошибка запроса");
        }
      };
      request.send();
    } else {
      console.error("Ошибка запроса каталога");
    }
  };

  // Отправляем запрос
  xhr.send();
}

function error() {
  status.textContent = "Unable to retrieve your location";
}

function geoFindMe() {
  if (!navigator.geolocation) {
    status.textContent = "Geolocation is not supported by your browser";
  } else {
    status.textContent = "Locating…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

control
  .getContainer()
  .querySelector("#find-me")
  .addEventListener("click", geoFindMe);

// let selectedIds = [];

// map.on('click', (e) => {
//     if (!e.target) {
//         return;
//     }

//     const {
//         id
//     } = e.target;

//     if (selectedIds.includes(id)) {
//         selectedIds = selectedIds.filter((i) => i !== id);
//     } else {
//         selectedIds.push(id);
//     }

//     map.setSelectedObjects(selectedIds);
// });

const radius = 400;
const markers = [];
const center = [137.00395936927842, 50.54691620051855];

const map = new mapgl.Map("container", {
  center: center,
  zoom: 18,
  key: "725eff52-ba5a-4258-bc02-9984efe9923a",
  style: "c080bb6a-8134-4993-93a1-5b4d8c36a59b",
});

external_circle = new mapgl.Circle(map, {
  coordinates: center,
  radius: radius,
  strokeWidth: 2,
  strokeColor: "#ffffff",
  stroke2Width: 6,
});

// Создаем новый объект XMLHttpRequest
// загрузка файла с помощью XMLHttpRequest
const lat = [];
const lon = [];

function getDistance(coord1, coord2) {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;
  const R = 6371e3; // Радиус Земли в метрах
  const phi1 = (lat1 * Math.PI) / 180; // Широта первой точки в радианах
  const phi2 = (lat2 * Math.PI) / 180; // Широта второй точки в радианах
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180; // Разница широт в радианах
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180; // Разница долгот в радианах

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

const xhr = new XMLHttpRequest();
xhr.open("GET", "/data/merged.json", true);
xhr.onload = function () {
  if (xhr.status === 200) {
    // парсинг JSON
    const data = JSON.parse(xhr.responseText);
    // проверка, что data является массивом
    // цикл для записи данных в массивы
    for (let i = 0; i < 83; i++) {
      lat[i] = data.result.items[i].point.lat;
      lon[i] = data.result.items[i].point.lon;
    }
  }
  for (let i = 0; i < 83; i++) {
    // x = points[i][0];
    // y = points[i][1];
    markers[i] = new mapgl.Marker(map, {
      coordinates: [lon[i], lat[i]],
    });
    markers[i].hide();
    console.log("Markers create and hide");
    // console.log(markers[i].getCoordinates());
  }
  const points = lon.map((x, i) => [x, lat[i]]);
  for (let i = 0; i < 83; i++) {
    const x = points[i][0];
    const y = points[i][1];
    if (getDistance(center, [x, y]) <= radius) {
      if (lon[i] == x && lat[i] == y) {
        console.log("Points true");
        markers[i].show();
      }
    }
  }
};

xhr.send();

// Функция для вычисления расстояния между двумя точками на сфере (в метрах)

const radius = 300;
const markers = [];
const center = [137.00395936927842, 50.54691620051855];

const map = new mapgl.Map("container", {
  center: center,
  zoom: 18,
  key: "bfd8bbca-8abf-11ea-b033-5fa57aae2de7",
});

const coordinatX = [
  [137.01896],
  [137.010425],
  [136.997139],
  [137.02916],
  [137.030483],
  [137.006205],
  [137.003807],
  [137.004881],
  [137.006524],
];

const coordinatY = [
  [50.551827],
  [50.537445],
  [50.546185],
  [50.551426],
  [50.544822],
  [50.547604],
  [50.547956],
  [50.54861],
  [50.548854],
];

const points = coordinatX.map((x, i) => [x[0], coordinatY[i][0]]);

external_circle = new mapgl.Circle(map, {
  coordinates: center,
  radius: radius,
  strokeWidth: 2,
  strokeColor: "#ffffff",
  stroke2Width: 6,
});

// Функция для вычисления расстояния между двумя точками на сфере (в метрах)
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

const pointsInRadius = points.filter(
  (point) => getDistance(center, point) <= radius
);

for (let i = 0; i < 9; i++) {
  const x = points[i][0];
  const y = points[i][1];
  if (getDistance(center, [x, y]) <= radius) {
    markers[i] = new mapgl.Marker(map, {
      coordinates: [coordinatX[i], coordinatY[i]],
    });
    markers[i].hide();
    if (coordinatX[i] == x && coordinatY[i] == y) {
      console.log("Points true");
      markers[i].show();
    }
  }
}

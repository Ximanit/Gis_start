const radius = 200;
const markers = [];

const map = new mapgl.Map("container", {
  center: [137.00395936927842, 50.54691620051855],
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

external_circle = new mapgl.Circle(map, {
  coordinates: [137.00395936927842, 50.54691620051855],
  radius: radius,
  strokeWidth: 2,
  strokeColor: "#ffffff",
  stroke2Width: 6,
});

for (let i = 0; i < 9; i++) {
  markers[i] = new mapgl.Marker(map, {
    coordinates: [coordinatX[i], coordinatY[i]],
  });
  console.log(markers.zIndex);
  markers[i].hide();
  // console.log(`marker ${i} = ${markers[i].getCoordinates()}`);
  // if (
  //   ((Math.pow(coordinatX[i] - 137.00395936927842), 2) +
  //     Math.pow(coordinatY[i] - 50.54691620051855),
  //   2) <= Math.pow(radius, 2)
  // ) {
  //   console.log(`markers ${i}${coordinatX}${coordinatY}`);
  //   markers[i].show();
  // }
}

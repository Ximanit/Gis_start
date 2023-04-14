// API key can be used on codepen.io only!
// You can get more info on https://docs.2gis.com/

const map = new mapgl.Map("container", {
  center: [55.31878, 25.23584],
  zoom: 17,
  key: "bfd8bbca-8abf-11ea-b033-5fa57aae2de7",
});
const directions = new mapgl.Directions(map, {
  // This key can be used for demo purpose only!
  // You can get your own key on https://dev.2gis.com/order/
  directionsApiKey: "rubfpx2151",
});
const markers = [];
let firstPoint;
let secondPoint;
// A current selecting point
let selecting = "a";
const controlsHtml = `<button id="reset">Reset points</button> `;
new mapgl.Control(map, controlsHtml, {
  position: "topLeft",
});
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function () {
  selecting = "a";
  firstPoint = undefined;
  secondPoint = undefined;
  directions.clear();
});
map.on("click", (e) => {
  const coords = e.lngLat;
  if (selecting != "end") {
    // Just to visualize selected points, before the route is done
    markers.push(
      new mapgl.Marker(map, {
        coordinates: coords,
        icon: "https://docs.2gis.com/img/dotMarker.svg",
      })
    );
  }
  if (selecting === "a") {
    firstPoint = coords;
    selecting = "b";
  } else if (selecting === "b") {
    secondPoint = coords;
    selecting = "end";
  }
  // If all points are selected — we can draw the route
  if (firstPoint && secondPoint) {
    directions.pedestrianRoute({
      points: [firstPoint, secondPoint],
    });
    markers.forEach((m) => {
      m.destroy();
    });
  }
});

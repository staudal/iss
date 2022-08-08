const map = L.map("map").setView([0, 0], 1);

const satelliteIcon = L.icon({
  iconUrl: "satellite.png",
  shadowUrl: "leaf-shadow.png",

  iconSize: [24, 24], // size of the icon
  iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
});

const marker = L.marker([0, 0], { icon: satelliteIcon }).addTo(map);
const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = "© OpenStreetMap";
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(map);

const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";
async function getISS() {
  const response = await fetch(API_URL);
  const data = await response.json();
  const { longitude, latitude, velocity } = data;

  marker.setLatLng([latitude, longitude]);

  document.getElementById("lat").textContent = latitude;
  document.getElementById("lon").textContent = longitude;
}

setInterval(getISS, 1000);

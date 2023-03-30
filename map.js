const map = L.map('map').fitWorld();
var markers = []

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function onLocationFound(e) {
    const radius = e.accuracy / 2;
    const locationCircle = L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}

function addLocations(){
    for(var i = 0; i<geoData.locations.length; i++){
        var loc = geoData.locations[i];

        text = `<b>${loc.name}</b> <br>
        <a href = ${loc.link}>AR Link </a> <br>
        ${loc.text}
        `;

        markers.push(L.marker([loc.lat, loc.long]).addTo(map)
            .bindPopup(text)
        );
    }
}

addLocations();

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

console.log(geoData);
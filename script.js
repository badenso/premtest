const maps = ["Mirage", "Inferno", "Overpass", "Ancient", "Nuke", "Vertigo", "Anubis"];
const mapContainer = document.getElementById("map-container");
const selectedMapDiv = document.getElementById("selected-map");
const resetButton = document.getElementById("reset-button");

let bannedMaps = [];

function renderMaps() {
    mapContainer.innerHTML = "";
    maps.forEach((map, index) => {
        const button = document.createElement("button");
        button.innerText = map;
        button.classList.add("map-button");
        button.addEventListener("click", () => banMap(index, button));
        mapContainer.appendChild(button);
    });
}

function banMap(index, button) {
    if (bannedMaps.includes(index) || bannedMaps.length >= 6) return;

    bannedMaps.push(index);
    button.classList.add("banned");
    button.disabled = true;

    if (bannedMaps.length === 6) {
        const remainingMap = maps.find((_, i) => !bannedMaps.includes(i));
        selectedMapDiv.innerText = `Selected Map: ${remainingMap}`;
    }
}

resetButton.addEventListener("click", () => {
    bannedMaps = [];
    selectedMapDiv.innerText = "";
    renderMaps();
});

renderMaps();

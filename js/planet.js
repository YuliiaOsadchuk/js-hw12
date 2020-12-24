const showPlanets = async () => {
    const response = await axios.get("https://swapi.dev/api/planets");
    addPlanetsList(response.data.results);
}

const addPlanetsList = (planets) => {
    const planetsList = document.querySelector(".planets-list");
    planetsList.innerHTML += formPlanetsList(planets);
}

const formPlanetsList = (planets) => {
    return planets.reduce((total, planet) => {
        return total += `<p class="planet-item">${planet.name}</p>`;
    },'')
}

showPlanets();
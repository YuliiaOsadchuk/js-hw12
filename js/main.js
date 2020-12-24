const showCharacters = async () => {
    const selectedEpisode = document.querySelector("#episod-selector").value;
    const response = await axios.get(`https://swapi.dev/api/films/${selectedEpisode}`);

    const charactersArray = response.data.characters.map((character) => {
        return axios.get(character);
    })

    const characters = await Promise.all(charactersArray);

    const charactersObjects = characters.map((ch) => {
        return {
            fullName: ch.data.name,
            dataBirth: ch.data.birth_year,
            gender: ch.data.gender,
            photo: './img/1024px-No_image_available.svg.png',
        }
    })

    const charactersWrapper = document.querySelector(".characters-wrapper");
    charactersWrapper.innerHTML = '';
    charactersWrapper.innerHTML += formCharactersGrid(charactersObjects);
}

const formCharactersGrid = (characters) => {
    return characters.reduce((total, character) => {
        return total += formCharacterCard(character);
    },'')
}

const formCharacterCard = (character) => {
    return `<div class="character-card">
                <div class="base-info">
                    <div class="photo-image">
                        <img src=${character.photo} alt="character's photo">
                    </div>
                    <span class="full-name"><p class="font-langar">Full name: </p> ${ character.fullName}</span>
                </div>
                <span class="addition-info"><p class="font-langar">Date of birth: </p> ${character.dataBirth}</span>
                <span class="addition-info"><p class="font-langar">Gender: </p> ${character.gender}</span>
                </div>
            </div>`
}

const goToNextPage = () => {
    window.location.href = "planet.html";
}

const main = () => {
    const showCharactersButton = document.querySelector(".show-characters-button");
    showCharactersButton?.addEventListener("click", showCharacters);

    const nextPageButton = document.querySelector(".go-to-next-page");
    nextPageButton?.addEventListener("click", goToNextPage);
};

main();
    


const displayedCounts = { "1-5": 0, "6-11": 0, "12-17": 0 };
const displayedCharacters = { "1-5": [], "6-11": [], "12-17": [] };

const getCharacterImage = (name) => {
    const images = {
        "Luke Skywalker": "assets/img/luke2.jfif",
        "C-3PO": "assets/img/c-3po.jfif",
        "R2-D2": "assets/img/r2d2.jfif",
        "Darth Vader": "assets/img/dark2.jfif",
        "Leia Organa": "assets/img/leia.jfif",
        "Owen Lars": "assets/img/owen.jfif",
        "Beru Whitesun lars": "assets/img/beru.jfif",
        "R5-D4": "assets/img/r5-d4.jfif",
        "Biggs Darklighter": "assets/img/biggs.webp",
        "Obi-Wan Kenobi": "assets/img/obi.jfif",
        "Anakin Skywalker": "assets/img/anakin.jfif",
        "Wilhuff Tarkin": "assets/img/Wilhuff_Tarkin.jfif",
        "Chewbacca": "assets/img/chew.jfif",
        "Han Solo": "assets/img/han.jfif",
        "Greedo": "assets/img/greedo.jfif",
        "Jabba Desilijic Tiure": "assets/img/jabba.jfif",
        "Wedge Antilles": "assets/img/wedge.jfif",
    };

    return images[name] || "images/default.jpg"; // Imagen por defecto, personaje 17 no me aparece en la API, me aparece error 404, debería ser wedge
};

async function fetchCharacterData(start, end, range, containerId) {
    const container = document.getElementById(containerId);

    for (let i = start; i <= end; i++) {
        const response = await fetch(`https://swapi.dev/api/people/${i}/`);
        const character = await response.json();
        const imageUrl = getCharacterImage(character.name);

        if (displayedCharacters[range].includes(character.name)) {
            continue; 
        }
        displayedCharacters[range].push(character.name);

        const characterDiv = document.createElement('div');
        characterDiv.classList.add('character-info');
        characterDiv.innerHTML = `
            <img src="${imageUrl}" alt="${character.name}">
            <p><strong>Nombre:</strong> ${character.name}</p>
            <p><strong>Altura:</strong> ${character.height} cm</p>
            <p><strong>Peso:</strong> ${character.mass} kg</p>
        `;
        container.appendChild(characterDiv);
        break; 
    }
}

document.querySelectorAll('.block').forEach(block => {
    block.addEventListener('mouseover', (e) => {
        const range = e.currentTarget.getAttribute('data-range');
        const [start, end] = range.split('-').map(Number);
        const containerId = `container-${Math.ceil(start / 5)}`;

        const nextIndex = displayedCounts[range] + start; 
        if (nextIndex <= end) {
            fetchCharacterData(nextIndex, nextIndex, range, containerId); 
            displayedCounts[range]++; 
        }
    });
});

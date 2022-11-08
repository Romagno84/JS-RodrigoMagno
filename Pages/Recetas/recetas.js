const url = 'https://tasty.p.rapidapi.com/recipes/list';
const loadingElement = document.querySelector('#receipe-loading');

const obtenerRecetas = () => {
    return new Promise((res, rej) => {
        fetch(url, {
            params: {from: '0', size: '20', tags: 'under_30_minutes'},
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '7ec303335cmshf917b57b32f39f1p1774c3jsnd18ab6e3a65a',
                'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
              }
        })
        .then(response => response.json())
        .then(data => res(data))
        .catch(err => rej(data))
    })
}

const getReceipes = ({recipes, instructions: receipeInstructions}) => {
    const receipeStepsContainer = document.createElement('div')
    receipeStepsContainer.className = 'd-flex flex-column';

    if(recipes) {
        const name = document.createElement('span');
        name.innerText = recipes[0]?.name;
        name.classList.add('step-name');
        receipeStepsContainer.appendChild(name);
    }

    const instructions = recipes ? recipes[0].instructions : receipeInstructions;

            
    const instructionsTitle = document.createElement('span');
    instructionsTitle.innerText = 'Instrucciones';
    instructionsTitle.classList.add('instructions-title');
    receipeStepsContainer.appendChild(instructionsTitle);

    const instructionsContainer = document.createElement('div');
    instructionsContainer.className = 'd-flex flex-column'
    instructions.forEach((instruction) => {
        const instructionElement = document.createElement('span');
        instructionElement.innerText = `${instruction.position} - ${instruction.display_text}`;
        instructionElement.classList.add('instructions')
        instructionsContainer.appendChild(instructionElement);
    })

    receipeStepsContainer.appendChild(instructionsContainer);
            
    return receipeStepsContainer;
}

const mostrarRecetas = async () => {
    const data = await obtenerRecetas();    
    const receipesContainer = document.querySelector('#receipe-container');
    const container = document.createDocumentFragment();
    if(data.results && data.results.length > 0) {
        data.results.forEach((receipe) => {
            const card = document.createElement('div');
            card.classList.add('receipe-card');
    
            const img = document.createElement('img');
            img.src = receipe.beauty_url || receipe.thumbnail_url;
            card.appendChild(img);

            const name = document.createElement('span');
            name.innerText = receipe.name;
            name.classList.add('receipe-name')
            card.appendChild(name);

            const receipes = getReceipes(receipe);

            card.appendChild(receipes);

            container.appendChild(card)
        })
    }

    loadingElement.classList.add('d-none');
    receipesContainer.appendChild(container);
}

mostrarRecetas();
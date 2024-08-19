document.addEventListener('DOMContentLoaded', () => {
    const $ = el => document.querySelector(el);
    const $$ = el => document.querySelectorAll(el);

    const tierContainer = document.getElementById('tier-container');
    const addTierButton = document.getElementById('add-tier');
    const removeTierButton = document.getElementById('remove-tier');
    const resetTierButton = document.getElementById('reset-tiers');
    const imageInput = $('#image-input');
    const itemSection = $('#control-items');  // Corrige aquí el ID si es necesario

    imageInput.addEventListener('change', (event) => {
        const [file] = event.target.files;
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (eventReader) => {
                createItem(eventReader.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    function createItem(src) {
        const imgElement = document.createElement('img');
        imgElement.draggable = true;
        imgElement.src = src;
        imgElement.className = 'image';

        imgElement.addEventListener('dragstart', handleDragStart);
        imgElement.addEventListener('dragend', handleDragEnd);

        itemSection.appendChild(imgElement);
    }

    let draggedElement = null;
    let sourceContainer = null;

    function handleDragStart(event) {
        draggedElement = event.target;
        sourceContainer = draggedElement.parentNode;
        event.dataTransfer.setData('text/plain', draggedElement.src); // Necesario para Firefox
    }

    function handleDragEnd(event) {
        draggedElement = null;
        sourceContainer = null;
    }

    function handleDragOver(event) {
        console.log('drag over', event);
        event.preventDefault(); // Necesario para permitir el drop
        const { currentTarget } = event;
        if (sourceContainer === currentTarget) return;
    }

    function handleDrop(event) {
    event.preventDefault();
    const currentTarget = event.currentTarget;

    if (sourceContainer && draggedElement) {
        sourceContainer.removeChild(draggedElement);
        currentTarget.querySelector('.level').appendChild(draggedElement);
        
        // Ajustar la altura de .label según el número de imágenes
        const label = currentTarget.querySelector('.label');
        const numberOfRows = Math.ceil(currentTarget.querySelectorAll('.image').length / 5); // Ejemplo para 5 imágenes por fila
        label.style.height = `${50 * numberOfRows}px`;
        }
    }   

    const tierColors = [
        'var(--tier-s-color)', 
        'var(--tier-a-color)',
        'var(--tier-b-color)',
        'var(--tier-c-color)',
        'var(--tier-d-color)',
        'var(--tier-f-color)'
    ];

    const tierLabels = ['S', 'A', 'B', 'C', 'D', 'F'];

    let tierCounter = 0;

    function createTier() {
    if (tierCounter >= tierLabels.length) return;

    const tierSection = document.createElement('section');
    tierSection.className = 'tier';

    const tierLevel = document.createElement('div');
    tierLevel.className = 'level';

    const color = tierColors[tierCounter % tierColors.length];
    tierLevel.style.setProperty('--level', color);

    const tierLabel = document.createElement('aside');
    tierLabel.className = 'label';

    const labelSpan = document.createElement('span');
    labelSpan.contentEditable = true;
    labelSpan.textContent = tierLabels[tierCounter];

    tierLabel.appendChild(labelSpan);
    tierLevel.appendChild(tierLabel);
    tierSection.appendChild(tierLevel);
    tierContainer.appendChild(tierSection);

    tierSection.addEventListener('dragover', handleDragOver);
    tierSection.addEventListener('drop', handleDrop);

    labelSpan.focus();

    tierCounter++;
}

    function removeTier() {
        if (tierContainer.children.length > 0) {
            tierContainer.removeChild(tierContainer.lastChild);
            tierCounter--;
        }
    }

    function resetTiers() {
        while (tierContainer.firstChild) {
            tierContainer.removeChild(tierContainer.firstChild);
        }
        tierCounter = 0;
        for (let i = 0; i < tierLabels.length; i++) {
            createTier();
        }
    }

    addTierButton.addEventListener('click', createTier);
    removeTierButton.addEventListener('click', removeTier);
    resetTierButton.addEventListener('click', resetTiers);

    createTier(); // Crear el primer tier al cargar la página
});

document.addEventListener('DOMContentLoaded', () => {
    const $ = el => document.querySelector(el);
    const $$ = el => document.querySelectorAll(el);

    const tierContainer = document.getElementById('tier-container');
    const addTierButton = document.getElementById('add-tier');
    const removeTierButton = document.getElementById('remove-tier');
    const resetTierButton = document.getElementById('reset-tiers');
    const imageInput = $('#image-input');
    const itemSection = $('#control-items');  // Corrige aquí el ID

    imageInput.addEventListener('change', (event) => {
        const [file] = event.target.files;
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (eventReader) => {
                const imgElement = document.createElement('img');
                imgElement.src = eventReader.target.result;
                imgElement.className = 'image';
                itemSection.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        }
    });

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
        createTier(); // Crea el primer nivel (Tier S) nuevamente
    }

    addTierButton.addEventListener('click', createTier);
    removeTierButton.addEventListener('click', removeTier);
    resetTierButton.addEventListener('click', resetTiers);

    createTier();
});

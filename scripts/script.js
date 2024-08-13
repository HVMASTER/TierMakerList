document.addEventListener('DOMContentLoaded', () => {
    const tierContainer = document.getElementById('tier-container');
    const addTierButton = document.getElementById('add-tier');
    const removeTierButton = document.getElementById('remove-tier');
    const resetTierButton = document.getElementById('reset-tiers');

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
        if (tierContainer.children.length === 0) {
            tierCounter = 0;
        }

        if (tierCounter >= tierLabels.length) return;

        tierCounter++;

        const tierSection = document.createElement('section');
        tierSection.className = 'tier';

        const tierLevel = document.createElement('div');
        tierLevel.className = 'level';

        const color = tierColors[(tierCounter - 1) % tierColors.length];
        tierLevel.style.setProperty('--level', color);

        const tierLabel = document.createElement('aside');
        tierLabel.className = 'label';

        const labelSpan = document.createElement('span');
        labelSpan.contentEditable = true;
        labelSpan.textContent = tierLabels[tierCounter - 1];

        tierLabel.appendChild(labelSpan);
        tierLevel.appendChild(tierLabel);

        tierSection.appendChild(tierLevel);
        tierContainer.appendChild(tierSection);

        labelSpan.focus();
    }

    function removeTier() {
        if (tierContainer.children.length > 0) {
            tierContainer.removeChild(tierContainer.lastChild);
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

// Define the scroll functions
function nextCard(container, scrollDistance) {
    container.scrollBy({ left: scrollDistance, behavior: "smooth" });
}

function previousCard(container, scrollDistance) {
    container.scrollBy({ left: -scrollDistance, behavior: "smooth" });
}
  
// Select the elements
const container = document.querySelector('.projects-container');
const prevButton = document.querySelector('.chevron-buttons .prev-btn');
const nextButton = document.querySelector('.chevron-buttons .next-btn');
const tile = document.querySelector('.project-tile');
const tileWidth = tile.clientWidth;

// Add click event listeners to the chevron buttons
prevButton.addEventListener('click', () => {
    previousCard(container, tileWidth);
});

nextButton.addEventListener('click', () => {
    nextCard(container, tileWidth);
});
  
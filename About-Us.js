let items = document.querySelectorAll('.slider .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');

let active = 0; // Active index of the current slide

// Load the initial slider state
function loadshow() {
    let offset = 0;

    // Reset all items before expanding any item
    items.forEach(item => {
        item.classList.remove('expanded'); // Collapse all items
    });

    // Set active item styles
    items[active].style.transform = 'none';
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;

    // Handle items after the active one
    for (let i = active + 1; i < items.length; i++) {
        offset++;
        items[i].style.transform = `translateX(${120 * offset}px) scale(${1 - 0.2 * offset}) perspective(16px) rotateY(1deg)` ;
        items[i].style.zIndex = -offset;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = offset > 2 ? 0 : 0.6;
    }

    // Reset offset and handle items before the active one
    offset = 0;
    for (let i = active - 1; i >= 0; i--) {
        offset++;
        items[i].style.transform = `translateX(${-120 * offset}px) scale(${1 - 0.2 * offset}) perspective(16px) rotateY(-1deg)` ;
        items[i].style.zIndex = -offset;
        items[i].style.filter = 'blur(5px)';
        items[i].style.opacity = offset > 2 ? 0 : 0.6;
    }
}

// Initialize the slider
loadshow();

// Expand the box when the title is clicked
let slideTitles = document.querySelectorAll('.slide-title');
slideTitles.forEach((title) => {
    title.addEventListener('click', function () {
        let item = this.closest('.item'); // Find the closest .item container for the clicked title

        // If it's already expanded, collapse it
        if (item.classList.contains('expanded')) {
            item.classList.remove('expanded');
        } else {
            item.classList.add('expanded'); // Expand the clicked item
        }
    });
});

// Next button functionality
next.onclick = function () {
    if (active < items.length - 1) {
        // Collapse the active item first with smooth animation
        items[active].classList.remove('expanded');
        
        active++;
        loadshow();
    }
};

// Previous button functionality
prev.onclick = function () {
    if (active > 0) {
        // Collapse the active item first with smooth animation
        items[active].classList.remove('expanded');
        
        active--;
        loadshow();
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const itemContainer = document.getElementById('itemContainer');

    try {
        const response = await fetch('/api/items');
        const data = await response.json();

        if (response.ok) {
            // Iterate over items and create blocks with carousels
            data.forEach((item) => {
                const itemBlock = document.createElement('div');
                itemBlock.classList.add('item-block');

                // Add carousel with three pictures
                const carousel = document.createElement('div');
                carousel.classList.add('carousel');
                item.pictures.forEach((pictureUrl) => {
                    const img = document.createElement('img');
                    img.src = pictureUrl;
                    carousel.appendChild(img);
                });

                // Add name and description
                const name = document.createElement('h2');
                name.textContent = item.names[0].value; // Assuming the first name is in English
                const description = document.createElement('p');
                description.textContent = item.descriptions[0].value; // Assuming the first description is in English

                itemBlock.appendChild(carousel);
                itemBlock.appendChild(name);
                itemBlock.appendChild(description);

                itemContainer.appendChild(itemBlock);
            });
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

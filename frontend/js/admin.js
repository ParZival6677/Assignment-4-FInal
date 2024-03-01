document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('itemForm');

    itemForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(itemForm);

        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });

            if (response.ok) {
                alert('Item saved successfully');
                // Additional logic for updating or refreshing the displayed items
                updateDisplayedItems(); // Call a function to update or refresh the displayed items
            } else {
                const data = await response.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    function updateDisplayedItems() {
        // Make an API request to fetch the updated items
        fetch('/api/items')
            .then(response => response.json())
            .then(items => {
                // Clear the existing displayed items
                const displayedItemsContainer = document.getElementById('displayedItems');
                displayedItemsContainer.innerHTML = '';

                // Render the updated items on the page
                items.forEach(item => {
                    const itemElement = document.createElement('div');
                    itemElement.textContent = item.name;
                    displayedItemsContainer.appendChild(itemElement);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});

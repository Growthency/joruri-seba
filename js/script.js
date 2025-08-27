document.addEventListener('DOMContentLoaded', () => {
    // Get all the necessary elements from the DOM
    const heartCountSpan = document.getElementById('heart-count');
    const coinCountSpan = document.getElementById('coin-count');
    const copyCountSpan = document.getElementById('copy-count');
    const historyListContainer = document.getElementById('history-list');
    const clearHistoryButton = document.getElementById('clear-history-button');

    const allHeartIcons = document.querySelectorAll('.heart-icon');
    const allServiceCards = document.querySelectorAll('.service-card');

    // Initialize state variables
    let heartCount = 0;
    let coinCount = 100;
    let copyCount = 0;

    // Function to update the display counts
    function updateCounts() {
        heartCountSpan.textContent = heartCount;
        coinCountSpan.textContent = coinCount;
        copyCountSpan.textContent = copyCount;
    }

    // ---- Functionality for Heart Icons ----
    allHeartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            // Prevent increasing count if already liked
            if (!icon.classList.contains('liked')) {
                icon.classList.add('liked');
                heartCount++;
                updateCounts();
            }
        });
    });

    // ---- Functionality for Call and Copy Buttons using Event Delegation ----
    const cardContainer = document.querySelector('.card-container');

    cardContainer.addEventListener('click', (event) => {
        const clickedElement = event.target;
        const card = clickedElement.closest('.service-card');
        if (!card) return; // Exit if the click was not inside a card

        const serviceName = card.querySelector('.service-name').textContent;
        const serviceNumber = card.querySelector('.hotline-number').textContent;

        // ---- Call Button Function er kaj ----
        if (clickedElement.closest('.call-button')) {
            if (coinCount >= 20) {
                // 1.  coins kombe
                coinCount -= 20;
                updateCounts();

                // 2. Show alert
                alert(`Calling ${serviceName} at ${serviceNumber}`);

                // 3. Add to call history
                addToHistory(serviceName, serviceNumber);
            } else {
                alert("You don't have enough coins to make a call!");
            }
        }

        // ---- Copy Button er kaj ----
        if (clickedElement.closest('.copy-button')) {
            // 1. Copy to clipboard
            navigator.clipboard.writeText(serviceNumber).then(() => {
                // 2. Show alert
                alert(`Number copied: ${serviceNumber}`);

                // 3. Increase copy count
                copyCount++;
                updateCounts();
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Could not copy the number. Please try again.');
            });
        }
    });

    // ---- Function to add an item to the call history ----
    function addToHistory(name, number) {
        // Get current time
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Create a new history item er kaj
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');

        historyItem.innerHTML = `
                    <div class="history-item-info">
                        <p class="name">${name}</p>
                        <p class="number">${number}</p>
                    </div>
                    <span class="time">${timeString}</span>
                `;

        // Add the new item er kaj
        historyListContainer.prepend(historyItem);
    }

    // ----  Clear History Button Work er kaj----
    clearHistoryButton.addEventListener('click', () => {
        historyListContainer.innerHTML = ''; // Clear all child elements
        alert('Call history has been cleared.');
    });

    // Initial call er kaj
    updateCounts();
});
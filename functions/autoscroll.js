let scrollInterval;

function startScrolling() {
    scrollInterval = setInterval(() => window.scrollBy(0, 1), 20);
}

function stopScrolling() {
    clearInterval(scrollInterval);
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "startScroll") {
        startScrolling();
    } else if (message.action === "stopScroll") {
        stopScrolling();
    }
});

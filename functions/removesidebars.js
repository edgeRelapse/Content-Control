function removeSidebars() {
    // Remove the left sidebar
    const leftSidebar = document.querySelector('header[role="banner"]');
    if (leftSidebar) {
        leftSidebar.style.display = 'none';
    }

    // Remove the right sidebar
    const rightSidebar = document.querySelector('div[aria-labelledby][role="region"]');
    if (rightSidebar) {
        rightSidebar.style.display = 'none';
    }

    // Remove the trending section
    const trendingSection = document.querySelector('div[aria-label="Trending"][tabindex="0"]');
    if (trendingSection) {
        trendingSection.style.display = 'none';
    }
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "enableSidebarRemoval") {
        removeSidebars();
    } else if (message.action === "disableSidebarRemoval") {
        // Re-select elements
        const leftSidebar = document.querySelector('header[role="banner"]');
        const rightSidebar = document.querySelector('div[aria-labelledby][role="region"]');
        const trendingSection = document.querySelector('div[aria-label="Trending"][tabindex="0"]');

        // Restore displays
        const elements = [leftSidebar, rightSidebar, trendingSection];
        elements.forEach(element => {
            if (element) element.style.display = '';
        });
    }
});

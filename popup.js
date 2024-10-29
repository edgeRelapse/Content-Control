document.addEventListener("DOMContentLoaded", () => {
    const autoScrollerToggle = document.getElementById("websiteOptimization");
    const mediaFilterToggle = document.getElementById("mediaFilter");
    const sidebarRemovalToggle = document.getElementById("removeSidebars");

    // Load saved states from storage and set the toggles accordingly
    chrome.storage.sync.get(['autoScrollerState', 'mediaFilterState', 'sidebarRemovalState'], (data) => {
        autoScrollerToggle.checked = data.autoScrollerState || false;
        mediaFilterToggle.checked = data.mediaFilterState || false;
        sidebarRemovalToggle.checked = data.sidebarRemovalState || false;

        // After setting the toggles, apply the states to the active tab
        applySettingsToActiveTab();
    });

    function applySettingsToActiveTab() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            if (tab && tab.url.includes("x.com")) {
                // AutoScroller
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["functions/autoscroll.js"]  // Updated path
                }).then(() => {
                    const action = autoScrollerToggle.checked ? "startScroll" : "stopScroll";
                    chrome.tabs.sendMessage(tab.id, { action });
                }).catch((error) => console.error("Script injection failed:", error));

                // Media Filter
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["functions/mediafilter.js"]  // Updated path
                }).then(() => {
                    const action = mediaFilterToggle.checked ? "enableMediaFilter" : "disableMediaFilter";
                    chrome.tabs.sendMessage(tab.id, { action });
                }).catch((error) => console.error("Script injection failed:", error));

                // Sidebar Removal
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["functions/removesidebars.js"]  // Updated path
                }).then(() => {
                    const action = sidebarRemovalToggle.checked ? "enableSidebarRemoval" : "disableSidebarRemoval";
                    chrome.tabs.sendMessage(tab.id, { action });
                    if (!sidebarRemovalToggle.checked) {
                        chrome.tabs.reload(tab.id);
                    }
                }).catch((error) => console.error("Script injection failed:", error));
            } else {
                console.log("This script only works on X.com");
            }
        });
    }

    // Autoscroller Toggle
    autoScrollerToggle.addEventListener("change", () => {
        chrome.storage.sync.set({ autoScrollerState: autoScrollerToggle.checked });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            if (tab.url.includes("x.com")) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["functions/autoscroll.js"]  // Updated path
                }).then(() => {
                    const action = autoScrollerToggle.checked ? "startScroll" : "stopScroll";
                    chrome.tabs.sendMessage(tab.id, { action });
                }).catch((error) => console.error("Script injection failed:", error));
            } else {
                console.log("This script only works on X.com");
            }
        });
    });

    // Media Filter Toggle
    mediaFilterToggle.addEventListener("change", () => {
        chrome.storage.sync.set({ mediaFilterState: mediaFilterToggle.checked });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            if (tab.url.includes("x.com")) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["functions/mediafilter.js"]  // Updated path
                }).then(() => {
                    const action = mediaFilterToggle.checked ? "enableMediaFilter" : "disableMediaFilter";
                    chrome.tabs.sendMessage(tab.id, { action });
                }).catch((error) => console.error("Script injection failed:", error));
            }
        });
    });

    // Sidebar Removal Toggle
    sidebarRemovalToggle.addEventListener("change", () => {
        chrome.storage.sync.set({ sidebarRemovalState: sidebarRemovalToggle.checked });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            if (tab.url.includes("x.com")) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ["functions/removesidebars.js"]  // Updated path
                }).then(() => {
                    const action = sidebarRemovalToggle.checked ? "enableSidebarRemoval" : "disableSidebarRemoval";
                    chrome.tabs.sendMessage(tab.id, { action });
                    if (!sidebarRemovalToggle.checked) {
                        chrome.tabs.reload(tab.id);
                    }
                }).catch((error) => console.error("Script injection failed:", error));
            }
        });
    });
});

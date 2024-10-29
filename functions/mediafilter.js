function filterMediaPosts() {
    const posts = document.querySelectorAll('article[data-testid="tweet"]');
    posts.forEach(post => {
        const hasMedia = post.querySelector('[data-testid="tweetPhoto"], [data-testid="videoPlayer"]');
        const profilePicture = post.querySelector('.css-175oi2r.r-172uzmj.r-1pi2tsx.r-13qz1uu.r-o7ynqc.r-6416eg.r-1ny4l3l');
        post.style.display = !hasMedia && profilePicture ? 'none' : '';
    });
}

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "enableMediaFilter") {
        filterMediaPosts();
    } else if (message.action === "disableMediaFilter") {
        document.querySelectorAll('article[data-testid="tweet"]').forEach(post => post.style.display = '');
    }
});

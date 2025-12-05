let replacementRules = {
    "https://example\\.com/example\\.js": "local/example.js",
    "https://cdn\\.jsdelivr\\.net/npm/jquery@.*/jquery\\.min\\.js": "local/jquery.min.js",
    "https://code\\.jquery\\.com/jquery-.*\\.min\\.js": "local/jquery.min.js"
};

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'SCRIPT') {
                    const src = node.src;
                    for (const pattern in replacementRules) {
                        if (src.match(new RegExp(pattern, 'g'))) {
                            const localUrl = chrome.runtime.getURL(replacementRules[pattern]);
                            console.log('替换', src, '=>', localUrl);
                            node.src = localUrl;
                            break;
                        }
                    }
                }
            });
        }
    });
});
observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
});
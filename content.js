let replacementRules = {};
async function loadRules() {
    try {
        const rulesUrl = chrome.runtime.getURL('rules.json');
        const response = await fetch(rulesUrl);
        const config = await response.json();
        replacementRules = config.rules;
        console.log('规则配置加载成功', replacementRules);
    } catch (error) {
        console.error('加载规则配置失败:', error);
        replacementRules = {};
    }
}
(async () => {
    await loadRules();
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'SCRIPT' && node.src) {
                        const src = node.src;
                        for (const pattern in replacementRules) {
                            console.log(pattern, new RegExp(pattern).test(src), src)
                            if (new RegExp(pattern).test(src)) {
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
})();
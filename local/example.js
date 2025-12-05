// 本地替换示例脚本
console.log('🎉 本地脚本替换插件成功运行！');
console.log('这个脚本是从本地文件加载的，而不是远程服务器。');
(function() {
    // 在页面上添加一个简单的标记
    const marker = document.createElement('div');
    marker.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: #4CAF50;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 12px;
        z-index: 9999;
    `;
    marker.textContent = '✅ 本地脚本已加载';
    document.body.appendChild(marker);
    
    // 3秒后自动隐藏标记
    setTimeout(() => {
        marker.style.display = 'none';
    }, 3000);
})();
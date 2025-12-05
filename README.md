# JS Override 浏览器插件

一个用于替换网页中远程JavaScript文件为本地版本的浏览器插件。

## 文件结构

```
JSOverride/
├── manifest.json      # 插件配置文件
├── content.js         # 内容脚本（核心功能）
├── local/             # 本地脚本目录
│   └── example.js     # 示例本地脚本
└── README.md          # 使用说明
```

## 安装方法

1. 打开 Chrome 浏览器，进入 `chrome://extensions/`
2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择本插件目录

## 配置规则

编辑 `content.js` 文件中的 `replacementRules` 对象来配置替换规则：

```js
const replacementRules = {
    "https://example\\.com/example\\.js": "local/example.js",
    "https://cdn\\.jsdelivr\\.net/npm/jquery@.*/jquery\\.min\\.js": "local/jquery.min.js",
    "https://code\\.jquery\\.com/jquery-.*\\.min\\.js": "local/jquery.min.js"
}
```

### 规则格式说明

- **键**: 正则表达式模式，匹配要替换的远程脚本URL
- **值**: 对应的本地文件路径（相对于插件根目录）

### 正则表达式示例

- `https://example\\.com/example\\.js` - 精确匹配特定URL
- `https://cdn\\.jsdelivr\\.net/npm/jquery@.*/jquery\\.min\\.js` - 匹配所有jQuery版本
- `.*\\.min\\.js` - 匹配所有.min.js文件（谨慎使用）

## 使用步骤

1. **准备本地脚本**: 将需要替换的脚本文件放入 `local/` 目录
2. **配置规则**: 在 `rules.json` 中添加对应的替换规则
3. **刷新页面**: 访问目标网页，插件会自动进行替换
4. **查看控制台**: 打开开发者工具控制台查看替换日志

## 调试信息

插件会在浏览器控制台输出调试信息：
- ✅ 规则配置加载成功
- 🔄 匹配到规则并尝试替换
- ✅ 脚本替换成功

## 注意事项

- 正则表达式需要正确转义特殊字符（如 `.` 需要写成 `\\.`）
- 插件只替换 `<script src="...">` 标签，不处理内联脚本
- 替换后的脚本通过 Chrome 扩展的 `chrome.runtime.getURL()` 加载

## 故障排除

1. **替换不生效**: 检查规则正则表达式是否正确匹配目标URL
2. **文件不存在**: 确认本地文件路径正确且文件存在
3. **权限问题**: 确保插件有访问目标网站的权限
4. **缓存问题**: 清除浏览器缓存后重试

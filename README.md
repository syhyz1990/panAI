<center>
<p align="center">
  <a href="https://www.youxiaohou.com">
    <img width="100" src="https://www.youxiaohou.com/logo.png" alt="网盘智能识别助手">
  </a>
</p>

<h1 align="center">网盘智能识别助手</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TamperMonkey-v4.13-brightgreen.svg" alt="tampermonkey">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-lightgrey.svg" alt="LICENSE">
  </a>
  <img src="https://img.shields.io/badge/Chrome-≥76.0-brightgreen.svg" alt="chrome">
  <img src="https://img.shields.io/badge/Edge-≥88.0-brightgreen.svg" alt="edge">
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20Mac%20%7C%20Linux-blue.svg" alt="platform">
  <a href="https://www.youxiaohou.com" title="点击访问">
    <img src="https://img.shields.io/badge/Author-油小猴-red.svg">
  </a>
</p>

<div align="center">
  <strong>👉 自动识别网盘分享链接并填写提取码 👈</strong><br>
  <sub>适用于 Linux，macOS，Windows 平台</sub>
</div>
</center><br>

【网盘智能识别助手】可以智能识别网页中选中文字（一般背景为蓝色）里的 网盘链接 和 提取码/密码，提示并自动填写提取码。

目前已支持识别：`✅百度网盘` `✅阿里云盘` `✅腾讯微云` `✅蓝奏云` `✅天翼云盘` `✅和彩云` `✅迅雷云盘` `✅123云盘` `✅360云盘` `✅115网盘` `✅奶牛快传` `✅城通网盘` `✅夸克网盘` `✅Chrome 扩展商店` `✅Edge 扩展商店` `✅Firefox 扩展商店`（安装成功后可以使用页尾的链接进行测试）**识别速度小于 1 毫秒**。


## 🎨 助手界面

![](https://pic.rmb.bdstatic.com/bjh/f3784d134bdbb6a78c5db0bb071fed298280.png)

## 💽 安装地址

- **[安装地址（推荐）](https://www.youxiaohou.com/tool/install-panai.html)**

## 📖 使用说明

1. 鼠标选中含网盘链接的文字，被选中区域背景会变成蓝色（容错性很高，选多或选少了也可以智能识别😀）

2. 若包含网盘链接和提取码，上方会出现提示，点击打开会自动打开链接并填写提取码。

![](https://pic.rmb.bdstatic.com/bjh/623aeea319185cc50289483a8614118b1805.png)

## 📖 更新日志

**v1.9.5** 添加对 **新浪微盘/文叔叔网盘/14个小众网盘** 链接的识别 #31；修复链接中含有pwd字段时优先使用该字段作为密码 #22。感谢 [@52fisher](https://github.com/52fisher)。

**v1.9.1** 添加对 **Mega网盘** 链接的识别 #22 支持自定义识别快捷键 #30；修复蓝奏云识别错误 #23 错误的识别链接 #16。感谢 [@52fisher](https://github.com/52fisher)。

**v1.8.9** 添加对阿里云盘新域名 www.alipan.com 分享链接的支持。

**v1.8.6** 增强选中文字含有超链接时的识别能力。感谢 [@taozhiyu](https://github.com/taozhiyu)。

**v1.8.5** 增强对移动云盘的识别的识别能力。

**v1.8.4** 提升对提取码的识别能力，能更智能的识别提取码。

**v1.8.3** 添加对 **FlowUs息流** 链接的识别；**弹出提示时按下 Enter 回车键可以快速打开，按下 Esc 键可以关闭弹窗提示**。

**v1.8.1** 更换更清晰的图标。新增对 **Mircosoft 应用商店**链接的识别，选中后自动跳转到对应可直接访问的镜像站点。[选中我试试看](https://apps.microsoft.com/store/detail/wechat-for-windows/9NBLGGH4SLX7)。

**v1.8.0** 添加对 **百度企业网盘，百度网盘文档，115网盘，奶牛快传，城通网盘，夸克网盘** 链接的识别。

**v1.7.0** 添加剪切板文本识别，可在脚本菜单中选择 `识别剪切板中文字`（可以按 F1 快速打开），在弹出的窗口中粘贴需要识别的链接。

**v1.6.0** 添加对 **360云盘** 链接的识别，新增对 **Chrome 扩展商店，Edge 扩展商店，Firefox 扩展商店**链接的识别，选中后自动跳转到对应可直接访问的镜像站点。[选中我试试看](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)。

**v1.5.6** 支持将链接中含“点”自动替换为“.”后识别，加强阿里云盘的识别。

**v1.5.4** 修复链接本身包含提取码无法识别的问题，如 https://pan.baidu.com/s/xxxx?**pwd=1234**。

**v1.5.2** CDN 从 cdn.jsdelivr.net 替换为 unpkg.com。

**v1.5.1** 支持识别到 lanzous.com，就自动转换到可以访问的域名 lanzouw.com

**v1.5.0** 添加对 **123云盘** 链接的识别，支持超链接形式的识别（[选中密码和我试试看](https://www.lanzoui.com/b00t5sclg) 密码:d8f9）。

**v1.4.3** 增强对蓝奏云新链接的识别。

**v1.4.2** 增强对蓝奏云链接的识别。

**v1.4.1** 添加对阿里云盘短链接 alywp.net 的识别，增强对蓝奏云自定义链接的识别。

**v1.4.0** 添加对 **阿里云盘** 链接的识别，见测试链接 - 阿里云盘。

**v1.3.2** 支持识别更多天翼云盘链接格式。

**v1.3.1** 支持识别到 lanzous.com，就自动转换到可以访问的域名 lanzoui.com

**v1.3.0** 添加了对 **迅雷网盘** 链接的识别，改进了对链接中含有零宽度字符时无法识别的问题，修复和彩云无法自动填写的 Bug。

**v1.2.0** 修复了设置选项出现在 iframe 里的情况，优化了自动点击提交按钮的逻辑。

**v1.1.1** 修正了在部分网站上样式无法加载的问题。

**v1.1.0** 修正了弹出框在百度搜索上样式错乱的问题，部分网站弹出框被覆盖的问题，支持 iframe 网页内识别。

**v1.0.6** 支持对 `http删s://pan.b厨aidu.co次m/s/xxxx闷xxx` 这种中间含有汉字等特殊符号的识别。

**v1.0.5** 支持连续识别，增强对百度网盘的链接识别。

**v1.0.3** 增强识别准确度，对提取码判断更加准确。

**v1.0.2** 添加对不带 https 的链接识别，修复部分网站设置弹出框字体过大的提示。

**v1.0.1** 添加对 **和彩云** 链接的识别。

**v1.0.0** 添加对 **百度网盘，腾讯微云，蓝奏云，天翼云盘** 链接的识别。

## 🎨 GIF演示

图中网盘链接均来自Google搜索引擎，点击查看对应网盘识别动图：

|  |  |
|:-------------------------------------------------:|:-----------------------------------------------:|
| **百度网盘** | **阿里云盘** |
| ![](https://pic.rmb.bdstatic.com/bjh/0e378c9fe87dab58b3b4b5a1a6c14f1c1596.gif) | ![](https://pic.rmb.bdstatic.com/bjh/26feaeebd345fb9d81977615a293bd5a7602.gif) |
| **蓝奏云** | **腾讯微云** |
| ![](https://pic.rmb.bdstatic.com/bjh/642cd5072e3206d1788689e47709edab325.gif) | ![](https://pic.rmb.bdstatic.com/bjh/3e91200930793e97ceadb95d7abec1ee6398.gif) |
| **天翼云** | **和彩云** |
| ![](https://pic.rmb.bdstatic.com/bjh/999f0aad15106f346dc5a7dcd0e0f9c67773.gif) | ![](https://pic.rmb.bdstatic.com/bjh/0b2d96e8bc38c5b00c24d29709e5cfa52649.gif) |
| **迅雷网盘** | **123云盘** |
| ![](https://pic.rmb.bdstatic.com/bjh/93c837648bbe18e0da56c161cb2b24773089.gif) | ![](https://pic.rmb.bdstatic.com/bjh/093f6b9c739b25cbe7c0967d45e732fa907.gif) |
| **115网盘** | **奶牛快传** |
| ![](https://pic.rmb.bdstatic.com/bjh/181f1ee654d0bc387b088267a75aebba6628.gif) | ![](https://pic.rmb.bdstatic.com/bjh/8289e20763b97b26a932774e424915bc6814.gif) |
| **城通网盘** | **夸克网盘** |
| ![](https://pic.rmb.bdstatic.com/bjh/0e9bad688f2c21f0b6f3559b39b79f691712.gif) | ![](https://pic.rmb.bdstatic.com/bjh/941da48f310b86b43dcd03d884918fe13568.gif) |

## 🔧 助手配置

可以点击 `油猴` 图标打开配置选项，可配置选项如下图：

![](https://pic.rmb.bdstatic.com/bjh/5e712642ac0c0e7bbdeed5406777a9b79281.png)

技巧一：如何识别后实现自动打开链接？

回答：勾选`倒计时结束后自动打开链接`选项，同时调节倒计时时长，最短0.5s。

技巧二：如何让链接在后台打开？

回答：取消勾选`前台打开并激活网盘标签页`选项，新链接将在后台打开。

## 🚀 测试链接

安装好识别助手后，可以在打开页面中**选中**下方任意链接进行测试，以下仅是部分。**识别成功率高达99%！**

[点击查看](https://www.youxiaohou.com/tool/install-panai.html)

## 💯 常见问题

💡 **我只有网盘链接，不知道提取码，能自动获取并填充吗？**

A：不能，本助手无获取提取码的功能。仅智能识别所选区域的提取码并自动填充。

💡 **支持在哪些网站中进行识别？**

A：支持99%的网站，比如论坛，博客，搜索引擎等，只要选中区域内有符合条件的网盘链接，都会自动提示。

💡 **选中区域内有多个符合条件的链接会发生什么？**

A：目前仅会识别并提示第一个符合条件的链接，<Color color="#cc3235">不支持一次选择多个链接</Color>。

💡 **识别助手安全吗？**

A：识别助手免费开源，代码均在本地运行，无联网功能，不会上传任何信息。

💡 **智能识别过程会耗费资源吗？**

A：根据多次测试，平均识别时间仅需：0.1 毫秒-1 毫秒，基本上不占用系统资源。

## 👻 BUG反馈

如果您在使用过程中有无法识别的文本，请 [点击这里](https://github.com/syhyz1990/panAI/issues) 进行反馈。

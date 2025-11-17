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

- **[安装地址（源地址）](https://raw.githubusercontent.com/xiaofeiTM233/panAI/main/panai.user.js)**
- **[安装地址（jsdelivr镜像地址）](https://cdn.jsdelivr.net/gh/xiaofeiTM233/panAI@main/panai.user.js)**
- **[安装地址（ghproxy镜像地址）](https://ghproxy.net/https://raw.githubusercontent.com/xiaofeiTM233/panAI/main/panai.user.js)**

## 📖 使用说明

1. 鼠标选中含网盘链接的文字，被选中区域背景会变成蓝色（容错性很高，选多或选少了也可以智能识别😀）

2. 若包含网盘链接和提取码，上方会出现提示，点击打开会自动打开链接并填写提取码。

![](https://pic.rmb.bdstatic.com/bjh/623aeea319185cc50289483a8614118b1805.png)

## 📖 添加自定义网盘的参数说明
line111行,使用opt对象来管理所有支持的网盘列表和信息，opt的key即为不同网站的名称缩写，key的子对象即为该网站的具体配置，参数说明如下：
```javascript
'noire': {
reg: /(?:https?:\/\/)?drive.noire.cc\/s\/\w+/, //网盘链接的正则表达式，用于匹配链接
host: /drive\.noire\.cc/,//网盘链接的host，用于匹配链接
input: ['#pwd'], //密码输入框的选择器，用于获取密码输入框的元素
button: ['button.MuiButton-containedSecondary'],//密码输入框的确认按钮的选择器，用于获取确认按钮的元素
name: '爱丽丝的记事本',//网盘名称
storage: 'local',//密码存储方式，可选local或hash，使用hash时会在链接中添加pwd参数和pwd的hash，使用local时会在本地存储密码
storagePwdName: 'tmp_noire_pwd',//密码存储的名称，使用local方式存储密码能通过该值获取对应的密码
originalLink:true,//是否保留原始链接，当参数值为true时，会保留原始链接，不会拼接pwd参数和pwd的hash，以解决部分网站路由跳转不对的问题
replaceHost: 'drive.noire.cc',//替换链接的host，用于替换链接中的host，解决部分网站路由跳转不对的问题
},
```

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

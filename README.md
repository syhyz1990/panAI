<p align="center">
  <a href="https://www.baiduyun.wiki">
    <img width="100" src="https://www.baiduyun.wiki/logo.png" alt="网盘智能识别助手">
  </a>
</p>

<h1 align="center">网盘智能识别助手</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TamperMonkey-v4.13-brightgreen.svg" alt="tampermonkey">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-lightgrey.svg" alt="LICENSE">
  </a>
  <img src="https://img.shields.io/badge/Chrome-≥76.0-brightgreen.svg" alt="chrome">
  <img src="https://img.shields.io/badge/Edge-≥88.0-brightgreen.svg" alt="chrome">
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20Mac%20%7C%20Linux-blue.svg" alt="platform">
</p>

👉 【网盘智能识别助手】可以智能识别网页中选中文字（一般背景为蓝色）里的 网盘链接 和 提取码/密码，提示并自动填写提取码。

支持识别**百度网盘，阿里云盘，腾讯微云，蓝奏云，天翼云，和彩云，迅雷云盘**。（安装成功后可以使用页尾的链接进行测试）识别速度不到1毫秒。

## 🎨 助手界面

![](https://i.loli.net/2021/03/06/Y3a6hEjzHxqXPWG.png)

## 💽 安装地址

- **[安装地址（官方）](https://www.baiduyun.wiki/tool/install-panai.html)**

- **[安装地址（GreasyFork）](https://greasyfork.org/zh-CN/scripts/422960)**

## 🎨 GIF演示

图中网盘链接均来自Google搜索引擎，点击查看对应网盘识别动图：

| **百度网盘** | **阿里云盘** |
|:-------------------------------------------------:|:-----------------------------------------------:|
| ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/7NPZIk8buGmhF6S.gif) | ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/20210730104103.gif) |
| **蓝奏云** | **腾讯微云** |
| ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/J4dTB5kwQnDab6R.gif) | ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/pOj4exrZcKhWiM1.gif) |
| **天翼云** | **和彩云** |
| ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/T7oku1FDbW6Kjye.gif) | ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/9k8GUqbDEOKxPor.gif) |
| **迅雷网盘** | **123云盘** |
| ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/20210730104416.gif) | ![](https://cdn.jsdelivr.net/gh/youxiaohou/img/202112011344554.gif) |

## 📖 使用说明

1. 鼠标选中含网盘链接的文字，被选中区域背景会变成蓝色（容错性很高，选多或选少了也可以智能识别😀）

2. 若包含网盘链接和提取码，上方会出现提示，点击打开会自动打开链接并填写提取码。

![](https://i.loli.net/2021/03/05/oqMDRTiIcBlYudv.png)

## 📖 更新日志

- **v1.5.0** 增加对123云盘的识别，支持超链接形式的识别（选中密码和我试试看 (opens new window)密码:d8f9）。

- **v1.4.3** 增强对蓝奏云新链接的识别。

- **v1.4.2** 增强对蓝奏云链接的识别。

- **v1.4.1** 添加对阿里云盘短链接 alywp.net 的识别，增强对蓝奏云自定义链接的识别。

- **v1.4.0** 添加对阿里云盘链接的识别支持，见测试链接 - 阿里云盘。

- **v1.3.2** 支持识别更多天翼云链接格式。

- **v1.3.1** 支持识别到 lanzous.com，就自动转换到可以访问的域名 lanzoui.com

- **v1.3.0** 添加了对迅雷网盘的识别支持，改进了对链接中含有零宽度字符时无法识别的问题，修复和彩云无法自动填写的 Bug。

- **v1.2.0** 修复了设置选项出现在 iframe 里的情况，优化了自动点击提交按钮的逻辑。

- **v1.1.1** 修正了在部分网站上样式无法加载的问题。

- **v1.1.0** 修正了弹出框在百度搜索上样式错乱的问题，部分网站弹出框被覆盖的问题，支持 iframe 网页内识别。

- **v1.0.6** 支持对 `http删s://pan.b厨aidu.co次m/s/xxxx闷xxx` 这种中间含有汉字等特殊符号的识别。

- **v1.0.5** 支持连续识别，增强对百度网盘的链接识别。

- **v1.0.3** 增强识别准确度，对提取码判断更加准确。

- **v1.0.2** 增加对不带 https 的链接识别，修复部分网站设置弹出框字体过大的提示。

- **v1.0.1** 增加对和彩云的识别支持。

- **v1.0.0** 增加对百度网盘，腾讯微云，蓝奏云，天翼云的识别支持。

## 🔧 助手配置

可以点击 `油猴` 图标打开配置选项，可配置选项如下图：

![](https://i.loli.net/2021/03/05/PVSUZyWoubFtQDx.png)

技巧一：如何识别后实现自动打开链接？

回答：勾选`倒计时结束后自动打开链接`选项，同时调节倒计时时长，最短0.5s。

技巧二：如何让链接在后台打开？

回答：取消勾选`前台打开并激活网盘标签页`选项，新链接将在后台打开。

## 🚀 测试链接

安装好识别助手后，可以在打开页面中**选中**下方任意链接进行测试，以下仅是部分。**识别成功率高达99%！**

[点击查看](https://www.baiduyun.wiki/tool/install-panai.html)

## 👻 常见问题

Q1：我只有网盘链接，不知道提取码，能自动获取并填充吗？

A：不能，**本助手无获取提取码的功能**。仅智能识别所选区域的提取码并自动填充。

Q2：支持在哪些网站中进行识别？

A：支持99%的网站，比如论坛，博客，搜索引擎等，只要选中区域内有符合条件的网盘链接，都会自动提示。

Q3：选中区域内有多个符合条件的链接会发生什么？

A：目前仅会识别并提示第一个符合条件的链接，<Color color="red">不建议一次选择多个链接</Color>。

Q4：助手安全吗？

A：助手免费开源，代码均在本地运行，不会保留任何您的网盘相关信息。

Q5：智能识别过程会耗费资源吗？

A：根据作者多次测试，平均识别时间：1毫秒-3毫秒，基本上不占用系统资源。

## 👻 BUG反馈

如果您在使用过程中有无法识别的文本，请 [点击这里](https://wj.qq.com/s2/8150559/6c08/) 或 [发送邮件](mailto:mail@youxiaohou.com) 进行反馈。

## 💻 更多黑科技

![](https://i.loli.net/2019/11/28/lAFfphM8KYHeGgJ.png)

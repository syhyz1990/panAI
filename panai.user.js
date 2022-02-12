// ==UserScript==
// @name              网盘智能识别助手
// @namespace         https://github.com/syhyz1990/panAI
// @version           1.5.6
// @author            YouXiaoHou
// @icon              https://www.youxiaohou.com/panai.png
// @icon64            https://www.youxiaohou.com/panai.png
// @description       AI智能识别选中文字中的【网盘链接】和【提取码】，识别成功打开网盘链接并自动填写提取码，省去手动复制提取码在输入的烦恼。支持百度网盘，腾讯微云，蓝奏云，天翼云，和彩云，迅雷云盘，123云盘，huang1111云盘。
// @license           AGPL
// @homepage          https://www.youxiaohou.com/tool/install-panai.html
// @supportURL        https://github.com/syhyz1990/panAI
// @updateURL         https://www.youxiaohou.com/panai.user.js
// @downloadURL       https://www.youxiaohou.com/panai.user.js
// @match             *://*/*
// @require           https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.js
// @resource          swalStyle https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.css
// @run-at            document-idle
// @grant             GM_openInTab
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_registerMenuCommand
// @grant             GM_getResourceText
// ==/UserScript==

(function () {
    'use strict';

    const customClass = {
        container: 'panai-container',
        popup: 'panai-popup',
    };

    let util = {
        clog(c) {
            console.group('[网盘智能识别助手]');
            console.log(c);
            console.groupEnd();
        },

        parseQuery(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = location.search.substr(1).match(reg);
            if (r != null) return (r[2]);
            return null;
        },

        getValue(name) {
            return GM_getValue(name);
        },

        setValue(name, value) {
            GM_setValue(name, value);
        },

        sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        },

        addStyle(id, tag, css) {
            tag = tag || 'style';
            let doc = document, styleDom = doc.getElementById(id);
            if (styleDom) return;
            let style = doc.createElement(tag);
            style.rel = 'stylesheet';
            style.id = id;
            tag === 'style' ? style.innerHTML = css : style.href = css;
            document.head.appendChild(style);
        },

        isHidden(el) {
            try {
                return el.offsetParent === null;
            } catch (e) {
                return false;
            }
        }
    };

    let opt = {
        baidu: {
            reg: /((?:https?:\/\/)?(?:yun|pan)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S{4,}))/,
            host: /(pan|yun)\.baidu\.com/,
            input: ['#accessCode'],
            button: ['#submitBtn'],
            name: '百度网盘',
            storage: 'hash'
        },
        aliyun: {
            reg: /((?:https?:\/\/)?(?:(?:www\.)?aliyundrive\.com\/s|alywp\.net)\/[A-Za-z0-9]+)/,
            host: /www\.aliyundrive\.com|alywp\.net/,
            input: ['.ant-input', 'input[type="text"]'],
            button: ['.button--fep7l', 'button[type="submit"]'],
            name: '阿里云盘',
            storage: 'hash'
        },
        weiyun: {
            reg: /((?:https?:\/\/)?share\.weiyun\.com\/[A-Za-z0-9]+)/,
            host: /share\.weiyun\.com/,
            input: ['.mod-card-s input[type=password]'],
            button: ['.mod-card-s .btn-main'],
            name: '微云',
            storage: 'hash'
        },
        lanzou: {
            reg: /((?:https?:\/\/)?(?:[A-Za-z0-9\-.]+)?lanzou[a-z]\.com\/[A-Za-z0-9_\-]+)/,
            host: /(?:[A-Za-z0-9.]+)?lanzou[a-z]\.com/,
            input: ['#pwd'],
            button: ['.passwddiv-btn', '#sub'],
            name: '蓝奏云',
            storage: 'hash'
        },
        tianyi: {
            reg: /((?:https?:\/\/)?cloud\.189\.cn\/(?:t\/|web\/share\?code=)?[A-Za-z0-9]+)/,
            host: /cloud\.189\.cn/,
            input: ['.access-code-item #code_txt'],
            button: ['.access-code-item .visit'],
            name: '天翼云',
            storage: 'hash'
        },
        caiyun: {
            reg: /((?:https?:\/\/)?caiyun\.139\.com\/m\/i\?[A-Za-z0-9]+)/,
            host: /caiyun\.139\.com/,
            input: ['.token-form input[type=text]'],
            button: ['.token-form .btn-token'],
            name: '和彩云',
            storage: 'local',
            storagePwdName: 'tmp_caiyun_pwd'
        },
        xunlei: {
            reg: /((?:https?:\/\/)?pan\.xunlei\.com\/s\/[\w-]{10,})/,
            host: /pan\.xunlei\.com/,
            input: ['.pass-input-wrap .td-input__inner'],
            button: ['.pass-input-wrap .td-button'],
            name: '迅雷云盘',
            storage: 'hash'
        },
        '123pan': {
            reg: /((?:https?:\/\/)?www\.123pan\.com\/s\/[\w-]{6,})/,
            host: /www\.123pan\.com/,
            input: ['.ca-fot input'],
            button: ['.ca-fot button'],
            name: '123云盘',
            storage: 'hash'
        },
        'huang1111': {
            reg: /((?:https?:\/\/)?pan\.huang1111\.cn\/s\/[A-Za-z0-9]+)/，
            host: /pan\.huang1111\.cn/,
            input: ['#pwd'],
            button: ['.jss168'],
            name: 'huang1111网盘',
            storage: 'hash'
        },
    };

    let main = {
        lastText: "lorem&",

        //初始化配置数据
        initValue() {
            let value = [{
                name: 'setting_success_times',
                value: 0
            }, {
                name: 'setting_auto_click_btn',
                value: true
            }, {
                name: 'setting_active_in_front',
                value: true
            }, {
                name: 'setting_timer_open',
                value: false
            }, {
                name: 'setting_timer',
                value: 5000
            }];

            value.forEach((v) => {
                if (util.getValue(v.name) === undefined) {
                    util.setValue(v.name, v.value);
                }
            });
        },

        // 监听选择事件
        addPageListener() {
            document.addEventListener("mouseup", this.smartIdentify.bind(this), true);
        },

        smartIdentify() {
            let selection = window.getSelection();
            let text = selection.toString();
            if (text !== this.lastText && text !== '') { //选择相同文字或空不识别
                let start = performance.now();
                this.lastText = text;
                //util.clog(`当前选中文字：${text}`);
                let linkObj = this.parseLink(text);
                let link = linkObj.link;
                let name = linkObj.name;
                let pwd = this.parsePwd(text);
                if (!link) {
                    linkObj = this.parseParentLink(selection);
                    link = linkObj.link;
                    name = linkObj.name;
                }
                if (link) {
                    if (!/https?:\/\//.test(link)) {
                        link = 'https://' + link;
                    }
                    let end = performance.now();
                    let time = (end - start).toFixed(3);
                    util.clog(`文本识别结果：${name} 链接：${link} 密码：${pwd} 耗时：${time}毫秒`);
                    let option = {
                        toast: true,
                        showCancelButton: true,
                        position: 'top',
                        title: `发现<span style="color: #2778c4;margin: 0 5px;">${name}</span>链接`,
                        html: `<span style="font-size: 0.8em;">${!!pwd ? '密码：' + pwd : '是否打开？'}</span>`,
                        confirmButtonText: '打开',
                        cancelButtonText: '关闭',
                        customClass
                    };
                    if (util.getValue('setting_timer_open')) {
                        option.timer = util.getValue('setting_timer');
                        option.timerProgressBar = true;
                    }
                    util.setValue('setting_success_times', util.getValue('setting_success_times') + 1);

                    Swal.fire(option).then((res) => {
                        this.lastText = 'lorem&';
                        selection.empty();
                        if (res.isConfirmed || res.dismiss === 'timer') {
                            if (name === '和彩云') {  //和彩云无法携带参数和Hash
                                util.setValue('tmp_caiyun_pwd', pwd);
                            }
                            let active = util.getValue('setting_active_in_front');
                            if (pwd) {
                                let extra = `${link}?pwd=${pwd}#${pwd}`;
                                if (~link.indexOf('?')) {
                                    extra = `${link}&pwd=${pwd}#${pwd}`;
                                }
                                GM_openInTab(extra, {active});
                            } else {
                                GM_openInTab(`${link}`, {active});
                            }
                        }
                    });
                }
            }
        },

        //正则解析网盘链接
        parseLink(text = '') {
            let obj = {name: '', link: ''};
            if (text) {
                text = text.replace(/[点點]/g, '.');
                text = text.replace(/[\u4e00-\u9fa5\u200B()（）,，]/g, '');
                text = text.replace(/lanzous/g, 'lanzouw'); //修正lanzous打不开的问题
                for (let name in opt) {
                    let val = opt[name];
                    if (val.reg.test(text)) {
                        let matches = text.match(val.reg);
                        obj.name = val.name;
                        obj.link = matches[0];
                        return obj;
                    }
                }
            }
            return obj;
        },

        //正则解析超链接类型网盘链接
        parseParentLink(selection) {
            let anchorNode = selection.anchorNode.parentElement.href;
            let focusNode = selection.focusNode.parentElement.href;
            if (anchorNode) return this.parseLink(anchorNode);
            if (focusNode) return this.parseLink(focusNode);
            return this.parseLink();
        },

        //正则解析提取码
        parsePwd(text) {
            text = text.replace(/\u200B/g, '');
            let reg = /(?<=\s*(密|提取|访问|訪問|key|password|pwd|#)[码碼]?[：:=]?\s*)[A-Za-z0-9]{3,8}/i;
            if (reg.test(text)) {
                let match = text.match(reg);
                return match[0];
            }
            return '';
        },

        //根据域名检测网盘类型
        panDetect() {
            let hostname = location.hostname;
            for (let name in opt) {
                let val = opt[name];
                if (val.host.test(hostname)) {
                    return name;
                }
            }
            return '';
        },

        //自动填写密码
        autoFillPassword() {
            let url = location.href;
            let query = util.parseQuery('pwd');
            let hash = location.hash.slice(1);
            let pwd = query || hash;
            let panType = this.panDetect();

            for (let name in opt) {
                let val = opt[name];
                if (panType === name) {
                    if (val.storage === 'local') {
                        pwd = util.getValue(val.storagePwdName) ? util.getValue(val.storagePwdName) : '';
                        pwd && this.doFillAction(val.input, val.button, pwd);
                    }
                    if (val.storage === 'hash') {
                        if (!/^[A-Za-z0-9]{3,8}$/.test(pwd)) { //过滤掉不正常的Hash
                            return;
                        }
                        pwd && this.doFillAction(val.input, val.button, pwd);
                    }
                }
            }
        },

        doFillAction(inputSelector, buttonSelector, pwd) {
            let maxTime = 10;
            let ins = setInterval(async () => {
                maxTime--;
                let input = document.querySelector(inputSelector[0]) || document.querySelector(inputSelector[1]);
                let button = document.querySelector(buttonSelector[0]) || document.querySelector(buttonSelector[1]);

                if (input && !util.isHidden(input)) {
                    clearInterval(ins);
                    Swal.fire({
                        toast: true,
                        position: 'top',
                        showCancelButton: false,
                        showConfirmButton: false,
                        title: 'AI已识别到密码！正自动帮您填写',
                        icon: 'success',
                        timer: 2000,
                        customClass
                    });

                    let lastValue = input.value;
                    input.value = pwd;
                    //Vue & React 触发 input 事件
                    let event = new Event('input', {bubbles: true});
                    let tracker = input._valueTracker;
                    if (tracker) {
                        tracker.setValue(lastValue);
                    }
                    input.dispatchEvent(event);

                    if (util.getValue('setting_auto_click_btn')) {
                        await util.sleep(1000); //1秒后点击按钮
                        button.click();
                    }
                } else {
                    maxTime === 0 && clearInterval(ins);
                }
            }, 800);
        },

        registerMenuCommand() {
            GM_registerMenuCommand('👀 已识别：' + util.getValue('setting_success_times') + '次', () => {
                Swal.fire({
                    showCancelButton: true,
                    title: '确定要重置识别次数吗？',
                    icon: 'warning',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass
                }).then((res) => {
                    this.lastText = 'lorem&';
                    if (res.isConfirmed) {
                        util.setValue('setting_success_times', 0);
                        history.go(0);
                    }
                });
            });
            GM_registerMenuCommand('⚙️ 设置', () => {
                let html = `<div style="font-size: 1em;">
                              <label class="panai-setting-label">填写密码后自动提交<input type="checkbox" id="S-Auto" ${util.getValue('setting_auto_click_btn') ? 'checked' : ''} class="panai-setting-checkbox"></label>
                              <label class="panai-setting-label">前台打开网盘标签页<input type="checkbox" id="S-Active" ${util.getValue('setting_active_in_front') ? 'checked' : ''} 
                              class="panai-setting-checkbox"></label>
                              <label class="panai-setting-label">倒计时结束自动打开<input type="checkbox" id="S-Timer-Open" ${util.getValue('setting_timer_open') ? 'checked' : ''} class="panai-setting-checkbox"></label>
                              <label class="panai-setting-label" id="Panai-Range-Wrapper" style="${util.getValue('setting_timer_open') ? '' : 'display: none'}"><span>倒计时 <span id="Timer-Value">（${util.getValue('setting_timer') / 1000}秒）</span></span><input type="range" id="S-Timer" min="0" max="10000" step="500" value="${util.getValue('setting_timer')}" style="width: 200px;"></label>
                            </div>`;
                Swal.fire({
                    title: '识别助手配置',
                    html,
                    icon: 'info',
                    showCloseButton: true,
                    confirmButtonText: '保存',
                    footer: '<div style="text-align: center;font-size: 1em;">点击查看 <a href="https://www.youxiaohou.com/tool/install-panai.html" target="_blank">使用说明</a>，助手免费开源，<a href="https://www.youxiaohou.com/tool/install-panai.html">检查更新</a><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M445.956 138.812L240.916 493.9c-11.329 19.528-12.066 44.214 0 65.123 12.067 20.909 33.898 32.607 56.465 32.607h89.716v275.044c0 31.963 25.976 57.938 57.938 57.938h134.022c32.055 0 57.938-25.975 57.938-57.938V591.63h83.453c24.685 0 48.634-12.803 61.806-35.739 13.172-22.844 12.343-50.016 0-71.386l-199.42-345.693c-13.633-23.58-39.24-39.516-68.44-39.516-29.198 0-54.897 15.935-68.438 39.516z" fill="#d81e06"/></svg></div>',
                    customClass
                }).then((res) => {
                    res.isConfirmed && history.go(0);
                });

                document.getElementById('S-Auto').addEventListener('change', (e) => {
                    util.setValue('setting_auto_click_btn', e.target.checked);
                });
                document.getElementById('S-Active').addEventListener('change', (e) => {
                    util.setValue('setting_active_in_front', e.target.checked);
                });
                document.getElementById('S-Timer-Open').addEventListener('change', (e) => {
                    let rangeWrapper = document.getElementById('Panai-Range-Wrapper');
                    e.target.checked ? rangeWrapper.style.display = 'flex' : rangeWrapper.style.display = 'none';
                    util.setValue('setting_timer_open', e.target.checked);
                });
                document.getElementById('S-Timer').addEventListener('change', (e) => {
                    util.setValue('setting_timer', e.target.value);
                    document.getElementById('Timer-Value').innerText = `（${e.target.value / 1000}秒）`;
                });
            });
        },

        addPluginStyle() {
            let style = `
                .panai-container { z-index: 99999!important }
                .panai-popup { font-size: 14px !important }
                .panai-setting-label { display: flex;align-items: center;justify-content: space-between;padding-top: 20px; }
                .panai-setting-checkbox { width: 16px;height: 16px; }
            `;

            if (document.head) {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('panai-style', 'style', style);
            }

            const headObserver = new MutationObserver(() => {
                util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                util.addStyle('panai-style', 'style', style);
            });
            headObserver.observe(document.head, {childList: true, subtree: true});
        },

        isTopWindow() {
            return window.self === window.top;
        },

        init() {
            this.initValue();
            this.addPluginStyle();
            this.autoFillPassword();
            this.addPageListener();
            this.isTopWindow() && this.registerMenuCommand();
        },
    };

    main.init();
})();

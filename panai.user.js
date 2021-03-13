// ==UserScript==
// @name              网盘智能识别助手
// @namespace         https://github.com/syhyz1990/panAI
// @version           1.0.5
// @author            YouXiaoHou
// @icon              https://www.baiduyun.wiki/panai.png
// @icon64            https://www.baiduyun.wiki/panai.png
// @description       AI智能识别选中文字中的【网盘链接】和【提取码】，识别成功打开网盘链接并自动填写提取码，省去手动复制提取码在输入的烦恼。支持百度网盘，腾讯微云，蓝奏云，天翼云，和彩云。
// @license           AGPL
// @homepage          https://www.baiduyun.wiki/tool/install-panai.html
// @supportURL        https://github.com/syhyz1990/panAI
// @updateURL         https://www.baiduyun.wiki/panai.user.js
// @downloadURL       https://www.baiduyun.wiki/panai.user.js
// @match             *://*/*
// @require           https://cdn.jsdelivr.net/npm/sweetalert2@10.15.5/dist/sweetalert2.all.min.js
// @noframes
// @run-at            document-end
// @grant             GM_openInTab
// @grant             unsafeWindow
// @grant             GM_info
// @grant             GM_addStyle
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_registerMenuCommand
// ==/UserScript==

(function () {
    'use strict';

    const scriptInfo = GM_info.script;
    const version = scriptInfo.version;

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
        }
    };

    let opt = {
        baidu: {
            reg: /((?:https?:\/\/)?(?:yun|pan)\.baidu\.com\/(?:s\/\w*(((-)?\w*)*)?|share\/\S*))/,
            host: /(pan|yun)\.baidu\.com/,
            input: ['#accessCode'],
            button: ['#submitBtn'],
            name: '百度网盘',
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
            reg: /((?:https?:\/\/)?(?:[A-Za-z0-9\-]+)\.lanzou[six]\.com\/[A-Za-z0-9]+)/,
            host: /(?:[A-Za-z0-9]+)\.lanzou[six]\.com/,
            input: ['#pwd'],
            button: ['.passwddiv-btn', '#sub'],
            name: '蓝奏云',
            storage: 'hash'
        },
        tianyi: {
            reg: /((?:https?:\/\/)?cloud\.189\.cn\/t\/[A-Za-z0-9]+)/,
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
    };

    let main = {
        lastText: "lorem&",

        init() {
            this.initValue();
            this.autoFillPassword();
            this.addPageListener();
            this.registerMenuCommand();
        },

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
            let selection = unsafeWindow.getSelection();
            let text = selection.toString();
            if (text !== this.lastText && text !== '') { //选择相同文字或空不识别
                let start = performance.now();
                this.lastText = text;
                //util.clog(`当前选中文字：${text}`);
                let linkObj = this.parseLink(text);
                let link = linkObj.link;
                let name = linkObj.name;
                let pwd = this.parsePwd(text);

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
                        text: '是否打开？',
                        confirmButtonText: '打开',
                        cancelButtonText: '关闭'
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
                            if (pwd) {
                                let extra = `${link}?pwd=${pwd}#${pwd}`;
                                if (~link.indexOf('?')) {
                                    extra = `${link}&pwd=${pwd}#${pwd}`;
                                }
                                GM_openInTab(extra, {active: util.getValue('setting_active_in_front')});
                            } else {
                                GM_openInTab(`${link}`, {active: util.getValue('setting_active_in_front')});
                            }
                        }
                    });
                }
            }
        },

        //正则解析网盘链接
        parseLink(text) {
            let obj = {name: '', link: ''};
            for (let name in opt) {
                let val = opt[name];
                if (val.reg.test(text)) {
                    let matches = text.match(val.reg);
                    obj.name = val.name;
                    obj.link = matches[0];
                    return obj;
                }
            }
            return obj;
        },

        //正则解析提取码
        parsePwd(text) {
            let reg = /(?<=\s*(密|提取|访问|密|提取|訪問|key|password)[码碼]?[：:]?\s*)[A-Za-z0-9]{3,8}/i;
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

            if (!/^[A-Za-z0-9]{3,8}$/.test(pwd)) { //过滤掉不正常的Hash
                return;
            }

            let panType = this.panDetect();

            for (let name in opt) {
                let val = opt[name];
                if (panType === name) {
                    if (val.storage === 'local') {
                        pwd = util.getValue(val.storagePwdName) ? util.getValue(val.storagePwdName) : '';
                        if (pwd) {
                            this._doFillAction(val.input, val.button, pwd);
                        }
                    }
                    if (val.storage === 'hash') {
                        if (pwd) {
                            this._doFillAction(val.input, val.button, pwd);
                        }
                    }
                }
            }
        },

        _doFillAction(inputSelector, buttonSelector, pwd) {
            let maxTime = 10;
            let ins = setInterval(() => {
                maxTime--;
                let input = document.querySelector(inputSelector[0]) || document.querySelector(inputSelector[1]);
                let button = document.querySelector(buttonSelector[0]) || document.querySelector(buttonSelector[1]);
                if (input) {
                    clearInterval(ins);
                    Swal.fire({
                        toast: true,
                        position: 'top',
                        showCancelButton: false,
                        showConfirmButton: false,
                        title: '识别到密码！已自动帮您填写',
                        icon: 'success',
                        timer: 1500,
                    });
                    input.value = pwd;
                    input.dispatchEvent(new Event('input'));
                    if (util.getValue('setting_auto_click_btn')) {
                        button.click();
                    }
                } else {
                    if (maxTime === 0) {
                        clearInterval(ins);
                    }
                }
            }, 800);
        },

        registerMenuCommand() {
            GM_registerMenuCommand('已识别：' + util.getValue('setting_success_times') + '次', () => {
                this.addStyle();
                Swal.fire({
                    showCancelButton: true,
                    title: '确定要重置统计次数吗？',
                    icon: 'warning',
                    text: '点击确定页面刷新后将重新统计',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then((res) => {
                    this.lastText = 'lorem&';
                    if (res.isConfirmed) {
                        util.setValue('setting_success_times', 0);
                    }
                });
            });
            GM_registerMenuCommand('设置', () => {
                this.addStyle();
                let dom = '';
                if (util.getValue('setting_auto_click_btn')) {
                    dom += '<label style="display: flex;align-items: center;justify-content: space-between;padding-top: 20px;">填写网盘密码后自动提交<input type="checkbox" id="S-Auto" checked style="width: 16px;height: 16px;"></label>';
                } else {
                    dom += '<label style="display: flex;align-items: center;justify-content: space-between;padding-top: 20px;">填写网盘密码后自动提交<input type="checkbox" id="S-Auto" style="width: 16px;height: 16px;"></label>';
                }
                if (util.getValue('setting_active_in_front')) {
                    dom += '<label style="display: flex;align-items: center;justify-content: space-between;padding-top: 20px;">前台打开并激活网盘标签页<input type="checkbox" id="S-Active" checked style="width: 16px;height: 16px;"></label>';
                } else {
                    dom += '<label style="display: flex;align-items: center;justify-content: space-between;padding-top: 20px;">前台打开并激活网盘标签页<input type="checkbox" id="S-Active" style="width: 16px;height: 16px;"></label>';
                }
                if (util.getValue('setting_timer_open')) {
                    dom += '<label style="display: flex;align-items: center;justify-content: space-between;padding-top: 20px;">倒计时结束后自动打开链接 <input type="checkbox" id="S-Timer-Open" checked style="width: 16px;height: 16px;"></label>';
                } else {
                    dom += '<label style="display: flex;align-items: center;justify-content: space-between;padding-top: 20px;">倒计时结束后自动打开链接 <input type="checkbox" id="S-Timer-Open" style="width: 16px;height: 16px;"></label>';
                }
                dom += `<label style="display: flex;align-items: center;justify-content: space-between;padding-top: 20px;"><span>倒计时 <span id="Timer-Value">（${util.getValue('setting_timer') / 1000}秒）</span></span><input type="range" id="S-Timer" min="500" max="10000" step="500" value="${util.getValue('setting_timer')}" style="width: 200px;"></label>`;
                dom = '<div style="font-size: 1em;">' + dom + '</div>';
                Swal.fire({
                    title: '助手配置',
                    html: dom,
                    icon: 'info',
                    showCloseButton: true,
                    confirmButtonText: '保存',
                    footer: '<div style="font-size: 1em;"><div style="text-align: center;">点击这里查看 <a href="https://www.baiduyun.wiki/tool/install-panai.html" target="_blank">使用说明</a>，助手免费开源</div><div style="margin-top: 5px;font-size: 0.8em;text-align: center;color: #999;">（如果配置界面出现错乱，请刷新网页后重新打开）</div></div>',
                    customClass: {
                        container: 'panai-container',
                        popup: 'panai-popup',
                        header: 'panai-header',
                        title: 'panai-title',
                        closeButton: 'panai-close',
                        icon: 'panai-icon',
                        image: 'panai-image',
                        content: 'panai-content',
                        htmlContainer: 'panai-html',
                        input: 'panai-input',
                        inputLabel: 'panai-inputLabel',
                        validationMessage: 'panai-validation',
                        actions: 'panai-actions',
                        confirmButton: 'panai-confirm',
                        denyButton: 'panai-deny',
                        cancelButton: 'panai-cancel',
                        loader: 'panai-loader',
                        footer: 'panai-footer'
                    },
                }).then((res) => {
                    if (res.isConfirmed) {
                        history.go(0);
                    }
                });

                document.getElementById('S-Auto').addEventListener('change', (e) => {
                    util.setValue('setting_auto_click_btn', e.currentTarget.checked);
                });
                document.getElementById('S-Active').addEventListener('change', (e) => {
                    util.setValue('setting_active_in_front', e.currentTarget.checked);
                });
                document.getElementById('S-Timer-Open').addEventListener('change', (e) => {
                    util.setValue('setting_timer_open', e.currentTarget.checked);
                });
                document.getElementById('S-Timer').addEventListener('change', (e) => {
                    util.setValue('setting_timer', e.target.value);
                    document.getElementById('Timer-Value').innerText = `（${e.target.value / 1000}秒）`;
                });
            });

            GM_registerMenuCommand(`检查更新：v${version}`, () => {
                GM_openInTab('https://www.baiduyun.wiki/panai.user.js', {active: true});
            });
        },

        //部分网站弹出框错乱处理
        addStyle() {
            GM_addStyle(`.panai-popup { font-size: 14px !important; } }`);
        }
    };

    main.init();
})();

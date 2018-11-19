/**
 * 框架中常用的工具方法
 */
const modal = weex.requireModule('modal');
const animation = weex.requireModule('animation');
const navigator = weex.requireModule('navigator');
const navigatorEx = weex.requireModule("NavigatorExModule");
const stream = weex.requireModule('stream');


import util from './util.js';

const buiweex = {
    /**
     * 吐司信息
     * @param msg {string} 提示文本
     */
    toast(msg) {
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        modal.toast({
            message: msg || "",
            duration: 1
        });
    },

    /**
     * 弹出警告
     * @param msg {string} 提示文本
     * @param callback {function} 点击确定后回调函数
     * @param option {object} 参数
     * @param option.okTitle {string} 确定按钮文本
     */
    alert(msg, callback, option) {
        let okTitle = "确定";
        if (option) {
            if (option.okTitle)
                okTitle = option.okTitle;
        }
        if (typeof msg !== 'string') {
            msg = JSON.stringify(msg);
        }
        modal.alert({
            message: msg || "",
            duration: 1,
            okTitle: okTitle
        }, value => {
            callback && callback(value);
        });
    },

    /**
     * 弹出确认框
     * @param msg {string} 提示文本
     * @param callback {function} 点击确定/取消后回调函数
     * @param option {object} 参数
     * @param option.okTitle {string} 确定按钮文本
     * @param option.cancelTitle {string} 取消按钮文本
     */
    confirm(msg, callback, option) {
        let okTitle = "确定",
            cancelTitle = "取消";
        if (option) {
            if (option.okTitle)
                okTitle = option.okTitle;
            if (option.cancelTitle)
                cancelTitle = option.cancelTitle;
        }
        modal.confirm({
            message: msg || "",
            duration: 0.4,
            okTitle: okTitle,
            cancelTitle: cancelTitle,
        }, value => {
            callback && callback(value);
        });
    },

    /**
     * 显示一个组件（可设置动画）
     * @param params
     * @param callback
     */
    show(params, callback) {
        let el = params.id;
        if (!el) {
            return;
        }
        let duration = params.duration;
        let transform = params.transform || 'translate(0, 0)';
        let transformOrigin = params.transformOrigin || 'center center';
        let timingFunction = params.timingFunction || 'ease';

        animation.transition(el, {
            styles: {
                opacity: '1',
                transform: transform,
                transformOrigin: transformOrigin
            },
            duration: duration || 0,
            timingFunction: timingFunction,
            delay: 0
        }, () => {
            callback && callback();
        });
    },

    /**
     * 隐藏一个组件(可设置动画)
     * @param params
     * @param callback
     */
    hide(params, callback) {
        let el = params.id;
        if (!el) {
            return;
        }
        let duration = params.duration;
        let transform = params.transform || 'translate(0, 0)';
        let transformOrigin = params.transformOrigin || 'center center';
        let timingFunction = params.timingFunction || 'ease';
        animation.transition(el, {
            styles: {
                opacity: '0',
                transform: transform,
                transformOrigin: transformOrigin
            },
            duration: duration || 0,
            timingFunction: timingFunction,
            delay: 0
        }, () => {
            callback && callback();
        });
    },

    /**
     * 获取当前上下文路径
     * @return {string} 当前上下文路径
     */
    getContextPath() {
        let url = weex.config.bundleUrl;
        if (url.indexOf('?') > 0) {
            url = url.substring(0, url.indexOf('?'));
        }
        if (weex.config.env.platform === 'Web' && url.indexOf('/index.html') === -1) {
            return url;
        }
        url = url.split('/').slice(0, -1).join('/');
        return url;
    },

    /**
     * 加载一个新的页面(bundleJS)
     * @method push
     * @param url {string} bundle js 地址
     * @param params {object} 传递的参数
     */
    push(url, params, callback) {
        let paramsStr = "";
        let _this = buiweex;
        if (params) {
            for (let key in params) {
                paramsStr += key + "=" + encodeURIComponent(params[key]) + "&";
            }
        }
        if (url.indexOf('?') < 0 && paramsStr != "") {
            url += "?";
        }
        url += paramsStr;
        //link平台中使用navigatorEx,playground中使用navigator
        try {
            if (url.indexOf('http') == 0 || url.indexOf('file') == 0) navigatorEx.push(url);
            else {
                url = _this.getContextPath() + '/' + url;
                navigatorEx.push(url);
            }
        } catch (ex) {
            if (url.indexOf('http') == 0 || url.indexOf('file') == 0) {
                navigator.push({
                    url: url,
                    animated: 'true'
                }, callback);
            } else {
                url = _this.getContextPath() + '/' + url;
                navigator.push({
                    url: url,
                    animated: 'true'
                }, callback);
            }
        }
    },

    /**
     * 返回上个页面
     * @method pop
     * @param options {object} 配置参数
     * @param options.animated {bool} 是否需要过渡动画，默认true
     * @param options.level {int} 返回层级，默认1
     * @param callback {function} 回调函数
     */
    pop(callback, options) {
        options = options || {};
        navigator.pop({
            animated: options.animated || 'true',
            level: options.level || 1
        }, callback);
    },

    /**
     * 退出当前轻应用
     * @param options {object} 配置参数
     */
    close(options) {
        options = options || {};
        try {
            navigatorEx.close();
        } catch (ex) {
            navigator.close({
                animated: options.animated || "true"
            });
        }
    },

    /**
     * 获取页面参数(bundleJS),从url查询参数中获取
     * @method getPageParams
     * @return {object} 返回json数据
     */
    getPageParams() {
        let params = {};
        let url = weex.config.bundleUrl;
        let index = url.indexOf("?");
        if (index > 0) {
            let query = url.substring(index + 1);
            let temp = query.split('&');
            let key, value;
            for (var p in temp) {
                if (temp[p]) {
                    key = temp[p].split('=')[0];
                    value = temp[p].split('=')[1];
                    params[key] = decodeURIComponent(value);
                }
            }
        }
        return params;
    },

    /**
     * 发送POST请求
     * @method post
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头, Content-Type默认值是 application/x-www-form-urlencoded
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，带到 HTTP body中
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
    post(params) {
        let url = params.url || "";
        let headers = params.headers || {};
        let data = params.data;
        let type = params.type || "json";
        if (typeof data == "object") {
            data = JSON.stringify(data);
        }
        // headers["Content-Type"]="application/x-www-form-urlencoded";
        // headers["Content-Type"]="application/json";
        return new Promise((resolve, reject) => {
            stream.fetch({
                method: "POST",
                type: type,
                url: url,
                headers: headers,
                body: data
            }, (res) => {
                if (res.status >= 200 && res.status <= 299) {
                    resolve(res.data, res.status, res.statusText, res);
                } else {
                    reject(res.status, res.statusText);
                }
            });
        });
    },

    /**
     * 发送GET请求
     * @method get
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，自动拼接到url后面
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
    get(params) {
        return new Promise((resolve, reject) => {
            let url = params.url || "";
            let headers = params.headers || {};
            let data = params.data || {};
            let type = params.type || "json";
            if (!url.includes("?")) {
                url += "?";
            }
            if (typeof data == "object") {
                let dLength = Object.keys(data).length;
                for (let i = 0; i < dLength; i++) {
                    let key = Object.keys(data)[i];
                    let value = encodeURIComponent(data[key]);
                    url += `${key}=${value}`;
                    if (i != dLength - 1) {
                        url += "&";
                    }
                }
            }
            stream.fetch({
                method: "GET",
                type: type,
                url: url,
                headers: headers
            }, (res) => {
                if (res.status >= 200 && res.status <= 299) {
                    resolve(res.data, res.status, res.statusText, res);
                } else {
                    reject(res.status, res.statusText);
                }
            });
        });
    },

    /**
     * 适配viewport
     */
    fixViewport() {
        let _this = buiweex;
        const meta = weex.requireModule('meta');
        let width = 750;

        if (util.isIPad()) {
            _this.alert(122);
            width = 1280;
        }

        meta.setViewport({
            width: width
        });
    },

    install(Vue, options) {
        let that = buiweex;

        Vue.prototype.$alert = that.alert;

        Vue.prototype.$toast = that.toast;

        Vue.prototype.$confirm = that.confirm;

        Vue.prototype.$show = that.show;

        Vue.prototype.$hide = that.hide;

        Vue.prototype.$getContextPath = that.getContextPath;

        Vue.prototype.$push = that.push;

        Vue.prototype.$pop = that.pop;

        Vue.prototype.$close = that.close;

        Vue.prototype.$getPageParams = that.getPageParams;

        Vue.prototype.$post = that.post;

        Vue.prototype.$get = that.get;

        Vue.prototype.$formatDate = util.formatDate;

        Vue.prototype.$isIPad = util.isIPad();

        Vue.prototype.$isIPhoneX = util.isIPhoneX();

        Vue.prototype.$isIPhone = util.isIPhone();

        Vue.prototype.$isAndroid = util.isAndroid();

        Vue.prototype.$fixStyle = util.fixStyle();

    }
}

export default buiweex
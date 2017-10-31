/**
 * 框架中常用的工具方法
 */

const modal = weex.requireModule('modal');
const animation = weex.requireModule('animation');
const navigator = weex.requireModule('navigator');
const navigatorEx = weex.requireModule("NavigatorExModule");
const ajax = require("./ajax.js");
const linkapi = require("./linkapi.js");

let common = {
    //components下的组件
    "buiActionSheet": require("../components/bui-actionsheet.vue"),
    "buiButton": require("../components/bui-button.vue"),
    "buiCheckbox": require("../components/bui-checkbox.vue"),
    "buiDialog": require("../components/bui-dialog.vue"),
    "buiDropdown": require("../components/bui-dropdown.vue"),
    "buiHeader": require("../components/bui-header.vue"),
    "buiIcon": require("../components/bui-icon.vue"),
    "buiImage": require("../components/bui-image.vue"),
    "buiLazyRender": require("../components/bui-lazy-render.vue"),
    "buiLoad": require("../components/bui-load.vue"),
    "buiMask": require("../components/bui-mask.vue"),
    "buiPanel": require("../components/bui-panel.vue"),
    "buiRadio": require("../components/bui-radio.vue"),
    "buiSearchbarCenter": require("../components/bui-searchbar-center.vue"),
    "buiSearchbarLeft": require("../components/bui-searchbar-left.vue"),
    "buiSliderBar": require("../components/bui-slider-bar.vue"),
    "buiSwitch": require("../components/bui-switch.vue"),
    "buiTabbar": require("../components/bui-tabbar.vue"),
    "buiTabbarItem": require("../components/bui-tabbar-item.vue"),
    "buiTabbarItemA": require("../components/bui-tabbar-item-a.vue"),
    "buiTabbarScroll": require("../components/bui-tabbar-scroll.vue"),
    "buiTabbarScrollItem": require("../components/bui-tabbar-scroll-item.vue"),
    "buiTip": require("../components/bui-tip.vue"),
    "buiVideo": require("../components/bui-video.vue"),
    "buiContent": require("../components/bui-content.vue"),
    "buiContentScroll": require("../components/bui-content-scroll.vue"),
    "buiImageSlider": require("../components/bui-image-slider.vue"),
    "linkapi": linkapi, //link平台api
    toast(msg) {
        modal.toast({
            message: msg,
            duration: 0.4
        });
    },
    alert(msg, callback, option) {
        let okTitle = "确定";
        if (option) {
            if (option.okTitle)
                okTitle = option.okTitle;
        }
        modal.alert({
            message: msg,
            duration: 0.4,
            okTitle: okTitle
        }, value => {
            callback && callback(value);
        });
    },
    confirm(msg, callback, option) {
        let okTitle = "确定", cancelTitle = "取消";
        if (option) {
            if (option.okTitle)
                okTitle = option.okTitle;
            if (option.cancelTitle)
                cancelTitle = option.cancelTitle;
        }
        modal.confirm({
            message: msg,
            duration: 0.4,
            okTitle: okTitle,
            cancelTitle: cancelTitle,
        }, value => {
            callback && callback(value);
        });
    },
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
    getContextPath() {
        let url;
        let bundleUrl = weex.config.bundleUrl;
        url = bundleUrl.split('/').slice(0, -1).join('/');
        return url;
    },
    push(url, params) {
        let paramsStr = "";
        if (params) {
            for (let key in params) {
                paramsStr += key + "=" + encodeURIComponent(params[key]) + "&";
            }
        }
        if (url.indexOf('?') < 0) {
            url += "?";
        }
        url += paramsStr;
        //link平台中使用navigatorEx,debugtool中使用navigator
        try {
            navigatorEx.push(url);
        } catch (ex) {
            navigator.push({
                url: url,
                animated: 'true'
            }, e => {
            });
        }
    },
    pop() {
        navigator.pop({
            animated: 'true'
        }, e => {
        });
    },
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
    post(params){
        return ajax.post(params);
    },
    get(params){
        return ajax.get(params);
    }
}

module.exports = common;
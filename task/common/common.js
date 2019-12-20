const USER_CONFIG = 'user'
const USER_TOKEN_CONFIG = 'user_token'
const USER_EXPIRE_CONFIG = 'token_expire'
const SYSTEM_CONFIG = 'system'

// 封装的model显示模态弹窗(提示框信息),类似于html的alert
const modal = (content, title = '', success = null, fail = true, complete = null) => {
    if (!title && title !== null) {
        title = '提示'
    }
    uni.showModal({
        title: title,
        content: content,
        showCancel: fail,
        success: success,
        fail: (typeof fail === "function") ? fail : null,
        complete: complete
    });
}

// 封装的msg状态提示信息
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
    //统一提示方便全局修改
    if (Boolean(title) === false) {
        return;
    }
    uni.showToast({
        title,
        duration,
        mask,
        icon
    });
}

// 获取用户的登录状态
const getUserToken = () => {
    try {
        const user_token = uni.getStorageSync(USER_TOKEN_CONFIG);
        const token_expire = uni.getStorageSync(USER_EXPIRE_CONFIG) || 0;
        if (user_token && token_expire && token_expire > (Date.parse(new Date()) / 1000)) {
            return user_token
        }
    } catch (e) {
    }
    return ''
}
// 设置用户的登录信息
const login = (data) => {
    try {
		// 在本地缓存中获取数据修改原始的内容
        uni.setStorageSync(USER_CONFIG, data)
        uni.setStorageSync(USER_TOKEN_CONFIG, data.user_token)
        uni.setStorageSync(USER_EXPIRE_CONFIG, data.expire)//data.expire-用户数据到期
    } catch (e) {
        return false
    }
    return true
}

/**
 *
 * @param params
 * @param value
 * @param name
 * @param refresh   true 情况并更新 false 更新保留原数据
 * @returns {boolean}
 */
// 更改指定配置文件中指定配置键的值
const setConfig = (params, value = '', name = USER_CONFIG, refresh = false) => {
    try {
        var data = ''
        if (false === refresh) {
			//uni.getStorageSync(name) 在本地缓存中同步获取指定 name 的值并保存
            data = uni.getStorageSync(name);
        }
		
		// 判断并保存
        if (typeof params == 'object') {
            if (data == '') {
                data = params
            } else {
                data = {}
                for (let i in params) {
                    data[i] = params[i]
                }
            }
        } else {
            data[params] = value
        }
		// 将 data 存储在本地缓存中指定的 name 中，会覆盖掉原来该 name 对应的内容，这是一个同步接口
        uni.setStorageSync(name, data)
    } catch (e) {
        return false
    }
    return true
}
// 获取用户的登录信息
const getConfig = (key = '', name = USER_CONFIG) => {
    try {
        var data = uni.getStorageSync(name)
        if (key == '') {
            return data
        }
        return data[key] || ''
    } catch (e) {
        return ''
    }
}

/**
 * 退出公会
 * @returns {boolean}
 */
const logoutGuild = () => {
    try {
        setConfig({
            'guild_id' : 0,
        })
    } catch (e) {
        return false
    }
    uni.redirectTo({
        url: '/pages/home'
    })
}

// 退出登录
const logout = () => {
    try {
		// uni.removeStorageSync()-在本地缓存中移除指定的用户
        uni.removeStorageSync(USER_CONFIG)
        uni.removeStorageSync(USER_TOKEN_CONFIG)
        uni.removeStorageSync(USER_EXPIRE_CONFIG)
    } catch (e) {
        return false
    }

    setTimeout(()=>{
		// 获取当前页面栈
        var page = getCurrentPages();
		// console.log(page);
        if (page[page.length - 1].route !== 'pages/login/login') {
            msg("请先登录")
            uni.redirectTo({
                url: '/pages/login/login'
            })
        }
    }, 1000)
}

// 手机号
const isPhone = phone => {
    var reg = /^[1][0-9]{10}$/;
    if (!reg.test(phone)) {
        return false;
    } else {
        return true;
    }
}
// 身份证
const isCard = card => {
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    if (reg.test(card)) {
        return true;
    } else {
        return false;
    }
}

// 返回错误信息
const cacheError = err => {
    var errMsg
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求参数错误';
                break
            case 401:
                err.message = '未授权,请登录';
                break
            case 403:
                err.message = '跨域拒绝访问';
                break;
            case 404:
                err.message = `请求地址出错: ${err.response.config.url}`;
                break;
            case 408:
                err.message = '请求超时';
                break;
            case 500:
                err.message = '服务器内部错误';
                break;
            case 501:
                err.message = '服务未实现';
                break;
            case 502:
                err.message = '网关错误';
                break;
            case 503:
                err.message = '服务不可用';
                break;
            case 504:
                err.message = '网关超时';
                break;
            case 505:
                err.message = 'HTTP版本不受支持';
                break;
            default:
                break;
        }
        errMsg = err.message;
    } else {
        errMsg = "请求失败，请稍后再试！";
    }
    return errMsg
}
// 
const getJSON = str => {
    if (typeof str == 'string') {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return obj;
            } else {
                return false;
            }
        } catch (e) {
            return false;
        }
    } else if (typeof str == 'Object') {
        return str;
    }

    return false
}

//引入前端加密
import CryptoJS from '@/common/crypto-js/crypto-js.js'
// 执行加密操作
const aes = (string, operation) => {
    var iv = 'MIGfMA0GCSqGSIb3';
    iv = CryptoJS.enc.Utf8.parse(iv.substring(0, 16));
    var key = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(iv).toString().substring(0, 16));
    if (operation) {
        return CryptoJS.AES.decrypt(string, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }
    return CryptoJS.AES.encrypt(string, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString();
}

const thenBefore = res => {
    if (res.data.code == undefined) {
        msg("请求错误，请稍后再试！");
        return
    }
    if (res.data.code == 1001) {
        logout();
        return;
    }
    if (res.data.code > 0) {
        msg(res.data.msg);
    }
}

/**
 * post('config/index', {name: "dagd"}, function(r){console.log(r)})
 */
// 引入封装的网络请求
import RequestHttp from '@/common/luch-request/index.js'

/**
 * 文件上传
 */
const upload = (data, success, error) => {
    var user_token = getUserToken()
    uni.showLoading({title: '上传中'})
    RequestHttp.upload('handle/upload', {
        filePath: data,
        name: 'file',
        formData: {
            user_token: user_token
        },
    }).then(res => {
        uni.hideLoading();
        thenBefore(res)
        if (typeof success == 'function') {
            success(res.data)
        }
    }).catch(err => {
        uni.hideLoading();
        var errMsg = cacheError(err)
        msg(errMsg)
        if (typeof error == 'function') {
            error(errMsg, err)
        }
    })
}

const post = (url, data = {}, success, error) => {
    var user_token = getUserToken()
    data = {
        ...data, user_token
    }
    return RequestHttp.post(url, data).then(res => {
        thenBefore(res)
        if (typeof success == 'function') {
            success(res.data)
			// console.log(res.data)
        }
    }).catch(err => {
        console.log(err)
        var errMsg = cacheError(err)
        msg(errMsg)
        if (typeof error == 'function') {
            error(errMsg, err)
        }
    })
};

const payment = (orderInfo, success, fail, provider = 'alipay') => {
    return uni.requestPayment({
        provider: provider,
        orderInfo: orderInfo,
        success: function (res) {
            if (typeof success == 'function') {
                success(res)
            }
        },
        fail: function (err) {
            if (typeof err == 'function') {
                err(err)
            }
        }
    });
}

const initUser = (func = null) => {
    if(getUserToken()) {
        post('user/info', {}, (res)=>{
            if ( res.code === 0 ) {
                login(res.data)
                if (typeof func == 'function') {
                    func()
                }
            }
        })
    }
}

const initSystem = (func = null) => {
    post('config/system', {}, res => {
        if (res.code === 0 ) {
            setConfig(res.data, '', SYSTEM_CONFIG, true)
            if (typeof func == 'function') {
                func()
            }
        }
    })
}

const initUpgrade = (func = null) => {
    // #ifdef APP-PLUS
    var req = {
        "appid": plus.runtime.appid,
        "version": plus.runtime.version
    };

    post('config/upgrade', req, (res)=>{
        if ( res.code == 0 ) {
            if ( res.data ) {
                uni.showModal({
                    title: "更新提示",
                    content: res.data.content,
                    success: (r) => {
                        if (res.data.enforce == 1) {
                            plus.runtime.openURL(res.data.url);
                        } else {
                            if (r.confirm) {
                                plus.runtime.openURL(res.data.url);
                            }
                        }
                    }
                })
            }
            if (typeof func == 'function') {
                func(res)
            }
        }
    })
    // #endif
}

const previewImage = (paths = []) => {
    uni.previewImage({
        urls: paths,
        longPressActions: {
            itemList: ['保存图片'],
            success: (data)=> {
                uni.getImageInfo({
                    src: paths[data.index],
                    success: (image)=> {
                        uni.saveImageToPhotosAlbum({
                            filePath: image.path,
                            success: ()=> {
                                msg('保存成功')
                            }
                        });
                    }
                });
            }
        }
    });
}

const uploadImage = (success = null, count = 1, size = ['compressed'], source = ['album']) => {
    uni.chooseImage({
        count: count,
        sizeType: size, //可以指定是原图还是压缩图，默认二者都有
        sourceType: source, //从相册选择
        success: (res) => {
            let limit = res.tempFilePaths.length > count ? count : res.tempFilePaths.length;
            for (let i = 0; i < limit;i++) {
                upload(res.tempFilePaths[i], data => {
                    if (data.code === 0) {
                        if (typeof success == 'function') {
                            success(data.data.path)
                        }
                    }
                })
            }
            msg('上传成功')
        }
    });
}

const isUrl = url => {
    if(url != ""){
        var reg=/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        if(reg.test(url)){
            return true;
        }
    }
    return false;
}

export default {
    USER_CONFIG,
    USER_TOKEN_CONFIG,
    USER_EXPIRE_CONFIG,
    SYSTEM_CONFIG,
    msg,
    modal,
    getUserToken,
    isPhone,
    login,
    logoutGuild,
    logout,
    getConfig,
    setConfig,
    aes,
    post,
    upload,
    getJSON,
    isCard,
    payment,
    initUpgrade,
    initUser,
    initSystem,
    previewImage,
    uploadImage,
    isUrl,
}

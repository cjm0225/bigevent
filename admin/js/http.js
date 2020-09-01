
/**
 * 封装一个http请求函数
 * @param {Object} requestObj ajax请求配置{type，url，data，dataType,success}
 */

//  ajax请求接口的ip地址
const BASE_URL = "http://localhost:8080/api/v1";

function request(requestObj) {
    // 每次请求自动获取token凭证，用于后台验证用户是否已经登录过了
    const token = window.localStorage.getItem("bigevent_token");

    // 解构所需属性,type和url,success不能为空，data根据接口需求可以为空，dataType为空时，ajax函数自动识别
    const { type, url, data, dataType, success, processData = true, contentType = 'application/x-www-form-urlencoded' } = requestObj;

    $.ajax({
        type: type,
        url: BASE_URL + url,
        data: data,
        dataType: dataType,
        processData: processData,
        contentType: contentType,
        success: success,
        // token凭证在请求头中发送到服务器
        headers: {
            Authorization: token
        },
        error: function (response) {
            // 当请求被拒绝的时候，表示未登录或者token凭证已过期
            if (response.status === 403) {
                // 清除token
                window.localStorage.removeItem("bigevent_token");
                //跳转到登录页面
                window.location.href = "./login.html";
            }
        }
    });
}
// 获取token
const token = window.localStorage.getItem("bigevent_token");

// 获取用户信息
function getUserDetail() {
    $.ajax({
        type: "get",
        headers: {
            Authorization: token
        },
        url: "http://localhost:8080/api/v1/admin/user/detail",
        success: function (response) {
            if (response.code === 200) {
                const { username, nickname, email, userPic, password } = response.data;
                $("#username").val(username);
                $("#nickname").val(nickname);
                $("#email").val(email);
                $("#password").val(password);
                $("#userPic").prop('src', userPic);
            }
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
getUserDetail();
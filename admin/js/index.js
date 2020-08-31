
// 获取token，在每次获取权限的时候验证是否已经登录过
const token = window.localStorage.getItem("bigevent_token");


function getUserinfo() {
    $.ajax({
        type: "get",
        url: "http://localhost:8080/api/v1/admin/user/info",
        headers: {
            "Authorization": token
        },
        success: function (response) {
            // console.log(response);
            const { code, msg, data } = response;
            if (code === 200) {
                $(".user_info span").text(`欢迎 ${data.nickname}`);
                $(".user_info img").prop("src", data.userPic);
                $(".user_center_link img").prop("src", data.userPic);
            }
        }

    });
}

function logout() {
    window.localStorage.removeItem("bigevent_token");
    window.location.href = "./login.html";
}
getUserinfo(); 
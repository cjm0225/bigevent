
// 获取用户信息
function getUserDetail() {
    request({
        type: "get",
        url: "/admin/user/detail",
        success: function (response) {
            if (response.code === 200) {
                const { username, nickname, email, userPic, password } = response.data;
                $("#username").val(username);
                $("#nickname").val(nickname);
                $("#email").val(email);
                $("#password").val(password);
                $("#userPic").prop("src", userPic);
            }
        },

    });
}
getUserDetail();
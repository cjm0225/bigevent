
function login() {
    const username = $("#username").val().trim();
    const password = $("#password").val().trim();
    if (username === "" || password === "") {
        $(".modal-body").html("用户名或者密码不能为空!!请检查用户名或者密码");
        $('#loginModal').modal('show');
        return;
    }
    $.ajax({
        type: "post",
        url: "http://localhost:8080/api/v1/admin/user/login",
        data: { username, password },
        success: function (response) {
            if (response.code === 200) {
                console.log(response.msg);
                // 将token存入到本地内地，方便每次获取数据库权限的时候进行权限认证
                window.localStorage.setItem("bigevent_token", response.token);
                window.location.href = "./index.html";
            } else {
                $(".modal-body").text(response.msg);
                $('#loginModal').modal('show');
            }
        }
    });

}
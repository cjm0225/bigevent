

// 获取用于信息
function getUserinfo() {
    request({
        type: "get",
        url: "/admin/user/info",
        success: function (response) {
            const { code, msg, data } = response;
            // 将数据显示到页面中
            if (code === 200) {
                $(".user_info span").text(`欢迎 ${data.nickname}`);
                $(".user_info img").prop("src", data.userPic);
                $(".user_center_link img").prop("src", data.userPic);
            }
        },

    });
}

getUserinfo();

// 退出系统功能
function logout() {
    // 清除token
    // window.localStorage.removeItem("bigevent_token");
    window.sessionStorage.removeItem("bigevent_token");
    //跳转到登录页面
    window.location.href = "./login.html";
}

// 给左边导航栏一级菜单添加点击效果
$(".level01").click(function () {
    // 排他思想，被点击的显示效果，不被点击的不显示效果
    $(".level01.active").removeClass("active");
    $(this).addClass("active");
});

// 点击一级导航栏，显示二级菜单
$(".level01").eq(1).click(function () {
    // console.log($(".level02"));
    $(".level02").stop().slideToggle();
    $(".level01 b").toggleClass("rotate0");
});

// window.onbeforeunload = function () {
//     // 清除token
//     window.localStorage.removeItem("bigevent_token");

// }


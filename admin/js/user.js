// 获取用户信息
function getUserDetail() {
    request({
        type: "get",
        url: "/admin/user/detail",
        success: function (response) {
            if (response.code === 200) {
                const { username, nickname, email, userPic, password } = response.data;
                // 将数据显示到个人信息中
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

// 实现图片上传预览功能
$("#exampleInputFile").change(function (e) {
    e.preventDefault();

    // 获取表单type=file元素的flies对象
    const file = $("#exampleInputFile")[0].files[0];

    // 用URL.createObjectURL创建一个url，生命周期与浏览器一样，关闭浏览器就释放,返回一个字符串编码，用于储存file信息
    const url = URL.createObjectURL(file);

    // 浏览器的图片属性src可以解析特殊编码格式
    $("#userPic").prop("src", url);
});

// 实现用户信息修改功能
$(".btn-success").click(function (e) {
    e.preventDefault();

    // 获取表单的formData对象,参数为form元素,因为是原生API，所以参数只能接收原生DOM元素
    const formdata = new FormData($("#form")[0]);

    // for of 可以遍历formdata对象，查看是否成功获取表单信息
    // for (key of formdata) {
    //     console.log(key);
    // }

    // 发送ajax请求
    request({
        type: "post",
        url: "/admin/user/edit",
        data: formdata,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.code === 200) {
                // 不同源的父页面和子页面之间会有跨域问题，如果是同源页面，则可以父页面和子页面交互
                parent.window.location.reload();
                alert(response.msg);
            }
        }
    });
});

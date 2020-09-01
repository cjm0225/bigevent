
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


// // 用户图片编辑显示预览(读取本地文件的方法)
// $("#exampleInputFile").change(function (e) {
//     e.preventDefault();
//     // 原生dom元素input中有files属性，是一个数组，存储一个或者多个文件信息(file对象)
//     let localFile = $("#exampleInputFile")[0].files[0];

//     // FileReader对象允许Web应用程序异步读取存储在用户计算机上的文件
//     let reader = new FileReader();

//     // 以url格式读取文件信息，无返回值
//     reader.readAsDataURL(localFile, "UTF-8");

//     // onload事件表示读取文件完成
//     reader.onload = function (event) {
//         $("#userPic").prop("src", event.target.result);
//     }
// });

// 使用URL.createObectUrl（）方法实现图片编辑显示预览
$("#exampleInputFile").change(function (e) {
    e.preventDefault();
    // 原生dom元素input中有files属性，是一个数组，存储一个或者多个文件信息(file对象)
    let file = $("#exampleInputFile")[0].files[0];
    // 使用URL.createObjectURL临时创建url，生存期绑定到创建该文档的窗口中的文档（就是说网页关闭时就无效或者说是被清除）
    const url = URL.createObjectURL(file);
    // 显示预览图片
    $("#userPic").prop("src", url);
});
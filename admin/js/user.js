
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


// 实现用户修改信息功能
function userInfoModify() {
    //因为formData是DOM原生对象，所以要获取DOM元素
    const form = $("#form")[0];
    const formData = new FormData(form);
    request({
        type: "post",
        url: "/admin/user/edit",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.code === 200) {
                window.alert(response.msg);
            }
        }
    });
    return false;
}
// $('.btn-edit').on('click', (e) => {
//     e.preventDefault();
//     // 3、收集编辑信息并提交给服务端
//     // 3.1 服务端需要使用FromData的数据类型，那我们就可以利用FromData对象自动收集表单数据了
//     const from = $('#form')[0]; // 把jq对象转换为普通对象
//     // 3.2 创建formdata对象，把表单作为参数参数，会自动收集具有name属性的input字段
//     const formdata = new FormData(form);
//     // 3.3 发送请求
//     request(
//         {
//             type: "post",
//             url: "/admin/user/edit",
//             data: formdata,
//             contentType: false,
//             processData: false,
//             success: function (response) {
//                 if (response.code === 200) {
//                     alert(response.msg);
//                 }
//             }

//         }
//     )
// });
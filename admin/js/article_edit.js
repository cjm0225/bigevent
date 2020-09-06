const global = {}
// 实现编辑文章功能
function articleEdit() {
    // 从url获取id，location.search可以获取url参数，格式:?id=
    // const id = Number(location.search.split("=")[1]);
    global.id = Number(location.search.split("?")[1].split("&")[0].split("=")[1]);
    global.state = location.search.split("?")[1].split("&")[1].split("=")[1];


    if (global.id) {
        const id = global.id
        request({
            type: "get",
            url: "/admin/article/search",
            data: { id },
            success: function (response) {
                if (response.code === 200) {
                    getArticleList();
                    const { categoryId, content, cover, date, id, state, title } = response.data;
                    $("#inputTitle").val(title);
                    $(".article_cover").prop("src", cover);
                    $("#categoryId").val(categoryId);
                    $("#myDate").val(date);
                    $("#richText").val(content);
                }
            }
        });
    } else {
        alert("此文章已被删除或不存在！！跳转到文章列表页面");
        location.href = "./index.html";
    }
}



articleEdit();

/* -----------------------------与article_release.js一样的代码------------------ */
// 初始化时间插件
jeDate("#myDate", {
    format: 'YYYY-MM-DD hh:mm:ss', // 显示格式
    isTime: true
});

// 初始化富文本插件
tinymce.init({
    selector: "#richText",
    language: 'zh_CN',
})

// 文章类型获取并渲染
function getArticleList() {
    request({
        type: "get",
        url: "/admin/category/list",
        // 设置同步的原因：因为下拉框渲染需要在数据回显先完成
        async: false,
        success: function (response) {
            if (response.code === 200) {
                const { data } = response;
                // 绑定模板引擎并传入数据
                const categoryHTML = template("categoryHTML", { data });
                // 渲染到页面
                $("#categoryId").html(categoryHTML);
            }
        }
    });
}


// 实现图片上传回显功能
$("#inputCover").change(function () {
    // 获取file对象
    const file = $(this)[0].files[0];
    // 创建临时url
    const url = URL.createObjectURL(file);
    //渲染显示
    $(".article_cover").prop("src", url);
})

// 实现发表文章功能
function publishArticle(data) {
    request({
        type: "post",
        url: "/admin/article/edit",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.code === 200) {
                alert(response.msg);
            }
        }
    });
}

// 修改并发布文章
$(".btn-release").click(function (e) {
    e.preventDefault();
    // 新建一个formdata对象，formdata对象可以获取表单数据
    const formData = new FormData($("#form")[0]);

    const file = new File($(".article_cover").prop("src"), "name");

    formData.append("id", global.id);
    formData.append("cover", file);
    formData.append("state", global.state);
    formData.delete("richText")

    // 获取富文本内容
    const content = tinymce.activeEditor.getContent();
    formData.append("content", content);

    for (let key of formData) {
        console.log(key);
    }

    // 发送请求
    // publishArticle(formData);

    // var base64 = getBase64Image(image);
    // console.log(base64)
    // var newFile = dataURLtoFile(base64, 'img111');
    // console.log(newFile)
    // demoImg.src = base64.dataURL;
    // var blob = convertBase64UrlToBlob(base64);
    // console.log(blob);
});

// 将文章存为草稿
$(".btn-draft").click(function (e) {
    e.preventDefault();
    e.preventDefault();
    // 新建一个formdata对象，formdata对象可以获取表单数据
    const formData = new FormData($("#form")[0]);

    // 增加表单数据
    formData.append("state", "草稿");
    // 删除多余的表单数据
    formData.delete("richText")

    // 获取富文本内容
    const content = tinymce.activeEditor.getContent();
    formData.append("content", content);

    // 发送请求
    publishArticle(formData);

});

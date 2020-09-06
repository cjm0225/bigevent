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
getArticleList();

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
        url: "/admin/article/publish",
        data: data,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.code === 200) {
                alert(response.msg);
                parent.window.alert("操作");
            }
        }
    });
}

// 发布文章
$(".btn-release").click(function (e) {
    e.preventDefault();
    // 新建一个formdata对象，formdata对象可以获取表单数据
    const formData = new FormData($("#form")[0]);


    formData.append("state",);
    formData.delete("richText")

    // 获取富文本内容
    const content = tinymce.activeEditor.getContent();
    formData.append("content", content);

    // 发送请求
    publishArticle(formData);
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

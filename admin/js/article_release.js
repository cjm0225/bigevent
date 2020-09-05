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
request({
    type: "get",
    url: "/admin/category/list",
    success: function (response) {
        if (response.code === 200) {
            const { data } = response;
            // 绑定模板引擎，传入数据，因为data是数组类型，可以封装为对象再传入，这样可以直接遍历data。因为如果直接传入data数组，就无法遍历data
            const temhtml = template("article_list", { data });
            // 渲染页面
            $("#selCategory").html(temhtml);
        }
    }
});
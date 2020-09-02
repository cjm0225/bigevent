request({
    type: "get",
    url: "/admin/category/list",
    success: function (response) {
        if (response.code === 200) {
            const { data } = response;
            // 绑定模板引擎，传入数据，因为data是数组类型，可以封装为对象再传入，这样可以直接遍历data。因为如果直接传入data数组，就无法遍历data
            const temhtml = template("category_list", { data });
            // 渲染页面
            $("#selCategory").html(temhtml);
        }
    }
});

// 实现文章搜索功能
function article_search() {
    request({
        type: "get",
        url: "/admin/article/query",
        data: {},
        success: function (response) {
            if (response.code === 200) {
                const { data } = response;
                let dataObj = data.data;

                // 绑定模板引擎，传入数据，因为data是数组类型，可以封装为对象再传入，这样可以直接遍历data。因为如果直接传入data数组，就无法遍历data
                const temhtml = template("article_list", { dataObj });

                // 渲染页面
                $(".table tbody").html(temhtml);
            }

        }
    });
}

article_search();


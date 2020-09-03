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

// 实现文章获取功能
function article_query() {
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

article_query();

// 点击发表文章，跳转到发表文章的页面
$("#release_btn").click(function (e) {
    e.preventDefault();
    window.location.href = "./article_release.html";
});

// 使用事件委托，给删除按钮绑定点击事件,实现删除文章功能
$(".table tbody").on("click", ".delete", function () {
    const id = Number($(this).parents("tr").attr("data-id"));
    if (confirm("确认要删除吗?")) {
        request({
            type: "post",
            url: "/admin/article/delete",
            data: { id },
            success: function (response) {
                if (response.code === 204) {
                    article_search();
                    alert(response.msg);

                } else if (response.code === 400) {
                    alert(response.msg);
                }
            }
        });

    }
});
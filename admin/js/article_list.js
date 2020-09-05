// 实现获取文章类型数据
function getArticleCategory() {
    request({
        type: "get",
        url: "/admin/category/list",
        success: function (response) {
            if (response.code === 200) {
                const { data } = response;
                // 将数据传入template模板引擎中
                const categoryHtml = template("category_list", { data });
                // 将模板字符串渲染到页面
                $("#selCategory").html(categoryHtml);
            }
        }
    });
}

getArticleCategory();

// 实现文章搜索功能
function articleQuery() {
    $("#btnSearch").click(function (e) {
        e.preventDefault();
        // 不能用return停止搜索全部,使用for循坏可以减少查询次数
        let id;
        $("#selCategory option").each(function () {
            if ($(this).prop("selected") === true) {
                id = $(this).attr("data-id");

            }

        });
        const type = id;
        const state = $("#selStatus").val();

        request({
            type: "get",
            url: "/admin/article/query",
            data: {
                type,
                state
            },
            success: function (response) {

                if (response.code === 200) {
                    const data = response.data.data;
                    // // 将数据传入template模板引擎中
                    const articleHtml = template("article_list", { data });
                    // // 将模板字符串渲染到页面
                    $(".table tbody").html(articleHtml);
                }

            }
        });
    })
}
articleQuery();
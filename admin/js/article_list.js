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





// 实现文章获取功能
function article_query(paramObj) {
    const { key, type, state, page, perpage } = paramObj;
    request({
        type: "get",
        url: "/admin/article/query",
        data: {
            ...paramObj
        },
        success: function (response) {
            if (response.code === 200) {
                const data = response.data.data;

                // 保存总页数和文章总数量
                totalPages = response.data.totalPage;
                totalCount = response.data.totalCount;

                // 实现文章分页功能
                $("#pagination").twbsPagination({
                    totalPages: totalPages,
                    visiblePages: Math.round(totalCount / totalPages),
                    first: "首页",
                    last: "末页",
                    prev: "上一页",
                    next: "下一页",
                    onPageClick: function (e, page) {
                        let id;
                        $("#selCategory option").each(function () {
                            if ($(this).prop("selected") === true) {
                                id = $(this).attr("data-id");
                            }

                        });
                        const type = id;
                        const state = $("#selStatus").val();

                        // 实现页数搜索
                        article_query({ type, state, page });
                    }
                });
                // // 将数据传入template模板引擎中
                const articleHtml = template("article_list", { data });
                // // 将模板字符串渲染到页面
                $(".table tbody").html(articleHtml);
            }

        }
    });
}
// 进入页面获取文章数据并渲染到页面上
article_query({});

// 根据文章类型id和文章状态搜索文章
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
    article_query({ type, state });
});



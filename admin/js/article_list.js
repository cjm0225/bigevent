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



const global = {};

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
                        // 因为插件的onPageClick方法会在初始化的时候就会自动调用一次这个函数，根据情况不需要第一次就获取数据，所以第一次要关闭获取数据
                        if (global.bol) {

                            // 把被点击的页数保存在全局变量中，以便于后面的获取
                            global.page = page;

                            // 获取被选中的下拉框的自定义属性id
                            let categoryId;
                            $("#selCategory option").each(function () {
                                if ($(this).prop("selected") === true) {
                                    categoryId = $(this).attr("data-id");
                                }

                            });

                            const type = categoryId;
                            const state = $("#selStatus").val();

                            // 实现页数搜索
                            article_query({ type, state, page });

                        }
                    }
                });

                // // 将数据传入template模板引擎中
                const articleHtml = template("article_list", { data });
                // // 将模板字符串渲染到页面
                $(".table tbody").html(articleHtml);
                global.bol = true;
            }

        }
    });
}
// 进入页面获取文章数据并渲染到页面上
article_query({});

// 根据文章类型id和文章状态搜索文章
$("#btnSearch").click(function (e) {

    // 由于twbsPagination.js插件在再次请求数据时不刷新页数，需要把上一次初始化数据清空并解绑，再次请求重新初始化twbsPagination.js就可以解决页数不刷新的问题了
    $('#pagination').empty();
    $('#pagination').removeData('twbs-pagination');
    $('#pagination').unbind('page');

    e.preventDefault();

    // 下拉框可以直接获取value值就可以直接得到被选中的选项的value值,但是又读取优先级，属性value值优先级比内容value优先级高
    // <option value="value" >value</option>
    const type = $("#selCategory").val();
    const state = $("#selStatus").val();

    article_query({ type, state });
});

// // 文章删除函数
function deleteArticle(id) {
    request({
        type: "post",
        url: "/admin/article/delete",
        data: { id },
        success: function (response) {
            if (response.code === 204) {

                // 下拉框可以直接获取value值就可以直接得到被选中的选项的value值,但是又读取优先级，属性value值优先级比内容value优先级高
                // <option value="value" >value</option>
                const type = $("#selCategory").val();
                const state = $("#selStatus").val();

                // 点击分页之后保存的页数，在删除文章的时候，记住现页数，重新渲染的时候就渲染现页数
                const page = global.page;

                // 删除文章的时候，希望当前数据是在删除页中重新渲染
                article_query({ type, state, page });

                alert(response.msg);
            }

        }
    });
}

// // 实现文章删除功能
$(".table tbody").on("click", ".btn-danger", function (e) {
    e.preventDefault();
    const id = $(this).parents("tr").attr("data-id");
    if (confirm("确认要删除吗？")) {
        deleteArticle(id);
    }
});



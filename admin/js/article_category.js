// 实现文章所有分类类型信息获取并渲染到页面功能
function getArticleCategory() {
    request({
        url: "/admin/category/list",
        type: "get",
        success: function (response) {
            if (response.code === 200) {
                const { data } = response;
                // 获取模板引擎返回的字符串
                const categoryHtml = template("article_category", { data });
                //   渲染到页面
                $(".table tbody").html(categoryHtml);
            }
        }
    });
}
getArticleCategory();

// 实现文章分类删除功能,因为是动态渲染出来的按钮，所以需要事件委托绑定点击事件
$(".table tbody").on("click", ".btn-danger", function (e) {
    e.preventDefault();
    // 获取文章类型id
    const id = $(this).parents("tr").attr("data-id");
    // 因为是删除操作，所以要先安全验证才能进行下一步操作
    if (confirm("确认要删除吗?")) {
        // 发送请求，删除文章类型
        request({
            type: "post",
            url: "/admin/category/delete",
            data: { id },
            success: function (response) {
                if (response.code === 204) {
                    alert(response.msg);
                    // 删除请求发送成功之后重新获取数据并渲染页面
                    getArticleCategory();
                }
            }
        });

    }
});

// 显示内容框函数
function showWraper() {
    $(".add_category_wraper").show();
}

// 隐藏内容框函数
function hideWraper() {
    $(".add_category_wraper").hide();
}

// 设置一个全局变量id，在点击编辑就给id赋值，以此辨别是否是编辑功能
let global = {};

// 实现新增分类功能，显示内容框
$("#xinzengfenlei").click(function (e) {
    e.preventDefault();
    showWraper();
});


// 点击编辑框，显示内容框
$(".table tbody").on("click", ".btn-info ", function () {
    showWraper();

    // 根据id查询数据，渲染到页面
    const id = $(this).parents("tr").attr("data-id");

    // 赋值给全局变量id
    global.id = id;

    // 查询接口查询数据
    request({
        type: "get",
        url: "/admin/category/search",
        data: { id },
        success: function (response) {
            if (response.code === 200) {
                const { name, slug } = response.data[0];
                $("#name").val(name);
                $("#slug").val(slug);
            }
        }
    });



});

// 点击取消按钮，隐藏内容框
$(".btn-default").click(function (e) {
    e.preventDefault();
    hideWraper();
    // 点击取消之后，就把内容框的内容清空
    $("#name").val("");
    $("#slug").val("");

});


// 点击保存，实现新增/编辑修改功能
$(".btn-primary").click(function (e) {
    e.preventDefault();
    // 获取所需参数的值
    const name = $("#name").val();
    const slug = $("#slug").val();

    if (global.id) {
        // global.id有值就表示是编辑功能
        request({
            type: "post",
            url: "/admin/category/edit",
            data: { id: global.id, name, slug },
            success: function (response) {
                if (response.code === 200) {
                    alert(response.msg);
                    getArticleCategory();
                    global.id = "";
                    $("#name").val("");
                    $("#slug").val("");
                    hideWraper();
                } else if (response.code === 400) {
                    alert(response.msg);
                    global.id = "";
                    $("#name").val("");
                    $("#slug").val("");
                    hideWraper();
                }
            }
        });
    } else {
        // global.id无值就表示是新增功能
        request({
            type: "post",
            url: "/admin/category/add",
            data: { name, slug },
            success: function (response) {
                if (response.code === 201) {
                    alert(response.msg);
                    getArticleCategory();
                    $("#name").val("");
                    $("#slug").val("");
                    hideWraper();
                }
            }
        });

    }
});



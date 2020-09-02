function getCategorylist() {
    request({
        type: "get",
        url: "/admin/category/list",
        success: function (response) {
            if (response.code === 200) {
                const { data } = response;
                // 绑定模板引擎，传入数据，因为data是数组类型，可以封装为对象再传入，这样可以直接遍历data。因为如果直接传入data数组，就无法遍历data
                const temhtml = template("article_category", { data });
                // 渲染页面
                $(".table tbody").html(temhtml);
            }
        }
    });

}
getCategorylist();


// 实现新增分类功能
$("#xinzengfenlei").click(function (e) {
    e.preventDefault();
    $(".add_category_wraper").show();

    // 因为是动态绑定事件，每次点击都会自动添加一个绑定事件，防止有多个绑定事件在同一元素上，所以要先解绑所有的绑定事件先，参数为空时，默认解绑所有事件
    $(".btn-primary").unbind("click");

    // 点击确定，文章类型增加
    $(".btn-primary").click(function (e) {
        e.preventDefault();
        const name = $("#name").val();
        const slug = $("#slug").val();

        if ($("#name").val() === "" || $("#slug").val() === "") {
            alert("新增文章分类名或分类别名不能为空！！！");
            return;

        }
        request({
            type: "post",
            url: "/admin/category/add",
            data: `name=${name}&slug=${slug}`,
            success: function (response) {
                $("#name").val("");
                $("#slug").val("");
                $(".add_category_wraper").hide();
                alert(response.msg);
                getCategorylist();
            },

        });
    });

    // 因为是动态绑定事件，每次点击都会自动添加一个绑定事件，防止有多个绑定事件在同一元素上，所以要先解绑所有的绑定事件先，参数为空时，默认解绑所有事件
    $(".btn-default").unbind("click");
    // 点击取消，新增表格隐藏
    $(".btn-default").click(function (e) {
        e.preventDefault();
        $("#name").val("");
        $("#slug").val("");
        $(".add_category_wraper").hide();

    });

});



// 实现编辑功能，因为是动态渲染的，所以要使用事件委托来绑定点击事件
$(".table tbody").on("click", ".btn-info", function () {
    // 显示编辑框
    $(".add_category_wraper").show();

    // 获取文章分类并显示在编辑框内
    const name = $(this).parent().siblings("td").eq(0).text();
    const slug = $(this).parent().siblings("td").eq(1).text();
    $("#name").val(name);
    $("#slug").val(slug);

    // 获取文章id
    const id = Number($(this).parents("tr").attr("data-id"));

    // 因为是动态绑定事件，每次点击都会自动添加一个绑定事件，防止有多个绑定事件在同一元素上，所以要先解绑所有的绑定事件先，参数为空时，默认解绑所有事件
    $(".btn-primary").unbind("click");

    // 点击保存，实现编辑修改功能
    $(".btn-primary").click(function (e) {
        e.preventDefault();

        const name = $("#name").val();
        const slug = $("#slug").val();

        request({
            type: "post",
            url: "/admin/category/edit",
            data: { id, name, slug },
            success: function (response) {

                if (response.code === 200) {
                    alert(response.msg);
                    getCategorylist();
                    $(".add_category_wraper").hide();
                } else if (response.code === 400) {
                    alert(response.msg);
                }

            }
        });

    });
    // 因为是动态绑定事件，每次点击都会自动添加一个绑定事件，防止有多个绑定事件在同一元素上，所以要先解绑所有的绑定事件先，参数为空时，默认解绑所有事件
    $(".btn-default").unbind("click");

    // 点击取消，新增表格隐藏
    $(".btn-default").click(function (e) {
        e.preventDefault();
        $("#name").val("");
        $("#slug").val("");

        $(".add_category_wraper").hide();

    })

});

// 实现删除文章功能
$(".table tbody").on("click", ".btn-danger", function () {

    // 获取文章id
    const id = Number($(this).parents("tr").attr("data-id"));

    if (confirm("确定要删除吗?")) {
        request({
            type: "post",
            url: "/admin/category/delete",
            data: { id },
            success: function (response) {
                if (response.code === 204) {
                    getCategorylist();
                    alert(response.msg);
                }
            }
        });
    }

});


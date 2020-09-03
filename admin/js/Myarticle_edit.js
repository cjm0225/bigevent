// 存储文章状态
let state;

// 实现编辑页面获取文章信息功能
function getArticleById() {

    if (location.search.indexOf("id=") === -1) {
        alert("该文章已被删除！！跳转到文章列表页面");
        location.href = "./article_list.html";
        return;
    } else {
        // 判断url字符串是否带有id，有的话就可以正常编辑，没有的话就返回正常页面
        const id = location.search.split("?")[1].split("=")[1];

        request({
            type: "get",
            url: "/admin/article/search",
            data: { id },
            success: function (response) {
                if (response.code === 200) {
                    const { data } = response;
                    $("#inputTitle").val(data.title);
                    $(".article_cover").prop("src", data.cover);
                    $(".date").html(data.date);
                    $(".col-sm-10").children("textarea").html(data.content);

                    state = data.state;
                    // 判断文章类型id，显示下拉框
                    $(".category option").each(function () {

                        if ($(this).attr("data-id") == data.categoryId) {
                            $(this).prop("selected", true);
                        }
                    });
                }
            }
        });

    }
}
getArticleById();

// 实现文章信息修改功能
function alertArticleInfo() {
    // const form = $("#form")[0];
    // const formData = new FormData(form);
    // for (key of formData) {
    //     console.log(key);
    // }
    // request({
    //     type: "post",
    //     url: "/admin/article/edit",
    //     data: "",
    //     success: function (response) {
    //         console.log(response);
    //     }
    // });

    // 获取id
    const id = location.search.split("?")[1].split("=")[1];
    //获取title
    const title = $("#inputTitle").val();

    // 获取封面图片
    let cover;
    if ($(".article_cover").prop("src") === "") {
        cover = $("#inputCover")[0].files[0];
    } else {
        cover = $(".article_cover").prop("src");
    }

    // 获取文章类型id
    let categoryId;
    $(".category option").each(function () {
        if ($(this).prop("selected") === true) {
            categoryId = $(this).attr("data-id");
            return;
        }
    });

    // 获取日期
    const date = $(".date").text();

    // 获取文章内容
    const content = $(".content").val();
}

// 点击编辑按钮，实现修改文章功能
$(".btn-edit").click(function (e) {
    e.preventDefault();
    alertArticleInfo();
});
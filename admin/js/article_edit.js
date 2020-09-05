// 实现编辑文章功能
function articleEdit() {
    // 从url获取id，location.search可以获取url参数，格式:?id=
    const id = Number(location.search.split("=")[1]);
    request({
        type: "post",
        url: "/admin/article/edit",

    });
}
articleEdit();
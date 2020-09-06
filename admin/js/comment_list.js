function getCommentList(page) {
    request({
        type: "get",
        url: "/admin/comment/search",
        data: { page, perpage: 8 },
        success: function (response) {
            if (response.code === 200) {
                const { totalCount, totalPage } = response.data;
                const commentHTML = template("comment_list", response.data);
                $(".table tbody").html(commentHTML);

                twbsPaginationInit(totalPage, totalCount);
            }

        }
    });
}

getCommentList();


const global = {};
global.bol = false;
// 实现文章分页功能
function twbsPaginationInit(totalPage, totalCount) {
    $("#pagination").twbsPagination({
        totalPages: totalPage,
        visiblePages: 6,//Math.round(totalCount / totalPage)
        first: "首页",
        last: "末页",
        prev: "上一页",
        next: "下一页",
        onPageClick: function (e, page) {

            global.page = page;
            // 因为初始化的时候都会自动调用一次onPageClick函数，为了防止第一次进入页面申请两次数据，就设置一个开关，在第一次进入页面的时候，开启开关
            if (global.bol) {
                getCommentList(page);
            }
            global.bol = true;
        }
    });

}

// 评论通过审核
$(".table tbody").on("click", ".btn-success", function () {
    if (confirm("确认要通过该条审核吗?")) {
        const id = $(this).attr("data-id");
        request({
            type: "post",
            url: "/admin/comment/pass",
            data: { id },
            success: function (response) {
                if (response.code === 200) {
                    alert(response.msg);
                    getCommentList(global.page);
                } else if (response.code === 400) {
                    alert(response.msg);
                }
            }
        });

    }
});

// 评论审核不通过
$(".table tbody").on("click", ".btn-warning", function () {
    if (confirm("确认要拒绝该条审核吗?")) {
        const id = $(this).attr("data-id");
        request({
            type: "post",
            url: "/admin/comment/reject",
            data: { id },
            success: function (response) {
                if (response.code === 200) {
                    alert(response.msg);
                    getCommentList(global.page);
                } else if (response.code === 400) {
                    alert(response.msg);
                }
            }
        });

    }
});

// 删除评论
$(".table tbody").on("click", ".btn-danger", function () {
    if (confirm("确认要删除该条审核吗?")) {
        const id = $(this).attr("data-id");
        request({
            type: "post",
            url: "/admin/comment/delete",
            data: { id },
            success: function (response) {
                if (response.code === 200) {
                    alert(response.msg);
                    getCommentList(global.page);
                }

            }
        });

    }
});

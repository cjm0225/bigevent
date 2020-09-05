// 初始化时间插件
jeDate("#myDate", {
    format: 'YYYY-MM-DD hh:mm:ss', // 显示格式
    isTime: true
});

// 初始化富文本插件
tinymce.init({
    selector: "#richText",
    language: 'zh_CN',
})
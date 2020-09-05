function articleEdit() {
    // 从url获取id，location.search可以获取url参数，格式:?id=
    const id = Number(location.search.split("=")[1]);

}
articleEdit();
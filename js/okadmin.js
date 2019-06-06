layui.config({
    base: "lib/okPlugins/"
}).extend({
    okTab: "okTab",
    okUtils: "okUtils",
    okMenu: "okMenu"
}).use(["element", "layer", "okTab", "okMenu"], function () {
    var element = layui.element;
    var layer = layui.layer;
    var okTab = layui.okTab;
    var okMenu = layui.okMenu;
    var $ = layui.jquery;

    /**
     * localhost运行提示
     */
    var href = location.href;
    if (href.substring(0, 4) != "http") {
        layer.msg("请先部署到localhost环境下再访问！", {icon: 7, time: 3000, anim: 1});
    }

    /**
     * 左边菜单显示/隐藏功能
     * @type {boolean}
     */
    $(".menu-switch").click(function () {
        if ($(".layui-layout-admin .layui-side").css("left") == '0px') {
            $(".layui-layout-admin .layui-side").animate({left: "-200px"});
            $(".layui-layout-admin .content-body").animate({left: "0px"});
            $(".layui-layout-admin .layui-footer").animate({left: "0px"});
        } else {
            $(".layui-layout-admin .layui-side").animate({left: "0px"});
            $(".layui-layout-admin .content-body").animate({left: "200px"});
            $(".layui-layout-admin .layui-footer").animate({left: "200px"});
        }
    });

    /**
     * 生成左侧菜单树
     */
    okMenu.generatorMenu("data/menu.json", "get");

    /**
     * 监听导航菜单的点击
     */
    element.on("nav(navFilter)", function (elem) {
        var path = elem.context.attributes.path;
        if (path && path.textContent != "") {
            // var title = elem.context.innerHTML;
            var title = elem.context.innerText;
            title = title.substring(title.indexOf(" "), title.length);
            var path = path.textContent;
            okTab.add(title, path)
        }
    });

});

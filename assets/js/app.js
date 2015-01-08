$(function() {

    // 为正文图片增加圆角以及自适用
    $(".blog-main img").each(function(index) {
        $(this).addClass("img-rounded img-responsive");
    });

    // tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // 文章内部链接改为新页面打开
    $('.ai-link-rewrite a').attr('target', '_blank');


});
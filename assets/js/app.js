$(function() {

    // 为正文图片增加圆角以及自适用
    $(".blog-main img").each(function(index) {
        $(this).addClass("img-rounded img-responsive");
    });
});
/**
 * Created by Shadow on 2017/3/5.
 */

/* Magnifier */
$(document).ready(function () {
    var magnifierImgBox = $('.product-preview-main-img-box');   //中图片容器
    var magnifierImgMagnifier = $('.product-preview-main-img-box-magnifier');   //放大镜容器
    var magnifierBigImgBox = $('.product-preview-main-img-big-box');   //大图片容器
    var magnifierBigImg = $('.product-preview-main-img-big-box img');   //大图片

    magnifierImgBox.on('mouseover', function () {
        magnifierImgMagnifier.css({"display": "block"});
        magnifierBigImgBox.css({"display": "block"});
    });
    magnifierImgBox.on('mouseout', function () {
        magnifierImgMagnifier.css({"display": "none"});
        magnifierBigImgBox.css({"display": "none"});
    });
    magnifierImgBox.on('mousemove', function (ev) {
        var _event = ev || window.event;
        var left = _event.clientX - magnifierImgBox.offset().left - magnifierImgMagnifier.outerWidth() / 2;
        var top = _event.clientY - magnifierImgBox.offset().top - magnifierImgMagnifier.outerHeight() / 2;

        if (left < 0) {
            left = 0;
        } else if (left > magnifierImgBox.outerWidth() - magnifierImgMagnifier.outerWidth()) {
            left = magnifierImgBox.outerWidth() - magnifierImgMagnifier.outerWidth();
        }

        if (top < 0) {
            top = 0;
        } else if (top > magnifierImgBox.outerHeight() - magnifierImgMagnifier.outerHeight()) {
            top = magnifierImgBox.outerHeight() - magnifierImgMagnifier.outerHeight();
        }

        magnifierImgMagnifier.css({left: left, top: top});

        var percentX = left / (magnifierImgBox.outerWidth(true) - magnifierImgMagnifier.outerWidth(true));
        var percentY = top / (magnifierImgBox.outerHeight(true) - magnifierImgMagnifier.outerHeight(true));
        magnifierBigImg.css({
            "left": -percentX * (magnifierBigImg.outerWidth(true) - magnifierBigImgBox.outerWidth(true)) + 'px',
            "top": -percentY * (magnifierBigImg.outerHeight(true) - magnifierBigImgBox.outerHeight(true)) + 'px'
        });
    });
});
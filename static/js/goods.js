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

        var left = _event.clientX + document.body.scrollLeft - magnifierImgBox.offset().left - magnifierImgMagnifier.outerWidth() / 2;
        var top = _event.clientY + document.body.scrollTop - magnifierImgBox.offset().top - magnifierImgMagnifier.outerHeight() / 2;

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

        var percentX = left / (magnifierImgBox.outerWidth() - magnifierImgMagnifier.outerWidth());
        var percentY = top / (magnifierImgBox.outerHeight() - magnifierImgMagnifier.outerHeight());
        magnifierBigImg.css({
            "left": -percentX * (magnifierBigImg.outerWidth() - magnifierBigImgBox.outerWidth()) + 'px',
            "top": -percentY * (magnifierBigImg.outerHeight() - magnifierBigImgBox.outerHeight()) + 'px'
        });
    });
});

/* Product preview tab */
$(document).ready(function () {

    var productPreviewWrap = $('.product-preview');
    var tabBtnPrev = $('.product-preview-thumbnail-wrap .prev');
    var tabBtnNext = $('.product-preview-thumbnail-wrap .next');

    var tabWrap = $('.product-preview-thumbnail-list ul');
    var tabPage = 1;
    var tabPageNum = 5;
    var tabNum = tabWrap.find("li").length;
    var tabWidth = tabWrap.find("li").outerWidth(true) * tabPageNum;
    var tabPageCount = Math.ceil(tabNum / tabPageNum);

    tabWrap.css("width", (tabNum * tabWrap.find("li").outerWidth(true)));

    $('.product-preview-thumbnail-list ul li').on('mouseover', function () {
        var _this = $(this);
        _this.addClass('active').siblings().removeClass('active');
        var previewImg = _this.find('a img').attr('data-img');
        var previewImgBig = _this.find('a img').attr('data-img-big');
        $('.product-preview').find('.product-preview-main-img-box img').attr({'src': previewImg});
        $('.product-preview').find('.product-preview-main-img-big-box img').attr({'src': previewImgBig});
    });

    tabBtnPrev.on('click', function () {
        if (tabPage == 1) {
            var tabPageEnd = tabWidth * tabPageCount - tabWidth;
            tabWrap.animate({left: '-=' + tabPageEnd}, 'slow');
            tabPage = tabPageCount;
        } else {
            tabWrap.animate({left: '+=' + tabWidth}, 'slow');
            tabPage--;
        }
    });
    tabBtnNext.on('click', function () {
        if (tabPage == tabPageCount) {
            tabWrap.animate({left: '0'}, 'slow');
            tabPage = 1;
        } else {
            tabWrap.animate({left: '-=' + tabWidth}, 'slow');
            tabPage++;
        }
    });
});
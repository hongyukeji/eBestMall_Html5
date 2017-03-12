$(document).ready(function () {
    /* Magnifier */
    magnifierProductPreview();
    function magnifierProductPreview() {
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

            var left = _event.clientX + $(document).scrollLeft() - magnifierImgBox.offset().left - magnifierImgMagnifier.outerWidth() / 2;
            var top = _event.clientY + $(document).scrollTop() - magnifierImgBox.offset().top - magnifierImgMagnifier.outerHeight() / 2;

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
    }

    /* Product preview tab */
    tabProductPreview();
    function tabProductPreview() {
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
            productPreviewWrap.find('.product-preview-main-img-box img').attr({'src': previewImg});
            productPreviewWrap.find('.product-preview-main-img-big-box img').attr({'src': previewImgBig});
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
    }

    /* Tab Transverse Start*/
    tabGoods('.product-recommend-header li', '.product-recommend-content-list', '.product-recommend-content');
    tabGoods('.product-detail-aside-tab-header li', '.product-detail-aside-item-content ul', '.product-detail-aside-item-content');
    function tabGoods(tabBtnName, tabContentName, tabContentWrapName) {
        var tabBtn = $(tabBtnName);
        var tabContent = $(tabContentName);
        var tabContentWrap = $(tabContentWrapName);
        tabBtn.on('click', function () {
            var _this = $(this);
            if (!_this.hasClass("active")) {
                _this.addClass('active').siblings('li').removeClass("active");
                _this.parent().parent().siblings(tabContentWrap).find(tabContent).eq(_this.index()).css({"display": "block"}).siblings().css({"display": "none"});
            }
        })
    }

    /* Tab Product Detail */
    tabProductDetail('.product-detail-header li', '.product-detail-content', '.product-detail-content-wrap');
    function tabProductDetail(tabBtnName, tabContentName, tabContentWrapName) {
        var tabBtn = $(tabBtnName);
        var tabContent = $(tabContentName);
        var tabContentWrap = $(tabContentWrapName);
        tabBtn.on('click', function () {
            var _this = $(this);
            if (!_this.hasClass("active")) {
                var current = _this.parent().parent().siblings(tabContentWrap).find(tabContent).eq(_this.index());
                _this.addClass('active').siblings('li').removeClass("active");
                current.css({"display": "block"});
                current.nextAll().css({"display": "block"});
                current.prevAll().css({"display": "none"});
            }
        })
    }

    /* Product Choose Attr */
    productChooseAttr();
    function productChooseAttr() {
        var btnChooseAttr = $('.product-info-choose-attr .dd a');
        btnChooseAttr.on('click', function () {
            var _this = $(this);
            if (!_this.hasClass("disabled")) {
                _this.addClass('active').siblings().removeClass('active');
            }
        })
    }

    /* Product Choose Amount */
    productChooseAmount();
    function productChooseAmount() {
        var productNumberText = $('.product-info-choose-amount .goods-number');
        var productBtnAdd = $('.product-info-choose-amount .btn-add');
        var productBtnReduce = $('.product-info-choose-amount .btn-reduce');

        productNumberText.on('change', function () {
            var productNumber = productNumberText.val();
            if (parseInt(productNumber) <= 0) {
                productNumberText.val(1);
            } else if (parseInt(productNumber) > 9999) {
                productNumberText.val(9999);
            }
        });

        productBtnAdd.on('click', function () {
            var productNumber = productNumberText.val();
            if (parseInt(productNumber) < 9999) {
                productNumberText.val(parseInt(productNumber) + 1);
            }
        });
        productBtnReduce.on('click', function () {
            var productNumber = productNumberText.val();
            if (parseInt(productNumber) > 1) {
                productNumberText.val(parseInt(productNumber) - 1);
            }
        });
    }

});

$(document).ready(function () {

});
$(function () {
    /* JavaScript Test */
    /* console.log(); */
});

/* 首页-滚动事件 */
$(function () {

    /* 鼠标滚动监听事件 */
    $(window).on('scroll', function () {

        /* console.log($(window).scrollTop()); */

        /* 首页顶部搜索框-返回顶部按钮 显示/隐藏事件 */
        var returnTop = $('.returnTop');
        var searchBar = $('#searchBar');
        if ($(window).scrollTop() > $(window).height()) {
            searchBar.fadeIn();
            returnTop.fadeIn();
        } else {
            searchBar.fadeOut();
            returnTop.fadeOut();
        }

        /* 首页-楼层导航-滚动 显示/隐藏/焦点事件 */
        var storeyInitDistance = 2400;
        if ($('.header-event').css('display') !== 'none') {
            storeyInitDistance += $('.header-event').outerHeight(true);
        }
        var storeyBtn = $('.content-storey-nav .item');
        var storeyHeight = $('.content-storey').outerHeight(true);
        if ($(window).scrollTop() > storeyInitDistance - 150) {
            if( document.body.clientWidth <= (1366 - 27)){
                $('.content-storey-nav-bar').css("left","-35px");
            }else {
                $('.content-storey-nav-bar').css("left","-65px");
            }
            var storeyFloorOn = Math.round(($(window).scrollTop() - (storeyInitDistance)) / storeyHeight);
            storeyNavActive(storeyBtn.eq(storeyFloorOn));
            $('.content-storey-nav-bar').fadeIn();
        } else {
            storeyBtn.removeClass('active');
            $('.content-storey-nav-bar').fadeOut();
        }
    });


    /* 首页-楼层按钮被单击事件 */
    $('.content-storey-nav .item').on('click', function () {
        var storeyInitDistance = 2400;
        if ($('.header-event').css('display') !== 'none') {
            storeyInitDistance += $('.header-event').outerHeight(true);
        }
        var _this = $(this);
        var storeyNum = _this.index();
        var storeyHeight = $('.content-storey').outerHeight(true);
        storeyNavActive(_this);
        $('html,body').animate({scrollTop: storeyInitDistance + (storeyNum * storeyHeight)}, 'normal');
    });

    function storeyNavActive(_this) {
        _this.addClass('active').siblings('.item').removeClass('active');
    }

    /* 首页-楼层返回顶部按钮 */
    $('.content-storey-nav .returnTop').on('click', function () {
        $(this).siblings('.item').removeClass('active');
    })

});

/* 关闭首页顶部广告 */
$(function () {
    $('.close-event').on('click', function () {
        $(this).parent().parent().fadeOut(588);
        /* $(this).parent().next().find().addClass("hidden").removeClass("hidden");  // @父辈 parent() @同辈 next()  @儿子 find() */
    });
});

/* 侧边栏 */
$(function () {
    $('.item-btn').click(function () {
        var itemAll = $('.item');
        var thisNow = $(this).parent(itemAll);
        var sideBarRight = $('#sideBar').css("right");
        var itemBody = $(this).parent(itemAll).find('.item-body').css("right");

        if (sideBarRight == "0px" && itemBody == "-270px") {
            sideBarOpen(thisNow);
        } else if (sideBarRight == "270px" && itemBody == "0px") {
            sideBarClose();
        } else if (sideBarRight == "270px" && itemBody == "-270px") {
            sideBarChange(thisNow, itemAll);
        }
    });
    function sideBarOpen(thisNow) {
        var sideBar = $('#sideBar');
        var sideBarOpen = "270px";
        var itemBg = "#C40000";
        sideBar.animate({"right": sideBarOpen}, "fast");
        thisNow.css({"background-color": itemBg}).find('.item-body').animate({"right": "0"}, "fast");
    }

    function sideBarClose() {
        var sideBar = $('#sideBar');
        var sideBarClose = "0px";
        var itemBodyClose = "-270px";
        sideBar.animate({"right": sideBarClose}, "fast");
        $('.item').css({"background-color": ""}).find('.item-body').animate({"right": itemBodyClose}, "fast");
    }

    function sideBarChange(thisNow, thisAll) {
        var itemBodyOpen = "0px";
        var itemBodyClose = "-270px";
        var itemBg = "#C40000";
        thisAll.css({"background-color": ""}).find('.item-body').animate({"right": itemBodyClose}, "fast");
        thisNow.css({"background-color": itemBg}).find('.item-body').animate({"right": itemBodyOpen}, "fast");
    }

    /* 页面鼠标点击事件 */
    $(document).click(function whichButton(event) {
        var btnNum = event.button;
        if (btnNum == 0) {
            /*鼠标左键被点击*/
            sideBarClose();
        }
        /*
         if (btnNum == 2) {
         // console.log("鼠标右键被点击！");
         }
         else if(btnNum==0){
         // console.log("鼠标左键被点击！");
         } else if (btnNum == 1) {
         // console.log("鼠标中键被点击！");
         } else {
         // console.log("您点击了" + btnNum + "号键，我不能确定它的名称。");
         }
         */
    });

    /* 阻止侧边栏冒泡事件 */
    $('#sideBar').click(function (event) {
        event.stopPropagation();
    });

    /* Top返回顶部按钮被单击事件 */
    $('.returnTop').click(function () {
        returnTop();
    });

    /* 返回顶部函数 */
    function returnTop() {
        $('html,body').animate({scrollTop: 0}, 588);
    }
});

/* 首页-轮播图 */
$(function () {
    var bannerSlider = new Slider($('#sliderBar'), {
        time: 5000,
        delay: 400,
        event: 'hover',
        auto: true,
        mode: 'fade',
        controller: $('#sliderIndicator'),
        activeControllerCls: 'active'
    });
    $('#sliderBar .slider-prev').click(function () {
        bannerSlider.prev()
    });
    $('#sliderBar .slider-next').click(function () {
        bannerSlider.next()
    });
    function Slider(container, options) {
        /*
         options = {
         auto: true,
         time: 3000,
         event: 'hover' | 'click',
         mode: 'slide | fade',
         controller: $(),
         activeControllerCls: 'className',
         exchangeEnd: $.noop
         }
         */

        "use strict"; //stirct mode not support by IE9-

        if (!container) return;

        var options = options || {},
            currentIndex = 0,
            cls = options.activeControllerCls,
            delay = options.delay,
            isAuto = options.auto,
            controller = options.controller,
            event = options.event,
            interval,
            slidesWrapper = container.children().first(),
            slides = slidesWrapper.children(),
            length = slides.length,
            childWidth = container.width(),
            totalWidth = childWidth * slides.length;

        function init() {
            var controlItem = controller.children();

            mode();

            event == 'hover' ? controlItem.mouseover(function () {
                    stop();
                    var index = $(this).index();

                    play(index, options.mode);
                }).mouseout(function () {
                    isAuto && autoPlay();
                }) : controlItem.click(function () {
                    stop();
                    var index = $(this).index();

                    play(index, options.mode);
                    isAuto && autoPlay();
                });

            isAuto && autoPlay();
        }

        //animate mode
        function mode() {
            var wrapper = container.children().first();

            options.mode == 'slide' ? wrapper.width(totalWidth) : wrapper.children().css({
                    'position': 'absolute',
                    'left': 0,
                    'top': 0
                })
                    .first().siblings().hide();
        }

        //auto play
        function autoPlay() {
            interval = setInterval(function () {
                triggerPlay(currentIndex);
            }, options.time);
        }

        //trigger play
        function triggerPlay(cIndex) {
            var index;

            (cIndex == length - 1) ? index = 0 : index = cIndex + 1;
            play(index, options.mode);
        }

        //play
        function play(index, mode) {
            slidesWrapper.stop(true, true);
            slides.stop(true, true);

            mode == 'slide' ? (function () {
                    if (index > currentIndex) {
                        slidesWrapper.animate({
                            left: '-=' + Math.abs(index - currentIndex) * childWidth + 'px'
                        }, delay);
                    } else if (index < currentIndex) {
                        slidesWrapper.animate({
                            left: '+=' + Math.abs(index - currentIndex) * childWidth + 'px'
                        }, delay);
                    } else {
                        return;
                    }
                })() : (function () {
                    if (slidesWrapper.children(':visible').index() == index) return;
                    slidesWrapper.children().fadeOut(delay).eq(index).fadeIn(delay);
                })();

            try {
                controller.children('.' + cls).removeClass(cls);
                controller.children().eq(index).addClass(cls);
            } catch (e) {
            }

            currentIndex = index;

            options.exchangeEnd && typeof options.exchangeEnd == 'function' && options.exchangeEnd.call(this, currentIndex);
        }

        //stop
        function stop() {
            clearInterval(interval);
        }

        //prev frame
        function prev() {
            stop();

            currentIndex == 0 ? triggerPlay(length - 2) : triggerPlay(currentIndex - 2);

            isAuto && autoPlay();
        }

        //next frame
        function next() {
            stop();

            currentIndex == length - 1 ? triggerPlay(-1) : triggerPlay(currentIndex);

            isAuto && autoPlay();
        }

        //init
        init();

        //expose the Slider API
        return {
            prev: function () {
                prev();
            },
            next: function () {
                next();
            }
        }
    }
});

/* 首页-公告Tab选项卡 */
$(function () {
    tab('.content-focus-right-middle-tab-title li', '.content-focus-right-middle-tab-body ul');
    function tab(tabTitles, tabContents) {
        var tabTitle = $(tabTitles);
        var tabContent = $(tabContents);
        tabTitle.on('mouseover', function () {
            if (tabTitle.length != tabContent.length) {
                return false;
            }
            var index = tabTitle.index(this);
            tabTitle.eq(index).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
            tabContent.eq(index).show().siblings().hide();
        });
    }
});

/* 首页-秒杀 */
$(function () {
    var tabBar = $('.content-sec-kill-body-list-wrapper ul');
    var tabPrev = $('.content-sec-kill-body-list-wrapper-navigate-prev');
    var tabNext = $('.content-sec-kill-body-list-wrapper-navigate-next');
    var tabBarWidth = tabBar.width();
    var tabPage = 1;
    var tabPageNum = 5;
    var tabBarNum = tabBar.find(".item").length;
    var tabPageCount = Math.ceil(tabBarNum / tabPageNum);

    tabNext.click(function () {
        if (tabPage == tabPageCount) {
            tabBar.animate({left: '0px'}, 'slow');
            tabPage = 1;
        } else {
            tabBar.animate({left: '-=' + tabBarWidth}, 'slow');
            tabPage++;
        }
    });
    tabPrev.click(function () {
        if (tabBar.css('left') == '0px' || tabBar.css('left') == 'auto') {
            var _tabPageNum = tabPageNum - 1;
            tabBar.animate({left: '-' + _tabPageNum * tabBarWidth}, 'slow');
            tabPage = tabPageCount;
        } else {
            tabBar.animate({left: '+=' + tabBarWidth}, 'slow');
            tabPage--;
        }
    });
});

/* 首页-楼层Tab选项卡 */
$(function () {
    storeyTab(".storey-tab-one-left");
    storeyTab(".storey-tab-one-right");

    storeyTab(".storey-tab-two-left");
    storeyTab(".storey-tab-two-right");

    storeyTab(".storey-tab-three-left");
    storeyTab(".storey-tab-three-right");

    storeyTab(".storey-tab-four-left");
    storeyTab(".storey-tab-four-right");

    storeyTab(".storey-tab-five-left");
    storeyTab(".storey-tab-five-right");

    storeyTab(".storey-tab-six-left");
    storeyTab(".storey-tab-six-right");

    storeyTab(".storey-tab-seven-left");
    storeyTab(".storey-tab-seven-right");

    storeyTab(".storey-tab-eight-left");
    storeyTab(".storey-tab-eight-right");

    storeyTab(".storey-tab-nine-left");
    storeyTab(".storey-tab-nine-right");

    storeyTab(".storey-tab-ten-left");
    storeyTab(".storey-tab-ten-right");

    function storeyTab(tabName) {
        var tabBar = $(tabName);
        var tabPage = 1;
        var tabPageNum = 6;
        var tabNum = tabBar.find("ul li").length;
        var tabWidth = tabBar.find("li").outerWidth(true) * tabPageNum;
        var tabPageCount = Math.ceil(tabNum / tabPageNum);
        tabBar.find("ul").css("width", (tabNum * tabBar.find("li").outerWidth(true)));
        tabBar.find(".next").click(function () {
            if (tabPage == tabPageCount) {
                tabBar.find("ul").animate({left: '0'}, 'slow');
                tabPage = 1;
            } else {
                tabBar.find("ul").animate({left: '-=' + tabWidth}, 'slow');
                tabPage++;
            }
        });
        tabBar.find(".prev").click(function () {
            if (tabPage == 1) {
                var tabPageEnd = tabWidth * tabPageCount - tabWidth;
                tabBar.find("ul").animate({left: '-=' + tabPageEnd}, 'slow');
                tabPage = tabPageCount;
            } else {
                tabBar.find("ul").animate({left: '+=' + tabWidth}, 'slow');
                tabPage--;
            }
        });
    }
});

/* VueJs */
$(function () {
    var vm = new Vue({
        el: "#searchBar",
        data: {
            title: "Hello Vue"
        },
        mounted: function () {
            // console.log('Title is: ' + this.title);
            this.edit();
        },
        methods: {
            edit: function () {
                this.title = "Hello eBestMall";
            }
        }
    });
});
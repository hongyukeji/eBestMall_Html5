$(function () {});

/* 侧边栏 */
$(function(){
    /* 页面鼠标点击事件 */
    $(document).click(function whichButton(event) {
        var btnNum = event.button;
        if(btnNum==0){
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
    $('#sideBar').click(function(event){
        event.stopPropagation();
    });

    /*侧边栏*/
    $('.item-btn').click(function(){
        var itemAll = $('.item');
        var thisNow = $(this).parent(itemAll);
        var sideBarRight = $('#sideBar').css("right");
        var itemBody = $(this).parent(itemAll).find('.item-body').css("right");

        if(sideBarRight == "0px" && itemBody == "-270px"){
            sideBarOpen(thisNow);
        }else if(sideBarRight == "270px" && itemBody == "0px"){
            sideBarClose();
        }else if(sideBarRight == "270px" && itemBody == "-270px"){
            sideBarChange(thisNow,itemAll);
        }
    });
    function sideBarOpen (thisNow){
        var sideBar = $('#sideBar');
        var sideBarOpen = "270px";
        var itemBg = "#C40000";
        sideBar.animate({"right":sideBarOpen},"fast");
        thisNow.css({"background-color":itemBg}).find('.item-body').animate({"right":"0"},"fast");
    }
    function sideBarClose (){
        var sideBar = $('#sideBar');
        var sideBarClose = "0px";
        var itemBodyClose = "-270px";
        sideBar.animate({"right":sideBarClose},"fast");
        $('.item').css({"background-color":""}).find('.item-body').animate({"right":itemBodyClose},"fast");
    }
    function sideBarChange (thisNow,thisAll){
        var itemBodyOpen = "0px";
        var itemBodyClose = "-270px";
        var itemBg = "#C40000";
        thisAll.css({"background-color":""}).find('.item-body').animate({"right":itemBodyClose},"fast");
        thisNow.css({"background-color":itemBg}).find('.item-body').animate({"right":itemBodyOpen},"fast");
    }

    /* 关闭首页顶部广告 */
    $('.close-event').on('click', function(){
        $(this).parent().parent().fadeOut(588);
        /* $(this).parent().next().find().addClass("hidden").removeClass("hidden");  // @父辈 parent() @同辈 next()  @儿子 find() */
    });

    /* Top返回顶部 */
    $('#returnTop').click(function(){
        returnTop();
    });
    $(window).on('scroll', function(){
        var returnTop = $('#returnTop');
        var searchBar = $('#searchBar');
        /* scroll-linked 定位 BUG - 待解决 Shadow */
        if($(window).scrollTop() > $(window).height()){
            searchBar.fadeIn();
            returnTop.fadeIn();
        }else{
            searchBar.fadeOut();
            returnTop.fadeOut();
        }
    });
    function returnTop() {
        $('html,body').animate({scrollTop: 0}, 588);
    }
});

/* 首页轮播图 */
$(function() {
    var bannerSlider = new Slider($('#sliderBar'), {
        time: 5000,
        delay: 400,
        event: 'hover',
        auto: true,
        mode: 'fade',
        controller: $('#sliderIndicator'),
        activeControllerCls: 'active'
    });
    $('#sliderBar .slider-prev').click(function() {
        bannerSlider.prev()
    });
    $('#sliderBar .slider-next').click(function() {
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
            } catch (e) { }

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

/* Tab选项卡 */
$(function () {
    var tabTitle = $('.content-focus-right-middle-tab-title li');
    var tabContent = $('.content-focus-right-middle-tab-body ul');
    if (tabTitle.length != tabContent.length){return false;}
    for (var i = 0; i < tabTitle.length; i++){
        tabTitle[i].className=i;
        tabTitle[i].onmouseover = function () {
            var num = this.className;
            tabTitle.eq(num).find('a').css("border-bottom","2px solid #db192b").parent().siblings().find('a').css("border","none");
            tabContent.eq(num).css("display","block").siblings().css("display","none");
        }
    }
});

/* VueJs */
$(function () {
    var vm = new Vue({
        el:"#searchBar",
        data:{
            title:"Hello Vue"
        },
        mounted: function () {
            // console.log('Title is: ' + this.title);
            this.edit();
        },
        methods:{
            edit: function(){
                this.title = "Hello eBestMall";
            }
        }
    });
});

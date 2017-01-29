$(function () {});

/* 侧边栏 */
$(function(){
    /* 页面鼠标点击事件 */
    $(document).click(function whichButton(event)
    {
        var btnNum = event.button;
        if (btnNum==2){ console.log("鼠标右键被点击！");}
        else if(btnNum==0){
            /*鼠标左键被点击*/
            sideBarClose();
        } else if(btnNum==1){console.log("鼠标中键被点击！");} else {console.log("您点击了" + btnNum+ "号键，我不能确定它的名称。");}
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

/* Vue */
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

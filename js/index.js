/**
 * Created by Administrator on 2016/8/27.
 */
$(function(){
    //监控页面滚动事件
    $(window).scroll(function(){
        $(window).scrollTop()>0?$("#header nav").addClass("navScroll"):
            $("#header nav").removeClass("navScroll");
        if ($(window).scrollTop()>0) {
            $('.goTop').show();
        }else{
            $('.goTop').hide();
        }
    });
    //背景图片变换
    (function(){
        setInterval(function(){
            $("#header").hasClass("bg1")?$("#header").removeClass("bg1"):
                $("#header").addClass("bg1");
        },3000);
    })();
    //基本信息部分的展示切换
     $("#info ul li a").click(function(event){
         event.preventDefault();
         var targetID = $(this).attr("href");
         $(targetID).siblings().css({display:"none"});
         $(targetID).fadeIn(500);
     });
    //基本介绍图片点击放大，点击关闭按钮关闭放大页面
    $("#basicInfo .sImg img").click(function(){
        $(".zoomImage").fadeIn();
    });
    $(".zoomImage span").click(function(){
        $(".zoomImage").fadeOut();
    });
    //音乐暂停播放
    $("#aside .media-body span.pause").on("click",function(){
        if($(this).hasClass("glyphicon-pause")){
            $(this).removeClass("glyphicon-pause").addClass("glyphicon-play");
            //音乐暂停移除动画属性
            $("#aside .iconMusic").removeClass("anim");
            $("audio")[0].pause();
        }else{
            $(this).removeClass("glyphicon-play").addClass("glyphicon-pause");
            //音乐播放添加动画属性
            $("#aside .iconMusic").addClass("anim");
            $("audio")[0].play();
        }
    });
    //返回顶部，以滑动效果实现
    $(".goTop").click(function(){

        $("body").animate({scrollTop:"0px"},800);
        //解决火狐和IE浏览器回到页面顶部的兼容性问题
        var top = document.documentElement.scrollTop||document.body.scrollTop;
        $(document.documentElement||document.body||"body").animate({scrollTop:"0px"},800);
    });
});

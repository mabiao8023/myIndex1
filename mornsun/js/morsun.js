$(function(){
    //页脚广告采用面向对象的方式,页脚视频动态
    (function(){
        var adv={
            DISTANCE:0,
            DURATION:1000,
            STEPS:200,
            interval:0,
            step:0,
            moved:0,
            timer:null,
            init:function(){
                this.DISTANCE=parseFloat($("#video").css("height"));
                this.step=this.DISTANCE/this.STEPS;
                this.interval=this.DURATION/this.STEPS;
            },
            start:function(){
                this.init();
                this.timer = setInterval(this.moveUp.bind(this),this.interval);
                $("#video p").on('click',function(){
                    if(this.timer==null) {//防止定时器叠加
                        this.timer = setInterval(this.moveDown.bind(this), this.interval);
                        setTimeout(this.start.bind(this), 5000);
                    }
                }.bind(this));
            },
            moveUp:function(){
                $("#video").css("bottom",parseFloat($("#video").css("bottom"))+this.step+"px");
                this.moved++;
                if(this.moved==this.STEPS)
                {
                    clearInterval(this.timer);
                    this.timer=null;
                    this.moved=0;
                }
            },
            moveDown:function(){
                $("#video").css("bottom",parseFloat($("#video").css("bottom"))-this.step+"px");
                this.moved++;
                if(this.moved==this.STEPS)
                {
                    clearInterval(this.timer);
                    this.timer=null;
                    this.moved=0;
                }
            }
        }
        adv.start();
    })();
    (function(){
        //视频播放操作
        // 如果视频暂定则显示广告图片
        var video=$("#video video");
        //绑定事件监听pause暂停事件
        video.on('pause',function() {
            $("#video img").css({display: "block"});
        });
        video.on('play',function() {
            $("#video img").css({display: "none"});
        });
        video.on('click',function() {
            if(video[0].paused){
                video[0].play();
            }else{
                video[0].pause();
            }
        });
    })();

});

$(function(){
    //图片显示所需要的数据，image以json的格式创建，以便以后从服务器更新数据
    var imgs = [
        {i:1,src:"images/focus1.jpg"},
        {i:2,src:"images/focus2.jpg"},
        {i:3,src:"images/focus3.jpg"},
        {i:4,src:"images/focus4.jpg"},
        {i:5,src:"images/focus5.jpg"}
    ];
    var canAuto = true;
    var timer = null;

    //自动生成focus图中的图片
    (function(){
        for(var i=0,str="";i<imgs.length;i++)
        {
            var img = $("<img />");
            img.attr(
                {"src":imgs[i].src,
                    "i":imgs[i].i
                }
            );
            str += img[0].outerHTML;
        }
        $(".picture").html(str);
        $(".picture img:first-child").addClass("show");
        $(".picture img:not(:first-child)").addClass("hide");
    })();

    //在预览图处生成图片与与标签
    //遍历imgs中的元素，生成HTMl,并设置相关样式
    (function(){
        for(var i=0,str="";i<imgs.length;i++)
        {
            var a = $("<a href='#'></a>");
            a.attr("i",imgs[i].i);
            var img = $("<img />");
            img.attr("src",imgs[i].src);
            a.append(img);
            str += a[0].outerHTML;
        }
        $(".focusBtn").html(str);
        $(".focusBtn a:first-child").addClass("hover");
    })();

    //播放到对应的focus时对应的预览图中显示
    //鼠标点击选取预览图时淡入淡出focus中的图片
    //为预览图中的a绑定鼠标进入事件，并读取该选项的i属性
    $(".focusBtn").on("click","a",function(){
        var i = $(this).attr("i");
        $(".picture img").removeClass("show hide").addClass("hide");
        $(".picture img:nth-child("+i+")").removeClass("hide").addClass("show");
        $(".focusBtn a.hover").removeClass("hover");
        $(".focusBtn a:nth-child("+i+")").addClass("hover");
        //自动轮播暂停，7秒后继续运行
        canAuto = false;
        autoMove();
        if(timer==null){
            timer = setTimeout(function(){canAuto=true;autoMove();},7000);
        }

    });

    //自动轮播focus
    //获取当前的show的图形，一次往后轮换显示
    //声明变量来判断是否可自动播放
    //3秒后调用自动播放函数
    autoMove();
    function autoMove(){
        if(canAuto){
            preImage();
            var i = $(".picture img.show").attr("i")-0;
            $(".picture img").removeClass("show hide").addClass("hide");
            $(".picture img:nth-child("+(i+1)+")").removeClass("hide").addClass("show");
            $(".focusBtn a.hover").removeClass("hover");
            $(".focusBtn a:nth-child("+(i+1)+")").addClass("hover");
            if(i==5){
                $(".picture img").removeClass("show hide").addClass("hide");
                $(".picture img:nth-child(1)").removeClass("hide").addClass("show");
                $(".focusBtn a.hover").removeClass("hover");
                $(".focusBtn a:nth-child(1)").addClass("hover");
            }
            timer = setTimeout(autoMove,3000);
        }else{
            clearTimeout(timer);
            timer = null ;
        }
    }

    function preImage(){
        var height = -parseFloat($(".focusBtn a img").css("height"))+"px";
        $(".focusBtn a img").css({top:height});
    };
    //监控窗口尺寸改变事件，修改预览图的top值
    $(window).resize(preImage);
});

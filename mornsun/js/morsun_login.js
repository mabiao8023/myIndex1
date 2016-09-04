$(function(){
//登录框的弹出
$("#login_btn").click(function(e){
      e.preventDefault();
      $("#login_boxs").show();
    });
//登录验证
$("#login-btn").click(function(){
   var email=$("#loginName").val();
   var psw=$("#loginPsw").val();
     if (email!=""&&psw!="")
     {
        $.post('data/loginReg.php',{email:email,psw:psw},function(data){
               if(data.length>10){
                    $('#login_btn').text("服务器连接失败").css({color:"#ff3300"}); 
                    $("#login_boxs").hide();
               }else{
                   $('#login_btn').text(data+"欢迎您").css({color:"#ff3300"});
                   $("#login_boxs").hide();
               }
                
        });
     }else{
        $('#login-main input').siblings('b').css({color:'red',fontWeight:'normal'}).text("请输入内容");
     }
});

//关闭登录框
$("#clsLg").click(function(){
    $("#login_boxs").hide();
});
//登录失去焦点后需要对其中的内容进行验证
$('#login-main input').on('blur',function(){
    var inputVal=$(this).val();
    var b=$(this).siblings('b').css({color:'red',fontWeight:'normal'});
    if (inputVal=="")
    {
        ($(this).attr('name')=='userName')?b.text("请输入用户名"):
                                            b.text("请输入密码");   
    }else{//验证输入的用户名和密码是否正确
        if($(this).attr('name')=='userName'){
            var regName=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            (!regName.test(inputVal))?
                b.text("用户名邮箱格式错误，请重新输入"):b.text("");
        }else{
            var regPsw=/^[a-z0-9_-]{6,18}$/;
            (!regPsw.test(inputVal))?
                b.text("密码必须是字母、数字和下划线组成的6-18位组合"):b.text("");
        }
    }
});
//15秒注册跳转到注册的页面
$("#jumpRegister").on('click',function(e){
    e.preventDefault();
     $("#register").show();
});
//点击提交后从数据库中查找用户名，然后再返回用户名是否存在
//
//注册信息验证
var registerState1=false;
var registerState2=false;
var registerState3=false;
var registerState4=false;
$('#register').on('blur','input',function(){
    var inputVal=$(this).val();
    var curSib=$(this).siblings('p.error');
    //验证格式的函数，设置样式
    function vailMsg(reg,msg,tips1,tips2){
        if (!reg.test(msg))
            {
                registerState3=false;
                curSib.show().children('span').addClass('err');
                curSib.children('b').text(tips1).css('color','red');
            }else{
                registerState3=true;
                curSib.show().children('span').removeClass('err').addClass('suc');
                curSib.children('b').text(tips2).css('color','#7FDCAC');
            }
    }
    //判断输入框中的内容是否合法
    if (inputVal=="")
    {
        curSib.show().children('span').addClass('err');
        curSib.children('b').text("请输入内容").css('color','red');
    }else{
        //验证邮箱和昵称是否被注册
        var cEmail=$("#r_login_name").val();
        var cuName=$("#r_name").val();
        //给服务器发送请求，获得返回的数据，根据数据查找数据库中是否存在用户
        $.getJSON('data/register.php',{email:cEmail,uName:cuName},function(data){
                if (this.id=="r_login_name")
                {   
                    var reg1=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                    vailMsg(reg1,inputVal,"邮箱格式错误","邮箱输入正确");
                    //判断服务器传回的数据中的邮箱是否在数据库中存在
                    if(data[0].email=="success"){
                        curSib.show().children('span').addClass('err');
                        curSib.children('b').text("该邮箱已被注册,请确认").css('color','red');
                        registerState1=false;
                    }else{
                        registerState1=true;
                    }
                }else if(this.id=="r_name"){
                    var reg2=/^[\u4e00-\u9fa5a-zA-Z0-9_]{3,18}$/;
                    vailMsg(reg2,inputVal,"昵称格式错误","昵称输入正确");
                    //判断昵称是否在数据库中，success表示已经存在
                    if(data[0].username=="success"){
                        curSib.show().children('span').addClass('err');
                        curSib.children('b').text("该昵称已被使用,请重新选择").css('color','red');
                    }else{
                        registerState2=true;
                    }
                }else if(this.id=="r_password")
                {
                    var reg3=/^[a-z0-9_-]{6,18}$/;
                    vailMsg(reg3,inputVal,"密码长度不够","密码可用");

                }else if(this.id=="r_password2"){
                    if ($(this).val()!==$("#r_password").val())
                    {
                        registerState4=false;
                        curSib.show().children('span').addClass('err');
                        curSib.children('b').text("密码与设置密码不一致").css('color','red');
                    }else{
                        //TODO:在数据库访问时查询账号是否存在？
                        curSib.show().children('span').removeClass('err').addClass('suc');
                        curSib.children('b').text("密码一致").css('color','#7FDCAC');
                        registerState4=true;
                    }  
                }
          }.bind(this));
    }
});
//为按钮绑定提交事件
$("#agreeReg").on('click',function(){
    //TODO:需要验证当每个值验证都成功时才能发送
    var newEmail=$("#r_login_name").val();
    var newuName=$("#r_name").val();
    var newPsw=$("#r_password").val();
    if(registerState1&&registerState2&&registerState3&&registerState4)
    {
        
        $("#register-box .submitError").hide();
        $.post('data/registerAdd.php',{email:newEmail,uName:newuName,password:newPsw},function(data){
            if (data=="success")
            {
                $("#closeRegister").show();
                var i=3;
                var timer=setInterval(function(){
                    $("#closeRegister p span").text(i);
                    i--;
                },1000);
                setTimeout(function(){
                    clearInterval(timer);
                    timer=null;
                    $("#register").hide();
                     $("#closeRegister").hide();
                },3000);
                //如果注册成功就显示提示注册成功并关闭注册窗口，转到登录窗口
            }
        });
    }else{
        $("#register-box .submitError").show();
    }

});
//注册窗口关闭事件
$("#clsRg").click(function(){
    $("#register").hide();
});
//注册页面的验证码，对象形式编写
    (function(){
        /**Random Number**/
        function rn(min,max){
            return Math.floor( Math.random()*(max-min)+min );
        }
        /**Random Color**/
        function rc(min,max){
            var r = rn(min,max);
            var g = rn(min,max);
            var b = rn(min,max);
            return "rgb("+r+","+g+","+b+")";
        }
        draw();
        change.onclick = function(e){
            e.preventDefault();
            draw();
        }

        /**绘制验证码图片**/
        function draw(){
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';
            /**绘制背景色**/
            ctx.fillStyle = rc(180,240);
            ctx.fillRect(0,0,canvas.width,canvas.height);
            /**绘制文字**/
            var str = 'ABCEFGHJKLMNPQRSTWXY3456789';
            for(var i=0; i<5; i++){
                var txt = str[rn(0,str.length)];
                ctx.fillStyle = rc(50,160);
                ctx.font = rn(15,40)+'px SimHei';
                var x = 15+i*20;
                var y = rn(25,45);
                var deg = rn(-45, 45);
                //修改坐标原点和旋转角度
                ctx.translate(x,y);
                ctx.rotate(deg*Math.PI/180);
                ctx.fillText(txt,0,0);
                //恢复坐标原点和旋转角度
                ctx.rotate(-deg*Math.PI/180);
                ctx.translate(-x,-y);
            }
            /**绘制干扰线**/
            for(var i=0; i<8; i++){
                ctx.strokeStyle = rc(40,180);
                ctx.beginPath();
                ctx.moveTo( rn(0,canvas.width), rn(0,canvas.height) );
                ctx.lineTo( rn(0,canvas.width), rn(0,canvas.height) );
                ctx.stroke();
            }
            /**绘制干扰点**/
            for(var i=0; i<100; i++){
                ctx.fillStyle = rc(0,255);
                ctx.beginPath();
                ctx.arc(rn(0,canvas.width),rn(0,canvas.height), 1, 0, 2*Math.PI);
                ctx.fill();
            }
        }
    })();

//$结束
});
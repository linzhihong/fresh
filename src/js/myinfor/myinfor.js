System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
		
		mui("body").on("tap",".update",function(){		
			if($("#ul").css('display')=="block"){
				$(".update").html("取消");
				$("#ul").css("display","none");
				$("#form").css("display","block");
			}else{
				$(".update").html("修改");
				$("#ul").css("display","block");
				$("#form").css("display","none");
			}			
		})
	})
	service.doService(service.getSysLogList,function(data){
		if(data.res=="suc"){
			$("#userphone").html("联系电话："+data.userPhone);
			var myTemplate=System.getComponent("#myTemplate");
		    myTemplate.data={list:data.data};
		    myTemplate.init();
		    $("body").css("display","block");
		}else{
			alert("服务器出错了，请稍后重试！");
		}
	})
})
//验证手机号
function validateTel(jqForm,dom){
	if(!dom.value.Trim().yanzheng('shoujihaoma')){
		return "请输入正确的手机号";
	}
}
//获取验证码的方法
function getYzm(){
	var tel = $('#tel');
	if(!tel.val().yanzheng('shoujihaoma')){
		System.toast("请输入正确的手机号")
		tel.focus();
		return;
	}
	service.getCode.mobile = $('#tel').val();
	service.doService(service.getCode,function(data){
		if(data.res=="suc"){						
			alert("验证码发送成功");						
			$("#hqyzm").attr("disabled","disabled");
			$("#hqyzm").css("background","#eeeeee");
		}else{
			alert("获取验证码失败");
		}
	})
}

//点击完成修改
function reg(){
	var tel = document.getElementById("tel").value;
    var yzm = document.getElementById("yzm").value;
    if(!tel.yanzheng('shoujihaoma')){
		System.toast('请输入正确的手机号码');
		$('#tel').focus();
		return;
	}else if(yzm == ''){
        System.toast('验证码不能为空');
        return;
   }else{
    	//获取手机号码和验证码
    	service.register.phone = tel;
    	service.register.msgCode = yzm;
   		service.doService(service.register,function(data){
			if(data.res=="suc"){						
				$('#dialog').css({
					zIndex:System.getMaxzIndex()
				})
				$('#dialog').show(); 
				var i=3;
			    var countdown = null;
			    function timeShow(){
			        i--;
			        $(".dialog .countdown").html("("+i + "s)");
			        if(i<1){
			            clearInterval(countdown);
			            refresh();
			        }
			    };
			    countdown = setInterval(timeShow,1000);
			}else{
				alert("修改失败");
				$('#yzm').val()="";
				$("#hqyzm").removeAttr("disabled");
				$("#hqyzm").css("background","#f08300");
    		}
		})
   	}
}
//关闭弹框，刷新页面
function refresh(){
	$('#dialog').hide();  
    System.openWindow(openWinPath+'/html/myinfor/myinfor.html');
}

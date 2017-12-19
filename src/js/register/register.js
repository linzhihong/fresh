require(["mui"],function(mui){
	mui.init({
		swipeBack:true //启用右滑关闭功能
	});
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

//点击完成注册
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
				$("#form").hide();
				$("#res").css("display","block");
				var i=2;
		        var countdown = null;
		        function timeShow(){
		            i--;
			        if(i<1){
			            clearInterval(countdown);		
		                System.openWindow(openWinPath+'/html/confirmpostthing.html');
		            }
		        };
		        countdown = setInterval(timeShow,1000);
			}else{
				alert("注册失败");
				$('#yzm').val()="";
				$("#hqyzm").removeAttr("disabled");
				$("#hqyzm").css("background","#f08300");
    		}
		})
   	}
}
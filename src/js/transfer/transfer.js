var zsbalance;//转送余额	
System.ready(function(){
	service.doService(service.getBalance,function(data){
		if(data.res=="suc"){
			zsbalance=data.data.balance;					
		}else{
			//其他错误
			alert("服务器出错了，请稍后重试！");
		}
	})
})
require(["mui"],function(mui){
	mui.init({
		swipeBack:true //启用右滑关闭功能
	});
})
function showdg(){
	if($("#tel").val()==""){
		alert("手机号码不许为空");
	}else if(validateTel($("#tel").val())==false){
		alert("手机格式不准确");
	}else{
		//获取转赠对象的手机号
    	service.giveBalance.phone =$("#tel").val();
    	service.doService(service.giveBalance,function(data){
			if(data.res=="suc"){						
				//当钱包有余额的时候并且该手机号码是冰小柜用户
				$('#dialog').css({
					zIndex:System.getMaxzIndex()
				})
				$('#dialog').show();
				$("#pd").html("您的余额"+zsbalance+"元已经转送给用户"+$("#tel").val());
				var i=5;
		        var countdown = null;
		        function timeShow(){
		            i--;
		            $(".dialog .countdown").html("("+i + "s)");
		            if(i<1){
		                clearInterval(countdown);
						System.openWindow(openWinPath+'/html/mywallet/mywallet.html');				
		            }
		        };
		        countdown = setInterval(timeShow,1000);
			}else if(data.res=="fail"&&data.msg=="register"){
				//当钱包有余额的时候但该手机号码不是冰小柜用户
				$('#dialog1').css({
					zIndex:System.getMaxzIndex()
				})
				$('#dialog1').show();
				$("#pd1").html("您的朋友"+$("#tel").val()+"现在还不是冰小柜用户,把'冰小柜'推荐给TA");
			}else{
			//其他错误
				alert("服务器出错了，请稍后重试！");
    		}
		})
	}
	
}
//关闭弹出框
function closediv(){
	$('#dialog').hide();
	$('#dialog1').hide();
	$('#dialog2').hide();
}

//		确定推荐
function confirmRecommend(){
	closediv();
	service.sendNotice.mobile=$("#tel").val();
	service.doService(service.sendNotice,function(data){
		if(data.res=="suc"){
			$('#dialog2').css({
				zIndex:System.getMaxzIndex()
			})
			$('#dialog2').show();
			$("#pd2").html("我们已经通知"+$("#tel").val()+",你也不要忘记提醒TA哦");
			var i=5;
	        var countdown = null;
	        function timeShow(){
	            i--;
	            $(".dialog2 .countdown").html("("+i + "s)");
	            if(i<1){
	                clearInterval(countdown);
					System.openWindow(openWinPath+'/html/mywallet/mywallet.html');				
	            }
	        };
	        countdown = setInterval(timeShow,1000);										
		}else{
			//其他错误
			alert("服务器出错了，请稍后重试！");
		}
	})			
}		
//验证手机号码
function validateTel(v){
	if(/^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(v)){
		$("#rightimg").css("display","inline-block");
		$("#rightimg").animate({height:"20px",width:"20px"},200);
		return true;
	}else{
		$("#rightimg").css("display","none");
		return false;
	}
}
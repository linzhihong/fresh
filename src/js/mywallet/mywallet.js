System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
	service.doService(service.getBalance,function(data){
		if(data.res=="suc"){
			if(data.data.balance=="0"){
				$("#balance").html("0");
				$("#reserveBalance").html("0");
				$("#giveTime").html("0");
			}else if(data.data.balance>"0"&&data.data.balance<"10"){
				$("#balance").html("0");
				$("#reserveBalance").html(data.data.balance);
				$("#giveTime").html("0");
			}else{
				$("#balance").html(data.data.balance-data.data.reserveBalance);
				$("#reserveBalance").html(data.data.reserveBalance);
				$("#giveTime").html(data.data.giveTime);
			}	
			$("body").css("display","block");
		}else{
			//其他错误
			alert("服务器出错了，请稍后重试！");
		}
	})
})

function showdg(){
	service.doService(service.getBalance,function(data){
		if(data.res=="suc"){
//			var totalBalance=data.data.balance+data.data.reserveBalance;
			if(data.data.balance>0){
				//当用户钱包有余额的时候
				$('#dialog').css({
					zIndex:System.getMaxzIndex()
				})
				$('#dialog').show(); 
				$("#pd").html("当前钱包总额为"+data.data.balance+"元");
			}else{
				//当用户钱包余额为0的时候
				$('#dialog1').css({
					zIndex:System.getMaxzIndex()
				})
				$('#dialog1').show();
				var i=5;
		        var countdown = null;
		        function timeShow(){
		            i--;
		            $(".dialog1 .countdown").html("("+i + "s)");
		            if(i<1){
		                clearInterval(countdown);
						closediv();				
		            }
		        };
		        countdown = setInterval(timeShow,1000);
			}
		}else{
		//其他错误
			alert("服务器出错了，请稍后重试！");
		}
	})
}
function closediv(){
	$('#dialog').hide(); 
	$('#dialog1').hide(); 
}
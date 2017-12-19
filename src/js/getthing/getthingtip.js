System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
	var index=System.getExtras().index;
	var orderSn=System.getExtras().orderSn;
	var devAddr=System.getExtras().devAddr;
	console.log(index,orderSn,devAddr);
	$("#pd").html('你要结束订单'+index+'(订单号:'+orderSn+')取出'+devAddr+'中所有物品吗');
	$("body").css("display","block");
})
//确认取出所有物品
function confirm(){			
	//获取订单号
	service.endOrder.orderSn =System.getExtras().orderSn;
	service.doService(service.endOrder,function(data){
		if(data.res=="suc"){
		//当钱包余额充足
			$("#pd1").html(System.getExtras().devAddr+'柜门已打开,请取出所有物品，关好柜门。');
			$('#dialog').css({
				zIndex:System.getMaxzIndex()
			})
			$('#dialog').show();
			var i=30;
		    var countdown = null;
		    function timeShow(){
		        i--;
		        $(".dialog .countdown").html("("+i + "s)");
		        if(i<1){
		            clearInterval(countdown);
		            closediv();	              
		            System.openWindow(openWinPath+'/html/getthing/getthing.html');
		        }
		    };
		    countdown = setInterval(timeShow,1000);
		}else if(data.res=="fail"&&data.msg=="recharge"){
		//当钱包总额少于备用金10元+实际消费额
			System.openDivPage('#page');
		}else{
		//其他错误
			alert("服务器出错了，请稍后重试！");
		}
	})
}

//关闭弹框
function closediv(){  
    $('#dialog').hide();
    System.openWindow(openWinPath+'/html/getthing/getthing.html');
}

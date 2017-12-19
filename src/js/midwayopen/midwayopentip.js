System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
//	var index=System.getExtras().index;
//	var orderSn=System.getExtras().orderSn;
//	var devAddr=System.getExtras().devAddr;
//	console.log(index,orderSn,devAddr);
//	$("#pd").html('你要打开订单'+index+'(订单号:'+orderSn+')取出'+devAddr+'柜门吗');
//	$("body").css("display","block");
$("#pd").html('你要打开订单'+"福建师范大学信息机"+'(订单号:'+"123456789"+')取出'+"5号"+'柜门吗');
	$("body").css("display","block");
})
//	    确定存/取部分物品
function confirm(){
	$("#pd1").html('福建师范大学信息机柜门已打开,请存入/取出物品，关好柜门。');
			$('#dialog').css({
				zIndex:System.getMaxzIndex()
			})
			$('#dialog').show();
//	//获取订单号
//	service.midOpenBox.orderSn =System.getExtras().orderSn;
//	service.doService(service.midOpenBox,function(data){
//		if(data.res=="suc"){
//		//当钱包余额充足
//			$("#pd1").html(System.getExtras().devAddr+'柜门已打开,请存入/取出物品，关好柜门。');
//			$('#dialog').css({
//				zIndex:System.getMaxzIndex()
//			})
//			$('#dialog').show();
//			var i=30;
//		    var countdown = null;
//		    function timeShow(){
//		        i--;
//		        $(".dialog .countdown").html("("+i + "s)");
//		        if(i<1){
//		            clearInterval(countdown);
//		            closediv();	              
//		            System.openWindow(openWinPath+'/html/midwayopen/midwayopen.html');
//		        }
//		    };
//		    countdown = setInterval(timeShow,1000);
//		}else if(data.res=="fail"&&data.msg=="recharge"){
//		//当钱包总额少于备用金10元+实际消费额
//			System.openDivPage('#page');
//		}else{
//		//其他错误
//			alert("服务器出错了，请稍后重试！");
//		}
//	})
}

//关闭弹框
function closediv(){  
    $('#dialog').hide();
    System.openWindow(openWinPath+'/html/midwayopen/midwayopen.html');
}
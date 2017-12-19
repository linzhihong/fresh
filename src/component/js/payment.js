var payAction = {
	//wxTstOrder:'{"sign":"A277C372BBA034D3D18C32E76031D3E9","timestamp":"1470120487","noncestr":"3sjm2p2gbtu98w84l9b8keqjikgkbyg0","partnerid":"1366986702","prepayid":"wx201608021448088e77949d260844022007","package":"Sign=WXPay","appid":"wx723f3be1d1b3868c"}',
	//wxTstOrder:'{"appid":"wx0411fa6a39d61297","noncestr":"BqFyRZcDDwSB9aWE","package":"Sign=WXPay","partnerid":"1230636401","prepayid":"wx2016103109225174c7a7ed920622157393","timestamp":1477876971,"sign":"71CB24C65555052635315002C1B6E16D"}',
	wxTstOrder:'{"sign":"EEECFB6B49774F3B4C9F968A035A9FD3","timestamp":1477877359,"noncestr":"0a3skqb4tx8tvgitipevxrxgb6rroil3","partnerid":"1366986702","prepayid":"wx20161031092918aa4448a2170427606128","package":"Sign=WXPay","appid":"wx723f3be1d1b3868c"}',
	aliTstOrder:'partner=\"2088811280712127\"&seller_id=\"2088811280712127\"&out_trade_no=\"201608048080\"&subject=\"阿土伯订单16072813938\"&body=\"阿土伯订单16072813938\"&total_fee=\"18.00\"&notify_url=\"http://keyurong.wicp.net/leShop/app/pay/alipay/notify/general/201608048080.jhtml\"&service=\"mobile.securitypay.pay\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"30m\"&return_url=\"m.alipay.com\"&sign=\"80dDJXHuV1%2FYWfVCxo9N%2BnPxC98BzqegPy9oV0tdpLEa5F1S2GGHmdXxDPnewi3zhZWBj%2FzUnupptGl2RWEBSI01XhySP%2BvY%2FPcmLbHlly9c6RyIRsFzvKPLFpmAyZe3CFbgFC5ixWZ%2BSfMJUjXvUbO5nfVQLWTOHyCQM33zllo%3D\"&sign_type=\"RSA\"',
	pay:function(id,order,success,error){
		window['paySuccess'] = success||function(){};
		window['payError'] = error||function(){};
		if(!order&&id=='wxpay'){
			order = this.wxTstOrder;
		}
		if(!order&&id=='alipay'){
			order = this.aliTstOrder;
		}
		if(typeof window.plus == 'undefined'){
			return;
		}
		//获取支付通道
		getChannels(id,order);
	}
}

//支付流程
//1.获取支付通道
function getChannels(id,order){
	// 扩展API加载完毕，现在可以正常调用扩展API
	plus.payment.getChannels( function(s){
		//alert(JSON.stringify(s));
		payment(id,order,s);
	}, function(e){
		plus.nativeUI.alert( "获取支付通道列表失败："+e.message );
	} );
}
//2.支付请求
function payment(pWay,order,s){
//	//成功和失败回调方法
//	var paySuccess = window['paySuccess'];
//	var payError = window['payError'];
//	if(typeof paySuccess == 'undefined'){
//		paySuccess = function(){}
//	}
//	if(typeof payError == 'undefined'){
//		payError = function(){}
//	}
	var pays = {};
	console.log(JSON.stringify(s));
	var pdata = null;
	if(pWay=='alipay'||pWay=='wxpay'){
		for(var i in s){
			pays[s[i].id] = s[i];
		}
	}else{
		plus.nativeUI.alert("当前环境不支持此支付通道！");
		return;
	}
	if(pWay=='alipay'){
		//order = 'partner=\"2088811280712127\"&seller_id=\"2088811280712127\"&out_trade_no=\"201608048080\"&subject=\"阿土伯订单16072813938\"&body=\"阿土伯订单16072813938\"&total_fee=\"18.00\"&notify_url=\"http://keyurong.wicp.net/leShop/app/pay/alipay/notify/general/201608048080.jhtml\"&service=\"mobile.securitypay.pay\"&payment_type=\"1\"&_input_charset=\"utf-8\"&it_b_pay=\"30m\"&return_url=\"m.alipay.com\"&sign=\"80dDJXHuV1%2FYWfVCxo9N%2BnPxC98BzqegPy9oV0tdpLEa5F1S2GGHmdXxDPnewi3zhZWBj%2FzUnupptGl2RWEBSI01XhySP%2BvY%2FPcmLbHlly9c6RyIRsFzvKPLFpmAyZe3CFbgFC5ixWZ%2BSfMJUjXvUbO5nfVQLWTOHyCQM33zllo%3D\"&sign_type=\"RSA\"';
		//order = 'service="mobile.securitypay.pay"&partner="2088801273866834"&_input_charset="UTF-8"&out_trade_no="20160803143701"&subject="DCloud项目捐赠"&payment_type="1"&seller_id="payservice@dcloud.io"&total_fee="1"&body="DCloud致力于打造HTML5最好的移动开发工具，包括终端的Runtime、云端的服务和IDE，同时提供各项配套的开发者服务。"&it_b_pay="1d"&notify_url="http%3A%2F%2Fdemo.dcloud.net.cn%2Fhelloh5%2Fpayment%2Fnotify.php"&show_url="http%3A%2F%2Fdemo.dcloud.net.cn%2Fhelloh5%2Fpayment%2F"&sign="Uib6hVfkMq3La8lPSgO5wY41ZQ8osSo8C%2FdSQemHz96MdEHpQjused74zkMAQ5rC76wwEM75CLw%2BY3eWCHjyBlJ88nZgtfQOR0oPnJAKv1OHz3DM5WuWkNmtP%2BxyyJcmbZE3hPLLzrwhFyIThb6hzREPLgz5PJlaCXl8jT8E0%2Bg%3D"&sign_type="RSA"';
	}
	if(pWay=='wxpay'){
		order = JSON.parse(order);
	}
	//检测是否安装支付服务
	checkServices(pays[pWay],function(){
//		alert(JSON.stringify(pays[pWay])+':::'+order);
		plus.payment.request(pays[pWay],order,function(result){
			//支付成功后执行的方法	
			window['paySuccess']();
//			System.alert({
//				msg:'支付成功',
//				title:'支付提示',
//				btn:"确定",
//				callback:function(){
//					//支付成功后执行的方法	
//					window['paySuccess']();
//				}
//			})
//			plus.nativeUI.alert("支付成功",function(){
//				//支付成功后执行的方法	
//				window['paySuccess']();
//			},"");
		},function(e){
			//plus.nativeUI.alert("支付失败\n"+e.message,function(){
				window['payError'](e);
			//},"支付失败");
			console.log(e.code+'\n'+e.message);
		});
	})
}

// 检测是否安装支付服务
function checkServices(pc,callback){
//			alert(JSON.stringify(pc));
	if(!pc.serviceReady){
		var txt=null;
		switch(pc.id){
			case "alipay":
			txt="检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？";
			break;
			default:
			txt="系统未安装“"+pc.description+"”服务，无法完成支付，是否立即安装？";
			break;
		}
		plus.nativeUI.confirm(txt,function(e){
			if(e.index==0){
				pc.installService();
			}
		},pc.description);
	}else{
		callback();
	}
}
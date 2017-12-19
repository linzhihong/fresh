System.ready(function(){
	require(['mui'],function(mui){
		mui.init({
			swipeBack:true
		});
	})
	//初始页面获取微信扫码所需要的参数
	service.doService(service.getScanInitData,function(data){
		if(data.res=="suc"){						
			if(isWeiXin()){
		   	    wx.config({
		   		    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		   		    appId: JSON.parse(data.data).appid, // 必填，公众号的唯一标识
		   		    timestamp: JSON.parse(data.data).timestamp, // 必填，生成签名的时间戳
		   		    nonceStr: JSON.parse(data.data).nonceStr, // 必填，生成签名的随机串
		   		    signature: JSON.parse(data.data).signature,// 必填，签名，见附录1
		   		    jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		   		});
		   		wx.ready(function(){
		   			scan();
		   		});
    	    }		
		}else{
			alert("服务器出错了，请稍后重试！");
		}
	})
})
function isWeiXin(){ 
	var ua = window.navigator.userAgent.toLowerCase(); 
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
		return true; 
	}else{ 
		return false; 
	} 
}

function scan(){
	alert("准备开始扫码！");		
    wx.scanQRCode({
        // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        needResult : 1,
        desc : 'scanQRCode desc',
        success : function(res) {
        	console.log(res);                    	
            service.goDepositPage.qrCodeUrl = res.resultStr;
	    	service.doService(service.goDepositPage,function(data){
				if(data.res=="suc"){						
					//扫码成功跳转到箱格页面
					System.openWindow(openWinPath+'/html/postthing/postthing.html');
				}else{
					alert("服务器出错了，请稍后重试！");
	    		}
			})
        }
    });
}

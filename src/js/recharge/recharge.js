var Type=1;//充值金额
System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
	var obj1=new Object();//type=1
    var obj2=new Object();//type=2
    var obj3=new Object();//type=3
    var obj4=new Object();//type=4
	service.doService(service.getRechargeConfig,function(data){
		if(data.res=="suc"){
			var len=data.data.length;
		    var myArray=new Array();
		    for(var i=0;i<len;i++){		    	
		    	var je=new Object();
				je.type=data.data[i].type;
				je.price=data.data[i].price;
				je.give=data.data[i].give;
				myArray.push(je);		    	
		    }		    		    
		    var myTemplate=System.getComponent("#myTemplate");
		    myTemplate.data={list:myArray};
		    myTemplate.init();
		    $("body").css("display","block");
		    for(var i=0;i<len;i++){
		    	if(data.data[i].type=="1"){
		    		obj1.openid=data.data[i].wxObj.openid;
		    		obj1.orderNo=data.data[i].wxObj.orderNo;
		    		obj1.appid=data.data[i].wxObj.appid;
		    		obj1.timestamp=data.data[i].wxObj.timestamp;
		    		obj1.nonceStr=data.data[i].wxObj.nonceStr;
		    		obj1.paySign=data.data[i].wxObj.paySign;
		    		obj1.packageValue=data.data[i].wxObj.packageValue;
		    	}else if(data.data[i].type=="2"){
		    		obj2.openid=data.data[i].wxObj.openid;
		    		obj2.orderNo=data.data[i].wxObj.orderNo;
		    		obj2.appid=data.data[i].wxObj.appid;
		    		obj2.timestamp=data.data[i].wxObj.timestamp;
		    		obj2.nonceStr=data.data[i].wxObj.nonceStr;
		    		obj2.paySign=data.data[i].wxObj.paySign;
		    		obj2.packageValue=data.data[i].wxObj.packageValue;
		    	}else if(data.data[i].type=="3"){
		    		obj3.openid=data.data[i].wxObj.openid;
		    		obj3.orderNo=data.data[i].wxObj.orderNo;
		    		obj3.appid=data.data[i].wxObj.appid;
		    		obj3.timestamp=data.data[i].wxObj.timestamp;
		    		obj3.nonceStr=data.data[i].wxObj.nonceStr;
		    		obj3.paySign=data.data[i].wxObj.paySign;
		    		obj3.packageValue=data.data[i].wxObj.packageValue;
		    	}else if(data.data[i].type=="4"){
		    		obj4.openid=data.data[i].wxObj.openid;
		    		obj4.orderNo=data.data[i].wxObj.orderNo;
		    		obj4.appid=data.data[i].wxObj.appid;
		    		obj4.timestamp=data.data[i].wxObj.timestamp;
		    		obj4.nonceStr=data.data[i].wxObj.nonceStr;
		    		obj4.paySign=data.data[i].wxObj.paySign;
		    		obj4.packageValue=data.data[i].wxObj.packageValue;
		    	}     	
		    }
		}else{
			//其他错误
			alert("服务器出错了，请稍后重试！");
		}
	})
	
	mui("body").on("tap",".recharge_btn",function(){
		if(Type=="1"){
//			alert(obj1.appid);
//			alert(obj1.timestamp);
//			alert(obj1.nonceStr);
//			alert(obj1.packageValue);
//			alert(obj1.paySign);
			WX(obj1);
		}else if(Type=="2"){
//			alert(obj2.appid);
//			alert(obj2.timestamp);
//			alert(obj2.nonceStr);
//			alert(obj2.packageValue);
//			alert(obj2.paySign);
			WX(obj2);
		}else if(Type=="3"){
//			alert(obj3.appid);
//			alert(obj3.timestamp);
//			alert(obj3.nonceStr);
//			alert(obj3.packageValue);
//			alert(obj3.paySign);
			WX(obj3);
		}else{
//			alert(obj4.appid);
//			alert(obj4.timestamp);
//			alert(obj4.nonceStr);
//			alert(obj4.packageValue);
//			alert(obj4.paySign);
			WX(obj4);
		}	
	})
})
//修改充值金额
function ChAmount(e,type){			
	var btn=document.getElementsByClassName("btn_class");
	if(e.style.background!="#f08300"){
		for(var i=0;i<btn.length;i++){
			btn[i].style.background="#ffffff";
		}
		e.style.background="#f08300";				
	}
	Type=type;
}
function WX(obj){
	WeixinJSBridge.invoke(
	   'getBrandWCPayRequest', {
	       "appId":obj.appid,     //公众号名称，由商户传入     
	       "timeStamp":obj.timestamp,         //时间戳，自1970年以来的秒数     
	       "nonceStr":obj.nonceStr, //随机串     
	       "package":obj.packageValue,     
	       "signType":"MD5",         //微信签名方式：     
	       "paySign":obj.paySign//微信签名 
	    },
	    function(res){  
	        if(res.err_msg == "get_brand_wcpay_request:ok" ) { // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	    	   alert("支付成功");
	    	   System.openWindow(openWinPath+'/html/mywallet/mywallet.html');
	        }else if(res.err_msg == "get_brand_wcpay_request:fail"){
	    	   alert("支付失败");      	   
	        }    
	    }
	);
}

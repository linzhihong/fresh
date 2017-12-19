System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
	//获取当前订单
	service.doService(service.getOrderList,function(data){
		if(data.res=="suc"){			
			if(data.data.length=="0"){
				$(".present_order .ul1").css("height","20px");
				$(".present_order .noscore").css("display","block");
			}else{
				var myTemplate=System.getComponent("#myTemplate");
			    myTemplate.data={list:data.data};
			    myTemplate.init();
			}		
			$("body").css("display","block");
		}else{
			alert("服务器出错了，请稍后重试！");
		}
	})
//			获取历史订单
	service.doService(service.getOldOrderList,function(data){
		if(data.res=="suc"){
			if(data.data.length=="0"){
				$(".history_order .ul1").css("height","0px");
				$(".history_order .noscore").css("display","block");
			}else{
				$(".history_order .ul1").css("height","0px");
				var myTemplate=System.getComponent("#myTemplate1");
			    myTemplate.data={list:data.data};
			    myTemplate.init();
			}		    
		}else{
			alert("服务器出错了，请稍后重试！");
		}
	})
	//当前订单的伸缩
	mui("body").on("tap",".getmore a",function(){
		if($(".present_order .ul1").height()=="20"){
			return;
		}else if($(".present_order .ul1").height()=="169"){
			$(".present_order .ul1").css("height","auto");
			$(".history_order .ul1").css("height","0px");
			$("#img").attr('src',"../../img/myorder/shousuo.png");
			$("#img1").attr('src',"../../img/myorder/zhankai.png"); 
		}else{
			$(".present_order .ul1").css("height","169px");
			$("#img").attr('src',"../../img/myorder/zhankai.png"); 
		}

	})
	
	//历史订单的伸缩
	mui("body").on("tap",".getmore1 a",function(){
		if($(".history_order .ul1").height()!="0"){
			if($(".present_order .ul1").height()=="20"){
				$("#img").attr('src',"../../img/myorder/shousuo.png"); 
				$(".present_order .ul1").css("height","20px");
			}else{
				$(".present_order .ul1").css("height","169px");
				$("#img").attr('src',"../../img/myorder/zhankai.png"); 
			}					
			$(".history_order .ul1").css("height","0px");		
			$(".history_order .noscore").css("display","none");
			$("#img1").attr('src',"../../img/myorder/zhankai.png"); 
		}else if($(".history_order .noscore").css("display")=="none"){
			$(".history_order .ul1").css("height","auto");			
			$("#img1").attr('src',"../../img/myorder/shousuo.png"); 
		}else{
			$(".history_order .ul1").css("height","none");
			$(".history_order .noscore").css("display","block");
			$("#img1").attr('src',"../../img/myorder/shousuo.png"); 
		}				
	})	
})
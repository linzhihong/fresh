System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
	service.doService(service.getOrderList,function(data){
		if(data.res=="suc"){
			if(data.data.length=="0"){
				$(".noscore").css("display","block");
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
})
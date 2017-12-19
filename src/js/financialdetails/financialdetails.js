System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
	var h=document.documentElement.clientHeight;
	div1=document.getElementById("item1mobile");					
	div1.style.height=(h-85)+"px";
	div2=document.getElementById("item2mobile");
	div2.style.height=(h-85)+"px";	
	div3=document.getElementById("item3mobile");
	div3.style.height=(h-85)+"px";
			
	
	service.doService(service.getLogCostList,function(data){
		if(data.res=="suc"){
			var xfArray=new Array();
			var czArray=new Array();
			var zsArray=new Array();
			var len=data.data.length;
//					console.log(data.data.length);					
//					console.log(data.data[0]);
//					console.log(data.data[0].costType);
			for(var i=0;i<len;i++){
				if(data.data[i].costType=="0"){
					var xf=new Object();
					xf.orderSn=data.data[i].orderSn;
					xf.title="租赁消费";
					xf.cost=data.data[i].cost;
					xf.saveTime=data.data[i].saveTime;
					xfArray.push(xf);
				}else if(data.data[i].costType=="1"){
					var cz=new Object();
					cz.orderSn=data.data[i].orderSn;
					cz.title="充值";
					cz.cost=data.data[i].cost;
					cz.saveTime=data.data[i].saveTime;
					czArray.push(cz);
				}else if(data.data[i].costType=="2"){
					var zs=new Object();
					zs.title="转送";
					zs.toUserPhone=data.data[i].toUserPhone;
					zs.cost=data.data[i].cost;
					zs.saveTime=data.data[i].saveTime;
					zsArray.push(zs);
				}else{
					var xf=new Object();
					xf.orderSn=data.data[i].orderSn;
					xf.title="系统扣款";
					xf.cost=data.data[i].cost;
					xf.saveTime=data.data[i].saveTime;
					xfArray.push(xf);
				}
			}
			//消费明细
			if(xfArray.length=="0"){
				$("#item1mobile .getmore").hide();
				$("#item1mobile .noscore").css("display","block");
			}else if(xfArray.length>"0"&&xfArray.length<="2"){
				$("#item1mobile .getmore").hide();
				var myTemplate=System.getComponent("#myTemplate");
			    myTemplate.data={list:xfArray};
			    myTemplate.init();
			}else{
				var myTemplate=System.getComponent("#myTemplate");
			    myTemplate.data={list:xfArray};
			    myTemplate.init();
			}
			
			//充值明细
			if(czArray.length=="0"){
				$("#item2mobile .getmore").hide();
				$("#item2mobile .noscore").css("display","block");
			}else if(czArray.length>"0"&&czArray.length<="2"){
				$("#item2mobile .getmore").hide();
				var myTemplate1=System.getComponent("#myTemplate1");
			    myTemplate1.data={list:czArray};
			    myTemplate1.init();	
			}else{
				var myTemplate1=System.getComponent("#myTemplate1");
			    myTemplate1.data={list:czArray};
			    myTemplate1.init();	
			}
			
			//转送明细
			if(zsArray.length=="0"){
				$("#item3mobile .getmore").hide();
				$("#item3mobile .noscore").css("display","block");
			}else if(zsArray.length>"0"&&zsArray.length<="2"){
				$("#item3mobile .getmore").hide();
				var myTemplate2=System.getComponent("#myTemplate2");
			    myTemplate2.data={list:zsArray};
			    myTemplate2.init();
			}else{
				var myTemplate2=System.getComponent("#myTemplate2");
			    myTemplate2.data={list:zsArray};
			    myTemplate2.init();
			}
			$("body").css("display","block");				    
		}else{
			alert("服务器出错了，请稍后重试！");
		}
	})
	
	
	mui("body").on("tap","#item1mobile .getmore",function(){
		$("#item1mobile ul").css("height","auto");
		$(this).hide();
	})
	
	mui("body").on("tap","#item2mobile .getmore",function(){
		$("#item2mobile ul").css("height","auto");
		$(this).hide();
	})
	
	mui("body").on("tap","#item3mobile .getmore",function(){
		$("#item3mobile ul").css("height","auto");
		$(this).hide();
	})
})
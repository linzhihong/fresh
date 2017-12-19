System.ready(function(){
	require(["mui"],function(mui){
		mui.init({
			swipeBack:true //启用右滑关闭功能
		});
	})
	service.getDevInfo.listenReload = true;//说明这个service方法允许监听reloadPage方法
	service.doService(service.getDevInfo,function(data){
		if(data.res=="suc"){						
//			console.log(JSON.parse(data.data))
		    //JSON.parse(data.data)  通过接口获取到的数组对象（boxStatus，boxNum）
		    var len=JSON.parse(data.data).length;
		    var myArray=new Array()
		    for(var i=0;i<len;i++){				    	
		    	if(JSON.parse(data.data)[i].boxStatus=="1"){
		    		var xg=new Object();
					xg.boxStatus=JSON.parse(data.data)[i].boxStatus;
					xg.title="已占用";
					xg.boxNum=JSON.parse(data.data)[i].boxNum;
					xg.boxGroupId=JSON.parse(data.data)[i].boxGroupId;
					xg.color="red";
					myArray.push(xg);
		    	}else if(JSON.parse(data.data)[i].boxStatus=="2"){
		    		var xg=new Object();
					xg.boxStatus=JSON.parse(data.data)[i].boxStatus;
					xg.title="故障";
					xg.boxNum=JSON.parse(data.data)[i].boxNum;
					xg.boxGroupId=JSON.parse(data.data)[i].boxGroupId;
					xg.color="#cccccc";
					myArray.push(xg);
		    	}else{
		    		var xg=new Object();
					xg.boxStatus=JSON.parse(data.data)[i].boxStatus;
					xg.title="闲置(可用)";
					xg.boxNum=JSON.parse(data.data)[i].boxNum;
					xg.boxGroupId=JSON.parse(data.data)[i].boxGroupId;
					xg.color="green";
					myArray.push(xg);
		    	}				    	
		    }
		    var myTemplate=System.getComponent("#myTemplate");
		    myTemplate.data={list:myArray};
		    myTemplate.init();
		    $("body").css("display","block");
		}else{
			alert("服务器出错了，请稍后重试！");
		}
	})
})

var boxnum;//箱格号
var boxgroupId;//副柜号
//确定箱格  弹框
function showdg(boxNum,boxStatus,boxGroupId){
	if(boxNum<100&&boxStatus=="0"){
//				console.log(boxNum,boxGroupId);
		boxnum=boxNum;
		boxgroupId=boxGroupId;
		$('#pd').html("您已选择："+boxNum+"号柜");
		$('#dialog').css({
			zIndex:System.getMaxzIndex()
		})
		$('#dialog').show(); 
	}else if(boxStatus=="1"){
		alert("该箱格已被使用！");
	}else{
		alert("该箱格是故障柜！");
	}
	
}
//柜门打开，提示“正在为您保鲜，开始计时”
function showdg1(){
	closediv();
	$('#pd1').html(boxnum+"号柜门打开，");
	$('#dialog1').css({
		zIndex:System.getMaxzIndex()
	})
	$('#dialog1').show();
	var i=30;
    var countdown = null;
    function timeShow(){
        i--;
        $(".dialog1 .countdown").html("("+i + "s)");
        if(i<1){
            clearInterval(countdown);
            closediv();	              
            System.reloadPage();
        }
    };
    countdown = setInterval(timeShow,1000);
}
//关闭弹框，刷新页面
function refresh(){
	closediv();
    System.reloadPage();
}

//关闭弹框
function closediv() {  
    $('#dialog').hide();  
    $('#dialog1').hide();  
    $('#dialog2').hide();  
}

//确认开柜
function confirm(){	    
	closediv();
	//获取箱格号和副柜号
	service.createOrder.boxNum =boxnum;
	service.createOrder.groupId =boxgroupId;
	service.doService(service.createOrder,function(data){
		if(data.res=="suc"){
		//当钱包备用金余额充足的时候执行
			showdg1();
		}else if(data.res=="fail"&&data.msg=="recharge"){
		//当钱包备用金余额少于等于10元的时候
			System.openDivPage('#page');
		}else{
		//其他错误
			alert("服务器出错了，请稍后重试！");
		}
	})
}
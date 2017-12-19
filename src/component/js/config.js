(function(w){
	require(['mui'],function(){
		w.CONFIG = {
			//scroll滑块
			scroll:{
				bounce: false,
				indicators: false, //是否显示滚动条
				deceleration:mui.os.ios?0.003:0.0006//阻尼系数
			}
		}
	})
})(window)

$('[has-refresh]').each(function(){
	var _this = $(this)[0];
	if(_this.getAttribute('has-refresh')!=null){
		window['endPullDownToRefresh'] = function(){}
		var callback = window[_this.getAttribute('has-refresh')||'refreshCallback']||function(){};
		//创建页面刷新功能
		mui(_this).pullToRefresh({
			down: {
				callback: function(){
					callback();
					var self = this;
					//重置上拉加载
			   		self.refresh(true);
					window['endPullDownToRefresh'] = function(){
						self.endPullDownToRefresh();
					}
				}
			}
		});
	}
})
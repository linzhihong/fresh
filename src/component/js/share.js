var SHARE = function(){
	var _this = this;
	var shares = null;
	var msg = {
    	thumbs:[],		//(String[] 类型 )分享消息的缩略图推荐图片小于20Kb。
    	pictures:[],		//(String[] 类型 )分享消息的图片
    	title:'分享消息的标题',			//(String 类型 )分享消息的标题
    	content:'分享消息的文字内容',			//(String 类型 )分享消息的文字内容
    	href:'',			//(String 类型 )分享独立的链接
    	//geo:'',				//(GeoPosition 类型 )分享消息中包含的用户地理信息数据  latitude: (Number 类型 )用户位置的纬度坐标信息,longitude: (Number 类型 )用户位置的经度坐标信息
    	extra:{scene:'WXSceneSession'}	//(String 类型 )微信分享场景，仅微信分享平台有效 可取值： "WXSceneSession"分享到微信的“我的好友”； "WXSceneTimeline"分享到微信的“朋友圈”中； "WXSceneFavorite"分享到微信的“我的收藏”中。 默认值为"WXSceneSession"。
	};
	_this.init = function(data){
		if(mui.os.plus){
			msg = $.extend(msg,data.msg);
			//updateSerivces();
			plus.share.getServices(function(ss) {
			    data.ready(ss);
			}, function(e) {
			    System.toast("获取分享服务列表失败：" + e.message);
			});
		}
	}
	
	_this.shareAction = function(s, ex) {
		System.showLoading("正在启动分享");
	    if (!s) {
	        System.alert("无效的分享服务！");
	        return;
	    }
	    if (s.authenticated) {
	        //System.alert("---已授权---");
	        shareMessage2(s, ex);
	    } else {
	        //System.alert("---未授权---");
	        s.authorize(function() {
	            shareMessage2(s, ex);
	        }, function(e) {
	        	System.hideLoading();
	            System.alert("认证授权失败：" + e.code + " - " + e.message);
	        });
	    }
	}
	
	function shareMessage2(s,ex){
		System.hideLoading();
		s.send(msg,function(){
	        System.toast("分享到\""+s.description+"\"！ ");
	    }, function(e){
//	        System.toast( "分享到\""+s.description+"\"失败");
	    } );
	}
	
//	function updateSerivces(){
//		var list = document.getElementById('list');
//		plus.share.getServices(function(ss) {
//		    shares = ss;
//		    for (var i in ss ) {
//		        var s = ss[i];
//		        var item = document.createElement("li");
//		        item.setAttribute("class", "ditem mui-table-view-cell");
//		        item.setAttribute("onclick", "shareAction(this.plusShare)");
//		        item.innerText = s.description;
//		        item.plusShare = s;
//		        list.appendChild(item);
//		    }
//		}, function(e) {
//		    System.alert("获取分享服务列表失败：" + e.message);
//		});
//	}
	
//	function shareAction(s, ex) {
//		System.showLoading("正在启动分享");
//	    if (!s) {
//	        System.alert("无效的分享服务！");
//	        return;
//	    }
//	    if (s.authenticated) {
//	        //System.alert("---已授权---");
//	        shareMessage(s, ex);
//	    } else {
//	        //System.alert("---未授权---");
//	        s.authorize(function() {
//	            shareMessage(s, ex);
//	        }, function(e) {
//	        	System.hideLoading();
//	            System.alert("认证授权失败：" + e.code + " - " + e.message);
//	        });
//	    }
//	}
	
//	function shareMessage(s,ex){
//		System.hideLoading();
//		var url=openWinPath+'/component/img/avator2.png';
//		plus.io.resolveLocalFileSystemURL(url,function(entry){
//			var msg={
//		    	thumbs:[entry.toLocalURL()],		//(String[] 类型 )分享消息的缩略图推荐图片小于20Kb。
//		    	pictures:[entry.toLocalURL()],		//(String[] 类型 )分享消息的图片
//		    	title:'分享消息的标题',			//(String 类型 )分享消息的标题
//		    	content:'分享消息的文字内容',			//(String 类型 )分享消息的文字内容
//		    	href:'http://192.168.10.173:8020/chinaagri-app/src/html/tab/index.html?tabIndex=0',			//(String 类型 )分享独立的链接
//		    	//geo:'',				//(GeoPosition 类型 )分享消息中包含的用户地理信息数据  latitude: (Number 类型 )用户位置的纬度坐标信息,longitude: (Number 类型 )用户位置的经度坐标信息
//		    	extra:{scene:'WXSceneSession'}	//(String 类型 )微信分享场景，仅微信分享平台有效 可取值： "WXSceneSession"分享到微信的“我的好友”； "WXSceneTimeline"分享到微信的“朋友圈”中； "WXSceneFavorite"分享到微信的“我的收藏”中。 默认值为"WXSceneSession"。
//	    	};
//		    s.send( msg, function(){
//		        System.alert("分享到\""+s.description+"\"！ ");
//		    }, function(e){
//		        System.alert( "分享到\""+s.description+"\"失败: "+e.code+" - "+e.message );
//		    } );
//		},function(e){
//			System.toast("读取Logo文件错误："+e.message);
//		} );
//	}
	
	return _this;
}

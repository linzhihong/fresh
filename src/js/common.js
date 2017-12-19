//swiper方法
function doSwiper(dom,data){
	var swiper = null;
	var setting = {};
	var onSlideChangeStart = function(){};
	var onSlideChangeEnd = function(){};
	var eventListener = {};
	this.addEventListener = function(type,callback){
		eventListener[type] = callback;
	}
	this.init = function(){
		_swiper = this.swiper;
		onInit = this.onInit;
		onSlideChangeStart = this.onSlideChangeStart;
		onSlideChangeEnd = this.onSlideChangeEnd;
		var deflaut = {
			event:'',
			autoplay:0,
			initialSlide:0,
			loop:false,
			touchMoveStopPropagation : false,//true时阻止touchmove冒泡事件。
			touchReleaseOnEdges:true,//当滑动到Swiper的边缘时释放滑动，可以用于同向Swiper的嵌套（移动端触摸有效）。
		    slidesPerView: 'auto',
		    paginationClickable: true,
		    pagination: dom+' .swiper-pagination',
	        nextButton: dom+' .swiper-button-next',
	        prevButton: dom+' .swiper-button-prev',
		    spaceBetween: 0,
		    onInit: function(swiper){
		    	onInit();
		        if(eventListener['init']){
		        	eventListener['init'](swiper);
		        }
	      	},
		    onSlideChangeStart: function(swiper){
		      	onSlideChangeStart(swiper);
		      	if(eventListener['slideChangeStart']){
		        	eventListener['slideChangeStart'](swiper);
		        }
		    	if(setting.autoplay!=0){
					swiper.startAutoplay();
				}
		    },
		    onSlideChangeEnd: function(swiper){
		      	onSlideChangeEnd(swiper);
		      	if(eventListener['slideChangeEnd']){
		        	eventListener['slideChangeEnd'](swiper);
		        }
		      	$(dom).attr('data-activeIndex',swiper.activeIndex);
		    	if(setting.autoplay!=0){
					swiper.startAutoplay();
				}
		    }
		};
		setting = eval('('+$(dom).attr('data-setting')+')');
		setting = $.extend(true,deflaut,setting);
		if(data){
			setting = $.extend(true,setting,data);
		}
		try{
			if(swiper){
				swiper.destroy(false);
			}
			if($(dom).data('isLoad')=='true'){
				swiper.update();
			}
			if(typeof $(dom).data('isLoad')=='undefined'){
				swiper = new Swiper(dom, setting);
				$(function(){
					var index = setting.initialSlide;
					if(!setting.loop){
						index = $(dom).find('.swiper-slide.active').index();
						swiper.slideTo(--index, 200, false);//切换到slide，速度为200毫秒
					}
					if(setting.event!=""){
						$(dom).find('.swiper-slide').on(setting.event,function(){
							$(this).parent().find('.swiper-slide').removeClass('active');
							$(this).addClass('active');
							if(!setting.loop){
								var index = $(this).index();
								$(dom).attr('data-activeIndex',index);
								swiper.slideTo(--index, 200, false);//切换到slide，速度为200毫秒
							}
						})
					}
					if(setting.autoplay!=0){
						swiper.startAutoplay();
					}
				})
				$(dom).data('isLoad','true');
				this.swiper = swiper;
			}
		}catch(e){}
	}
	this.onInit = function(){}
	this.onSlideChangeStart = function(){}
	this.onSlideChangeEnd = function(){}
	
	this.slideTo = function(index,speed){
		swiper.slideTo(index, speed, false);//切换到slide
		if(setting.autoplay!=0){
			swiper.startAutoplay();
		}
	}
	this.swiper = null;
	return this;
}

//重构图片上传插件不截图
window.imgUploadSize = 4000;//图片上传大小限制4M
function createImgList(){
	var fid = 0;
	//添加图片方法
	window.myAddImg = function(o){
//			//检测是否有加载图片查看器插件
		if($('.mui-preview-image').length == 0){
			mui.previewImage();
		}
		var mil = $(o).parents('.imgList').siblings('.myImgList');
		var id = mil.attr('id');
		if(typeof id == 'undefined'){
			id = System.uuid();
			mil.attr('id',id);
		}
		window.adom = o;
		window.adomId = id;
		var dataSetting = mil.attr('data-setting');
		var dataData = mil.attr('data-data');
		dataSetting = eval('('+dataSetting+')');
		dataSetting['adom'] = o;
		dataData = eval('('+dataData+')');
		System.imgUpload(dataSetting,dataData,function(response){
			var src = response.data;
			var id = window.adomId;
			$(window.adom).parents('.imgList-addBtn').before('<li id="imgList-item-'+(fid++)+''+id+'" class="imgList-item new" data-preview-src="'+src+'" data-preview-group="'+id+'" data-value="'+src+'"><div class="imgList-pram"></div><img class="img" src="'+response.base64Data+'" /><div class="del-btn" ><img src="'+BasePath+'/img/client/imglist-del-btn.png" onload=\'var _this = $(this).parent();setTimeout(function(){_this.addClass("shake-little shake-constant")},300)\' /></div></li>');
			window.myCheckAddImg($(window.adom).parents('.imgList'));
		})
	}
		
	//删除图片
	var st = null;
	window.myDeleteImg = function(o){
		var _this = $(o);
		System.stopBubble();
		System.confirm({
			msg:'是否删除？',
			title:'消息提示',
			btn:["取消","确定"],
			callback:function(d){
				if(d.index == 1){
					var id = _this.parents('.imgList-item').attr('data-id');
					var p = _this.parents('.imgList-item').attr('data-value');
					var pl = _this.parents('.imgList');
					if(_this.parents('.imgList-item').hasClass('new')){
						service.fileOssDeleteFile.path = p;
						service.doService(service.fileOssDeleteFile,function(data){})
					}
					_this.parents('.imgList-item').remove();
					window.myCheckAddImg(pl);
				}
			}
		})
	}
	
	//校验图片是否超出，并赋值给文本域
	window.myCheckAddImg = function(jqDom){
		var dataSetting = jqDom.siblings('.myImgList').attr('data-setting');
		dataSetting = eval('('+dataSetting+')');
		if(jqDom.find('li.imgList-item').length>=jqDom.parent().find('.myPicNum').attr('data-maximum')*1){
			jqDom.find('li.imgList-addBtn').hide();
		}else{
			jqDom.find('li.imgList-addBtn').show();
		}
		var value = [];
		jqDom.find('li.imgList-item').each(function(){
			if($(this).attr('data-value')!=''){
				value.push($(this).attr('data-value'));
			}
		})
		dataSetting['maximum'] = jqDom.parent().find('.myPicNum').attr('data-maximum')*1-jqDom.find('li.imgList-item').length;
		jqDom.siblings('.myImgList').attr('data-setting',JSON.stringify(dataSetting));
		jqDom.parent().find('.myPicNum .nn').html(jqDom.find('li.imgList-item').length);
		jqDom.siblings('.myImgList').val(value.join(','));
		if(jqDom.find('li.imgList-item').length>0){
			jqDom.parent().find('.myPicNum-del').show();
		}else{
			jqDom.parent().find('.myPicNum-del').hide();
		}
		if(jqDom.attr('data-edit')=='true'){
			jqDom.find('.del-btn').show();
		}else{
			jqDom.find('.del-btn').hide();
		}
	}
	
	//创建图片上传的html结构
	$('input.myImgList').each(function(i){
//		mui.init({
//		  	gestureConfig:{
//			   	longtap: true, //默认为false
//		  	}
//		});
		var self = $(this);
		var id = self.attr('id');
		if(typeof id == 'undefined'){
			id = System.uuid()+''+i;
			self.attr('id',id);
		}
		self.hide();
		var dataSetting = self.attr('data-setting');
			dataSetting = eval('('+dataSetting+')');
		var par = self.parent();
		par.css({
			position:'relative'
		})
		var ul = [];
		ul.push('<ul id="imgList'+id+'" class="imgList" >');
		ul.push('	<li class="imgList-addBtn"><i class="mui-icon mui-icon-plusempty"></i><input type="button" style="opacity: 0;width:100%;height:100%;position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 1;" value="" onclick="myAddImg(this)" /></li>');
		ul.push('</ul>');
		ul.push('<div class="myPicNum" data-maximum="'+dataSetting.maximum+'"><span class="myPicNum-del">编辑</span><span class="nn">0</span>/'+dataSetting.maximum+'</div>');
		var imglist = $(ul.join(''));
		if(self.val().Trim()!=''){
			var list = self.val().Trim().split(',');
			for(var i = 0 ; i < list.length ; i++){
				imglist.find('.imgList-addBtn').before('<li id="imgList-item-'+id+i+'" class="imgList-item" data-preview-src="'+list[i]+'" data-preview-group="'+id+'" data-value="'+list[i]+'"><div class="imgList-pram"></div><img class="img" src="'+list[i]+'" /><div class="del-btn" ><img src="'+BasePath+'/img/client/imglist-del-btn.png" onload=\'var _this = $(this).parent();setTimeout(function(){_this.addClass("shake-little shake-constant")},'+(1300+(i*100))+')\' /></div></li>');
			}
		}
		//点击删除事件
		imglist.on('tap','.del-btn',function(){
			window.myDeleteImg(this);
		})
		
		imglist.siblings('.myPicNum').find('.myPicNum-del').on('tap',function(){
			var _this = $(this);
			var text = _this.text();
			if(text == '编辑'){
				imglist.attr('data-edit','true');
				imglist.find('.del-btn').show();
				_this.text('取消');
			}else{
				imglist.attr('data-edit','false');
				imglist.find('.del-btn').hide();
				_this.text('编辑');
			}
		})
		par.prepend(imglist);
		window.myCheckAddImg(imglist);
	})
}

System.ready(function(){
	//判断是否是客户端还是后端
	System.storage.setItem('loginType','1');
	if(mui.os.plus){
		// 设置系统状态栏背景
		plus.navigator.setStatusBarBackground("#fff");
		// 设置系统状态栏样式为深色底
		plus.navigator.setStatusBarStyle("dark");
	}
	
	//快捷菜单
	if($('#info-nr-phone').length>0){
//		var ip = $('#info-nr-phone')[0];
//		var ipb = $('#info-nr-btn');
//		window.addEventListener("drag",function(e){
//		    console.log("你正在滑动"+e.detail.deltaY+""+e.pageX);
//		    ipb.css({
//		    	left:e.detail.deltaX,
//		    	top:e.detail.deltaY
//		    })
//		},false);
		$('.mui-scroll-wrapper .mui-scroll').each(function(){
			this.addEventListener("scroll",function(e){
				$('#info-nr-phone input[type="checkbox"]')[0].checked = false;
			    $('#info-nr-phone .item').removeClass('on');
			});
		})
	}
	$('#info-nr-phone').on('click',function(){
		var _this = $(this);
		var items = _this.find('.item');
        if(_this.find('input[type="checkbox"]')[0].checked){
        	items.addClass('on');
        }else{
        	items.removeClass('on');
        }
	})
})

//快速切换页面
function togo(index){
	index = index+'';
	switch (index){
		case '0':
			if(mui.os.plus){
				mui.fire(System.getOpenWindow(openWinPath+'/html/index.html'),'tabClick',{index:0});
				plus.webview.show(System.getOpenWindow(openWinPath+'/html/index.html'));
			}else{
				System.openWindow(openWinPath+'/html/tab/index.html?tabIndex=0');
			}
			break;
		case '1':
			if(mui.os.plus){
				mui.fire(System.getOpenWindow(openWinPath+'/html/index.html'),'tabClick',{index:1});
				plus.webview.show(System.getOpenWindow(openWinPath+'/html/index.html'));
			}else{
				System.openWindow(openWinPath+'/html/tab/activity.html?tabIndex=1');
			}
			break;
		case '2':
			if(mui.os.plus){
				mui.fire(System.getOpenWindow(openWinPath+'/html/index.html'),'tabClick',{index:2});
				plus.webview.show(System.getOpenWindow(openWinPath+'/html/index.html'));
			}else{
				System.openWindow(openWinPath+'/html/common/order/cart.html?tabIndex=2');
			}
			break;
		case '3':
			if(mui.os.plus){
				mui.fire(System.getOpenWindow(openWinPath+'/html/index.html'),'tabClick',{index:3});
				plus.webview.show(System.getOpenWindow(openWinPath+'/html/index.html'));
			}else{
				System.openWindow(openWinPath+'/html/personal/personal.html?tabIndex=3');
			}
			break;
		default:
			break;
	}
}

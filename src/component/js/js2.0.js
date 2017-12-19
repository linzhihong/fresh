define(['jquery'], function($){
	var shim = [];
	//radio
	$.fn.Radio = function(i){
		var self = $(this);
		var selfp = self.parent();
		var id = selfp.attr('id')||'radio_'+new Date().getTime();
		selfp.attr('id',id);
		var html = '';
		html+='&lt;span&gt;';
		self.before(html);
		html = '';
		html+='&lt;i class="mui-icon mui-icon-checkmarkempty" &gt;&lt;/i&gt;&lt;/span&gt;';
		self.next().after(html);
		html = selfp.html().replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		if(selfp.find('input[type="radio"]').length==i+1){
			selfp.html('<div class="form-style-1-input-radio">'+html+'</div>');
			selfp.find('input[type="radio"]').each(function(){
				if(this.checked){
					$(this).parent().addClass('active');
				} 
				$(this).parent().on('click',function(){
					$(this).find('input[type="radio"]')[0].checked = true;
					$(this).addClass('active');
					$(this).siblings().removeClass('active');
				})
			})
			setTimeout(function(){
				System.setReady(self);
			},300)
		}
		window[self.attr('name')] = {
			getValue:function(){
				return "";
			}
		}
	}
	
	//checkbox
	$.fn.Checkbox = function(i){
		var self = $(this);
		var selfp = self.parent();
		var id = selfp.attr('id')||'checkbox_'+new Date().getTime();
		selfp.attr('id',id);
		var html = '';
		html+='&lt;span&gt;';
		self.before(html);
		html = '';
		html+='&lt;i class="mui-icon mui-icon-checkmarkempty" &gt;&lt;/i&gt;&lt;/span&gt;';
		self.next().after(html);
		html = selfp.html().replace(/&lt;/g,'<').replace(/&gt;/g,'>');
		if(selfp.find('input[type="checkbox"]').length==i+1){
			selfp.html('<div class="form-style-1-input-checkbox">'+html+'</div>');
			selfp.find('input[type="checkbox"]').each(function(){
				if(this.checked){
					$(this).parent().addClass('active');
				} 
				$(this).parent().on('click',function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');
						$(this).find('input[type="checkbox"]')[0].checked = false;
					}else{
						$(this).addClass('active');
						$(this).find('input[type="checkbox"]')[0].checked = true;
					}
				})
			})
			setTimeout(function(){
				System.setReady(self);
			},300)
		}
	}
	
	//chosen
	$.fn.Chosen = function(){
		var self = $(this);
		var id = self.attr('id')||'chosen_'+new Date().getTime();
		self.attr('id',id);
		self.hide();
		var html = '';
		html += '<ul class="form-style-1-input-tab" '+(self.attr('multiple')||'')+'>';
		self.find('option').each(function(i){
			if($(this)[0].selected){
				html += '<li class="active" data-value="'+$(this).val()+'">'+$(this).html()+'<div class="c"><i class="mui-icon mui-icon-checkmarkempty"></i></div></li>';
			}else{
				html += '<li data-value="'+$(this).val()+'">'+$(this).html()+'<div class="c"><i class="mui-icon mui-icon-checkmarkempty"></i></div></li>';
			}
		})
		html += '</ul>';
		self.after(html);
		
		self.parent().find('.form-style-1-input-tab li').on('click',function(){
			var that = $(this);
			var isMultiple = that.parent().attr('multiple');
			if(typeof isMultiple =='undefined'){
				if(that.hasClass('active')){
					
				}else{
					that.parent().find('.active').removeClass('active');
					that.addClass('active');
				}
			}else{
				if(that.hasClass('active')){
					that.removeClass('active');
				}else{
					that.addClass('active');
				}
			}
			
			//给select赋值
			that.parents('.form-style-1-input-tab').find('li').each(function(i){
				self.find('option').eq(i)[0].selected = $(this).hasClass('active');
			})
			
			self.trigger('change');
		})
		setTimeout(function(){
			System.setReady(self);
		},300)
	}
	
	//mobiscroll
	$.fn.Mobiscroll = function(){
		var self = $(this);
		var id = self.attr('id')||'mobiscroll_'+new Date().getTime();
		self.attr('id',id);
		self.hide();
		var keys = [];
	    var values = [];
	    var placeholder = self.attr('placeholder')||'请选择';
	    if(self.find('option').eq(0).val().Trim()==''){
	    	self.find('option').eq(0).remove();
	    }
	    self.prepend('<option value="" '+(((self.find('option[selected]').length<1))?'selected':'')+'>'+placeholder+'</option>');
	    self.find('option').each(function(){
	    	keys.push($(this).val());
	    	values.push($(this).html());
		})
	    var value = self.find('option:selected').text();
	    value = value == placeholder?'':value;
	    self.parent().find('#'+id+'mobiscroll').remove();
		self.after('<input id="'+id+'mobiscroll" type="text" readonly="readonly" value="'+value+'" placeholder="'+self.attr('placeholder')+'" />');
		$('#'+id+'mobiscroll').on('click',function(){
			$('input,textarea').blur();
		    $(this).mobiscroll({
		        theme: 'mobiscroll',     // Specify theme like: theme: 'ios' or omit setting to use default
		        mode: 'scroller',       // Specify scroller mode like: mode: 'mixed' or omit setting to use default
		        display: 'bottom', // Specify display mode like: display: 'bottom' or omit setting to use default
		        lang: 'zh',      // Specify language like: lang: 'pl' or omit setting to use default
		        wheels: [  // More info about wheels: http://docs.mobiscroll.com/2-17-0/scroller#!opt-wheels
	                [ {
	                    label: placeholder,
	                    keys: values,
	                    values: values
	                }]
	            ],
	            rows:4,
		        height:40,
		        showLabel:false,
		        onShow:function(){
		        	var label = $('.mbsc-mobiscroll .dwl').text();
		        	$('.mbsc-mobiscroll').find('.dwbc').eq(0).append('<span style="color: #ff7c02;font-size: 20px;float:left;padding: 5px 20px;">'+label+'</span>');
		        },
	            onSelect:function(key,inst){
	                var keysValue = '';
	                if(key.length == values[values.indexOf(key)].length){
	                	keysValue = keys[values.indexOf(key)];
	                }
	                self.find('option').each(function(){
	                	$(this)[0].selected = false;
	                })
	                self.find('option[value="'+keysValue+'"]').eq(0)[0].selected = true;
	            	inst.destroy();
	            	self.trigger('change');
	            }
		    });
		    $(this).mobiscroll('show');
	    })
		setTimeout(function(){
			System.setReady(self);
		},300)
	}
	
	//citySelect
	$.fn.CitySelect = function(i){
		var _this = this;
		var self = $(this);
		var id = self.attr('id');
		if(typeof id == 'undefined'){
			id = 'citySelect_'+new Date().getTime()+'_'+i;
			self.attr('id',id);
		}
		self = $('#'+id);
		
		$('.mui-poppicker').remove();
		
		//事件
		var callback = window[self.attr('citySelect-callback')]||function(){}
		
		var options = $('#'+id).attr('data-options')||'{value:""}';
		options = eval('('+options+')');
		//地区选择
		var cityPicker = new mui.PopPicker({
			layer:options.layer||3
		});
		cityPicker.setData(cityData);
		var showCityPickerButton = document.getElementById(id);
		mui('body').off('tap','#'+id);
		mui('body').on('tap','#'+id,function(){
			$('input,textarea').blur();
			//使弹层一直保持在最上
			setTimeout(function(){
				$('.mui-backdrop').css({zIndex:System.getMaxzIndex()})
				$('.mui-poppicker.mui-active').css({zIndex:System.getMaxzIndex()})
			},100)
			cityPicker.show(function(items) {
				showCityPickerButton.value = (items[0] || {}).text + " " + (items[1] || {}).text + " " + ((items[2] || {}).text||'');
				callback(items);
				$(showCityPickerButton).trigger('keyup');
				//cityResult3.innerText = "你选择的城市是:" + (items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text;
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		})
		
		//回显地区选择
		if(options){
			value = options.value.split(' ');
			function setv(i,data){
				if(i>3){return;}
				for(var c in data){
					if(data[c].text==value[i]){
						cityPicker.pickers[i].setSelectedIndex(c);
						setv(++i,data[c].children);
						break;
					}
				}
			}
			setv(0,cityData);
		}
		setTimeout(function(){
			System.setReady(self);
		},300)
	}
	
	//dateTime
	$.fn.DateTime = function(i){
		var _this = this;
		var self = $(this);
		var id = self.attr('id');
		if(typeof id == 'undefined'){
			id = 'dateTime_'+new Date().getTime()+'_'+i;
			self.attr('id',id);
		}
		self = $('#'+id);
		
		//事件
		var callback = window[self.attr('dateTime-callback')]||function(){}
		
		mui('body').off('tap','#'+id);
		mui('body').on('tap','#'+id,function(){
			var _this = this;
			if(_this.picker){
				//销毁
				_this.picker.dispose();
			}
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = eval('('+optionsJson+')');
    		options = $.extend({
    			beginDate: null,//设置开始日期 
    			endDate: null//设置结束日期 
    		},options);
			var id = this.getAttribute('id');
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			_this.picker = new mui.DtPicker(options);
			$('input,textarea').blur();
			//使弹层一直保持在最上
			setTimeout(function(){
				$('.mui-backdrop').css({zIndex:System.getMaxzIndex()})
				$('.mui-dtpicker.mui-active').css({zIndex:System.getMaxzIndex()})
			},100)
			_this.picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				self.val(rs.text);
				callback(rs.text);
				self.trigger('keyup');
				//result.innerText = '选择结果: ' + rs.text;
				/* 
				 * 返回 false 可以阻止选择框的关闭
				 * return false;
				 */
				/*
				 * 释放组件资源，释放后将将不能再操作组件
				 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
				 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
				 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
				 */
				//picker.dispose();
			});
		})
		
		setTimeout(function(){
			System.setReady(self);
		},300)
	}
	
	//picker 
	$.fn.Picker = function(i){
		var _this = this;
		var self = $(this);
		//事件
		var callback = window[self.attr('picker-callback')]||function(){}
		var id = self.attr('id');
		if(typeof id == 'undefined'){
			id = 'picker_'+new Date().getTime()+'_'+i;
			self.attr('id',id);
		}
		self.css({opacity:0});
		var sz = self.css('zIndex');
		var pla = self.attr('placeholder');
		var name = self.attr('name');
		var validate = self.attr('validate');
		self.removeAttr('name');
		self.attr('data-name',name)
		var inp = $('<input id="picker_'+id+'" type="text" style="position:absolute;z-index:'+(self.css('zIndex')=='auto'?'1':sz*1+1)+';top:'+self.position().top+'px;left:'+self.position().left+'px;height:'+(self.outerHeight()+1)+'px;width:'+self.outerWidth()+'px;" readonly="readonly" value="" placeholder="'+pla+'" />');
		var vdt = '';
		if(typeof validate != 'undefined'){
			vdt = 'validate="'+validate+'"';
		}
		var inv = $('<input id="picker_name_'+id+'" '+vdt+' name="'+name+'" type="hidden" value="" placeholder="'+pla+'" />');
		inv.attr('validate',validate)
		self.before(inp);
		self.before(inv);
		self = $('#picker_'+id);
		var nameElement = $('#picker_name_'+id);
		var select = $('#'+id);
		if(pla.length>0&&select.find('option[value=""]').length==0){
			select.prepend('<option value="">'+pla+'</option>');
		}
		var hasSelected = false;
		select.find('option').each(function(){
			var v = $(this).attr('value');
			var t = $(this).text();
			if($(this).attr('selected')&&v.length>0){
				hasSelected = true;
				self.val(t);
				nameElement.val(v);
			}
		})
		if(!hasSelected){
			if(select.find('option').eq(0).attr('value').length>0){
				self.val(select.find('option').eq(0).text());
				nameElement.val(select.find('option').eq(0).attr('value'));
			}
		}
		
		mui('body').on('tap','#picker_'+id,function(){
			var _this = this;
			var optionsJson = select[0].getAttribute('data-options') || '{}';
			var options = eval('('+optionsJson+')');
			options = $.extend({
				buttons: ['取消','确定']//显示按钮
			},options);
			if(_this.picker){
				//销毁
				_this.picker.dispose();
			}
			_this.picker = new mui.PopPicker(options);
			var data = [];
			var selectedValue = '';
			select.find('option').each(function(){
				var v = $(this).attr('value');
				var t = $(this).text();
				if($(this).attr('selected')&&v.length>0){
					selectedValue = v;
					self.val($(this).text());
					nameElement.val($(this).attr('value'));
				}
				data.push({
					value:v,text:t
				});
			})
			
			_this.picker.setData(data);
			_this.picker.pickers[0].setSelectedValue(selectedValue,0);
			$('input,textarea').blur();
			//使弹层一直保持在最上
			setTimeout(function(){
				$('.mui-backdrop').css({zIndex:System.getMaxzIndex()})
				$('.mui-poppicker.mui-active').css({zIndex:System.getMaxzIndex()})
			},100)
			
			_this.picker.show(function(item) {
				select.find('option').removeAttr('selected');
				select.find('option[value="'+item[0].value+'"]').attr('selected','selected');
				select.find('option[value="'+item[0].value+'"]')[0].selected = true;
				if(item[0].value.length==0){
					self.val("");
					nameElement.val("");
				}else{
					self.val(item[0].text);
					nameElement.val(item[0].value);
				}
				//重写option，解决ios无法获取到select选中内容
				var newOp = [];
				select.find('option').each(function(){
					var se = '';
					if($(this).attr('selected')){
						se = ' selected="selected" '
					}
					newOp.push('<option value="'+$(this).val()+'" '+se+'>'+$(this).text()+'</option>');
				})
				select.html(newOp.join(''));
				nameElement.trigger('input');
				callback(item[0].value);
			})
		})
		
		setTimeout(function(){
			System.setReady(self);
		},300)
	}
	
	//form
	$.fn.Form = function(){
		var self = $(this);
		var id = self.attr('id')||'form_'+new Date().getTime();
		self.attr('id',id);
		
		self.attr('onsubmit','return false;');
		var validateSuccess = self.attr('form-validateSuccess');
		var submitFinish = self.attr('form-submitFinish');
		var sv = self.attr('form-service')||"{name:'',url:''}";//配合service.js完成数据的提交
		validateSuccess = window[validateSuccess]||function(){}
		submitFinish = window[submitFinish]||function(){}
		
		var fThis = this;
		fThis.removeError = function(jd){
			if(jd.name){
				$(jd).parents('.form-style-1-input').prev('.form-style-1-title').removeClass('has-error');
				var er = $(jd).parents('.form-style-1-input').prev('.form-style-1-title').find('.error');
				er.remove();
			}
		}
		fThis.validateTxt = function(jd,txt){
			if(jd.name){
				$(jd).parents('.form-style-1-input').prev('.form-style-1-title').addClass('has-error');
				var er = $(jd).parents('.form-style-1-input').prev('.form-style-1-title').find('.error');
				
				if(er.length<1){
					$(jd).parents('.form-style-1-input').prev('.form-style-1-title').append('<i class="error" >'+txt+'<img src="'+BasePath+'/component/img/bd-error.png" /></i>');
					er = $(jd).parents('.form-style-1-input').prev('.form-style-1-title').find('.error');
				}
				er.show();
			}
		}
		
		fThis.validate = function(vdom){
			form = self[0];
			for(var i = 0 ; i < form.length; i++){
	   			dom = form[i];
				if(dom.getAttribute('validate')!=null){
					//验证空
					if(vdom==dom||!vdom){
						var defaultTxt = (dom.type.toLowerCase()=="checkbox"||dom.type.toLowerCase()=="radio"||dom.tagName.toLowerCase()=="select")?'请选择':'请输入';
						var errorTxt = dom.getAttribute('placeholder')||$(dom).parents('[placeholder]').attr('placeholder')||defaultTxt;
						console.log(dom.value);
						fThis.removeError(dom);
						//选择
						if(dom.type.toLowerCase()=="checkbox"||dom.type.toLowerCase()=="radio"){
							if(dom.getAttribute('validate-isEmpty')=="false"){
								
							}else{
					      		var lcl = self.find('[name="'+dom.name+'"]:checked');
								if(lcl.length<1){
									fThis.validateTxt(dom,errorTxt);
								}
							}
						}else{
							//输入
							if(dom.getAttribute('validate-isEmpty')=="false"){
								
							}else{
								if(dom.name){
									if(!dom.value||dom.value.Trim()==""||($(dom).val()+"").Trim()==""){
										fThis.validateTxt(dom,errorTxt);
									}
								}
							}
						}
					}
					
					if(vdom==dom){
						//验证自定义拓展方法
						var fvalidate = window[dom.getAttribute('validate')]||null;
						if(fvalidate){
							if(dom){
								var result = fvalidate(self,dom)||"";
								if(result.length>0){
						      		fThis.validateTxt(dom,result);
								}
							}
						}
						break;
					}
					if(typeof vdom == 'undefined'){
						//验证自定义拓展方法
						var fvalidate = window[dom.getAttribute('validate')]||null;
						if(fvalidate){
							if(dom){
								var result = fvalidate(self,dom)||"";
								if(result.length>0){
						      		fThis.validateTxt(dom,result);
								}
							}
						}
					}
				}
			}
		}
		
//		self.find('select[validate],input[type="radio"][validate],input[type="checkbox"][validate]').on("input propertychange",function(){  
//		    try{
//				fThis.validate($(this)[0]);
//			}catch(e){}
//		}) 

		$(document).on('change','select[validate],input[type="radio"][validate],input[type="checkbox"][validate]',function(){
			try{
				fThis.validate($(this)[0]);
			}catch(e){}
		})
//		self.find('select[validate],input[type="radio"][validate],input[type="checkbox"][validate]').change(function(){
//			try{
//				fThis.validate($(this)[0]);
//			}catch(e){}
//		})
		
		var st = null;
		self.on('submit',function(){
			fThis.validate();
			var vs = validateSuccess(self);
			if(vs||typeof vs == "undefined"){
				window['#'+id]['isSubmit'] = true;
			}else{
				window['#'+id]['isSubmit'] = false;
			}
			clearTimeout(st);
			st = setTimeout(function(){
				if(self.find('.form-style-1-title.has-error').length==0&&(window['#'+id]['isSubmit']||window['#'+id]['isSubmit']=='true')){
					var o = {};
					var a = self.serializeArray();
					$.each(a, function () {
						if (o[this.name] !== undefined) {
							if (!o[this.name].push) {
								o[this.name] = [o[this.name]];
							}
							o[this.name].push(this.value || '');
							o[this.name] = o[this.name].join(',');
						} else {
							o[this.name] = this.value || '';
						}
					});
					//验证成功则提交表单
					var sv2 = eval('('+sv+')');
					if(sv2.name!=""){
						self.find('[type="submit"]').attr('disabled','disabled').addClass('disabled');
						o.ajaxType = 'post';
						service[sv2.name] = $.extend(service[sv2.name],o);
						service.doService(service[sv2.name],function(data){
							if(data=='dataError'){
								self.find('[type="submit"]').removeAttr('disabled').removeClass('disabled');
				    			return;
				    		}
							if(data.respCode == '0000'){
								
							}else{
								self.find('[type="submit"]').removeAttr('disabled').removeClass('disabled');
				    		}
							submitFinish(data,self);
						})
					}
				}else{
					//焦点都取消掉
					self.find('input,select,textarea').trigger('blur');
					try{
						//定位到错误的位置
						if(mui.os.ios){
							$('.content').scrollTop($('.content').scrollTop()+self.find('.form-style-1-title.has-error').eq(0).offset().top-$('#header').height()-10);
						}else{
							$('body').scrollTop(self.find('.form-style-1-title.has-error').eq(0).offset().top-$('#header').height()-10);
						}
					}catch(e){}
				}
			},300)
		})
		
		window['#'+id] = self;
		//表单是否可以提交
		window['#'+id]['isSubmit'] = true;
		
		//显示错误提示
		window['#'+id]['setValidateError'] = function(dom,txt){
			if($(dom).attr('name')){
				var dom = self.find('[name="'+$(dom).attr('name')+'"]')[0];
				if(dom){
					var result = txt;
					if(result.length>0){
						fThis.validateTxt(dom,result);
		      			System.getComponent('#'+id).isSubmit = false;
					}
				}
			}
		}
		window['#'+id]['clearValidateError'] = function(dom){
			var jqd = self.find('[name="'+$(dom).attr('name')+'"]');
			fThis.removeError(dom);
			System.getComponent('#'+id).isSubmit = true;
		}
		
		//表单单个控件验证
		window['#'+id]['validate'] = function(dom){
			try{
				fThis.validate($(dom)[0]);
			}catch(e){}
		}
		
		setTimeout(function(){
			System.setReady(self);
		},300)
	}
	
	//输入框change
	$.fn.InputChange = function(i){
		var self = $(this);
		if(self.attr('isInputChange') == 'true'){
			return;
		}
		self.attr('isInputChange','true');
		if(self[0].type=='file'){
			return;
		}
		var parentForm = null;
		if(self.parents('[component="form"]').length>0&&typeof self.attr('validate') != 'undefined'){
			parentForm = self.parents('[component="form"]').eq(0);
		}else if(typeof self.attr('onchange')=='undefined'){
			return;
		}
		var id = self.attr('id');
		if(typeof id == 'undefined'){
			id = 'inputchange_'+new Date().getTime()+i;
			self.attr('id',id);
		}
		var onchange = self.attr('onchange');
		if(typeof onchange != 'undefined'){
			self.attr('ionchange',onchange);
			self.removeAttr('onchange');
		}
		self.on("input propertychange",function(){  
		    var ionchange = self.attr('ionchange');
			if(parentForm){
				System.getComponent(parentForm).validate(self);
			}
			if(typeof ionchange != 'undefined'){
				eval(ionchange);
			}
		}) 
//		self.on('keyup',function(){
//			var ionchange = self.attr('ionchange');
//			if(parentForm){
//				System.getComponent(parentForm).validate(self);
//			}
//			if(typeof ionchange != 'undefined'){
//				eval(ionchange);
//			}
//		})
		System.setReady(self);
	}
	
	$.fn.autoTextarea = function(options) {
		var defaults={
			maxHeight:$(this).attr('maxHeight'),//文本框是否自动撑高，默认：null，不自动撑高；如果自动撑高必须输入数值，该值作为文本框自动撑高的最大高度
			minHeight:$(this).height() //默认最小高度，也就是文本框最初的高度，当内容高度小于这个高度的时候，文本以这个高度显示
		};
		var opts = $.extend({},defaults,options);
		return $(this).each(function(){
			$(this).on("input propertychange",function(){
				var height,style=this.style;
				this.style.height =  opts.minHeight + 'px';
				if (this.scrollHeight > opts.minHeight) {
					if (opts.maxHeight && this.scrollHeight > opts.maxHeight) {
						height = opts.maxHeight;
						style.overflowY = 'scroll';
					} else {
						height = this.scrollHeight;
						style.overflowY = 'hidden';
					}
					style.height = height  + 'px';
				}
			});
		});
	};
	
	//模版引擎
	$.fn.Template = function(i){
		var _this = this;
		var self = $(this);
		var id = self.attr('id');
		if(typeof id == 'undefined'){
			id = 'template_'+new Date().getTime()+'_'+i;
			self.attr('id',id);
		}
		self = $('#'+id);
		
		self.css({
			width:0,
			height:0
		}).hide();
		var tservice = self.attr('template-service');
		//var listenReload = self.attr('template-listenReload')||'false';//是否监听System.reloadPage方法时候刷新模版
		var type = self.attr('template-type')||'page';//申明使用的是list还是page
		var lazy = self.attr('template-lazy')||'false';//是否延迟加载,默认 false ，不延迟加载直接渲染
		var preview = self.attr('template-preview')||'';//用来预览效果，不然页面会突然撑开很难看(此功能只用在page模版，list模版不支持)
		var loadFinishText = self.attr('template-finish-text')==""?"":self.attr('template-finish-text')||'我是有底线的';
		var loadedNoneText = '';//page可以不需要显示空数据，可以使用template-preview来展示视图
		var beforeLoad = window[self.attr('template-beforeLoad')]||function(){}//填充数据之前
		var callback = window[self.attr('template-callback')]||function(){}
		var ready = window[self.attr('template-ready')]||function(){}
		var loadedEvalJS = self.attr('template-evalJS')||'{none:"",hasData:"",finish:""}'//加载完成执行的脚本(无数据|有数据|完成)
		var currentPage = self.attr('template-currentPage')||'currentPage';//自定义但前页字段，默认 currentPage
		var reloadfunc = window[self.attr('template-reloadfunc')]||null;//自定义下拉事件，如果添加此属性后对应的自带下拉刷新就没有效果，只能通过System.getComponent().rolad();来实现刷新
		loadedEvalJS = eval('('+loadedEvalJS+')');
		
		//把视图存起来
		if($(preview).length>0){
			_this.preview = $(preview)[0].outerHTML;
		}
		var tid = function(){return $('[template-setting][template-id="'+id+'"]');}
		_this.load = function(dir){
			self.attr('template-listenReload',self.attr('template-listenReload')||'false');//是否监听System.reloadPage方法时候刷新模版
			//表示此模版已经加载过
			_this.loaded = true;
			var newData = (typeof _this.data != 'object')?eval('('+_this.data+')'):_this.data;
			var url = self.attr('template-url')||'';
			tservice = self.attr('template-service');
			loadedNoneText = self.attr('template-none-text')==""?"":self.attr('template-none-text')||(type=='list'?'暂无内容':'');//page可以不需要显示空数据，可以使用template-preview来展示视图
			//自定义回调
			var mc = function(data){
				callback = window[_this.attr('template-callback')]||function(){}
				//阻止mui-scroll冒泡事件
				System.inputTouchPreventDefault();
				//重新添加文本框的change事件
				$('input,textarea').each(function(i){
					$(this).InputChange(i);
				})
				callback(data);
				_this.onload(data);
			}
			//判断参数是否是json数据如果是直接按json数据来执行优先级别最高，高于url
			var jsonData = {};
			try{
				jsonData = eval('('+url+')');
				url = '';
			}catch(e){}
			var setting = '';
			if(type=='list'){
				setting = tid().eq(0).attr('template-setting')||'{'+currentPage+':\'1\',totalPage:\'0\'}';
				setting = eval('('+setting+')');
				//下拉刷新重置currentPage
				if(dir=='down'){
					setting[currentPage] = 1;
				}
			}
			//有service配置的优先级别最高
			if(typeof tservice != 'undefined'){
				var sname = tservice.split('.')[1];
				//获取service-data值
				var sdata = self.attr('template-service-data')||'{}';
				if(type=='list'){
					var reg = new RegExp('{setting.'+currentPage+'}','g');
					sdata = sdata.replace(reg,setting[currentPage]);//替换当前页
				}
				sdata = eval('('+sdata+')');
				sdata = $.extend(sdata, newData);
				//拼接service json数据
				for(var d in sdata){
					service[sname][d] = sdata[d];
				}
				service.doService(service[sname],function(data){
		   			if(data=='dataError'){
		   				if(type=='list'){
							pullRefresh.endPullUpToRefresh(false);
							if(dir=='down'){
								pullRefresh.endPullDownToRefresh();
							}
						}
		    			return;
		    		}
					//添加baseBath相对路径
					data['BasePath'] = window.BasePath;
					if(data.respCode == '0000'){
						if(dir==""){
							$(preview).remove();
						}
						data = $.extend(data,sdata);
//						//得到克隆模板对象
//						$('[clone-template="#'+id+'"]').each(function(){
//							var cthis = $(this);
//							var cid = cthis.attr('id');
//							if(typeof cid == 'undefined'){
//								cid = 'clone_template_'+id;
//								cthis.attr('id',id);
//							}
//							var cpreview = cthis.attr('template-preview')||'';//用来预览效果，不然页面会突然撑开很难看(此功能只用在page模版，list模版不支持)
//							var callback = window[cthis.attr('template-callback')]||function(){}
//							cthis = $('#'+cid);
//							$(cpreview).remove();
//							cthis.parent().find('[template-setting]').remove();
//							cthis.before(template(cid,data));
//							callback(data);
//						})
						
						if(dir=='down'||dir==''){
							tid().remove();
						}
						beforeLoad(data);
						var th = self.text();
						self.html(th.replace(/template-setting/g,'template-id="'+id+'" template-setting'));
						self.before(template(id,data));
						if(type=='list'){
							setting = tid().eq(0).attr('template-setting')||'{'+currentPage+':\'1\',totalPage:\'0\'}';
							setting = eval('('+setting+')');
							setting[currentPage] ++;
							tid().attr('template-setting',JSON.stringify(setting)).eq(tid().length-1).addClass('last-child');
							pullRefresh.endPullUpToRefresh(setting[currentPage]>setting.totalPage);
							if(dir=='down'){
								pullRefresh.endPullDownToRefresh();
							}
						}
						if(loadedEvalJS.hasData.Trim()!=""){
							new Function('return '+loadedEvalJS.hasData)();
						}
					}else if(data.respCode == '0204'){
			   			if(dir=='down'||dir==''){
							tid().remove();
						}
						if(type=='list'){
							pullRefresh.endPullUpToRefresh(true);
							if(dir=='down'){
								pullRefresh.endPullDownToRefresh();
							}
							$('#'+pid+' .mui-pull-loading').html(loadedNoneText);
						}else{
							//page可以不需要显示空数据，可以使用template-preview来展示视图
							if(loadedNoneText!=""){
								self.before('<div class="mui-pull-bottom-tips" template-id="'+id+'" template-setting="{}"><div class="mui-pull-bottom-wrapper"><span class="mui-pull-loading">'+loadedNoneText+'</span></div></div>');
							}
						}
						//数据为空时执行
						if(loadedEvalJS.none.Trim()!=""){
							new Function('return '+loadedEvalJS.none)();
						}
					}else{
//						System.toast(data.respMsg);
						if(type=='list'){
							pullRefresh.endPullUpToRefresh(false);
							if(dir=='down'){
								pullRefresh.endPullDownToRefresh();
							}
						}
		    		}
					mc(data);
		   		});
			}else{
				if(url!=''){
					url = url.replace(/{base}/g,BasePath);//替换根目录路径
					if(type=='list'){
						var reg = new RegExp('{setting.'+currentPage+'}','g');
						url = url.replace(reg,setting[currentPage]);//替换当前页
					}
					//获取service-data值
					var sdata = self.attr('template-data')||'{}';
					sdata = eval('('+sdata+')');
					sdata = $.extend(sdata, newData);
					if(url.indexOf('?')!=-1){
						var urls = url.split('?');
						url = urls[0];
						var urlData = System.urlToJson(urls[1]);
						sdata = $.extend(true,urlData,sdata);
					}
					$.ajax(url,{
						data:sdata,
						type:sdata.ajaxType||'GET',//HTTP请求类型
						dataType:'json',
						timeout:60000,//超时时间设置为10秒；
	//				$.ajax({
	//					url: url,
	//					type:'GET',
	//					dataType:'jsonp',
	//					jsonp: "jsonpCallback",
						success: function(data){
							console.log(data);
							if(dir==""){
								$(preview).remove();
							}
							data = $.extend(data,sdata);
							//添加baseBath相对路径
							data['BasePath'] = window.BasePath;
							if(dir=='down'||dir==''){
								tid().remove();
							}
							beforeLoad(data);
							var th = self.text();
							self.html(th.replace(/template-setting/g,'template-id="'+id+'" template-setting'));
							self.before(template(id,data));
							if(type=='list'){
								setting = tid().eq(tid().length-1).attr('template-setting')||'{currentPage:\'1\',totalPage:\'0\'}';
								setting = eval('('+setting+')');
								setting[currentPage] ++;
								tid().attr('template-setting',JSON.stringify(setting)).eq(tid().length-1).addClass('last-child');
								
								pullRefresh.endPullUpToRefresh(setting[currentPage]>setting.totalPage);
								if(dir=='down'){
									pullRefresh.endPullDownToRefresh();
								}
							}
							mc(data);
						},
						error:function(xhr,type,errorThrown){
							//异常处理；
							System.toast("网络连接超时，请稍后重试#^_^#");
							console.log(type);
							if(type=='list'){
								pullRefresh.endPullUpToRefresh(false);
								if(dir=='down'){
									pullRefresh.endPullDownToRefresh();
								}
							}
							mc(xhr);
						},
						complete:function(){
							
						}
					});
				}else if(typeof jsonData == 'object'){
					if(dir==""){
						$(preview).remove();
						tid().remove();
					}
					//获取service-data值
					var sdata = self.attr('template-data')||'{}';
					sdata = eval('('+sdata+')');
					sdata = $.extend(sdata, newData);
					jsonData = $.extend(jsonData, sdata);
					//添加baseBath相对路径
					jsonData['BasePath'] = window.BasePath;
					beforeLoad(jsonData);
					var th = self.text();
					self.html(th.replace(/template-setting/g,'template-id="'+id+'" template-setting'));
					self.before(template(id,jsonData));
					mc(jsonData);
				}
			}
		}
		
		//添加参数
		_this.data = {};
		var pid = '';
		var pullRefresh = null;
		_this.create = function(){
			_this.isCreate = true;
			if(type=='list'){
				var parent = self.parents('.mui-scroll-wrapper[data-type="pullToRefresh"]');
				if(parent.length==0){
					parent = self.parents('.mui-scroll-wrapper')
				}
				pid = parent.attr('id');
				if(typeof pid == 'undefined'){
					pid = 'pullrefresh'+id;
					parent.attr('id',pid);
				}
				var data = eval('('+($('#'+pid).attr('data-setting')||'{}')+')');
				data = $.extend(CONFIG.scroll,data);
				mui('#'+pid).scroll(data);
				_this.isReload = false;
				mui.each(parent.find('.mui-scroll'), function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								pullRefresh = this;
								pullRefresh.refresh(true);
								setTimeout(function(){
									if(reloadfunc == null){
										_this.load('down');
									}else{
										if(_this.isReload){
										}else{
											reloadfunc();
										}
										_this.isReload = false;
									}
								},300)
							}
						},
						up: {
							height:0,//可选.默认50.触发上拉加载拖动距离
					      	auto:true,//可选,默认false.自动上拉加载一次
					      	contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
					      	contentnomore:loadFinishText,//可选，请求完毕若没有更多数据时显示的提醒内容；
							callback: function(){
								pullRefresh = this;
								setTimeout(function(){
									_this.load('up');
								},300)
							}
						}
					});
				});
			}else if(type=='page'){
				this.load('');
			}
		}
		
		_this.reload = function(dir){
			if(!_this.isCreate){
				_this.init();
				return;
			}
			if(type=='list'){
				_this.isReload = true;
				tid().attr('template-setting','{currentPage:\'1\',totalPage:\'0\'}');
				pullRefresh.pullDownLoading();
				if(reloadfunc == null){}else{
					_this.load('down');
				}
			}else if(type=='page'){
				this.load('');
			}
		}
		
		_this.init = function(){
			if(_this.isCreate){
				_this.reload();
				return;
			}
			if(tservice){
				clearInterval(_this[0].temSt);
				_this[0].temSt = setInterval(function(){
					if(_this[0].temSt){
						clearInterval(_this[0].temSt );
						_this.create();
					}
				},500)
			}else{
				_this.create();
			}
		}

		//清空模版数据，并恢复到初始
        _this.clearTemplate = function(){
        	//删除模版结果
            $('[template-id="'+self.attr('id')+'"]').remove();
            type = self.attr('template-type')||'page';//申明使用的是list还是page
            if(type == 'list'){
            	//恢复初始
	            self.after(_this.templateHtml);
	            //清空所有data数据
	            _this.data = {};
	            self.remove();
	            self = $('#'+self.attr('id'));
				try{
					pullRefresh.refresh(true);
				}catch(e){}
            	$('#'+pid+' .mui-pull-loading').html("");
            	mui('#'+pid).scroll().scrollTo(0,0,0);//100毫秒滚动到顶
            }else{
            	preview = self.attr('template-preview')||'';
            	if(preview!=''){
            		$(preview).remove();
            	}
            	//还原视图
            	self.before(_this.preview);
            }
        }
        
        _this.onload = function(data){}

		if(lazy == 'false'){
			if(tservice){
				clearInterval(_this[0].temSt);
				_this[0].temSt = setInterval(function(){
					if(_this[0].temSt){
						clearInterval(_this[0].temSt );
						_this.create();
					}
				},500)
			}else{
				_this.create();
			}
		}
		
		_this.templateHtml = _this[0].outerHTML;
		
		window['#'+id] = _this;
		
		setTimeout(function(){
			//组件加载完成
			ready();
			System.setReady(self);
		},500)
		return _this;
	}
	
	//上传组件upload
	$.fn.Upload = function(i){
		var _this = this;
		var self = $(this);
		var id = self.attr('id');
		if(typeof id == 'undefined'){
			id = 'upload_'+new Date().getTime()+'_'+i;
			self.attr('id',id);
		}
		self = $('#'+id);
		var setting = self.attr('upload-setting')||null;//配置文件
		var data = self.attr('upload-data')||null;//参数
		var sv = self.attr('upload-service')||"{name:''}";//参数
		if(data){
			data = eval('('+data+')');
		}else{
			data = {};
		}
		var sv2 = eval('('+sv+')');
		var option = {
			pick:{id:'#'+id,multiple:false},
			auto:true,
			swf: BasePath + '/component/uploader/js/Uploader.swf',
			fileNumLimit:5,
			formData:data,
			server: BASEPATH+service[sv2.name].url
		}
		if(setting){
			setting = eval('('+setting+')');
			setting = $.extend(true, option,setting);
		}
		
		var uploader = new WebUploader.Uploader(setting);
//		//上传文件之前回调事件
//	    uploader.onUploadBeforeSend = function(obj, data, headers) {
//	    };
//	    
//		//当文件上传出错时触发。
//	    uploader.onUploadError = function(file,code) {
//	    	System.alert(file.name+'上传文件失败,原因:'+code);
//	    };
//	    
//	    //当文件上传成功时触发
//	    uploader.onUploadSuccess = function(file,response) {
//	    	console.log('文件上传成功时触发');
//	    }
//	    
//	    //不管成功或者失败，文件上传完成时触发。
//	    uploader.onUploadComplete = function( file) {
//	    	uploader.removeFile(file);
//	    };

	    window['#'+id] = uploader;
		System.setReady(self);
	}
	
	function reay(){
		/*
		 * 无依赖外部js的组件
		 */
		$('.form-style-1-input input[type="radio"]').each(function(i){
			$(this).Radio(i);
		})
		
		$('.form-style-1-input input[type="checkbox"]').each(function(i){
			$(this).Checkbox(i);
		})
		
		$('[component="chosen"]').each(function(i){
			$(this).Chosen(i);
		})
		
		$('[component="form"]').each(function(i){
			$(this).Form(i);
		})
		
		$('input,textarea').each(function(i){
			$(this).InputChange(i);
		})
		
		$('textarea').each(function(i){
			if(typeof $(this).attr('maxHeight') != 'undefined'){
				$(this).autoTextarea(i);
			}
		})
		
		/*
		 * 依赖外部js的组件
		 */
		if($('[component="mobiscroll"]').length>0){
			shim.push('mobiscroll');
			require(['mobiscroll'],function(){
				$('[component="mobiscroll"]').each(function(i){
					$(this).Mobiscroll(i);
				})
			})
		}
		
		//选择器
		if($('[component="dateTime"]').length>0||$('[component="picker"]').length>0){
			shim.push('picker');
			shim.push('poppicker');
			require(['picker','poppicker'],function(){
				$('[component="dateTime"]').each(function(i){
					$(this).DateTime(i);
				})
				$('[component="picker"]').each(function(i){
					$(this).Picker (i);
				})
			})
		}
		
		//地区选择
		if($('[component="citySelect"]').length>0){
			shim.push('picker');
			shim.push('poppicker');
			shim.push('city.data');
			require(['picker','poppicker','city.data'],function(){
				$('[component="citySelect"]').each(function(i){
					$(this).CitySelect(i);
				})
			})
		}
		
		//page模版
		if($('[component="template"][template-type="page"]').length>0){
			shim.push('template');
			require(['template'],function(template){
				window.template = template;
				$('[component="template"][template-type="page"]').each(function(i){
					$(this).Template(i);
				})
			})
		}
		
		//list模版
		if($('[component="template"][template-type="list"]').length>0){
			shim.push('template');
			shim.push('pullToRefresh.material');
			require(['template','pullToRefresh.material'],function(template){
				window.template = template;
				$('[component="template"][template-type="list"]').each(function(i){
					$(this).Template(i);
				})
			})
		}
		
		//页面刷新
		if($('[has-refresh]').length>0){
			shim.push('refresh');
		}
		
		//图片查看器
		if($('[data-preview-src]').length>0){
			shim.push('previewimage');
			require(['previewimage'],function(){
				mui.previewImage();
			})
		}
		
		//自定义图片上传
		if($('input.myImgList').length>0){
			shim.push('gridly');
			shim.push('css!'+BasePath+'/component/css/jquery.gridly.css');
			shim.push('upload');
			shim.push('previewimage');
			require(['upload','previewimage'],function(WebUploader){
				window.WebUploader = WebUploader;
				mui.previewImage();
			})
		}
	}
	
	window['jsReady'] = true;
	
	System.renderJs = function(){
		System.initScroll();
		reay();
	}
	reay();
//	if(lowIE){
//		reay();
//	}else{
//		if(mui.os.plus){
//			mui.plusReady(function(){reay()})
//		}else{
//			mui.ready(function(){reay()})
//		}
//	}
	
	return {
		shim:shim
	}
})
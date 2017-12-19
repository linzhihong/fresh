var BASEPATH ='http://zjz520.tunnel.echomod.cn/'

if(!window.strEnc){
	eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('L 2e(b,a,d,g){z h=b.S,p="",q,e,l,t,u,r;I!=a&&""!=a&&(q=1a(a),t=q.S);I!=d&&""!=d&&(e=1a(d),u=e.S);I!=g&&""!=g&&(l=1a(g),r=l.S);N(0<h)N(4>h){z p=U(b),f;N(I!=a&&""!=a&&I!=d&&""!=d&&I!=g&&""!=g){z c;f=p;o(c=0;c<t;c++)f=J(f,q[c]);o(c=0;c<u;c++)f=J(f,e[c]);o(c=0;c<r;c++)f=J(f,l[c])}R N(I!=a&&""!=a&&I!=d&&""!=d){f=p;o(c=0;c<t;c++)f=J(f,q[c]);o(c=0;c<u;c++)f=J(f,e[c])}R N(I!=a&&""!=a)o(f=p,c=0;c<t;c++)f=J(f,q[c]);p=1d(f)}R{o(z w=Q(h/4),x=h%4,v=0,v=0;v<w;v++){c=b.P(4*v+0,4*v+4);c=U(c);N(I!=a&&""!=a&&I!=d&&""!=d&&I!=g&&""!=g){f=c;o(c=0;c<t;c++)f=J(f,q[c]);o(c=0;c<u;c++)f=J(f,e[c]);o(c=0;c<r;c++)f=J(f,l[c])}R N(I!=a&&""!=a&&I!=d&&""!=d){f=c;o(c=0;c<t;c++)f=J(f,q[c]);o(c=0;c<u;c++)f=J(f,e[c])}R N(I!=a&&""!=a)o(f=c,c=0;c<t;c++)f=J(f,q[c]);p+=1d(f)}N(0<x){b=b.P(4*w+0,h);c=U(b);N(I!=a&&""!=a&&I!=d&&""!=d&&I!=g&&""!=g){f=c;o(c=0;c<t;c++)f=J(f,q[c]);o(c=0;c<u;c++)f=J(f,e[c]);o(c=0;c<r;c++)f=J(f,l[c])}R N(I!=a&&""!=a&&I!=d&&""!=d){f=c;o(c=0;c<t;c++)f=J(f,q[c]);o(c=0;c<u;c++)f=J(f,e[c])}R N(I!=a&&""!=a)o(f=c,c=0;c<t;c++)f=J(f,q[c]);p+=1d(f)}}M p}L 1a(b){o(z a=[],d=b.S,g=Q(d/4),h=d%4,p=0,p=0;p<g;p++)a[p]=U(b.P(4*p+0,4*p+4));0<h&&(a[p]=U(b.P(4*p+0,d)));M a}L U(b){z a=b.S,d=K(X);N(4>a){o(z g=0,h=0,g=g=0;g<a;g++)o(z p=b.1Y(g),h=0;16>h;h++){o(z q=1,e=0,e=15;e>h;e--)q*=2;d[16*g+h]=Q(p/q)%2}o(g=a;4>g;g++)o(h=p=0;16>h;h++){q=1;o(e=15;e>h;e--)q*=2;d[16*g+h]=Q(p/q)%2}}R o(g=0;4>g;g++)o(p=b.1Y(g),h=0;16>h;h++){q=1;o(e=15;e>h;e--)q*=2;d[16*g+h]=Q(p/q)%2}M d}L 1Z(b){z a;W(b){s"1P":a="0";y;s"1u":a="1";y;s"1w":a="2";y;s"1A":a="3";y;s"1F":a="4";y;s"1H":a="5";y;s"1J":a="6";y;s"1L":a="7";y;s"1O":a="8";y;s"1R":a="9";y;s"1t":a="A";y;s"1v":a="B";y;s"1x":a="C";y;s"1z":a="D";y;s"1B":a="E";y;s"1D":a="F"}M a}L 2b(b){z a;W(b){s"0":a="1P";y;s"1":a="1u";y;s"2":a="1w";y;s"3":a="1A";y;s"4":a="1F";y;s"5":a="1H";y;s"6":a="1J";y;s"7":a="1L";y;s"8":a="1O";y;s"9":a="1R";y;s"A":a="1t";y;s"B":a="1v";y;s"C":a="1x";y;s"D":a="1z";y;s"E":a="1B";y;s"F":a="1D"}M a}L 2f(b){z a="";o(i=0;4>i;i++){z d=0;o(j=0;16>j;j++){z g=1;o(m=15;m>j;m--)g*=2;d+=b[16*i+j]*g}0!=d&&(a+=2g.2h(d))}M a}L 1d(b){z a="";o(i=0;16>i;i++){z d="";o(j=0;4>j;j++)d+=b[4*i+j];a+=1Z(d)}M a}L 2i(b){z a="";o(i=0;16>i;i++)a+=2b(b.P(i,i+1));M a}L J(b,a){o(z d=1M(a),g=1N(b),h=K(H),p=K(H),q=K(H),e=0,l=0,e=e=0;H>e;e++)h[e]=g[e],p[e]=g[H+e];o(e=0;16>e;e++){o(l=0;H>l;l++)q[l]=h[l],h[l]=p[l];g=K(G);o(l=0;G>l;l++)g[l]=d[e][l];g=Y(1S(1o(Y(1p(p),g))),q);o(l=0;H>l;l++)p[l]=g[l]}d=K(X);o(e=0;H>e;e++)d[e]=p[e],d[H+e]=h[e];M 1q(d)}L 2j(b,a){o(z d=1M(a),g=1N(b),h=K(H),p=K(H),q=K(H),e=0,l=0,e=e=0;H>e;e++)h[e]=g[e],p[e]=g[H+e];o(e=15;0<=e;e--){o(l=0;H>l;l++)q[l]=h[l],h[l]=p[l];g=K(G);o(l=0;G>l;l++)g[l]=d[e][l];g=Y(1S(1o(Y(1p(p),g))),q);o(l=0;H>l;l++)p[l]=g[l]}d=K(X);o(e=0;H>e;e++)d[e]=p[e],d[H+e]=h[e];M 1q(d)}L 1N(b){z a=K(X);i=0;m=1;o(n=0;4>i;i++,m+=2,n+=2)o(j=7,k=0;0<=j;j--,k++)a[8*i+k]=b[8*j+m],a[8*i+k+H]=b[8*j+n];M a}L 1p(b){z a=K(G);o(i=0;8>i;i++)a[6*i+0]=0==i?b[T]:b[4*i-1],a[6*i+1]=b[4*i+0],a[6*i+2]=b[4*i+1],a[6*i+3]=b[4*i+2],a[6*i+4]=b[4*i+3],a[6*i+5]=7==i?b[0]:b[4*i+4];M a}L Y(b,a){z d=K(b.S);o(i=0;i<b.S;i++)d[i]=b[i]^a[i];M d}L 1o(b){z a=K(H),d="",g=[[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]],h=[[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]],p=[[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]],q=[[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]],e=[[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]],l=[[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]],t=[[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]],u=[[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]];o(m=0;8>m;m++){z r=0,f=0,r=2*b[6*m+0]+b[6*m+5],f=8*b[6*m+1]+4*b[6*m+2]+2*b[6*m+3]+b[6*m+4];W(m){s 0:d=O(g[r][f]);y;s 1:d=O(h[r][f]);y;s 2:d=O(p[r][f]);y;s 3:d=O(q[r][f]);y;s 4:d=O(e[r][f]);y;s 5:d=O(l[r][f]);y;s 6:d=O(t[r][f]);y;s 7:d=O(u[r][f])}a[4*m+0]=Q(d.P(0,1));a[4*m+1]=Q(d.P(1,2));a[4*m+2]=Q(d.P(2,3));a[4*m+3]=Q(d.P(3,4))}M a}L 1S(b){z a=K(H);a[0]=b[15];a[1]=b[6];a[2]=b[19];a[3]=b[20];a[4]=b[28];a[5]=b[11];a[6]=b[27];a[7]=b[16];a[8]=b[0];a[9]=b[14];a[10]=b[22];a[11]=b[25];a[12]=b[4];a[13]=b[17];a[14]=b[V];a[15]=b[9];a[16]=b[1];a[17]=b[7];a[18]=b[23];a[19]=b[13];a[20]=b[T];a[21]=b[26];a[22]=b[2];a[23]=b[8];a[24]=b[18];a[25]=b[12];a[26]=b[29];a[27]=b[5];a[28]=b[21];a[29]=b[10];a[V]=b[3];a[T]=b[24];M a}L 1q(b){z a=K(X);a[0]=b[1j];a[1]=b[7];a[2]=b[1k];a[3]=b[15];a[4]=b[1l];a[5]=b[23];a[6]=b[1T];a[7]=b[T];a[8]=b[1m];a[9]=b[6];a[10]=b[1n];a[11]=b[14];a[12]=b[1Q];a[13]=b[22];a[14]=b[2c];a[15]=b[V];a[16]=b[1r];a[17]=b[5];a[18]=b[1g];a[19]=b[13];a[20]=b[1V];a[21]=b[21];a[22]=b[1W];a[23]=b[29];a[24]=b[1b];a[25]=b[4];a[26]=b[1c];a[27]=b[12];a[28]=b[1G];a[29]=b[20];a[V]=b[2a];a[T]=b[28];a[H]=b[1e];a[1f]=b[3];a[1C]=b[Z];a[1e]=b[11];a[1b]=b[1y];a[1r]=b[19];a[1m]=b[2d];a[1j]=b[27];a[1h]=b[1C];a[1i]=b[2];a[1I]=b[1I];a[Z]=b[10];a[1c]=b[1E];a[1g]=b[18];a[1n]=b[1X];a[1k]=b[26];a[G]=b[1f];a[1K]=b[1];a[1E]=b[1i];a[1y]=b[9];a[1G]=b[1K];a[1V]=b[17];a[1Q]=b[1U];a[1l]=b[25];a[1s]=b[H];a[1U]=b[0];a[1X]=b[1h];a[2d]=b[8];a[2a]=b[G];a[1W]=b[16];a[2c]=b[1s];a[1T]=b[24];M a}L O(b){z a="";W(b){s 0:a="1P";y;s 1:a="1u";y;s 2:a="1w";y;s 3:a="1A";y;s 4:a="1F";y;s 5:a="1H";y;s 6:a="1J";y;s 7:a="1L";y;s 8:a="1O";y;s 9:a="1R";y;s 10:a="1t";y;s 11:a="1v";y;s 12:a="1x";y;s 13:a="1z";y;s 14:a="1B";y;s 15:a="1D"}M a}L 1M(b){o(z a=K(1s),d=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]],g=[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],h=0;7>h;h++)o(j=0,k=7;8>j;j++,k--)a[8*h+j]=b[8*k+h];o(h=0;16>h;h++){z p=0;o(j=0;j<g[h];j++){b=a[0];p=a[28];o(k=0;27>k;k++)a[k]=a[k+1],a[28+k]=a[29+k];a[27]=b;a[1l]=p}b=K(G);b[0]=a[13];b[1]=a[16];b[2]=a[10];b[3]=a[23];b[4]=a[0];b[5]=a[4];b[6]=a[2];b[7]=a[27];b[8]=a[14];b[9]=a[5];b[10]=a[20];b[11]=a[9];b[12]=a[22];b[13]=a[18];b[14]=a[11];b[15]=a[3];b[16]=a[25];b[17]=a[7];b[18]=a[15];b[19]=a[6];b[20]=a[26];b[21]=a[19];b[22]=a[12];b[23]=a[1];b[24]=a[1h];b[25]=a[1y];b[26]=a[V];b[27]=a[1b];b[28]=a[1n];b[29]=a[1Q];b[V]=a[29];b[T]=a[1j];b[H]=a[1E];b[1f]=a[1c];b[1C]=a[H];b[1e]=a[1k];b[1b]=a[Z];b[1r]=a[G];b[1m]=a[1m];b[1j]=a[1l];b[1h]=a[1f];b[1i]=a[1G];b[1I]=a[1g];b[Z]=a[1i];b[1c]=a[1K];b[1g]=a[1e];b[1n]=a[28];b[1k]=a[T];W(h){s 0:o(m=0;G>m;m++)d[0][m]=b[m];y;s 1:o(m=0;G>m;m++)d[1][m]=b[m];y;s 2:o(m=0;G>m;m++)d[2][m]=b[m];y;s 3:o(m=0;G>m;m++)d[3][m]=b[m];y;s 4:o(m=0;G>m;m++)d[4][m]=b[m];y;s 5:o(m=0;G>m;m++)d[5][m]=b[m];y;s 6:o(m=0;G>m;m++)d[6][m]=b[m];y;s 7:o(m=0;G>m;m++)d[7][m]=b[m];y;s 8:o(m=0;G>m;m++)d[8][m]=b[m];y;s 9:o(m=0;G>m;m++)d[9][m]=b[m];y;s 10:o(m=0;G>m;m++)d[10][m]=b[m];y;s 11:o(m=0;G>m;m++)d[11][m]=b[m];y;s 12:o(m=0;G>m;m++)d[12][m]=b[m];y;s 13:o(m=0;G>m;m++)d[13][m]=b[m];y;s 14:o(m=0;G>m;m++)d[14][m]=b[m];y;s 15:o(m=0;G>m;m++)d[15][m]=b[m]}}M d};',62,144,'||||||||||||||||||||||||for||||case||||||break|var|||||||48|32|null|enc|Array|function|return|if|getBoxBinary|substring|parseInt|else|length|31|strToBt|30|switch|64|xor|43|||||||||||getKeyBytes|36|44|bt64ToHex|35|33|45|40|41|39|47|55|38|46|sBoxPermute|expandPermute|finallyPermute|37|56|1010|0001|1011|0010|1100|51|1101|0011|1110|34|1111|50|0100|52|0101|42|0110|49|0111|generateKeys|initPermute|1000|0000|54|1001|pPermute|63|57|53|61|58|charCodeAt|bt4ToHex|||||||||||60|hexToBt4|62|59|strEnc|byteToString|String|fromCharCode|hexToBt64|dec'.split('|'),0,{}))
}
var AjaxStop = false;//停止所有ajax请求，并不获取值
var service = {
	/*
	 * 获取验证码
	 */
	getCode : {
		mobile:'',					//手机号码
		ajaxType:'POST',
	 	url:'user/getCheckCode'
	},
	/*
	 * 用户注册
	 */
	register: {
		phone:'',					//手机号码
		msgCode:'',				    //验证码
		ajaxType:'POST',
	 	url:'user/regist'
	},
	/*
	 * 获取扫一扫配置
	 */
	getScanInitData: {
		ajaxType:'POST',
	 	url:'dev/getScanInitData'
	},
	/*
	 * 获取箱格信息
	 */	
	getDevInfo:{		
		ajaxType:'POST',
	 	url:'dev/getDevInfo'
	},
	/*
	 * 扫一扫
	 */
	goDepositPage : {
		qrCodeUrl:'',					//二维码的url
		ajaxType:'POST',
	 	url:'dev/goBoxPage'
	},
	/*
	 * 生产订单
	 */
	createOrder : {
		boxNum:'',					//箱格号
		groupId:'',					//副柜号
		ajaxType:'POST',
	 	url:'order/createOrder'
	},
	/*
	 * 获取订单列表
	 */
	getOrderList : {
		ajaxType:'POST',
	 	url:'order/getOrderList'
	},
	/*
	 * 中途开柜
	 */
	midOpenBox : {
		orderSn:'',					//订单号
		ajaxType:'POST',
	 	url:'order/midOpenBox'
	},
	/*
	 * 请求取物、结束订单
	 */
	endOrder : {
		orderSn:'',					//订单号
		ajaxType:'POST',
	 	url:'order/endOrder'
	},
	/*
	 * 获取历史订单列表
	 */
	getOldOrderList : {
		ajaxType:'POST',
	 	url:'order/getOldOrderList'
	},
	/*
	 * 获取资金明细
	 */
	getLogCostList : {
		ajaxType:'POST',
	 	url:'user/getLogCostList'
	},
	/*
	 * 获取系统信息
	 */
	getSysLogList : {
		ajaxType:'POST',
	 	url:'user/getSysLogList'
	},
	/*
	 * 转送余额
	 */
	giveBalance : {
		phone:'',             //转赠对象的手机号
		ajaxType:'POST',
	 	url:'user/giveBalance'
	},
	/*
	 * 获取钱包数据
	 */
	getBalance : {
		ajaxType:'POST',
	 	url:'user/getBalance'
	},
	/*
	 * 邀请转赠对象
	 */
	sendNotice : {
		mobile:'',             //转赠对象的手机号
		ajaxType:'POST',
	 	url:'user/sendNotice'
	},
	/*
	 * 获取充值配置
	 */
	getRechargeConfig : {
		ajaxType:'POST',
	 	url:'user/getRechargeConfig'
	},
	
	


	/***************************客户端退款管理end******************************/
	doService:function(_data,_callback){
		if(AjaxStop){
			return;
		}
		
//		alert(_data.listenReload);
		//把请求过的service存储到当前页面,请求的service添加listenReload = true,说明这个接口需要监听当页面刷新的执行下拉刷新的时候同时再次请求此方法
		if(_data.listenReload == true||_data.listenReload == 'true'){
			var wbs = System.getMd5(window.location.href);
			var wbs2 = System.getMd5(JSON.stringify(_data));
			//console.log("page-identification:"+wbs+'====='+JSON.stringify(_data));
			if(!window[wbs]){
				window[wbs] = {};
			}
			window[wbs][wbs2] = [_data,_callback];
		}
		//自定义服务配置地址
		var bp = System.storage.getItem("BASEPATH")||'';
		if(bp!=''){
			BASEPATH = bp;
		}
		
		if(typeof _data == 'undefined'){
			System.alert('doService配置文件出错');
			return;
		}
		if(_data.showLoading){
			if(_data.showLoading=='true'||_data.showLoading){
	//			System.showLoading({title:_data.des});
			}
		}
		var _option = {
			url:'',
			ajaxType:'GET',
			data:{},
			callback:_callback||function(){}
		}
	  	_option = $.extend(_option,_data);
	  	var paraUrl = [];
		var _newData = {};
		for(var i in _data){
			if(i!='des'&&i!='ajaxType'&&i!='showLoading'&&i!='hideLoading'&&i!='url'&&i!='undefined'&&i!='timeout'){
				//替换
				_newData[i] = _data[i];
			}
		}
		
		_newData['token'] = System.storage.getItem("token");
		_newData['userId'] = System.storage.getItem("userId");
		//如果是在app中则添加a参数
		_newData['a'] = mui.os.plus?'1':'1';
		//判断前后端登录
		_newData['b'] = System.storage.getItem('loginType');
		
		//token加密
		var token = System.getToken(_option.url);
		if(token!=''){
			_newData['token'] = token;
		}
		
		for(var i in _newData){
			paraUrl.push(i+'='+_newData[i]);
		}
		console.log(BASEPATH+_option.url+'::'+JSON.stringify(_newData)+'\n###直接访问url:'+BASEPATH+_option.url+'?'+paraUrl.join('&'));
		
		//ajax扩展属性
		var parameter = {
			success:function(data,textStatus,xhr){
				if(AjaxStop){
					return;
				}
				console.log('success::'+BASEPATH+_option.url+'::'+JSON.stringify(data));
				//服务器返回响应，根据响应结果，分析是否登录成功；
				_option.callback(data);
				if(typeof _data.hideLoading == 'undefined'||_data.hideLoading=='true'||_data.hideLoading){
					System.hideLoading();
				}
                if (data.respCode == '0416') {//416    登录超时或用户不存在
                	if($('[data-page="no-check-loginOut"]').length==0){
	                	//停止所有ajax请求，并不获取值
	                	AjaxStop = true;
						$('.yzinfo').remove();
	            		System.hideLoading();
						mui.back = function(){}
						var msg = '';
						var mbtn = '';
						var token = System.storage.getItem('token')||'';
						if(token==''){
							msg = '请登录';
							mbtn = '登录';
						}else{
							System.storage.setItem('token','');
							msg = '登录超时!';
							mbtn = '重新登录';
						}
						System.alert({msg:msg,title:'消息提示',btn:mbtn,callback:function(d){
	                		AjaxStop = false;
							System.openWindow(openWinPath+"/html/login.html",{timeout:'true'});
						}});
					}
					return;
				}
                if (data.respCode == '0417') {//417  非法操作
					System.toast("非法操作");
					return;
				}
			},
			error:function(xhr,type,errorThrown){
				if(AjaxStop){
					return;
				}
				_option.callback('dataError');
				//异常处理；
				console.log(BASEPATH+_option.url+"异常处理:"+errorThrown+':::'+JSON.stringify(xhr));
//				System.alert("网络连接超时，请稍后重试#^_^#");
				System.hideLoading();
				return;
			},
			complete:function(xhr){
				if(AjaxStop){
					return;
				}
			}
		}
		if(mui.os.plus){
			mui.ajax(BASEPATH+_option.url,$.extend({
				data:_newData,
				dataType:'json',//服务器返回json格式数据
				cache:false,
				type:_option.ajaxType,//HTTP请求类型
				timeout:_data['timeout']||60000,//超时时间设置为60秒；
			},parameter));
		}else{
			$.ajax($.extend({
				url : BASEPATH+_option.url,
				data:_newData,
				cache:false,
				type:_option.ajaxType
			},parameter));
		}
	}
}

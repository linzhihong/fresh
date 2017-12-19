//声明es5的严格模式
'use strict';

//包装函数
module.exports = function(grunt){
	//grunt运行的时间
	require('time-grunt')(grunt);
	
	//自动加载package.json下所有配置的插件
	require('load-grunt-tasks')(grunt);
	var colors = require('colors');
	
	var config = {
		//源码目录
		src:'src/',
		//目标文件目录
		dist:'dist/'
	}
	
	var times = 0;
	
	//cwd:是相对于src的选中路径
	
	//任务配置，所有插件的配置信息
	grunt.initConfig({
		
		config:config,
		
		//获取 package.json 的信息
		pkg:grunt.file.readJSON('package.json'),
		
		//获取manifest.json 的信息
		mft:grunt.file.readJSON('manifest.json'),
		
		// uglify插件的配置信息
		/*
		“options”中规定允许生成的压缩文件带banner，即在生成的压缩文件第一行加一句话说明。注意，其中使用到了pkg获取package.json的内容。

	　　“dist”中配置了源文件和目标文件。即规定了要压缩谁？压缩之后会生成谁？注意，我们这里将目标文件的文件名通过pkg的name和version来命名。

	　　（PS：上文中说过的package.json的内容终于找到了他被应用的地方了。这样的好处是：例如，对文件版本的管理，你只需要在package.json中修改即可，grunt会自动根据最新的版本号生成相应版本的文件。你不用手动去修改文件的文件名。）
		*/
		uglify:{
			options:{
				mangle: true, //混淆
				stripBanners:true,
				banner:'/*by <%= pkg.author %> <%= pkg.name %><%= pkg.version %>*/',
				footer:''
			},
			component:{
				files: [
					{
						expand: true,
						cwd: '<%=config.src%>/component/',
						extDot:'last',
                        // 排除.min的文件
                        src: ['**/*.js'],//,'!**/*.min.js'
                        // 输出
                        dest: '<%=config.dist%>/component/',
                        ext: '.js'
					}
				]
			},
			all: {
				files: [
					{
						expand: true,
						cwd: '<%=config.src%>/js/',
						extDot:'last',
                        // 排除.min的文件
                        src: ['**/*.js'],//,'!**/*.min.js'
                        // 输出
                        dest: '<%=config.dist%>/js/',
                        ext: '.js'
					}
				]
			}
		},
		// 压缩所有css
        cssmin: {
        	options : {   
        		keepSpecialComments: 0, /* 删除所有注释 */
 				banner: '/* <%= grunt.template.today("yyyy-mm-dd")%> */',
				//美化代码
				beautify: {
					//中文ascii化，非常有用！防止中文乱码的神配置
					ascii_only: true
				},
		        compatibility : 'ie8', //设置兼容模式   
		        noAdvanced : true //取消高级特性   
	      	},
			component:{
				files: [
					{
						expand: true,
						cwd: '<%=config.src%>/component/',
						extDot:'last',
                        // 排除.min的文件
                        src: ['**/*.css'],//,'!**/*.min.css'
                        // 输出
                        dest: '<%=config.dist%>/component/',
                        ext: '.css'
					}
				]
			},
		    all: {
				files: [
					{
						expand: true,
						cwd: '<%=config.src%>/css/',
						extDot:'last',
                        // 排除.min的文件
                        src: ['**/*.css'],//,'!**/*.min.css'
                        // 输出
                        dest: '<%=config.dist%>/css/',
                        ext: '.css'
					}
				]
			}
        },
        //拷贝文件
        copy: {
        	//拷贝组件
            component: {
                files: [
	                {
	                    expand: true,
	                    cwd: "<%= config.src%>/component/",
	                    src: ["**","**/*"],
	                    dest: '<%=config.dist%>/component/',
	                }
                ]
            },
            //html
            html: {
                files: [
	                {
	                    expand: true,
	                    cwd: "<%= config.src%>/html/",
	                    src: ["**","**/*"],
	                    dest: '<%=config.dist%>/html/',
	                }
                ]
            }
            //拷贝img
//          img:{
//          	files:[
//          		{
//          			expand:true,
//          			cwd: "<%= config.src%>/img/",
//	                    src: ["**","**/*"],
//	                    dest: "<%= config.dist%>/img/"
//          		}
//          	]
//          }
        },
        //替换文本
        replace: {
            dist: {
                options: {
                    patterns: [
	                    {
//	                        match: /dist\//g,
//	                        replacement: '../'
//	                    },{
//	                        match: /.min.js/g,
//	                        replacement: '.js'
//	                    },{
//	                        match: /.min.css/g,
//	                        replacement: '.css'
//	                    },{
	                        match: /src\/html/g,
	                        replacement: 'dist/html'
	                    }
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist%>/component/',
                    src: ['component.js'],
                    dest: '<%= config.dist%>/component/'
                }]
            }
        },
        //图片压缩
        imagemin: {
        	//组件
        	component: {  
	            options: {  
	                optimizationLevel: 3 //定义 PNG 图片优化水平  
	            },  
	            files: [{
	                expand: true,  
	                cwd: '<%= config.src%>/component/',  
	                src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg 图片  
	                dest: '<%=config.dist%>/component/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示  
                }]  
            },
	        /* 压缩图片大小 */  
	        dist: {  
	            options: {  
	                optimizationLevel: 3 //定义 PNG 图片优化水平  
	            },  
	            files: [{
	                expand: true,  
	                cwd: '<%= config.src%>/img/',  
	                src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg 图片  
	                dest: '<%= config.dist%>/img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示  
                }]  
            }
        },
        //清除目录
	    clean: {
	      	all: {
	      		options: {  
	      			//它不会删除当前工作目录或者当前工作目录之外的文件，除非指定了--force命令行选项
	                force: true
	            },
	            files: [{src:'<%= config.dist%>'},{src:'<%=config.dist%>/component/'}]
	      	},
	      	dist:{
	      		options: {  
	      			//它不会删除当前工作目录或者当前工作目录之外的文件，除非指定了--force命令行选项
	                force: true
	            },
	            files: [{src:'<%= config.dist%>'}]
	      	},
	      	zip:{
	      		options: {  
	      			//它不会删除当前工作目录或者当前工作目录之外的文件，除非指定了--force命令行选项
	                force: true
	            },
	            files: [{src:'unpackage/update'}]
	      	}
	    },
	    //压缩dist资源文件
	    zip:{
	    	dist: {
			    // `router` receives the path from grunt (e.g. js/main.js) 
			    // The path it returns is what the file contents are saved as (e.g. all/main.js) 
			    router: function (filepath) {
			      	// Route each file to all/{{filename}} 
			      	//检测manifest.json->unpackage->是否存在["src","node_modules","Gruntfile.js","package.json","readme.md"]
			      	if(times==0){
			      		//读取service.js配置文件
			      		var service = grunt.file.read('dist/js/service.js');
			      		var mft = grunt.file.readJSON('manifest.json');
				      	var unpackage = mft.unpackage;
				      	var checkList = [
							"src",
							"node_modules",
							"Gruntfile.js",
							"package.json",
							"readme.md"
						];
			      		var f = 0;
			      		console.log("\n\n");
			      		console.log("\n====================请认真查看已下内容====================\n");
				      	for(var i = 0 ; i < checkList.length ; i++){
				      		var item = (unpackage[i]||"").toLowerCase();
				      		if(item=='src'.toLowerCase()){
				      			f++;
				      			console.log("src文件夹已过滤");
				      		}
				      		if(item=='node_modules'.toLowerCase()){
				      			f++;
				      			console.log("node_modules文件夹已过滤");
				      		}
				      		if(item=='Gruntfile.js'.toLowerCase()){
				      			f++;
				      			console.log("Gruntfile.js文件已过滤");
				      		}
				      		if(item=='package.json'.toLowerCase()){
				      			f++;
				      			console.log("package.json文件已过滤");
				      		}
				      		if(item=='readme.md'.toLowerCase()){
				      			f++;
				      			console.log("readme.md文件已过滤");
				      		}
				      	}
				      	console.log("更新包版本号："+(mft.version.name).green);
				      	console.log("service.js BASEPATH 路径为："+(service.match(/BASEPATH="(\S*)\/",/)[1]).green+"(请认真查看接口地址)".underline.red);
				      	var checkLaunchPath = (mft.launch_path.substring(0,mft.launch_path.indexOf('/'))=='dist');
				      	console.log("项目启动页地址检测：["+(checkLaunchPath?(mft.launch_path+"有效").green:(mft.launch_path+"无效的启动地址").underline.red)+"]");
			      		if(f==checkList.length&&checkLaunchPath){
			      			console.log("★★★★★★★★校验成功,压缩包可以使用★★★★★★★★".green);
			      		}else{
			      			console.log("校验失败,压缩包不可使用！！！！！！！！！！！！！\nmanifest.json->unpackage下必须包含\n"+(checkList.join(',')+"这些过滤内容").underline.red);
			      		}
			      		console.log("\n====================请认真查看已上内容====================");
			      	}
			      	times++;
			      	return 'www/' + filepath;
			    },
			    src: ['<%= config.dist%>/**/**.*','manifest.json'],
			    dest: 'unpackage/update/<%=mft.id%>-<%=mft.version.name%>-<%= grunt.template.today("yyyymmddHHMMss")%>.zip'
		  	},
		  	distOfApp: {
			    // `router` receives the path from grunt (e.g. js/main.js) 
			    // The path it returns is what the file contents are saved as (e.g. all/main.js) 
			    router: function (filepath) {
			      	// Route each file to all/{{filename}} 
			      	//检测manifest.json->unpackage->是否存在["src","node_modules","Gruntfile.js","package.json","readme.md"]
			      	if(times==0){
			      		//读取service.js配置文件
			      		var service = grunt.file.read('dist/js/service.js');
			      		console.log("\n\n");
			      		console.log("\n====================请认真查看已下内容====================\n");
				      	console.log("service.js BASEPATH 路径为："+(service.match(/BASEPATH="(\S*)\/",/)[1]).green+"(请认真查看接口地址)".underline.red);
			      		console.log("\n====================请认真查看已上内容====================");
			      	}
			      	times++;
			      	return filepath;
			    },
			    src: ['<%= config.dist%>/**/**.*'],
			    dest: 'unpackage/update/app-dist-<%= grunt.template.today("yyyymmddHHMMss")%>.zip'
		  	},
		  	distOfPc: {
			    // `router` receives the path from grunt (e.g. js/main.js) 
			    // The path it returns is what the file contents are saved as (e.g. all/main.js) 
			    router: function (filepath) {
			      	// Route each file to all/{{filename}} 
			      	//检测manifest.json->unpackage->是否存在["src","node_modules","Gruntfile.js","package.json","readme.md"]
			      	if(times==0){
			      		//读取service.js配置文件
			      		var service = grunt.file.read('dist/js/service.js');
			      		console.log("\n\n");
			      		console.log("\n====================请认真查看已下内容====================\n");
				      	console.log("service.js BASEPATH 路径为："+(service.match(/BASEPATH="(\S*)\/",/)[1]).green+"(请认真查看接口地址)".underline.red);
			      		console.log("\n====================请认真查看已上内容====================");
			      	}
			      	times++;
			      	return filepath;
			    },
			    src: ['<%= config.dist%>/**/**.*'],
			    dest: 'unpackage/update/pc-dist-<%= grunt.template.today("yyyymmddHHMMss")%>.zip'
		  	}
	    	//'unpackage/update/www<%=mft.version.name%>.zip': ['<%= config.dist%>/**/**.*','<%= config.dist%>/www/**/**.*']
	    },
		//使用watch插件（真正实现自动化）
		watch:{
			all:{
				files:[
					'<%= config.src%>/',
					'<%= config.src%>/**/*'
				],
				tasks:['newer:copy','newer:uglify','newer:cssmin','newer:imagemin'],
				options:{spawn:true}
			}
		}
	})
	
//	grunt.event.on('watch', function(action, filepath, target) {
//		var ext = filepath.substring(filepath.lastIndexOf('.') + 1);
//		if(action=='changed'&&ext=='js'){
//			//执行任务
//			grunt.config.set('uglify.single.files',[
//				{
//					expand: true,
//					cwd: '<%=config.src%>/js/',
//					extDot:'last',
//                  // 排除.min的文件
//                  src: 'common.js',
//                  // 输出
//                  dest: '<%=config.dist%>/js/',
//                  ext: '.min.js'
//				}
//			]);
//			grunt.log.writeln('############# single>>'+target + ': ' + filepath + ' has ' + action);
////			grunt.registerTask('uglifysingle',['uglify:single']);
//			this.task.run(['uglify:single']);
//		}
//	});
	
//	告诉 grunt 我们将使用插件
//	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-cssmin');
//	grunt.loadNpmTasks('grunt-contrib-copy');
//	grunt.loadNpmTasks('grunt-contrib-watch');
	
	//告诉grunt当我们在终端输入grunt的时候需要做些什么（注意先后顺序）
	//grunt.registerTask('default',['copy','uglify','cssmin','imagemin','watch']);
	grunt.registerTask('default',['clean:dist','copy','uglify','cssmin','imagemin']);
	grunt.registerTask('pc',['default','clean:zip','zip:distOfPc']);
	grunt.registerTask('webapp',['default','clean:zip','zip:distOfApp']);
	grunt.registerTask('app',['default','clean:zip','zip:dist']);
}
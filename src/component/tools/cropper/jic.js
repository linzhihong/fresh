var jic = {
    /**
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} source_img_obj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     */
    compress: function(data){
        var option = {
            quality:0.2,
            maxWidth:780,
            maxHeight:500,
            outputFormat:'jpg',
            callback:function(imgDom){}
        }
        data = $.extend(option,data);
        var files = data.evt;
        for (var i = 0, f; f = files[i]; i++) {

            if (!f.type.match('image.*')) {
                alert('请选择图片文件');
                continue;
            }
            var reader = new FileReader();
            var fileType = f.type;
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    var source_img_obj = new Image();
                    source_img_obj.src = event.target.result;
                    source_img_obj.onload =function(){
                        var mime_type = "image/jpeg";
                        if(data.outputFormat!=undefined && data.outputFormat=="png"){
                            mime_type = "image/png";
                        }
                        var cvs = document.createElement('canvas');
                        var _width = data.maxWidth;
                        var _height = data.maxHeight;
                        var pres = source_img_obj.naturalWidth/source_img_obj.naturalHeight;

                        if(source_img_obj.naturalWidth>_width||source_img_obj.naturalHeight>_height||fileType!='image/jpeg'){
                            cvs.width = source_img_obj.naturalWidth;
                            cvs.height = source_img_obj.naturalHeight;
                            if(source_img_obj.naturalWidth>_width){
                                cvs.width = _width;
                                cvs.height = _width/pres;
                            }
                            if(source_img_obj.naturalHeight>_height){
                                cvs.height = _height;
                                cvs.width = _height*pres;
                            }
                            source_img_obj.width = cvs.width;
                            source_img_obj.height = cvs.height;
                            cvs.getContext("2d").drawImage(source_img_obj, 0, 0 ,cvs.width,cvs.height);
                            var newImageData = cvs.toDataURL(mime_type,data.quality);
                            var result_image_obj = new Image();
                            result_image_obj.src = newImageData;
                            result_image_obj.onload = function(){
                                data.callback(result_image_obj);
                            }
                        }else{
                            //naturalWidth真实图片的宽度
                            cvs.width = source_img_obj.naturalWidth;
                            cvs.height = source_img_obj.naturalHeight;
                            data.callback(source_img_obj);
                        }

                    }
                };
            })(f);
            reader.readAsDataURL(f);
        }

    }
}
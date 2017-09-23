//更新判断
var updateOrInsert = {
    id: window.location.search.replace('?', '').split('=')[1],

    goodsDescription: '',
    goodsSize: '',
    imgList: {
		list_big : '',
		list_small : '',
		detail_big : '',
		detail_small : ''
	},
    init: function() {
        this.ueditor();

        if (this.id) {
            this.update().submit();
        } else {
            this.insert().submit();
        }
    },
    insert: function() {
        var that = this;

        //插件初始化
        $.each($("[data-file='upload']"), function(index, ele) {
            $(ele).fileinput({
                language: 'zh', //设置语言
                uploadUrl: `${base().baseUrl}/fileupload`, //上传的地址
                allowedFileExtensions: ['jpg', 'gif', 'png'], //接收的文件后缀
                uploadAsync: true, //默认异步上传
                showUpload: true, //是否显示上传按钮
                showRemove: true, //显示移除按钮
                showPreview: true, //是否显示预览
                showCaption: true, //是否显示标题
                browseClass: "btn btn-primary", //按钮样式     
                dropZoneEnabled: true, //是否显示拖拽区域
                maxFileCount: 10, //表示允许同时上传的最大文件个数
                enctype: 'multipart/form-data',
                validateInitialCount: true,
                previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
                //previewSettings
                msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
            })

            //加载预览触发
            $(ele).on('fileloaded', function(event, file, previewId, index, reader) {
                console.log(file)
            })

			//上传触发
			var str = [];
            $(ele).on("fileuploaded", function(event, data, previewId, index) {
				//console.log(data.response.imgUrl)
				str.push(data.response.imgUrl.join(''));
				
				//console.log(str,data.response.imgUrl)
				that.imgList[$(ele).prop('name')] = str.join('、');
			});
        })
        return that;
    },

    submit: function() {
		var that = this;
        $('#sub_Btn').click(function(e) {
            e.preventDefault();

            //判断是否有图片未上传
            var filesLength = 0;
            $.each($("[data-file='upload']"), function(index, ele) {
                var files = $(ele).fileinput('getFileStack');
                filesLength += files.length;
            })
            if (filesLength > 0) {
                alert('你还有图片未上传');
                return false;
            }

            //输入数据判定
            var goodsSize = $('#goodsSize').val();
            goodsSize = goodsSize.split(/\s*\/\s*/).join('、');
            that.goodsSize = goodsSize;

            //非空判断
            function isNull(dom) {
                $(dom).parents('.form-group').addClass('has-error');
                $(dom).blur(function(e) {
                    e.preventDefault();
                    $(this).val() && $(this).parents('.form-group').removeClass('has-error');
                })
            }

            if (!$('#goodsPrice').val() || !$('#goodsSize').val() || !$('#goodsType').val()) {
                alert('必填字段不能为空');
                !$('#goodsPrice').val() && isNull($('#goodsPrice')[0]);
                !$('#goodsSize').val() && isNull($('#goodsSize')[0]);
                !$('#goodsType').val() && isNull($('#goodsType')[0]);
                return false;
            }
			console.log(that.goodsDescription)
            var obj = {
                goodsType: $('#goodsType').val(),
                goodsPrice: $('#goodsPrice').val(),
                goodsOldPrice: $('#goodsOldPrice').val(),
                goodsSaleNum: $('#goodsSaleNum').val(),
                goodsLastNum: $('#goodsLastNum').val(),
                goodsText: $('#goodsText').val(),
                goodsSize: that.goodsSize,
                goodsDescription: that.goodsDescription,
                goodsId: that.id ? that.id : '',
                imgList: that.imgList,
            }
			console.log(obj)
            //数值判定
            for (var key in obj) {
				var arr = ['goodsPrice', 'goodsOldPrice', 'goodsSaleNum', 'goodsLastNum'];
				//console.log(Number(obj[key]))
                if (arr.indexOf(key) > -1) {
                    //判定是否为NaN
                    if (isNaN(Number(obj[key]))) {
						console.log(111)
                        alert(`${key}不是数值类型`);
                        return false;
                    }
                }
            }

            //ajax 请求
            $.post(`${base().baseUrl}/insert`, {
                data: JSON.stringify(obj)
            }, function(res) {
				console.log(res)
                var res = JSON.parse(res);
                if (res.status) {
                    alert('success 商品已加入数据库');
                    window.location.href = "admin-table.html";
                }
            })
        })
    },

    update: function() {
		var that = this;
		id = that.id;
        $.ajax({
            type: "get",
            imgList: [],
            url: `${base().baseUrl}/gaingoods`,
            data: {
                id
            },
            success: function(data) {
                var data = JSON.parse(data)[0];

                var text = $('#goodsText').val(data.text);
                var price = $('#goodsPrice').val(data.price);
                var old_price = $('#goodsOldPrice').val(data.old_price);
                var good_type = $('#goodsType').val(data.good_type);
                var sale_num = $('#goodsSaleNum').val(data.sale_num);
                var last_num = $('#goodsLastNum').val(data.last_num);
                var sizes = $('#goodsSize').val(data.sizes);
                var imgLoad = {
                    list_big: data.gl_b_imgs,
                    list_small: data.gl_s_imgs,
                    detail_big: data.gd_b_imgs,
                    detail_small: data.gd_s_imgs
                }
				that.imgList = Object.assign(imgLoad);

                //插件初始化
                $.each($("[data-file='upload']"), function(index, ele) {
					var arr = imgLoad[$(ele).prop('name')].split('、');
					var obj = {
						caption: '',
						downloadUrl: '',
						width: "120px",
						key: ''
					};
					var urlList = [];
					var configList = [];
					arr.forEach(function(ele,idx){
						var url = `${base().baseUrl}/${ele}`;
						urlList.push(url);
						obj.caption = ele;
						obj.downloadUrl = url;
						obj.key = idx;
						configList.push(obj);
					})
                    
                    $(ele).fileinput({
						//初始化图片
						initialPreview: urlList,
						initialPreviewAsData: true,
						initialPreviewConfig: configList,
						deleteUrl: '',
						overwriteInitial: true,
						maxFileSize: 100,
						initialCaption: "The database Img",
						//ajax 上传
						language: 'zh', //设置语言
						uploadUrl: `${base().baseUrl}/fileupload`, //上传的地址
						allowedFileExtensions: ['jpg', 'gif', 'png'], //接收的文件后缀
						uploadAsync: true, //默认异步上传
						maxFileCount: 10, //表示允许同时上传的最大文件个数
						enctype: 'multipart/form-data',
						validateInitialCount: true,
						previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
					})

					//上传触发
					var str = [];
                    $(ele).on("fileuploaded", function(event, data, previewId, index) {
                        //console.log(data.response.imgUrl)
						str.push(data.response.imgUrl.join(''));
						//console.log(str,data.response.imgUrl)
						that.imgList[$(ele).prop('name')] = str.join('、');
                    });
                })
            }
		})
		return that;
    },
    ueditor: function() {
		var that = this;

        //预览
        $('#detail_img').change(function() {
            $('.describe_img_preview').children('img').remove();
            var imgs_obj = this.files;

            console.log(imgs_obj);
            for (var i = 0; i < imgs_obj.length; i++) {
                var imgStr = `<img src="${window.URL.createObjectURL(imgs_obj[i])}"/>`;
                $('.describe_img_preview').append(imgStr);
            }
        })

        //商品介绍描述图片上传
        $('.doUpload').click(function() {
            $('.describe_img_preview').children('img').remove();
            var formDate = new FormData();

            //console.log($('#detail_img')[0].files);
            //得到所有的图片，得到对象
            var detail_imgs_obj = $('#detail_img')[0].files;

            //console.log( detail_imgs_obj);
            //遍历对象，并得到每张图片的含有图片信息的对象
            for (var attr in detail_imgs_obj) {
                //console.log(attr)
                //将每张图片信息都写入formDate内
                formDate.append('file', detail_imgs_obj[attr]);
            }

            $.ajax({
                url: `${base().baseUrl}/fileupload`,
                type: 'POST',
                cache: false,
                data: formDate,
                processData: false,
                contentType: false,
                success: function(data) {

                    //console.log(data);
                    //{"status":"success","imgUrl":["file-1506049908556.jpg","file-1506049908556.jpg","file-1506049908699.jpg","file-1506049908719.jpg","file-1506049908720.jpg"]}
                    //图片名数组
                    var imgNameArr = (JSON.parse(data).imgUrl);

                    //console.log(imgNameArr);
                    //编辑器元素
                    var htmlEditor = $("iframe").contents().find("body");

                    //console.log(htmlEditor);
                    //遍历图片数组将图片写入页面
                    imgNameArr.forEach(function(item) {
                            var htmlImg = $(`<img src="${base().baseUrl}/${item}">`);
                            htmlEditor.append(htmlImg);
                        })
                        //console.log(htmlImg);
                }
            })
        })

        //实例化编辑器
        //建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
        var ue = UE.getEditor('editor');

        //一开始文本编辑器是隐藏的，点击编辑按钮后展开
        document.querySelector("#lm_editor").style.display = "none";
        document.querySelector('#btns').style.display = 'none';

        //设置一个变量接收编辑的内容得到的代码；
        var goodsDescription = "";

        //隐藏编辑器内的按钮
        $('.completeEditor').click(function() {
            var arr = [];
            //arr.push("使用editor.getContent()方法可以获得编辑器的内容");
            //arr.push("内容为：");
            arr.push(UE.getEditor('editor').getContent());
            goodsDescription = arr.join("\n");
			alert(goodsDescription);
			that.goodsDescription = goodsDescription;
            //console.log(goodsDescription);
            document.querySelector('#btns').style.display = 'none';
            document.querySelector("#lm_editor").style.display = "none";
        })

        //console.log(22333)

        //  显示编辑器内的按钮
        $('.startEditor').click(function() {
            (document.querySelector('#btns')).style.display = 'block';
            document.querySelector("#lm_editor").style.display = "block";
        })

        //得到编辑的内容代码
        $('.getContent').click(function() {
            var arr = [];

            //arr.push("使用editor.getContent()方法可以获得编辑器的内容");
            //arr.push("内容为：");
            arr.push(UE.getEditor('editor').getContent());
            goodsDescription = arr.join("\n");
            alert(goodsDescription);
            console.log(goodsDescription);
        })

		//不可编辑
		$('.setDisabled').click(function() {
            UE.getEditor('editor').setDisabled('fullscreen');
            disableBtn("enable");
        })

		//可编辑	
		$('.setEnabled').click(function() {
            UE.getEditor('editor').setEnabled();
            enableBtn();
        })

		//编辑器是否有内容
		$('.hasContent').click(function() {
            var arr = [];
            arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
            arr.push("判断结果为：");
            arr.push(UE.getEditor('editor').hasContents());
            alert(arr.join("\n"));
        })

        function disableBtn(str) {
            var div = document.getElementById('btns');
            var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
            for (var i = 0, btn; btn = btns[i++];) {
                if (btn.id == str) {
                    UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
                } else {
                    btn.setAttribute("disabled", "true");
                }
            }
        }

        function enableBtn() {
            var div = document.getElementById('btns');
            var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
            for (var i = 0, btn; btn = btns[i++];) {
                UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
            }
        }

        $('#descript').load('./ueditor.html #lm_editor')

        return this;
    }
}

updateOrInsert.init();
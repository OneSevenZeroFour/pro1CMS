var goods = {
	check:function(type,index,val){
		$.ajax({
			type:"get",
			url:`${base().baseUrl}/typeFind`,
			data:{
				type,
				index,
				val
			},
			success:function(data){
				var data =JSON.parse(data);
				var html = data.map(function(item){
					return `
						<tr>
			                <td class='goodsId'>${item.good_id}</td>
			                <td><a href="#" class='title'>${item.text}</a></td>
			                <td>${item.good_type}</td>
			                <td class="am-hide-sm-only">${item.price}</td>
			                <td class="am-hide-sm-only">${item.sizes}</td>
			                <td>
				                <div class="am-btn-toolbar">
				                    <div class="am-btn-group am-btn-group-xs">
					                    <button class="am-btn am-btn-default am-btn-xs am-text-secondary redact"><span class="am-icon-pencil-square-o"></span> 编辑</button>
					                    <button class="am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only remove"><span class="am-icon-trash-o"></span> 删除</button>
				                    </div>
				                </div>
			                </td>
			            </tr>
					`
				}).join("");
				$('.table-main tbody').html(html);
			}
		});
	},
	page:function(type,val){
		$.ajax({
			url:`${base().baseUrl}/page`,
			type:'get',
			data:{
				type,
				val
			},
			success:function(data){
				var pageNum = Math.ceil((JSON.parse(data.replace('(*)',''))[0].COUNT)/6);
				var str = '';
				for(var i = 1; i <= pageNum; i++){
					if(i == 1){
						str += `
							<li class='am-active'><a href="#">${i}</a></li>
						`
					}else{
						str += `
							<li><a href="#">${i}</a></li>
						`						
					}
				};
				$('.am-g .am-cf span').html('共 '+JSON.parse(data.replace('(*)',''))[0].COUNT+' 条记录');
				
				$('.am-pagination').html(str).off('click','li').on('click','li',function(){
					var index = Number($(this).text())-1;
					$(this).addClass('am-active').siblings('li').removeClass('am-active');
					goods.check(type,index,val);
				});
			}
		});
	},
	addgoods:function(){
		window.location.href = "admin-detail.html"
	},
	removegoods:function(){
		$('.table-main tbody').on('click','.remove',function(){
			var id = Number($(this).parents('tr').children('.goodsId').text());
			var title = $(this).parents('tr').children().children('.title').text();
			var r = window.confirm('你是否确定删除'+title);
			if(r == true){
				$.ajax({
					type:"get",
					url:`${base().baseUrl}/removegoods`,
					data:{
						id
					},
					success:function(data){
						alert(data);
						window.location.href = "admin-table.html";
					}
				});
			}
		})
	},
	amendgoods:function(){
		$('.table-main tbody').on('click','.redact',function(){
			var id = Number($(this).parents('tr').children('.goodsId').text());
			window.location.href = "admin-detail.html?id="+id
		});
	},
	goodsType:function(){
		$.ajax({
			type:"get",
			url:`${base().baseUrl}/goodsType`,
			success:function(data){
				var data = JSON.parse(data);
				var html = data.map(function(item){
					return `
						 <option value="${item.good_type}">${item.good_type}</option>
					`
				}).join('');
				
				goods.check('*');
				goods.page('*');
				$('.lb').html('<option value="*">所有类别</option>'+html).on('change',function(){
					var type = $(this).val();
					goods.check(type);
					goods.page(type);
				});
			}
		});
	},
	searchgoods:function(){
		var val = $('.am-form-field').val();
		goods.check('text',null,val);
		goods.page('text',val);
	},
	mhsearch:function(){
		var timer;
		$('.am-form-field')[0].oninput = function(){
			clearTimeout(timer);
			timer = setTimeout(function(){
				var val = $('.am-form-field').val();
				$.ajax({
					type:"get",
					url:`${base().baseUrl}/mhsearch`,
					data:{
						val
					},
					success:function(data){
						var data =JSON.parse(data);
						if(data.length > 0){
							var html = data.map(function(item){
								return`
									<li style="list-style: none; height: 25px; overflow: hidden; padding:2px 10px">${item.text}</li>
								`
							}).join('');
							$('.shnn').show().html(html);
					
						}else{
							$('.shnn').hide();
						}
					}
				});				
			},200);
		};
		$('.am-form-field').blur(function(){
			setTimeout(function(){
				$('.shnn').hide();				
			},200);
		});
		$('.shnn').on('mousemove','li',function(){
			$(this).css('background','#ddd')
		}).on('mouseout','li',function(){
			$(this).css('background','#fff')
		}).on('click','li',function(){
			$('.am-form-field').val($(this).text());
		});
	}
}
goods.removegoods();
goods.amendgoods();
goods.goodsType();
goods.mhsearch();
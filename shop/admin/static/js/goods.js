var goods = {
	check:function(index){
		$.ajax({
			url:'http://127.0.0.1:8888/goods',
			type:'get',
			data:{
				index:index
			},
			success:function(data){
				var data =JSON.parse(data);
				
				var html = data.map(function(item){
					return `
						<tr>
			                <td><input type="checkbox" /></td>
			                <td class='goodsId'>${item.good_id}</td>
			                <td><a href="#" class='title'>${item.text}</a></td>
			                <td>${item.good_type}</td>
			                <td class="am-hide-sm-only">${item.price}</td>
			                <td class="am-hide-sm-only">${item.sizes}</td>
			                <td>
				                <div class="am-btn-toolbar">
				                    <div class="am-btn-group am-btn-group-xs">
					                    <button class="am-btn am-btn-default am-btn-xs am-text-secondary"><span class="am-icon-pencil-square-o"></span> 编辑</button>
					                    <button class="am-btn am-btn-default am-btn-xs am-hide-sm-only"><span class="am-icon-copy"></span> 复制</button>
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
	page:function(){
		$.ajax({
			url:'http://127.0.0.1:8888/page',
			type:'get',
			success:function(data){
				var pageNum = Math.ceil((JSON.parse(data.replace('(*)',''))[0].COUNT)/10);
				var str = '';
				for(var i = 1; i <= 3; i++){
					str += `
						<li><a href="#">${i}</a></li>
					`
				};
				$('.am-g .am-cf span').html('共 '+JSON.parse(data.replace('(*)',''))[0].COUNT+' 条记录');
				$('.am-pagination').html(str).on('click','li',function(){
					var data = Number($(this).text())-1;
					goods.check(data);
				});
			}
		});
	},
	addgoods:function(){
		window.location.href = "admin-help.html"
	},
	removegoods:function(){
		$('.table-main tbody').on('click','.remove',function(){
			var id = Number($(this).parents('tr').children('.goodsId').text());
			var title = $(this).parents('tr').children().children('.title').text();
			var r = window.confirm('你是否确定删除'+title);
			if(r == true){
				$.ajax({
					type:"get",
					url:"http://127.0.0.1:8888/removegoods",
					data:{
						id
					}
				});
			}
		})
	},
	amendgoods:function(){
		
	}
}
goods.check();
goods.page();
goods.removegoods();

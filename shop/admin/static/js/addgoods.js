var addgoods={
	add:function(){
		$('.am-btn').click(function(){
			var text = $('#text').val();
			var price = $('#price').val();
			var old_price = $('#old_price').val();
			var good_type = $('#good_type').val();
			var sale_num = $('#sale_num').val();
			var last_num = $('#last_num').val();
			var sizes = $('#sizes').val();
			
			$.ajax({
				url:'http://127.0.0.1:8888/addgoods',
				type:'get',
				data:{
					text,
					price,
					old_price,
					good_type,
					sale_num,
					last_num,
					sizes,
				}
			});		
		});
	},
	gain:function(){
		var id = window.location.search.replace('?','').split('=')[1];
		$.ajax({
			type:"get",
			url:"http://127.0.0.1:8888/gaingoods",
			data:{
				id
			},
			success:function(data){
				var data = JSON.parse(data)[0];
				
				var text = $('#text').val(data.text);
				var price = $('#price').val(data.price);
				var old_price = $('#old_price').val(data.old_price);
				var good_type = $('#good_type').val(data.good_type);
				var sale_num = $('#sale_num').val(data.sale_num);
				var last_num = $('#last_num').val(data.last_num);
				var sizes = $('#sizes').val(data.sizes);
				
				$('.am-btn').click(function(){
					var text = $('#text').val();
					var price = $('#price').val();
					var old_price = $('#old_price').val();
					var good_type = $('#good_type').val();
					var sale_num = $('#sale_num').val();
					var last_num = $('#last_num').val();
					var sizes = $('#sizes').val();
					
					$.ajax({
						url:'http://127.0.0.1:8888/amendgoods',
						type:'get',
						data:{
							id,
							text,
							price,
							old_price,
							good_type,
							sale_num,
							last_num,
							sizes,
						},
						success:function(data){
							console.log(data)
						}
					});			
				});
			}
		});
	},
	if:function(){
		var id = window.location.search.replace('?','').split('=')[1];
		if(id){
			addgoods.gain();
		}else{
			addgoods.add();
		}
	}
}
addgoods.if();


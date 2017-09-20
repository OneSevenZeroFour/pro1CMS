var addgoods={
	add:function(index){
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
					sizes
				},
				success:function(data){
//					console.log(JSON.parse(data))
				}
			});		
		});
	}
}
addgoods.add();

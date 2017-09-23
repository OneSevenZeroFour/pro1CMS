$.ajax({
    type:'GET',
    url:'http://127.0.0.1:8888/email',
    success:function(res){
        console.log(res);
        var html1 = res.map(function(item){
            return `<li>
            <div class="content">${item.message}</div><div class="read" data-id="${item.id}"><span>查看</span></div>
            </li>`
        }).join('');
        var html2 = res.length;
        $('.msg').html(html1);
        $('.am-badge-warning').html(html2);
    }
});
$('.letter-box').on('click',function(){
    $('.msg').show();  
});

$('.msg').on('mouseleave',function(){
    $('.msg').hide();
});

$('.msg').on('click','.read',function(){
    var id = $(this).attr('data-id');
    var ele = $(this);
    $.ajax({
        type:"get",
        url:'http://127.0.0.1:8888/read',
        data:{
            id:id
        },
        success:function(res){
            ele.parent().remove();
        }
    });
    $.ajax({
        type:'get',
        url:'http://127.0.0.1:8888/email',
        success:function(res){
            var html2 = res.length;
            $('.am-badge-warning').html(html2);
        }
    })

})
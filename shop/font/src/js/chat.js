/* 
* @Author: 杨培钦
* @Date:   2017-09-21 16:40:04
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-21 16:46:11
*/
jQuery(function($){
    $('.chat').draggable({containment:$('body')});
    $('#close').on('click',function(){
        $('.chat').hide();
    });


    var socket = io('http://localhost:2333');
    $('.sendbtn').on('click',function(){
        
        if($('textarea').val()===''){
            $('.sendbtn').attr('disabled',true);
            if($('textarea').focus()){
                $('.sendbtn').attr('disabled',false);
            }
        }else{
            $('.sendbtn').attr('disabled',false);
            socket.emit('chat',$('textarea').val());
            
            $.ajax({
                type:'post',
                url:'http://localhost:1234',
                async:true,
                data:{
                    news:$('textarea').val()
                },
                success:function(){

                }
            });
            $('textarea').val("").focus();
        }
        
    })
    socket.on('getMsg',function(data){
        console.log(data);
        document.querySelector('.msg').innerHTML += '<p class="time">'+new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate()+ '&nbsp;&nbsp;' +new Date().toLocaleTimeString()+'</p>'+data+'<br>'+'<p class="autores">'+'您的留言已收到，看到会马上回复你哦'+'</p>';
    })
})


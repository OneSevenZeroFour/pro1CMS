/* 
* @Author: 陈文贵
* @Date:   2017-09-01 09:12:53
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-25 11:37:57
*/

/*
    cookie
 */
 var username = '';
 var cart_list = [];//应该根据用户id获取该用户购物车列表【先用本地cookie】
 var cookies = document.cookie;
 if(cookies.length>0){
     cookies = cookies.split('; ');
     cookies.forEach(function(item){
         var arr = item.split('=');
         if(arr[0]==='username'){
             username = arr[1];
         }
     });
     cookies.forEach(function(item){
         var arr = item.split('=');
         if(arr[0]==='cart_list_'+username){
             cart_list = JSON.parse(arr[1]);
         }
     });
 }

/*
    登录部分
 */

if(username){
    $('.login_reg').hide();
    $('.logined').show();
    $('#uname').text(username);
    $('#logout').click(function(){
        $('.login_reg').show();
        $('.logined').hide();
        var date = new Date();
        date.setDate(date.getDate()-99);
        document.cookie='username=;expires='+date+';path=/';
        location.reload(true);
    });
    
    /*
        公共购物车部分
     */
    /*=========页面顶部+右边 购物车========*/
    var isFull = false;//商品是否到达库存临界点

    function changeComCart(arr){
        arr = arr||cart_list;
        var cartAllNum = 0;
        var cartAllPrice = 0;
        var topCartListStr = '';
        topCartListStr = arr.map(function(item){
            var cartId = item.good_id+'&'+item.size;
            cartAllNum+=item.buy_num*1;
            cartAllPrice+=item.price*item.buy_num;
            return `<li data-goodId = ${cartId}>
                        <a href="good_details.html?good_id=${item.good_id}"><img src="../img/${item.gl_s_imgs}" alt="" /></a>
                        <p><a href="good_details.html?good_id=${item.good_id}"></a>${item.text} (尺码：${item.size})</p>
                        <span class="good_num">${item.buy_num}</span>
                        <div class="good_r"><span class="price">${item.price}</span><span class="delBtn">[删除]</span></div>
                    </li>
            `;
        });
        $('.rb_top strong').text(cartAllNum);
        var $topCartBox = $('.head_cart');
        $topCartBox.find('.cart_num').text(cartAllNum);
        $topCartBox.find('.total_price').text(cartAllPrice);
        var $topCartList = $topCartBox.find('.hd_cart_list');
        $topCartList.html(topCartListStr);
        if(cartAllNum===0){
            $('.cart_detail').css({visibility:'hidden'});
        }else{
            $('.cart_detail').css({visibility:'visible'});
        }
    }
    changeComCart();
    //删除购物单
    function delCart(arr,cartId){
        arr = arr || cart_list;
        arr.forEach(function(item,idx){
            if(cartId===(item.good_id+'&'+item.size)){
                arr.splice(idx,1);
                cart_list = arr;
                return;                  
            }
        });
        changeComCart(arr);
        var date = new Date();
        date.setDate(date.getDate()+7);
        document.cookie = 'cart_list='+JSON.stringify(arr)+';expires='+date.toUTCString()+';path=/';
    }
    $('.hd_cart_list').on('click','.delBtn',function(){
        delCart(cart_list,$(this).closest('li').attr('data-goodid'));
    });
    //右边栏购物车跳转购物车页
    $('#rCart').click(function(){location.assign('good_cart.html')});
}else{
    $('.login_reg').show();
    $('.logined').hide();


    //购物车部分
    $('.cart_detail').hide();  
    $('.cart_num').text(0);
    $('#rCart').find('strong').text(0);
    $('#rCart').find('p').hide();
}

/*
    根据定位显示天气
 */
 $('#showWea').click(function(){$('.geo_wea').html('<span style="font-size:20px;color:#424852;">加载中......</span>');getCoords();});
 /*
     获取经纬度
  */
 function getCoords(){
    navigator.geolocation.getCurrentPosition(function(data){
        //翻墙：谷歌地图获取
        getCity(data.coords.longitude,data.coords.latitude);
    },function(err){
        //不能翻墙：百度地图获取
        var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    // console.log(r);定位的相关信息
                    getCity(r.longitude,r.latitude);
                }
                else {
                    alert('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true});
    }); 
 }
 /*
     根据经纬度获取城市名
  */
 function getCity(longi,lati){
     var point = new BMap.Point(longi,lati);
     var geoc = new BMap.Geocoder();
     geoc.getLocation(point, function(rs){
         // console.log(rs);地址相关信息
         var city = rs.addressComponents.city;
         showWeathers(city);
     });
 };
 
 /*
     根据城市名获取天气
     天气接口：http://wthrcdn.etouch.cn/weather_mini?city=广州
  */
 function showWeathers(city){
     $.ajax({
         url:'http://wthrcdn.etouch.cn/weather_mini',
         data:{city:city},
         success:function(res){
             var weaArr = JSON.parse(res).data.forecast;
             createHtml({city,weaArr});
         }
     });
 }
 // showWeathers('广州');
 /*
     将地址和天气信息显示在页面上
  */
 function createHtml(obj){
     var toDayWea = obj.weaArr[0];
     var midTemp = Math.round((parseInt(toDayWea.high.split(' ')[1])+parseInt(toDayWea.low.split(' ')[1]))/2);
     var toDate = toDayWea.date.split('星')[0];
     var label = toDayWea.fengli.split('级')[0].charAt(toDayWea.fengli.split('级')[0].length-1);
     var low = toDayWea.low.split(' ')[1];
     var high = toDayWea.high.split(' ')[1];
     var forecast_bot_str = obj.weaArr.map(function(item,idx){
         if(idx===0||idx>=4){
             return '';
         }else{
             var date = item.date.split('星')[0];
             var low = item.low.split(' ')[1];
             var high = item.high.split(' ')[1];
             return `
                     <li>
                         <div class="date">${date}</div>
                         <div class="type">${item.type}</div>
                         <div class="temp"><span class="low">${low}</span>~<span class="high">${high}</span></div>
                     </li>
                    `;
         }
     }).join('');
     var htmlStr = `
                 <div class="geo_wea_today">
                     <div class="today_left">${toDayWea.type}</div>
                     <div class="today_right"><div class="city">${obj.city}</div><span class="temp">${midTemp}</span>℃</div>
                 </div>
                 <div class="geo_wea_forecast">
                     <div class="forecast_top">
                         <h2 class="forecast_top_title">${obj.city}<div class="date">${toDate}</div></h2>
                         <div class="forecast_top_main">${toDayWea.type}</div>
                         <ul class="forecast_top_footer">
                             <li>
                                 <div class="name">${toDayWea.fengxiang}</div>
                                 <div class="cont">${label}级</div>
                             </li>
                             <li>
                                 <div class="name">低温</div>
                                 <div class="cont">${low}</div>
                             </li>
                             <li>
                                 <div class="name">高温</div>
                                 <div class="cont">${high}</div>
                             </li>
                         </ul>
                     </div>
                     <ul class="forecast_bot">
                         ${forecast_bot_str}
                     </ul>
                 </div>
                 `;           
     var $geoWea = $('.geo_wea').html(htmlStr);
     var $geoToady = $geoWea.find('.geo_wea_today');
     var $geoForecast = $geoWea.find('.geo_wea_forecast');
     $geoForecast.hide();
     $geoToady.mouseover(function(){
         $geoToady.hide();
         $geoForecast.show(500);
     });
     $geoForecast.mouseleave(function(){
         $geoForecast.hide(200,function(){$geoToady.show();});               
     });
 }


 //云弹窗
 function createPoup(text,title,btnValue){
    title=title||location.host+'提示';
    text=text||'bug';
    btnValue=btnValue||'确定';
    var poupHtml = `
                    <div id="popup">
                        <div class="popup">
                            <div class="popupHead">
                                <strong><span><span class="a"></span><span class="b"></span></span>${title}</strong>
                            </div>
                            <div class="popupContent">
                                ${text}
                            </div>
                            <a href="javascript:void(0)" class="popBtn">${btnValue}</a>
                        </div>
                        <div class="popupCloudy">
                            <span></span>
                        </div>
                    </div>
                    `;
    var $popObj=$('<div></div>').addClass('popupWrap').html(poupHtml).appendTo($('body')).on('click',function(){$popObj.remove()});
    $('.popBtn').click(function(){$popObj.remove()});
 }




/*
    前端客服
 */
//拖拽实现
function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload=drag;

function drag(){
   var oTitle=getByClass('cHead','chatBox')[0];
   // 拖曳
   oTitle.onmousedown=fnDown;
}

function fnDown(event){
  event = event || window.event;
  var oDrag=document.getElementById('chatBox'),
      // 光标按下时光标和面板之间的距离
      disX=event.clientX-oDrag.offsetLeft,
      disY=event.clientY-oDrag.offsetTop;
  // 移动
  document.onmousemove=function(event){
    event = event || window.event;
    fnMove(event,disX,disY);
  }
  // 释放鼠标
  document.onmouseup=function(){
    document.onmousemove=null;
    document.onmouseup=null;
  }
}

function fnMove(e,posX,posY){
  var oDrag=document.getElementById('chatBox'),
      l=e.clientX-posX,
      t=e.clientY-posY,
      winW=document.documentElement.clientWidth || document.body.clientWidth,
      winH=document.documentElement.clientHeight || document.body.clientHeight,
      maxW=winW-oDrag.offsetWidth-10,
      maxH=winH-oDrag.offsetHeight;
  if(l<0){
    l=0;
  }else if(l>maxW){
    l=maxW;
  }
  if(t<0){
    t=10;
  }else if(t>maxH){
    t=maxH;
  }
  oDrag.style.left=l+'px';
  oDrag.style.top=t+'px';
}


// 聊天实现
     $($(".top_menu>li").get(4)).click(function(){connectServer();});

     //获取元素
     var $chatBox = $('#chatBox');
     var $closeBtn = $chatBox.find('.closeBtn');
     var $cCHat = $chatBox.find('.cCHat');
     var $sendText = $chatBox.find('.sendText');
     var $sendBtn = $chatBox.find('.sendBtn');

     //连接客服
     var socket = null;
     if(!socket){
             //建立连接
         socket = io('http://localhost:8888');
     }       
     function connectServer(){
         //界面
         $chatBox.show();

         //客服聊天功能
         // if(!socket){
             //建立连接
             // socket = io('http://localhost:4144');
             //连接成功后将用户名发送到服务器
             var clientName = username||'youke';//获取登录会员
             // var clientName ='youke';
             // socket.on('connect',function(){
                 socket.emit('clientLogin',clientName);//客户上线
             // });
             //监听服务器事件：获取从服务器发送过来的信息
             socket.on('sendToClient',function(obj){//obj{客服名,text}
                 addCont(obj);
             });
         // };
     }     
     //关闭客服
     $closeBtn.click(function(){
         //界面
         $chatBox.hide()

         //客服聊天功能
         // socket.emit('clientLeave');//客户下线
     });
     //发送信息
     $sendBtn.click(function(){
         //界面
         var text = $sendText.val();
         if(text.trim()===''){return;}
         var obj = {text,className:'cUser',personName:username};//会员名personName:username
         addCont(obj);
         $sendText.val('');

         //客服聊天功能
         //将发送的文本信息发送到服务器
         socket.emit('sendToServer',text);
     });
     
     /*定义界面相关函数*/
     //添加聊天信息条  obj{className,personName,text}
     function addCont(obj){
         var className = obj.className||'cCon';
         var personName = obj.personName||'游客';
         var text = obj.text||'说点什么吧！';
         text = text.replace('<','&lt;');
         var time = new Date().toLocaleTimeString().replace(/(上午)|(下午)/,'');
         var contHtml = `
                         <div class="cH"><span class="cPep"><strong>${personName}</strong></span><span class="cTime">${time}</span></div>
                         <div class="cTalk">${text}</div>
                         `;
         $('<div></div>').addClass(className).html(contHtml).appendTo($cCHat).get(0).scrollIntoView();
     }
     

     //留言窗口
     // var show = document.querySelector('.show');
     // console.log(show);
     // show.scrollTop = show.scrollHeight;
     $('.rChat').on('click',function(){
         console.log(1);
         $('.chat').show();
     });

     // $('.chat').draggable();
     $('#close').on('click',function(){
         $('.chat').hide();
     });
     
     var socket = io('http://127.0.0.1:8888');
     $('.sendbtn').on('click',function(){
         
         if($('textarea').val()===''){
             $('.sendbtn').attr('disabled',true);
             if($('textarea').focus()){
                 $('.sendbtn').attr('disabled',false);
             }
         }else{
             $('.sendbtn').attr('disabled',false);
             socket.emit('chat',$('textarea').val());
             
             // $.ajax({
             //     type:'post',
             //     url:'http://127.0.0.1:8888',
             //     async:true,
             //     data:{
             //         news:$('textarea').val()
             //     },
             //     success:function(){

             //     }
             // });
             $('textarea').val("").focus();
         }
         
     })
     socket.on('getMsg',function(data){
         console.log(data);
         var hour = new Date().getHours();
         var min = new Date().getMinutes();
         var sec = new Date().getSeconds();
         if(hour<10){
             hour = '0'+ hour;
         }
         if(min<10){
             min = '0'+ min;
         }
         if(sec<10){
             sec = '0'+ sec;
         }
         document.querySelector('.msg').innerHTML += '<p class="time">'+ hour+":"+ min+":"+ sec+'</p>'+'<p class="mywrite"><span>'+data+'</span></p>';
         $('.show').scrollTop( $('.show')[0].scrollHeight) ;

     });
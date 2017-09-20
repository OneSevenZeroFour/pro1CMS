/* 
* @Author: 陈文贵
* @Date:   2017-09-01 09:12:53
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-20 20:54:18
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
 $('#showWea').click(function(){getCoords()});
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

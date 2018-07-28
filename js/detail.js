;(function(){
	$(function(){
	//....调用接口............................
var goodsid=location.search.split("=")[1];
$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{goodsID:goodsid},function(data){
console.log(data)
//处理数据，进行拼接   详情页只有一个商品，不需要遍历，最后添加到对应的div上
var str=`<div id="zoomBox">
				<div id="midArea">
					<img src="${data[0].goodsListImg}" style="z-index: 1;"/>
					<img src="image/zoom1.jpg"/>
					<img src="image/zoom2.jpg"/>
					<img src="image/zoom4.jpg" />
					
					<div id="zoom" style="z-index:999999;"></div>
				</div>
				<div id="bigArea">
					<img src="${data[0].goodsListImg}" style="z-index:1;"/>
					<img src="image/zoom1.jpg"/>
					<img src="image/zoom2.jpg"/>
					<img src="image/zoom4.jpg" />
				</div>
				<div class="pic">
					<li><img src="${data[0].goodsListImg}"/></li>
					<li><img src="image/zoom1.jpg"/></li>
					<li><img src="image/zoom2.jpg"/></li>
					<li><img src="image/zoom4.jpg" /></li>
					
				</div>	
				
			</div>
			
         		<div class="detail">
			   
			     <h3><span>${data[0].className}</span>${data[0].goodsName}</h3>
			     <p>${data[0].detail}</p>
			     <div class="price">
				     <em>￥</em>
				     <i>${data[0].price
}</i>
				     <del>199.9</del>
				     <div class="discount">
				       <span>折扣</span>
				       <strong>4.6折</strong>
				     </div>
			     
			     </div>
			     
			     <div class="num">
				    <span>购买数量</span> 
				    <input type="button" id="btn1" value="-"/>
				    <input type="text" id="nums" value="1" style="width: 20px;"/>
				    <input type="button" id="btn2" value="+"/>
				    
			     </div>
			     
			  <input type="text" id="txt" value="  加入购物车"/>  
          <div class="time"></div>

			</div>`

//把拼接放到对应的位置
$(".main_wrap").html(str);
//这里要把所有原先写好的js放在拼接字符串的后面 ，否则获取不到

//倒计时.................................................
var otime=document.getElementsByClassName("time")[0];
var count=0;
			var timer = setInterval(function(){
				count++;
				var oDate = new Date();
//				console.log(oDate)
				var hours = oDate.getHours();
				var minutes = oDate.getMinutes();
				var seconds = oDate.getSeconds();
				var oDate1 = new Date("2018-7-3 15:30:00")
				
				var cha = (oDate1 - oDate)/1000;
				var hours1 = Math.floor((cha/60)/60)%24;
				var minutes1 = Math.floor(cha/60)%60;
				var seconds1 = Math.floor(cha%60);
				
				if(hours1<10){
					hours1 = "0"+hours1;
				}
				if(minutes1<10){
					minutes1 = "0"+minutes1;
				}
				if(seconds1<10){
					seconds1 = "0"+seconds1;
				}
				
				
				if(cha<=0){
					clearInterval(timer);
					document.write("秒杀活动结束");		
				}
				
			otime.innerHTML = `距离本场活动结束还剩:${hours1}:${minutes1}:${seconds1}`;
//console.log(otime.innerHTML)
			},1000);
			
	//放大镜....................................................
	function fdj(index){
			
		var oZoomBox = document.getElementById("zoomBox"),
				oMidArea = document.getElementById("midArea"),
				oZoom = document.getElementById("zoom"),
				oMidImg = oMidArea.children[0],
				oBigArea = document.getElementById("bigArea"),
				oBigImg = oBigArea.children[index];
			
			oMidArea.onmouseover = function(){
				oBigArea.style.display = "block";
				oZoom.style.display = "block";
			}
			oMidArea.onmouseout = function(){
				oBigArea.style.display = "none";
				oZoom.style.display = "none";
			}
			
			oMidArea.onmousemove = function(e){
				var evt = e || event;
				var x = evt.pageX - oZoomBox.offsetLeft;
				var y = evt.pageY - oZoomBox.offsetTop;
				
				//var x = evt.offsetX;
				//var y = evt.offsetY;
				
				
				var _left = x - oZoom.offsetWidth/2;
				var _top = y - oZoom.offsetHeight/2;
				
				
				if(_left <= 0){
					_left = 0;
				}
				if(_left >= oMidArea.offsetWidth - oZoom.offsetWidth){
					_left = oMidArea.offsetWidth - oZoom.offsetWidth;
				}
				
				if(_top<=0){
					_top = 0;
				}
				
				if(_top >= oMidArea.offsetHeight - oZoom.offsetHeight){
					_top = oMidArea.offsetHeight - oZoom.offsetHeight;
				}
				
				
				oZoom.style.left = _left + "px";
				oZoom.style.top = _top + "px";

				oBigImg.style.left = -oZoom.offsetLeft/oMidArea.offsetWidth*oBigImg.offsetWidth + "px";
				oBigImg.style.top = -oZoom.offsetTop/oMidArea.offsetHeight*oBigImg.offsetHeight + "px";
				
				
			}


}   //放大镜封装end	

	fdj(0);    //不点击的时候就要默认显示第一张大图，并且能够默认
			
//点击下面图片的时候midArea的图片换成对应的图片
	$(".pic li").click(function(){
	     var index=$(this).index(); //获取每个li的索引 ：解题技巧
	     fdj(index);  //当我点击li的时候，对应的大图也要发生变化，所以调用封装的函数，让大图，小图，对应的图片索引都一样
	     
	     $("#midArea").find("img").eq(index).addClass("minhover").siblings().removeClass("minhover");
	     $("#bigArea").find("img").eq(index).addClass("minhover").siblings().removeClass("minhover");

	})
	


		
			
//数量加加

$(".num #btn2").click(function(){
     //console.log($("#nums").val())
     //$("#nums").val(Number($("#nums").val())+1);
     $("#nums").attr("value",Number($("#nums").attr("value"))+1);
     
})
//数量减减
$(".num #btn1").click(function(){
//console.log(parseInt($("#nums").val()));
    if(Number($("#nums").val())<=1){
          $("#nums").val("1");
    }
         $("#nums").attr("value",Number($("#nums").attr("value"))-1);   
      
})
	

//.....................................................................................

//更新购物车的链接
//当点击加入购物车，购物车更新的接口，智力每个用户各有一个用户名，获得cookie,所以详情页和登录页要引入cookie

$("#txt").click(function(){
	var goodsnum=$("#nums").attr("value");
	//console.log(goodsnum)
$.get("http://datainfo.duapp.com/shopdata/updatecar.php",{userID:$.cookie("username"),goodsID:data[0].goodsID,number:$("#nums").attr("value")},function(data){
//console.log(data);

if(data==1){
console.log("加入购物车成功")
}if(data==0){
console.log("加入购物车失败");
}
     
})

})
$("#txt").click(function(){
	location.href="cart.html";
})

});
//..........................................................................................			
	})
})();

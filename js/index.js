
//第一块开始（主页右上）
//当我划过li的时候，下面的ul显示出来


   $(function(){
 
   	$.get("json/index.json",function(data){
   		
		$.ajax({
			type:"get",
			url:"json/index.json",
			async:true,
			success:function(){
				//划过精彩推荐时，data数据发生改变
				$(".hover2").hover(function(){
   			$(".select").html("");
   			
   			
   			//得到name一整个数组
   			
   			for(var j=0;j<data[1]["hot"].length;j++){
   				
   				$(".select").append("<li><a href=''><img src='image/"+data[1]["hot"][j]+"'></a></li>");
   				//console.log(11111)
   			}  			
   		
   		})
   		//划过精彩推荐的结束
   		
   			
   			//..................默认显示hover1
   			for(var j=0;j<data[0]["name"].length;j++){
   				$(".select").append("<li><a href=''><img src='image/"+data[0]["name"][j]+"'></a></li>");
   			}  			
   		//..................默认显示的结束
   		
   		
   		//当我划过hover2后，确保还能划会hover1
   		$(".hover1").hover(function(){
   			$(".select").html("");
   			for(var j=0;j<data[0]["name"].length;j++){
   				
   				$(".select").append("<li><a href=''><img src='image/"+data[0]["name"][j]+"'></a></li>");
   				
   			}  			
   		
   		})
   		//hover1的划过效果结束
			}
			
			
		})
		
   	})
   	
   })

//第一块结束

//第二块   热搜榜
;(function(){
	$(function(){
	//获取接口id数据
		$.get("json/indexhot.json",function(data){
//			console.log(data)
	
   			//默认显示 
            //图片
            //kaishi
   			   	for(var j=0;j<data[0]["pic"].length;j++){                   
                         var index=j;
   						$(".hot_list").append(
   					`<a href="">
						<img src="image/${data[0]['pic'][j]}"/>
								
							</a>`
   				)
   				}
   				//txt文本
   				var num = -1;
   				for(var j=0;j<data[0]["txt"].length;j++){
// 					console.log(data[i])
						num++;
						if(num<data[0]["txt"].length){
							//找到对应的a
						$(".hot_list").find("a").eq(num).append(
   					`<div class="items">
						<div class="items_tit">${data[0]["txt"][j]}</div></div>`				
   				)	
							
						}
   						
   				}
   				//价格
 				var num=-1;
   				for(var j=0;j<data[0]["price"].length;j++){
 					num++;
   					$(".hot_list a").find(".items")
   					.eq(num).append(
   						`<div class="items_price"><span>${data[0]["price"][j]}</span></div>`
   						
   					)
   				}
})
})
})();
//第二块结束

;(function(){
	$(function(){
	//获取接口id数据
		$.get("json/indexmain.json",function(data){
			//console.log(data)
	
   			//默认显示 
   						$(".zw").prepend(
   					`<div class="tit">
							<dl>
								<dt><img src="image/${data[0]["img"]}"/></dt>
								<dd>
									<p>${data[0]["wenzi1"]}</p>
									<p>${data[0]["wenzi2"]}</p>
								</dd>
							</dl>
							<div class="dazhe">
								<a href="">${data[0]["wenzi3"]}</a>
							</div>
						</div>
							`
   				)
   			//图片
   		for(var i=0;i<data[0]["pic"].length;i++){
// 			console.log(data[0]["pic"])
   			$(".zw .detail").append(
               `<dl>
								<dt><a href=""><img src="image/${data[0]['pic'][i]}"/></a></dt></dl>`
 
   			)
   		}
          //价格
          var num=-1;
          for(var i=0;i<data[0]["price"].length;i++){
          	num++;
          	$(".zw .detail").find("dl").eq(num).append(
          		`<dd><a href="">${data[0]["price"][i]}</a></dd>`
          		
          	)
          }
       //原价
       var num=-1;
          for(var i=0;i<data[0]["yuanjia"].length;i++){
          	num++;
          	$(".zw .detail dl").find("dd").eq(num).append(
          		`<a href="">${data[0]["yuanjia"][i]}</a>`
          		
          	)
          }
          
       //  txt
       var num=-1;
          for(var i=0;i<data[0]["txt"].length;i++){
          	num++;
          	$(".zw .detail").find("dd").eq(num).append(
          		`<p>
		         <a href="" class="love">${data[0]["txt"][i]}</a>
				</p> `
          		
          	)
          }
})		
})
})();
//=========================
;(function(){
	$(function(){
	//获取接口id数据
		$.get("json/indexmain.json",function(data){
			//console.log(data)
	
   			//默认显示 
   						$(".za").prepend(
   					`<div class="tit">
							<dl>
								<dt><img src="image/${data[1]["img"]}"/></dt>
								<dd>
									<p>${data[1]["wenzi1"]}</p>
									<p>${data[1]["wenzi2"]}</p>
								</dd>
							</dl>
							<div class="dazhe">
								<a href="">${data[1]["wenzi3"]}</a>
							</div>
						</div>
							`
   				)
   			//图片
   		for(var i=0;i<data[0]["pic"].length;i++){
// 			console.log(data[0]["pic"])
   			$(".za .detail1").append(
               `<dl>
								<dt><a href=""><img src="image/${data[1]['pic'][i]}"/></a></dt></dl>`
 
   			)
   		}
          //价格
          var num=-1;
          for(var i=0;i<data[1]["price"].length;i++){
          	num++;
          	$(".za .detail1").find("dl").eq(num).append(
          		`<dd><a href="">${data[1]["price"][i]}</a></dd>`
          		
          	)
          }
       //原价
       var num=-1;
          for(var i=0;i<data[1]["yuanjia"].length;i++){
          	num++;
          	$(".zw .detail1 dl").find("dd").eq(num).append(
          		`<a href="">${data[1]["yuanjia"][i]}</a>`
          		
          	)
          }
          
       //  txt
       var num=-1;
          for(var i=0;i<data[1]["txt"].length;i++){
          	num++;
          	$(".za .detail1").find("dd").eq(num).append(
          		`<p>
		         <a href="" class="love">${data[1]["txt"][i]}</a>
				</p> `
          		
          	)
          }
})		
})
})();



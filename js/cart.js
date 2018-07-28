
$(function(){
		$.getJSON("http://datainfo.duapp.com/shopdata/getCar.php?callback=?",{userID:$.cookie("username")},function(data){
//					console.log(data);
					var str="";
					//.................................................each开始
		$.each(data, function(index,item){
			str+=`
		
						
							<li>
								
								<img src="${item.goodsListImg}"/>
								
								<div>
									<p>
										<a href="">${item.className}
</a>	<br />							<span>${item.goodsName}</span>
									</p>									
								</div>
							
							
								<strong class="c_price">${item.price}</strong>
								
								<div>
									<input type="button"  class="reduce" value="-" />
									<input type="text" class="num_line_txt" value="${item.number}"/>
									<input type="button"  class="plus" value="+" />
								</div>
								
						
							
							<strong>${item.price}</strong>
							<p class="cart_delete">
								<a href="">收藏</a>
								<a href="">删除</a>
							</p>								
							</li>`
		});
		
		//..................................................each结束
		$("#cart_list").html(str);  
//.........................js代码................................		
		
//js其他代码放在这个下面，否则获取不到dom元素...........................................
//......数量加加减减，以及商品总数总额的计算........................................................
//	 console.log($(".num_line_txt").val());
	$(".reduce").click(function(){	
		
		 console.log($(this).next().attr("value"))
		$(this).next().attr("value",parseInt($(this).next().attr("value"))-1);	

		//console.log($(this).next().val())
	   if($(this).next().attr("value")<=1){
	    	$(this).next().attr("value",1);
	    }
   
   all_num();   
	 
	   
})   //$(".reduce") ---end


			
	$(".plus").click(function(){			
	    console.log($(this).prev().attr("value"))
	  $(this).prev().attr("value",parseInt($(this).prev().attr("value"))+1);	
	   	//$("#all_nums").find("b").text($(this).prev().attr("value"));
	   	all_num();
   	 		console.log($(".num_line_txt").get())
	   	
	})  //$(".plus")----end 
	//每次点加减的时候数据存放到一个数组中console.log($(".num_line_txt")); 打印，它是在数组里
//封装一个函数..........	
	function all_num(){
	var arr=$(".num_line_txt").get();   //获取所有input框中的数量值存放到一个数组中
	//console.log(arr);
	var arr1=$(".c_price").get();        //获取每件商品的价格
//	console.log(arr1);

var str=0;    //不var一下，后面使用会报错，显示未定义
var str1=0;
for(var i=0;i<arr.length;i++){      //遍历数组，取到数组中每个框的值,然后加起来
	//console.log(arr[i].value);
//	str=arr[0].value+arr[1].value+.....
str+=parseInt(arr[i].value);	
}

for(var j=0;j<arr1.length;j++){
//	console.log(arr1[j]);   商品总价=某个商品的个数*价格+.......
str1+=parseInt(arr1[j].innerHTML*arr[j].value);    //?
console.log(str1);
}

$("#all_money b").text(str1);
$("#all_nums b").text(str);
}

all_num();
//.................................................数量加加减减，以及商品总数总额的计算结束 ..............

	})   //回调函数end
//.....................................................................................

})   //$(function) ----end 

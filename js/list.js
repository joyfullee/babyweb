;(function(){
	//最后要把我的数据放入<div class="list"></div>
	var typeid = location.search.split("=")[1];
	$(function(){
		$.getJSON("http://datainfo.duapp.com/shopdata/getGoods.php?callback=?",{"classID":typeid},function(data){
		console.log(data);
		 var str="";   //因为拼接的是字符串，所以var一个
		 //index商品索引  item商品的图片价格，折后价格等等
		 var str1="";
			$.each(data, function(index,item){
				str+=`<a href="detail.html?id=${item.goodsID}">
				<img src="${item.goodsListImg}"/>
				<p>${item.goodsName}</p>
				<div class="items_price">
					<span>${item.price
}</span>
					
					<span>${item.discount}</span>
					
				</div>
			</a>`
			})
//			$(".list").html(str);
			
			//出现相同的列表
			for(var j=0;j<3;j++){
			  str1+=str;
			}
			//添加到相应的位置
			$(".list").html(str1);
		})
	})
	
})();

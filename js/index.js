//第一块开始
//当我划过li的时候，下面的ul显示出来
   $(function(){
 
   	$.get("json/index.json",function(data){
   		
   		console.log('ajax'); 
   		//数据在数组里放着
   		$(".hover2").hover(function(){
   			$(".select").html("");
   			
   			
   			//得到name一整个数组
   			
   			for(var j=0;j<data[1]["hot"].length;j++){
   				
   				$(".select").append("<li><a href=''><img src='image/"+data[1]["hot"][j]+"'></a></li>");
   				console.log(11111)
   			}  			
   		
   		})
   		
   		
   			//得到name一整个数组
   			
   			for(var j=0;j<data[0]["name"].length;j++){
   				$(".select").append("<li><a href=''><img src='image/"+data[0]["name"][j]+"'></a></li>");
   			}  			
   		
   		
   		$(".hover1").hover(function(){
   			$(".select").html("");
   			
   			
   			//得到name一整个数组
   			
   			for(var j=0;j<data[0]["name"].length;j++){
   				
   				$(".select").append("<li><a href=''><img src='image/"+data[0]["name"][j]+"'></a></li>");
   				
   			}  			
   		
   		})
   		
   	},function(err){console.log('err',err)})
   	
   })
//第一块结束


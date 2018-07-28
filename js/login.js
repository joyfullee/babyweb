;(function(){
	$(function(){
		$("#btn1").click(function(){
					var sjs = 4;
					var arr = ["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","D","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
					$("#yz").text("");
					$("#yz").css({"border":"1px solid #ddd","width":"100","text-align":"center","margin-top":"10px"});
					for(var i=0;i<sjs;i++){
						//在p标签里追加一个arr---->存放的是四位随机验证码
						$("#yz").append(arr[Math.floor(Math.random()*36)]);
						
					}
				})
				$("#btn2").click(function(){
					
					if($("#txt").val() == ""){
						$("#tishi").text("验证码不能为空")
						
					}else if($("#txt").val().toUpperCase() != $("#yz").text()){
							$("#tishi").text("验证码输入错误")
					}else{
						$("#tishi").text("验证码输入成功");
						
					}
				})
				$("#btn1").click();   //如果不写这一步，只有页面刷新的时候才会出现验证码 
			
			//调接口
			
			$(".ipt_button").click(function(){
				//console.log($("#txt1").val(),$("#password").val())
	$.get(
		"http://datainfo.duapp.com/shopdata/userinfo.php",
		{"status":"login","userID":$("#username").val(),"password":$("#password").val()},
		function(data){
			data = JSON.parse(data);     //字符串转对象  data.[]取东西  字符串取不出来 获取到数据，用不了
			console.log(data)
			//、、=====
			if(data == 0){
				alert("用户名不存在");
			}
			if(data==2){
				alert("密码不符");
			}else{
				$.cookie("username",data.userID,{expires:7,path:"/"});
				location.href="index.html";
			}

			
});  
				
			})
				
		
		
		
		
		
		
		
	})
})();

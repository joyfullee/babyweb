;(function(){
$(function(){
	//验证码
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
			})

//正则  密码

$(".ipt_button").click(function(){
	var oTxt1=document.getElementById("txt1");
	var opassword=document.getElementById("password");
	var val2=opassword.value;
	 var val1 =oTxt1.value;
	 
	 //用户名
     var reg =/^1(3|5|7|8)\d{9}$/;
	if(reg.test(val1) == false){           
           $(".err_text_username").css("display","block");
       }
	//密码
	var reg1= /[a-zA-Z0-9_]/g;
	if(reg1.test(val2) == false){           
           $(".err_text_password").css("display","block");
       }
	
	 //重点！！！！点击后注册成功到登录界面   不成功显示已经注册
	 
	 //接口："http://datainfo.duapp.com/shopdata/userinfo.php"
	 $.get(
		"http://datainfo.duapp.com/shopdata/userinfo.php",
		{"status":"register","userID":$("#txt1").val(),"password":$("#password").val()},
		function(data){
			console.log(data)
			
			if(data == 0){
				alert("该用户名已被注册");
			}
			if(data == 1){
			window.location.href="http://localhost:8080/login.html";
			}
			
});  //get --end
	 
	 
	 
	
})


})();
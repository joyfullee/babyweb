function setCookie(name, value, n) {
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + n);
	document.cookie = name + "=" + value + ";expires=" + oDate;
}

function getCookie(name) {
	var str = document.cookie;     //cookie本身是字符串
	var arr = str.split("; ");    //字符串转数组
	for(var i = 0; i < arr.length; i++) {
		var newArr = arr[i].split("=");    //usename 001 
		if(newArr[0] === name) {
			return newArr[1];             //001
		} 
	}
}

function removeCookie(name) {
	setCookie(name, 1, -1);
}
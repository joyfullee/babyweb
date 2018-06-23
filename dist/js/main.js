"use strict";

;(function () {
	//搜索框
	//http://api.beibei.com/mroute.html?method=beibei.item.search.suggest&keyword=fds
	console.log('load');
	var owrap = document.getElementsByClassName("input_wrap")[0];
	var otxt = document.getElementById("txt");
	var oh6 = document.getElementsByTagName("h6")[0];
	var olist = document.getElementById("list");
	console.log(otxt);
	otxt.oninput = function () {
		var val = otxt.value;
		var oScript = document.createElement("script");
		oScript.src = "https://suggest.taobao.com/sug?q=" + val + "&callback=atb";
		document.body.appendChild(oScript);
	};

	//处理后台传来的外包atb函数包含的数据
	function atb(data) {
		console.log(data);
		data = data.result;
		console.log(data);
		var str = "";
		for (var i = 0; i < data.length; i++) {
			str += "<li><a href='https://www.taobao.com/search?q=" + data[i][0] + "'>" + data[i][0] + "</a></li>";
		}
		olist.innerHTML = str;
	}

	//给搜索添加点击事件
	//				oli[j].className="";

	oh6.onclick = function () {
		console.log(11111);
		location.href = "https://s.taobao.com/search?q=" + otxt.value + "";
	};

	//键码

	var count = 0;
	document.onkeydown = function (e) {
		olist.style.display = "block";
		var oli = olist.children;
		var evt = e || event;
		var code = evt.keyCode;
		for (j = 0; j < oli.length; j++) {
			oli[j].className = "";
		}

		if (code == 40) {

			count++;
			if (count >= oli.length) {
				count = oli.length;
			}
			oli[count - 1].className = "hover";
			otxt.value = oli[count - 1].children[0].innerHTML;
		}
		if (code == 38) {
			if (count <= 0) {
				count = 0;
			}
			count--;
			oli[count - 1].className = "hover";
			otxt.value = oli[count - 1].children[0].innerHTML;
		}
		if (code == 13) {
			if (count <= 0) {
				location.href = "https://s.taobao.com/search?q=" + otxt.value + "";
			} else {
				location.href = "https://s.taobao.com/search?q=" + oli[count - 1].children[0].innerHTML + "";
			}
		}
	};
})();
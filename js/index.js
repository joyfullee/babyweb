//第一块开始（主页右上）
//当我划过li的时候，下面的ul显示出来

// $(function(){
// })
//  这个是jquery的 jquery.ready() 方法变中 是用来在window.onload后执行 函数内的代码的

// (function(){})() 这个是立即执行函数 代码执行到他是会立即执行包裹的函数体
// 所以你写那么多立即执行函数干嘛呢  jquery要确保在dom加载后执行 所以吧你的js写在 第一个$(function(){}) 内部

$(function () {

	$.get("json/index.json", function (data) {
		$.ajax({
			type: "get",
			url: "json/index.json",
			async: true,
			success: function () {
				//划过精彩推荐时，data数据发生改变
				$(".hover2").hover(function () {
					$(".select").html("");
					//得到name一整个数组

					for (var j = 0; j < data[1]["hot"].length; j++) {

						$(".select").append("<li><a href=''><img src='image/" + data[1]["hot"][j] + "'></a></li>");
					}

				})
				//划过精彩推荐的结束


				//..................默认显示hover1
				for (var j = 0; j < data[0]["name"].length; j++) {
					$(".select").append("<li><a href=''><img src='image/" + data[0]["name"][j] + "'></a></li>");
				}
				//..................默认显示的结束


				//当我划过hover2后，确保还能划会hover1
				$(".hover1").hover(function () {
					$(".select").html("");
					for (var j = 0; j < data[0]["name"].length; j++) {

						$(".select").append("<li><a href=''><img src='image/" + data[0]["name"][j] + "'></a></li>");
					}

				})
				//hover1的划过效果结束
			}
		})

	})

	// 搜索框
	var str = "";
	var otxt = document.getElementById("txt");
	var olist = document.getElementById("list");
	otxt.oninput = function () {
		var val = otxt.value;
		$.ajax({
			type: "get",
			url: "https://suggest.taobao.com/sug?code=utf-8&q=" + val + "&_ksTS=1528373225105_827&callback=?&k=1&area=c2c&bucketid=13",
			async: true,
			dataType: "jsonp",
			success: function (data) {
				var first = data.result;
				for (var i = 0; i < first.length; i++) {
					str += "<li><a href ='https://s.taobao.com/search?q=" + first[i][0] + "'>" + first[i][0] + "</a></li>";
				}
				olist.innerHTML = str;
				console.log(str);
			}
		})
	}

	//第二块   热搜榜
	//获取接口id数据
	$.get("json/indexhot.json", function (data) {
		//			console.log(data)

		//默认显示 
		//图片
		//kaishi
		for (var j = 0; j < data[0]["pic"].length; j++) {
			var index = j;
			$(".hot_list").append(
				`<a href="">
									<img src="image/${data[0]['pic'][j]}"/>
											
										</a>`
			)
		}
		//txt文本
		var num = -1;
		for (var j = 0; j < data[0]["txt"].length; j++) {
			// 					console.log(data[i])
			num++;
			if (num < data[0]["txt"].length) {
				//找到对应的a
				$(".hot_list").find("a").eq(num).append(
					`<div class="items">
									<div class="items_tit">${data[0]["txt"][j]}</div></div>`
				)

			}

		}
		//价格
		var num = -1;
		for (var j = 0; j < data[0]["price"].length; j++) {
			num++;
			$(".hot_list a").find(".items")
				.eq(num).append(
					`<div class="items_price"><span>${data[0]["price"][j]}</span></div>`

				)
		}
	})
	
	
	// mian.json 这里用来获取main.json 的数据
	//获取接口id数据
	$.get("json/indexmain.json", function (data) {
		//console.log(data)

		/**
		 * data是个大数组 每一项对应一个.main_item
		 * 你的一大思维误区是 误以为每一个大的块都有自己的独立className 其实是可以共用的 应为他们结构是一样的
		 * 当然如果你想独立出来也是完全没有问题的 你可以动态给他们赋值className 也可以预设个数组存各自的classname
		 */
		for (let i in data) {
			// 这里给他们起一个共有的classname 在给每一个赋值一个特有的classname
			// 这里假设他们每一个大的main_item 也有唯一的id (因为很显然他没事可以点击 X.X折> 跳到对应的页面的 
			// 所以有唯一标示 这里你没模拟貌似也不打算做就随便写 不重要)
			// 先创建item 就是每一个大的行块
			let item = $(`<div class='main_item main_item_${i}' data-kind_id='${i}'></div>`)
			// 这里创建每一行的标题
			let title = $(`<div class="tit">
									<dl>
										<dt><img src="image/${data[i]["icon"]}"/></dt>
										<dd>
											<p>${data[i]["title"]}</p>
											<p>${data[i]["subtitle"]}</p>
										</dd>
									</dl>
									<div class="dazhe">
										<a href="">${data[i]["zhekou"]}</a>
									</div>
								</div>`)
			// 将标题插入到item中
			item.append(title)
			let detials = $(`<div class="detail"></div>`)
			item.append(detials)
			// 循环每一行的商品
			console.log(data[i]);
			for (let j = 0; j < data[i]['goods'].length; j++) {
				let good = data[i]['goods'][j]

				// 这里href 可以写成detial.html？id=xxx

				let detial = $(`<dl data-good_id='${good.id}'>
					<dt><a href="javascript:console.log('${good.id}')"><img src="image/${good.img}"/></a></dt>
					<dd>
						<a href="">${good.price}</a>
						<a href="">${good.yujia}</a>
						<p>
							<a href="javascript:console.log('${good.info}')" class="love">${good.info}</a>
						</p>
					</dd>

					</dl>
					`)
				//  然后将的detial append进item中
				detials.append(detial)
			}

			// 将item 插入到 .main_left
			$('.main_left').append(item)
		}

	})


	//....图片的写法 ..................
	function zig(src, width, height, dizi, x, y) {
		this.osrc = src;
		this.owidth = width;
		this.oheight = height;
		this.odizi = dizi;
		this.ox = x;
		this.oy = y;
		this.init = function () {
			this.onode = document.createElement("img");
			this.onode.src = this.osrc;
			this.onode.style.width = this.owidth + "px";
			this.onode.style.height = this.oheight + "px";
			this.onode.style.left = this.ox + "px";
			this.onode.style.top = this.oy + "px";
			this.odizi.prepend(this.onode);
		}
		this.init();
	}


	//... 生成同样的块就这种写法:需要几块写几块.................
	$.getJSON("https://rec.www.mi.com/rec/collection?jsonpcallback=aa&callback=?", function (data) {
		// foo5(data);
		console.log(2222222222)
		for (let i = 0; i < 7; i++) {
			bar(data.data, i)
		}
	});

	 function foo5(a) {
	 	var b5 = a.data; //b数组
	 	bar(b5, 0);

	 }
	 $.getJSON("https://rec.www.mi.com/rec/collection?jsonpcallback=aa&callback=?", function (data) {
	 	foo1(data);
	 });

	 function foo1(a) {
	 	var b1 = a.data; //b数组
	 	bar(b1, 1);

	 }

	 $.getJSON("https://rec.www.mi.com/rec/collection?jsonpcallback=aa&callback=?", function (data) {
	 	foo2(data);
	 });

	 function foo2(a) {
	 	var b2 = a.data; //b数组
	 	bar(b2, 2);

	 }
	 $.getJSON("https://rec.www.mi.com/rec/collection?jsonpcallback=aa&callback=?", function (data) {
	 	foo3(data);
	 });

	 function foo3(a) {
	 	var b3 = a.data; //b数组
	 	bar(b3, 3);

	 }

	 $.getJSON("https://rec.www.mi.com/rec/collection?jsonpcallback=aa&callback=?", function (data) {
	 	foo4(data);
	});

	 function foo4(a) {
	 	var b4 = a.data; //b数组
		bar(b4, 4);

	 }
	 $.getJSON("https://rec.www.mi.com/rec/collection?jsonpcallback=aa&callback=?", function (data) {
	 	foo6(data);
	 });

	 function foo6(a) {
	 	var b6 = a.data; //b数组
	 	bar(b6, 6);

	 }


	//.生成结束.......................
	//封装  

	function bar(sz, numli) {
		//遍历sz这个数组
		for (var i = 0; i < sz.length; i++) {
			var oli = document.createElement("li");
			//代表从数组中获取第几个对象
			var num = sz[i];
			//代表第几个划过的块 numli代表第几个li
			//var num_li=$(".data1").eq(numli);
			var oc = $(".data1").eq(numli);
			oc.append(oli);
			//找生成的对应的第几个li
			var zli = $(".data1").eq(numli).find("li").eq(i);
			//放文字
			zli.html("<span>" + num.name + "</span>");
			new zig(num.image, 40, 40, zli);
		}
	}


	$(".data1").eq(0).addClass("hover").siblings().removeClass("hover");

	$(".meau_search_l").hover(function () {
		var suoyin = $(this).index();
		$(".data1").eq(suoyin).addClass("hover").siblings().removeClass("hover");


	}, function () {
		var th = $(this).index();
		$(".data1").eq(th).removeClass("hover");

	})
	//...默认展示

	$(".data1").hover(function () {
		$(this).addClass("ohover").sibling().removeClass("ohover");
	}, function () {
		$(this).removeClass("ohover");
	})

})



// 你写这么多的立即执行函数 有在里面加jquery.ready()做什么呢？
// 立即执行就是想要在文件加载到的时候立即进行操作  而jquery.ready则是咋dom渲染完 在执行 这俩本来就是冲突的 你还放一起写
// 你明天搜下立即执行函数 window.onload jquery.ready 看看他们的含义区别



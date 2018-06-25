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

		// //图片
		// for (var i = 0; i < data[0]["pic"].length; i++) {
		// 	// 			console.log(data[0]["pic"])
		// 	$(".zw .detail").append(
		// 		`<dl>
		// 					</dl>`

		// 	)
		// }
		// //价格
		// var num = -1;
		// for (var i = 0; i < data[0]["price"].length; i++) {
		// 	num++;
		// 	$(".zw .detail").find("dl").eq(num).append(
		// 		``

		// 	)
		// }
		// //原价
		// var num = -1;
		// for (var i = 0; i < data[0]["yuanjia"].length; i++) {
		// 	num++;
		// 	$(".zw .detail dl").find("dd").eq(num).append(
		// 		``

		// 	)
		// }

		// //  txt
		// var num = -1;
		// for (var i = 0; i < data[0]["txt"].length; i++) {
		// 	num++;
		// 	$(".zw .detail").find("dd").eq(num).append(
		// 		`<p>
		//      <a href="" class="love">${data[0]["txt"][i]}</a>
		// 	</p> `

		// 	)
		// }
	})
})



// 你写这么多的立即执行函数 有在里面加jquery.ready()做什么呢？
// 立即执行就是想要在文件加载到的时候立即进行操作  而jquery.ready则是咋dom渲染完 在执行 这俩本来就是冲突的 你还放一起写
// 你明天搜下立即执行函数 window.onload jquery.ready 看看他们的含义区别
// (function () {
// 	$(function () {
// 		//获取接口id数据
// 		$.get("json/indexmain.json", function (data) {
// 			//console.log(data)

// 			//默认显示 
// 			$(".za").prepend(
// 				`<div class="tit">
// 							<dl>
// 								<dt><img src="image/${data[1]["img"]}"/></dt>
// 								<dd>
// 									<p>${data[1]["wenzi1"]}</p>
// 									<p>${data[1]["wenzi2"]}</p>
// 								</dd>
// 							</dl>
// 							<div class="dazhe">
// 								<a href="">${data[1]["wenzi3"]}</a>
// 							</div>
// 						</div>
// 							`
// 			)
// 			//图片
// 			for (var i = 0; i < data[0]["pic"].length; i++) {
// 				// 			console.log(data[0]["pic"])
// 				$(".za .detail1").append(
// 					`<dl>
// 								<dt><a href=""><img src="image/${data[1]['pic'][i]}"/></a></dt></dl>`

// 				)
// 			}
// 			//价格
// 			var num = -1;
// 			for (var i = 0; i < data[1]["price"].length; i++) {
// 				num++;
// 				$(".za .detail1").find("dl").eq(num).append(
// 					`<dd><a href="">${data[1]["price"][i]}</a></dd>`

// 				)
// 			}
// 			//原价
// 			var num = -1;
// 			for (var i = 0; i < data[1]["yuanjia"].length; i++) {
// 				num++;
// 				$(".zw .detail1 dl").find("dd").eq(num).append(
// 					`<a href="">${data[1]["yuanjia"][i]}</a>`

// 				)
// 			}

// 			//  txt
// 			var num = -1;
// 			for (var i = 0; i < data[1]["txt"].length; i++) {
// 				num++;
// 				$(".za .detail1").find("dd").eq(num).append(
// 					`<p>
// 		         <a href="" class="love">${data[1]["txt"][i]}</a>
// 				</p> `

// 				)
// 			}
// 		})
// 	})
// })();
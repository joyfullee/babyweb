"use strict";$(function(){$.get("json/index.json",function(n){console.log("ajax"),$(".hover2").hover(function(){$(".select").html("");for(var e=0;e<n[1].hot.length;e++)$(".select").append("<li><a href=''><img src='image/"+n[1].hot[e]+"'></a></li>"),console.log(11111)});for(var e=0;e<n[0].name.length;e++)$(".select").append("<li><a href=''><img src='image/"+n[0].name[e]+"'></a></li>");$(".hover1").hover(function(){$(".select").html("");for(var e=0;e<n[0].name.length;e++)$(".select").append("<li><a href=''><img src='image/"+n[0].name[e]+"'></a></li>")})},function(e){console.log("err",e)})});
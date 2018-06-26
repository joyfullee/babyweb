//gulp 插件
const gulp=require("gulp"),
connect=require("gulp-connect"),
sass=require("gulp-sass"),
imagemin=require("gulp-imagemin"),
concat=require("gulp-concat"),
uglify=require("gulp-uglify"),             //压缩合并的js文件;
rename=require("gulp-rename"),
cleanCss=require("gulp-clean-css");
babel=require("gulp-babel");

//配置首页
gulp.task("copy-html",function(){
	gulp.src("./**.html").pipe(gulp.dest("dist")).pipe(connect.reload());
})

//配置css
gulp.task("copy-sass",function(){
	gulp.src("css/**.scss")
	.pipe(sass())
	.pipe(cleanCss())
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})
//配置图片
gulp.task("images",function(){
	gulp.src("image/**")
    .pipe(imagemin())                //再压缩
	.pipe(gulp.dest("dist/image"))   //压缩后在放进去
	.pipe(connect.reload());         //实时更新
})
//配置plugin
gulp.task("copy-plugin",function(){
	gulp.src("plugin/**")
	.pipe(gulp.dest("dist/plugin"))
	.pipe(connect.reload());
})

gulp.task("copy-json",function(){
	gulp.src("json/**")
	.pipe(gulp.dest("dist/json"))
	.pipe(connect.reload());
})


//watch监听   源文件发生改变，dist也随着改变    
gulp.task("watch",function(){
	gulp.watch("./**.html",["copy-html"]);
	gulp.watch("image/**",["images"]);
	gulp.watch("css/**.scss",["copy-sass"]);
	gulp.watch("js/**.js",["script"]);
	gulp.watch("plugin/**",["copy-plugin"]);
	gulp.watch("json/**",["copy-json"]);
})

//gulp-connect插件搭建本地服务        页面能够能够自动刷新   
gulp.task("sever",function(){
	connect.server({root:"dist",livereload:true});
})
gulp.task("default",["sever","watch"]); 

gulp.task("script",function(){
	gulp.src("js/**.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(uglify())        //压缩
	.pipe(gulp.dest("dist/js"))     //合并后放的位置   	
	.pipe(connect.reload());
});

gulp.task('build',["copy-html","images","copy-sass","script","copy-plugin","copy-json"])



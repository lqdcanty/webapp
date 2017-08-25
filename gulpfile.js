var gulp = require('gulp');
var $=require('gulp-load-plugins')();//这里要注意加括号实例化
var open=require('open');//以上都是模块的引用；


var app={//申明全局变量
	//用来定义我们的目录路径
	srcPath:'src/',//源代码放置的位置
	devPath:'build/',//整合之后的文件
	prdPath:'dist/' //用于生产部署
};
//调用task函数来定义一个任务
gulp.task('lib',function(){
	gulp.src('bower_components/**/*.js') //这里指的是读取文件
	.pipe(gulp.dest(app.devPath+'vendor'))//dest写文件，拷贝到vendor
	.pipe(gulp.dest(app.prdPath+'vendor'))
	.pipe($.connect.reload());//自动刷新
})

gulp.task('html',function(){
	gulp.src(app.srcPath+'**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
})

gulp.task('json',function(){
	gulp.src(app.srcPath+'data/**/*.json')
	.pipe(gulp.dest(app.devPath+'data'))
	.pipe(gulp.dest(app.prdPath+'data'))
	.pipe($.connect.reload());
})
//编译Sass
gulp.task('less',function(){
	gulp.src(app.srcPath+'style/index.less')
	.pipe($.less())
	.pipe(gulp.dest(app.devPath+'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath+'css'))
	.pipe($.connect.reload());
})
// 合并，压缩文件
gulp.task('js',function(){
	gulp.src(app.srcPath+'script/**/*.js')
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath+'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath+'js'))
	.pipe($.connect.reload());
})

gulp.task('image',function(){
	gulp.src(app.srcPath+'image/**/*')
	.pipe(gulp.dest(app.devPath+'image'))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath+'image'))
	.pipe($.connect.reload());
})

gulp.task('build',['image','js','less','lib','html','json'])
//写的一个总任务，要打包整个项目时只需要执行build任务就行

gulp.task('clean',function(){
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean());
})

gulp.task('serve',['build'],function(){
	$.connect.server({
		root:[app.devPath],
		livereload:true,//正对高版本浏览器，可以自动刷新浏览器
		port:8088
	});
	open('http://localhost:8088');

	gulp.watch(app.srcPath+'**/*.html',['html'])
	gulp.watch(app.srcPath+'data/**/*.json',['json'])
	gulp.watch(app.srcPath+'style/**/*.less',['less'])
	gulp.watch(app.srcPath+'script/**/*.js',['js'])
	gulp.watch(app.srcPath+'image/**/*',['image'])
});

gulp.task('default',['serve'])//默认任务，执行serve时直接用gulp就能解决问题；

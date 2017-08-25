  'use strict'

angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){//config用来配置,用一个插件把他转换成显示声明的方式,provider就是对前面的函数（state，url）进行配置的入口；
	$stateProvider.state('main',{
		//state后面的main，是这页面的id
		url:'/main',//就是哈希值，也可以传参数、main/:id 
		templateUrl:'view/main.html',//对应的页面
		controller:'mainCtrl'
	}).state('position',{
		url:'/position/:id',//这里得注意了，如果不传ID将会报错
		templateUrl:'view/position.html',
		controller:'positionCtrl'
	}).state('company',{
		url:'/company/:id',
		templateUrl:'view/company.html',
		controller:'companyCtrl'
	});
	$urlRouterProvider.otherwise('main');//默认跳转路由
}])



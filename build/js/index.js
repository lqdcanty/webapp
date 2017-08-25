'use strict';
angular.module('app',['ui.router']);
'use strict'
	angular.module('app').controller('companyCtrl',['$http','$state','$scope',function($http,$state,$scope){
		$http({
				medth:'Get',
				url:'/data/company.json?id='+$state.params.id
			}).then(function successCallback(response){
				$scope.company=response.data;
				console.log($scope.company);
			},function errorCallback(err){
		})
		
}]);

'use strict'
	angular.module('app').controller('mainCtrl',['$http','$scope',function($http,$scope){
		$http({
			medth:'Get',
			url:'/data/positionList.json',
		}).then(function successCallback(response){
			$scope.list=response.data;
			console.log($scope.list)
		},function errorCallback(response){

		})
		

		/*$scope.list=[{
			id:'1',
			name:'销售',
			imgSrc:'image/company-3.png',
			companyName:'千度',
			city:'上海',
			industry:'互联网化',
			time:'2016-06-01 11:05'
		},{
			id:'2',
			name:'WEB前端',
			imgSrc:'image/company-1.png',
			companyName:'慕课网',
			city:'北京',
			industry:'互联网化',
			time:'2016-06-01 17:05'
		}];*/
}])

'use strict'
////，Promise就是一种对执行结果不确定的一种预先定义，如果成功，就xxxx；如果失败，就xxxx，就像事先给出了一些承诺。
//defer() 创建一个deferred对象，这个对象可以执行几个常用的方法，比如resolve,reject,notify等
//在$q中，可以使用resolve方法，变成完成状态；使用reject方法，变成拒绝状态
//注意$q的几个方法：all（），when（）等；
	angular.module('app').controller('positionCtrl',['$q','$http','$state','$scope',function($q,$http,$state,$scope){
		//$q服务是AngularJS中自己封装实现的一种Promise实现，
		$scope.isLogin=false;
		function getPosition(){
			var def=$q.defer();//申明一个延迟加载对象
			$http({
				medth:'Get',
				url:'/data/position.json?id='+$state.params.id
			}).then(function successCallback(response){
				$scope.position=response.data;
				console.log($scope.position);
				def.resolve(response.data);//执行成功之后把他传回去,也可以不传
			},function errorCallback(err){
				def.reject(err);
			})
			return def.promise;//在末尾把这个对象的promise返回回来,defer.promise用于返回一个promise对象
		}

		function getCompany(id){
			$http({
				medth:'Get',
				url:'/data/company.json?id='+id
			}).then(function successCallback(response){
				$scope.company=response.data;
				console.log($scope.company);
			},function errorCallback(err){
			})
		}

		getPosition().then(function(obj){
			//resolve执行成功之后，会触发的函数；
			getCompany(obj.companyId);
			console.log(obj.companyId,"company的id值")
		},function(err){
			//resolve执行失败之后，会触发的函数
		})//注意then后面可以接.finally();意思就是无论成功与失败都会执行的函数


		
}]);

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



'use strict'
angular.module('app').directive('appCompany',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			com:"="
		},
		templateUrl:'view/template/company.html'
	};
}]);
'use strict';
angular.module('app').directive('appFoot',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/foot.html'
	}
}])
'use strict'
angular.module('app').directive('appHead',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html'
	};
}]);
'use strict'
angular.module('app').directive('appHeadBar',[function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/headBar.html',
		scope:{
			text:'@'//这里是暴露接口
		},
		link:function ($scope){//伪指令定义一些内在逻辑
			$scope.back=function(){
				window.history.back();//history是html5里面新带的api（接口）；
			}
		}
	};
}]);
'use strict'
angular.module('app').directive('appPositionClass',[function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			com:"=",
		},
		templateUrl:'view/template/positionClass.html',
		link:function($scope){

			$scope.showPositionList=function(idx){
				$scope.positionList=$scope.com.positionClass[idx].positionList;
				
				$scope.isActive=idx;
			}
			$scope.showPositionList(0);
		}
	};
}]);
'use strict'
angular.module('app').directive('appPositionInfo',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionInfo.html',
		scope:{
			isActive:'=',
			isLogin:"=",
			pos:'='
		},
		link:function($scope){
			$scope.imagePath=$scope.isActive ? 'image/star-active.png' : 'image/star.png';//这里默认状态是没有激活的状态
		}
	};
}]);
'use strict'
angular.module('app').directive('appPositionList',[function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionList.html',
		scope:{
			data:'='
		}
	};
}]);
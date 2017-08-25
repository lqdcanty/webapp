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

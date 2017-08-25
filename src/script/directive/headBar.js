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
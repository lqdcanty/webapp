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

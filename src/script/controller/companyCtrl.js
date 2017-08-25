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

angular.module("appForum").controller("dangnhapCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout, $window) {
  $scope.logined = $state.params.logined;
  $scope.login1 = function(tk){
    $rootScope.login(tk);
  }
  
})

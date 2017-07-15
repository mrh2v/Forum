angular.module("appForum").controller("danhmucCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {

  callAPI.get("/chude/get_by_id_all", { id: $state.params.id }, function(cb) {
    if (cb && cb.DANH_MUC) {
      $rootScope.titles[1].name = cb.DANH_MUC.TEN_DANH_MUC;
      $scope.dmc = cb.DMC;
    }
  })

  $scope.goDMC = function(dm) {
    $state.go("home.dmc", { id: dm.ID });
  }
});


angular.module("appForum").controller("dmcCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {

  callAPI.get("/danhmuc/get_chi_tiet", { id: $state.params.id }, function(cb) {
    if (cb && cb.DANH_MUC) {
      $rootScope.titles[1].name = cb.DANH_MUC.TEN_DANH_MUC;
      $scope.chude = cb.CHUDE;
      console.log($scope.chude);
    }
  })

  $scope.createChuDe = function() {
    if (!$rootScope.user) {
      toastr.warning("Yêu cầu đăng nhập !!", "CẢNH BÁO")
    } else {
      console.log('abc')
    }
  }

  $scope.goChuDe = function(cd){
    console.log(cd);
  }

});

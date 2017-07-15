angular.module("appForum").controller("homeCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  $scope.danhmuc = [];
  var dmcon = {};
  callAPI.get("/danhmuc/get_all", null, function(res) {
    if (res && angular.isArray(res)) {
      for (var i in res) {
        if (!dmcon[res[i].ID_DM_CHA]) dmcon[res[i].ID_DM_CHA] = [];
        dmcon[res[i].ID_DM_CHA].push(res[i])
      }
      $scope.dmCon = dmcon;
    }
  })

  callAPI.get("/chude/get_sl_by_dm_all", null, function(res) {
    if (res) {
      $scope.soLuongBai = res;
    }
  })

  $scope.goDanhMuc = function(dm) {
    $state.go("home.danhmuc", { id: dm.ID, danhmuc: dm.TEN_DANH_MUC });
  }
  $scope.goDMC = function(dm) {
    $state.go("home.dmc", { id: dm.ID });
  }
  
})

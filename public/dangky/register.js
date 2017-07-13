angular.module("appForum").controller("registerCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  var rg = this;
  $scope.dateOptions = {
    formatYear: 'yy',
    maxDate: new Date(),
    startingDay: 1
  };

  $scope.dangky = function(tk, check) {
    if (!check) {
      tk.NGAY_SINH = $filter('date')(tk.ngaysinh, "yyyy-MM-dd");
      tk.CAU_HOI = tk.cauhoi.replace(/ /g, "");
      callAPI.post("/user/register", tk, function(res) {
        if (res && res.ID) {
          toastr.success("Tiến hành đăng nhập !!", "ĐĂNG KÝ THÀNH CÔNG");
          $rootScope.setUser(res);
          $state.go("home");
        } else {
          toastr.error("Vui lòng kiểm tra thông tin hoặc đường truyền !!", "ĐĂNG KÝ THẤT BẠI");
        }
      })
    }
  }

  $scope.checkTK = function(tk) {
    $scope.checking = true;
    var check = 0;

    function checkTk(tk) {
      check++;
      callAPI.post("user/check_tk", { name: tk }, function(res) {
        if (res && res == "yes") {
          $scope.checking = false;
          $scope.errorTk = false;
        } else if (res && res == "no") {
          $scope.checking = false;
          $scope.errorTk = true;
        } else {
          if (check < 10) {
            checkTk(tk);
          }
        }
      })
    }
    checkTk(tk)
  }
})

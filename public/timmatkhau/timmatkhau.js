angular.module("appForum").controller("timmkCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  $scope.phuongan = "1";

  $scope.next = function(pa) {
    if (pa == "1") {
      $scope.thuchien = 1;
    } else {
      $scope.thuchien = 3;
    }
  }
  $scope.backward = function(thuchien) {
    $scope.thuchien = $scope.thuchien ? $scope.thuchien - thuchien : 0;
  }

  $scope.next1 = function(mk) {
    $scope.checking = true;
    callAPI.post("/user/check_taikhoan", mk, function(cb) {
      if (cb && cb.ID) {
        $timeout(function() {
          $scope.thuchien = 2;
          $scope.checking = false;
          toastr.success("Xác nhận thành công !");
          $scope.taikhoan = cb;
        }, 2000);
      } else if (cb && cb == "tk") {
        toastr.error("Không tìm thấy tên tài khoản trong hệ thống!");
        $scope.checking = false;
      } else {
        toastr.error("Mật khẩu nhập không chính xác!");
        $scope.checking = false;
      }
    })
  }
  $scope.next2 = function(mk) {
    callAPI.post("/user/change_pass", { ID: $scope.taikhoan.ID_USER, mkmoi: mk }, function(cb) {
      if (cb && cb == "yes") {
        toastr.success("Thay đổi mật khẩu thành công !");
        $state.go("login");
      } else {
        toastr.error("Có lỗi xảy ra!", "HỆ THỐNG");
      }
    })
  }

  $scope.next3 = function(tk) {
    $scope.checking = true;
    tk.CAU_HOI = tk.cauhoi.replace(/ /g, "");
    console.log(tk)
    callAPI.post("/user/check_cauhoi", tk, function(cb) {
      if (cb && cb.ID) {
        $timeout(function() {
          $scope.thuchien = 4;
          $scope.checking = false;
          toastr.success("Xác nhận thành công !");
          $scope.taikhoan = cb;
        }, 2000);
      } else if (cb && cb == "tk") {
        toastr.error("Không tìm thấy tên tài khoản trong hệ thống!");
        $scope.checking = false;
      } else {
        toastr.error("Câu hỏi hoặc câu trả lời không chính xác!");
        $scope.checking = false;
      }
    })
  }
})

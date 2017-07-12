var app = angular.module("appForum", ['ui.bootstrap', 'ui.router', 'ngAnimate', 'toastr', 'ngFileUpload', 'textAngular', 'ngSanitize']);

app.config(function($stateProvider, $locationProvider, $qProvider, toastrConfig, $provide, $sceProvider) {
  angular.extend(toastrConfig, {
    timeOut: 3000
  })
  $sceProvider.enabled(true);
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('');
  $qProvider.errorOnUnhandledRejections(true);

  $stateProvider
    .state('register', {
      url: '/ghi-danh',
      templateUrl: 'dangky/register.html',
      controller: "registerCtrl",
      controllerAs: "rg"
    })



});
app.run(function($state, $rootScope, $uibModal, callAPI, toastr) {

  callAPI.get("danhmuc/get_all", { hienthi: true }, function(res) {
    $rootScope.danhMucNar = res;
  })


  $rootScope.login = function(tk) {
    callAPI.post("/user/login", tk, function(res) {
      if (res && res.ID) {
        $rootScope.user = res;
        $rootScope.tempisLogin = "temp-islogin.html";
        $rootScope.user.AVATAR = res.AVATAR ? res.AVATAR : "/avatar.gif";
        $rootScope.user.ten = res.TEN_HIEN_THI ? res.TEN_HIEN_THI : res.TEN_DANG_NHAP;
        toastr.success("Đăng nhập thành công !");
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem("ten", res.TEN_HIEN_THI ? res.TEN_HIEN_THI : res.TEN_DANG_NHAP);
          localStorage.setItem("quyen", res.QUYEN);
          localStorage.setItem("id", res.ID);
          localStorage.setItem("anh", res.AVATAR ? res.AVATAR : "/avatar.gif");
        }
      } else if (res) {
        toastr.warning("Tài khoản hoặc mật khẩu không đúng !");
      } else {
        toastr.error("Không có kết nối hệ thống", "LỖI !");
      }
    })
  }

})

app.factory("callAPI", function($http, $uibModal) {
  return {
    get: function(url, params, callback) {
      $http({
        url: url,
        method: "GET",
        params: params
      }).then(function(res) {
        callback(res.data);
      }, function(err) {
        callback(err);
      })
    },
    post: function(url, data, callback) {
      $http.post(url, data).then(function(res) {
        return callback(res.data);
      }, function(err) {
        return callback(err)
      })
    },
    delete: function(url, params, callback) {
      if (params) {
        for (var i in params) {
          url += '/' + params[i];
        }
      }
      $http.get(url).then(function(res) {
        return callback(res.data);
      }, function(err) {
        return callback(err)
      })
    }
  }
})

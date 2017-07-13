angular.module("appForum").controller("ttcnCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  if ($rootScope.user) {
    callAPI.get("/ttcn/get_by_user", { id_user: $rootScope.user.ID }, function(res) {
      if (res && res.ID) {
        if (res.NGAY_SINH) res.ngaysinh = new Date(res.NGAY_SINH);
        $scope.tk = res;
        $scope.backup = angular.copy(res);
      }
    })
  }
})

angular.module("appForum").controller("cnCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  

  $scope.cancel = function() {
    $scope.tk = angular.copy($scope.backup);
  }
  $scope.saveTT = function(tk) {
    if (tk.ngaysinh) tk.NGAY_SINH = $filter('date')(tk.ngaysinh, 'yyyy-MM-dd');
    callAPI.post("/ttcn/update", tk, function(cb) {
      if (cb && cb.ID) {
        if (cb.NGAY_SINH) cb.ngaysinh = new Date(cb.NGAY_SINH);
        $scope.backup = angular.copy(cb);
        toastr.success("Lưu thông tin cá nhân thành công", "HOÀN THÀNH");
      } else {
        toastr.error("Lưu thông tin cá nhân thất bại", "CÓ LỖI");
      }
    })
  }
})
angular.module("appForum").controller("avatarCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {

  $scope.upload = function(file) {
    if (file) {
      var reader = new FileReader();
      reader.onload = function(data) {
        $timeout(function() {
          $scope.$apply(function() {
            $scope.tk.USER.AVATAR = data.target.result;
          })
        })
      }
      reader.readAsDataURL(file);
    }
  }

  $scope.cancel = function() {
    $scope.tk = angular.copy($scope.backup);
  }


  $scope.saveTT = function(tk) {
      var ob = {
        ID: tk.USER.ID,
        AVATAR: tk.USER.AVATAR,
        TEN_HIEN_THI: tk.USER.TEN_HIEN_THI
      }
      callAPI.post("/user/update", ob, function(cb) {
        if (cb && cb.ID) {
          $scope.backup = angular.copy($scope.tk);
          $rootScope.user.AVATAR = ob.AVATAR ? ob.AVATAR : $rootScope.anhthaythe;
          toastr.success("Lưu thay đổi thành công", "HOÀN THÀNH");
        } else {
          toastr.error("Lưu thay đổi thất bại", "CÓ LỖI");
        }
      })
    }
    $scope.delAvatar = function(){
      $scope.tk.USER.AVATAR = null;
    }
})
angular.module("appForum").controller("matkhauCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  
  $scope.savePass = function(tk, check){
    if(!check && tk.matkhaunew == tk.matkhaurequired){
      var ob = {
        ID: $rootScope.user.ID,
        mkcu: tk.matkhau,
        mkmoi: tk.matkhaunew
      }
      callAPI.post("/user/change_pass", ob, function(res){
        if(res){
          if(res == "yes"){
            toastr.success("Thay đổi mật khẩu thành công !", "THÀNH CÔNG");
            $scope.cancel();
          }else{
            toastr.warning("Mật khẩu không đúng", "CẢNH BÁO");
          }
        }else{
          toastr.error("Không thể kết nối máy chủ", "CÓ LỖI");
        }
      })
    }
  }
  $scope.cancel = function(){
    $scope.tknew = {};
  }
})

angular.module("appForum").controller("matkhau2Ctrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  $scope.savePass = function(tk, check){
    if(!check && tk.matkhaunew == tk.matkhaurequired){
      var ob = {
        ID: $rootScope.user.ID,
        MAT_KHAU_2: tk.matkhau,
        MAT_KHAU_2_MOI: tk.matkhaunew
      }
      console.log(ob);
      callAPI.post("/ttbm/change_tt", ob, function(res){
        if(res){
          if(res == "yes"){
            toastr.success("Thay đổi mật khẩu 2 thành công !", "THÀNH CÔNG");
            $scope.cancel();
          }else{
            toastr.warning("Mật khẩu không đúng", "CẢNH BÁO");
          }
        }else{
          toastr.error("Không thể kết nối máy chủ", "CÓ LỖI");
        }
      })
    }
  }
  $scope.cancel = function(){
    $scope.tknew = {};
  }
})

angular.module("appForum").controller("cauhoiCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
  $scope.saveTT = function(tk, check){
    if(!check){
      var ob = {
        ID: $rootScope.user.ID,
        MAT_KHAU_2: tk.MAT_KHAU_2,
        CAU_HOI: tk.cauhoi.replace(/ /g, ""),
        TRA_LOI: tk.TRA_LOI
      }
      callAPI.post("/ttbm/change_tt", ob, function(res){
        if(res){
          if(res == "yes"){
            toastr.success("Thay đổi thành công !", "THÀNH CÔNG");
            $scope.cancel();
          }else{
            toastr.warning("Mật khẩu không đúng", "CẢNH BÁO");
          }
        }else{
          toastr.error("Không thể kết nối máy chủ", "CÓ LỖI");
        }
      })
    }
  }
  $scope.cancel = function(){
    $scope.qs = {};
  }
})

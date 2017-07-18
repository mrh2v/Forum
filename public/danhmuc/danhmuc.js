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
    var dmc = this;
    $scope.files = [{}];
    callAPI.get("/danhmuc/get_chi_tiet", { id: $state.params.id }, function(cb) {
        console.log(cb);
        if (cb && cb.DANH_MUC) {
            $timeout(function(){
              $rootScope.titles[1].name = cb.DANH_MUC.TEN_DANH_MUC;  
            })
            $scope.chude = cb.CHUDE;
            $scope.danhmuc = cb.DANH_MUC;
        }
    })

    $scope.createChuDe = function() {
        if (!$rootScope.user) {
            toastr.warning("Yêu cầu đăng nhập !!", "CẢNH BÁO")
        } else {
            $scope.creatDm = true;
        }
    }

    $scope.goChuDe = function(cd) {
        $state.go("home.chude", {id: cd.ID});
    }

    $scope.cancel = function() {
        $scope.creatDm = false;
    }

    $scope.saveChuDe = function(ob, check) {
        if (!check) {
            ob.ID_DANH_MUC = $scope.danhmuc.ID;
            ob.ID_USER = $rootScope.user.ID;
            callAPI.post("/chude/create", ob, function(res) {
                if(res && res.ID){
                  toastr.success("Đăng tải chủ đề thành công !!");
                  $state.reload();
                }else{
                   toastr.error("Đăng tải chủ đề thất bại !!");
                }
            })
        }
    }

    $scope.upload = function(file) {
        if (file) {
            var reader = new FileReader();
            reader.onload = function(data) {
                $timeout(function() {
                    $scope.$apply(function() {
                        var ob = {
                            name: file.name,
                            data: data.target.result
                        }
                        var len = $scope.files.length - 1;
                        if ($scope.files[len] && !$scope.files[len].url) {
                            $scope.files[len] = ob;
                        } else {
                            $scope.files.push(ob);
                        }
                    })
                })
            }
            reader.readAsDataURL(file);
        }
    }
    $scope.saveFile = function(index) {
        var ob = $scope.files[index];
        ob.id = $rootScope.user.ID;
        callAPI.post("/hethong/save_img", ob, function(cb) {
            if (cb && cb.status != 500) {
                $scope.files[index].url = cb;
                $scope.files.push({});
            } else {
                toastr.error('Không lấy đường dẫn file!');
            }
        })
    }

});
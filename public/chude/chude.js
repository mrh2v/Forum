angular.module("appForum").controller("chudeCtrl", function($scope, $rootScope, $state, toastr, callAPI, $filter, $timeout) {
    
	function callBinhLuan(id, offset, limit){
		callAPI.get("/binhluan/get_binhluan_by_chude", {offset: offset, limit: limit, id: id}, function(res){
			if(res){
				$scope.binhluans = res.data;
				console.log($scope.binhluans);
			}
		})
	}

    if ($state.params.id) {
        callAPI.get("/chude/get_by_id", { id: $state.params.id }, function(res) {
            if (res && res.ID) {
                $rootScope.titles[1].name = res.NHOM ? res.NHOM.TEN_DANH_MUC : "Không rõ";
                $rootScope.titles[2].name = res.TEN_CHU_DE;
                $scope.chude = res;
                $scope.nguoi_tao = res.NGUOI_TAO;
                if (!$scope.nguoi_tao.AVATAR) $scope.nguoi_tao.AVATAR = $rootScope.anhthaythe;
            }
        })
        callBinhLuan($state.params.id, 0, 5);
    }


    $scope.cancelComment = function() {
        $scope.replyContent = "";
    }

    $scope.files = [{}];


    $scope.saveComment = function(value) {
        var ob = {
            ID_CHU_DE: $scope.chude.ID,
            NOI_DUNG: value,
            ID_USER: $rootScope.user.ID
        }
        callAPI.post("/binhluan/create", ob, function(res) {
            if (res && res.ID) {
                toastr.success("Đăng tải bình luận thành công !!");
                // load trang cuối cùng
                $scope.replyContent = "";
                $scope.files = [{}];
            } else {
                toastr.error("Đăng tải bình luận thất bại !!");
            }
        })
    }
})
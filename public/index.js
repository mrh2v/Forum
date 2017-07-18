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
        .state('timmk', {
            url: '/lay-lai-mat-khau',
            templateUrl: 'timmatkhau/timmatkhau.html',
            controller: "timmkCtrl",
            controllerAs: "mk"
        })
        .state('login', {
            url: '/dang-nhap',
            params: { logined: false },
            templateUrl: 'dangnhap/dangnhap.html',
            controller: "dangnhapCtrl",
            controllerAs: "login"
        })

        .state('ttcn', {
            url: '/thiet-lap-ca-nhan',
            templateUrl: 'thongtincanhan/thongtincanhan.html',
            controller: 'ttcnCtrl',
            controllerAs: 'ttcn'
        })
        .state('ttcn.canhan', {
            url: '/thong-tin-ca-nhan',
            templateUrl: 'thongtincanhan/canhan.html',
            controller: 'cnCtrl',
            controllerAs: 'cn'
        })
        .state('ttcn.avatar', {
            url: '/anh-dai-dien',
            templateUrl: 'thongtincanhan/avatar.html',
            controller: 'avatarCtrl',
            controllerAs: 'cn'
        })
        .state('ttcn.matkhau1', {
            url: '/bao-mat',
            templateUrl: 'thongtincanhan/matkhau.html',
            controller: 'matkhauCtrl',
            controllerAs: 'cn'
        })
        .state('ttcn.matkhau2', {
            url: '/bao-mat-cap-cao',
            templateUrl: 'thongtincanhan/matkhau2.html',
            controller: 'matkhau2Ctrl',
            controllerAs: 'cn'
        })
        .state('ttcn.cauhoi', {
            url: '/cau-hoi-bi-mat',
            templateUrl: 'thongtincanhan/cauhoibimat.html',
            controller: 'cauhoiCtrl',
            controllerAs: 'cn'
        })

        .state('home', {
            url: '/trang-chu',
            templateUrl: 'trangchu/trangchu.html',
            controller: 'homeCtrl',
            controllerAs: 'home'
        })
        .state('home.danhmuc', {
            url: '/danh-muc/:id',
            templateUrl: 'danhmuc/danhmuc.html',
            controller: 'danhmucCtrl',
            controllerAs: 'dm',
            params: { danhmuc: null },
        })
        .state('home.dmc', {
            url: '/danh-muc-chi-tiet/:id',
            templateUrl: 'danhmuc/danhmucnho.html',
            controller: 'dmcCtrl',
            controllerAs: 'dmc',
            params: { danhmuc: null },
        })
        .state('home.chude', {
            url: '/thong-tin-chu-de/:id',
            templateUrl: 'chude/chude.html',
            controller: 'chudeCtrl',
            controllerAs: 'cd'
        })


});
app.run(function($state, $rootScope, $uibModal, callAPI, toastr) {

    callAPI.get("danhmuc/get_all", { heso: 0 }, function(res) {
        $rootScope.danhMucNar = res;
    })
    $rootScope.questions = ["Tên hồi nhỏ của bạn là gì ?", "Con vật bạn yêu thích nhất là gì ?", "Trường tiểu học bạn tên gì ?", "Bạn thân hồi nhỏ của bạn là ai?"];
    $rootScope.tinhs = [];
    $rootScope.anhthaythe = "/avatar.gif";
    $rootScope.logout = function() {
        $rootScope.user = null;
        if (typeof(Storage) !== "undefined") {
            localStorage.clear();
        }
        // $state.go('home');
    }
    $rootScope.tempisLogin = "temp-islogin.html";
    $rootScope.tempLogin = "tempLogin.html";
    $rootScope.setUser = function(user) {
        $rootScope.user = user;
        $rootScope.user.AVATAR = user.AVATAR ? user.AVATAR : "/avatar.gif";
        $rootScope.user.ten = user.TEN_HIEN_THI ? user.TEN_HIEN_THI : user.TEN_DANG_NHAP;
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("TEN_HIEN_THI", user.TEN_HIEN_THI ? user.TEN_HIEN_THI : user.TEN_DANG_NHAP);
            localStorage.setItem("QUYEN", user.QUYEN);
            localStorage.setItem("ID", user.ID);
            localStorage.setItem("AVATAR", user.AVATAR ? user.AVATAR : "/avatar.gif");
        }
    }

    $rootScope.login = function(tk) {
        callAPI.post("/user/login", tk, function(res) {
            if (res && res.ID) {
                toastr.success("Đăng nhập thành công !");
                $rootScope.setUser(res);
                if ($state.current.name == "register" || $state.current.name == "login") {
                    $state.go("home");
                } else {
                    // $state.reload();
                }
            } else if (res) {
                toastr.warning("Tài khoản hoặc mật khẩu không đúng !");
                $state.go("login", { logined: true })
            } else {
                toastr.error("Không có kết nối hệ thống", "LỖI !");
            }
        })
    }

    //KIEM TRA SECSSion Đang nhap
    if (typeof(Storage) !== "undefined") {
        if (localStorage.ID) {
            $rootScope.setUser(localStorage);
        }
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (toState.name) {
            if (toState.name.indexOf("ttcn") > -1) {
                $rootScope.titles = [{ name: 'Thiết lập', state: 'ttcn' }];
                var arr = toState.name.split(".");
                if (arr[1]) {
                    switch (arr[1]) {
                        case "canhan":
                            $rootScope.titles.push({ name: "Thông tin chi tiết", state: toState.name })
                            break;
                        case "cauhoi":
                            $rootScope.titles.push({ name: "Câu hỏi bí mật", state: toState.name })
                            break;
                        case "avatar":
                            $rootScope.titles.push({ name: "Ảnh đại diện", state: toState.name })
                            break;
                        case "matkhau1":
                            $rootScope.titles.push({ name: "Mật khẩu", state: toState.name })
                            break;
                        case "matkhau2":
                            $rootScope.titles.push({ name: "Mật khẩu an toàn", state: toState.name })
                            break;
                    }
                }
            } else if (toState.name == "register") {
                $rootScope.titles = [{ name: 'Đăng kí', state: toState.name }];
            } else if (toState.name == "login") {
                $rootScope.titles = [{ name: 'Đăng nhập', state: toState.name }];
            } else if (toState.name == "timmk") {
                $rootScope.titles = [{ name: 'Tìm mật khẩu', state: toState.name }];
            } else if (toState.name.indexOf("home") > -1) {
                $rootScope.titles = [{ name: 'Trang chủ', state: "home" }];
                $rootScope.hideHome = false;
                var arr = toState.name.split(".");
                if (arr[1]) {
                    $rootScope.hideHome = true;
                    switch (arr[1]) {
                        case "danhmuc":
                            $rootScope.titles.push({ name: ".....", state: toState.name })
                            if (toParams.danhmuc) $rootScope.titles[1].name = toParams.danhmuc;
                            break;
                        case "chude":
                            $rootScope.titles.push({ name: ".....", state: "home.danhmuc" });
                            $rootScope.titles.push({ name: ".....", state: toState.name });
                            break;
                        case "dmc":
                            $rootScope.titles.push({ name: ".....", state: toState.name })
                    }
                }
                /* switch (arr[1]) {
                   case "danhmuc":
                     $rootScope.titles.push({ name: ".....", state: toState.name })
                     if (toParams.danhmuc) $rootScope.titles[1].name = toParams.danhmuc;
                     break;
                   case "danhmuc":
                     $rootScope.titles.push({ name: ".....", state: toState.name })
                     if (toParams.danhmuc) $rootScope.titles[1].name = toParams.danhmuc;
                     break;
                 }*/
                // }
                /*if (arr[2]) {
                  switch (arr[1]) {
                    case "chude":
                      $rootScope.titles.push({ name: ".....", state: toState.name })
                      if (toParams.chude) $rootScope.titles[1].name = toParams.chude;
                      break;
                  }
                }*/
            }



            // else if (toState.name == "home") {
            //   $rootScope.titles = [{ name: 'Trang chủ', state: toState.name }];
            // } else if (toState.name == "danhmuc") {
            //   $rootScope.titles = [{ name: 'Danh mục', state: toState.name + "(" + JSON.stringify(toParams) + ")" }];
            // }
        }
    })

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

/*var a = [{"Type":1,"SolrID":"/tien-giang","ID":1,"Title":"Tiền Giang","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9809},{"Type":1,"SolrID":"/hung-yen","ID":2,"Title":"Hưng Yên","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":10456},{"Type":1,"SolrID":"/ha-noi","ID":3,"Title":"Hà Nội","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":236282},{"Type":1,"SolrID":"/tp-ho-chi-minh","ID":4,"Title":"TP Hồ Chí Minh","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":394142},{"Type":1,"SolrID":"/ca-mau","ID":5,"Title":"Cà Mau","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":10340},{"Type":1,"SolrID":"/dac-lac","ID":6,"Title":"Đắc Lắc","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":11172},{"Type":1,"SolrID":"/nam-dinh","ID":7,"Title":"Nam Định","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":10665},{"Type":1,"SolrID":"/quang-ninh","ID":8,"Title":"Quảng Ninh","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":17081},{"Type":1,"SolrID":"/dak-nong","ID":9,"Title":"Đắk Nông","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4718},{"Type":1,"SolrID":"/da-nang","ID":10,"Title":"Đà Nẵng","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":34738},{"Type":1,"SolrID":"/hai-duong","ID":11,"Title":"Hải Dương","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":14331},{"Type":1,"SolrID":"/long-an","ID":12,"Title":"Long An","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":17282},{"Type":1,"SolrID":"/ben-tre","ID":13,"Title":"Bến Tre","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":7309},{"Type":1,"SolrID":"/dong-thap","ID":14,"Title":"Đồng Tháp","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9557},{"Type":1,"SolrID":"/vinh-long","ID":15,"Title":"Vĩnh Long","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":6670},{"Type":1,"SolrID":"/kien-giang","ID":16,"Title":"Kiên Giang","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":14953},{"Type":1,"SolrID":"/tra-vinh","ID":17,"Title":"Trà Vinh","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":5026},{"Type":1,"SolrID":"/soc-trang","ID":18,"Title":"Sóc Trăng","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":6050},{"Type":1,"SolrID":"/bac-ninh","ID":19,"Title":"Bắc Ninh","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":15080},{"Type":1,"SolrID":"/thanh-hoa","ID":20,"Title":"Thanh Hoá","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":20950},{"Type":1,"SolrID":"/vung-tau","ID":21,"Title":"Vũng Tàu","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":18605},{"Type":1,"SolrID":"/dong-nai","ID":22,"Title":"Đồng Nai","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":36429},{"Type":1,"SolrID":"/binh-duong","ID":23,"Title":"Bình Dương","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":38946},{"Type":1,"SolrID":"/thai-nguyen","ID":24,"Title":"Thái Nguyên","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":8497},{"Type":1,"SolrID":"/thai-binh","ID":25,"Title":"Thái Bình","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9522},{"Type":1,"SolrID":"/can-tho","ID":26,"Title":"Cần Thơ","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":17197},{"Type":1,"SolrID":"/nghe-an","ID":27,"Title":"Nghệ An","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":19978},{"Type":1,"SolrID":"/hue","ID":28,"Title":"Huế","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9942},{"Type":1,"SolrID":"/binh-phuoc","ID":29,"Title":"Bình Phước","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9429},{"Type":1,"SolrID":"/quang-nam","ID":30,"Title":"Quảng Nam","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":11707},{"Type":1,"SolrID":"/quang-ngai","ID":31,"Title":"Quảng Ngãi","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9182},{"Type":1,"SolrID":"/ninh-thuan","ID":32,"Title":"Ninh Thuận","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4197},{"Type":1,"SolrID":"/lao-cai","ID":33,"Title":"Lào Cai","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":5943},{"Type":1,"SolrID":"/hai-phong","ID":34,"Title":"Hải Phòng","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":39381},{"Type":1,"SolrID":"/an-giang","ID":35,"Title":"An Giang","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":11665},{"Type":1,"SolrID":"/phu-tho","ID":36,"Title":"Phú Thọ","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":8692},{"Type":1,"SolrID":"/tay-ninh","ID":37,"Title":"Tây Ninh","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":10193},{"Type":1,"SolrID":"/khanh-hoa","ID":38,"Title":"Khánh Hòa","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":19235},{"Type":1,"SolrID":"/phu-yen","ID":39,"Title":"Phú Yên","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":5760},{"Type":1,"SolrID":"/hoa-binh","ID":40,"Title":"Hòa Bình","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":5723},{"Type":1,"SolrID":"/tuyen-quang","ID":41,"Title":"Tuyên Quang","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":3367},{"Type":1,"SolrID":"/lai-chau","ID":42,"Title":"Lai Châu","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":2836},{"Type":1,"SolrID":"/hau-giang","ID":43,"Title":"Hậu Giang","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4975},{"Type":1,"SolrID":"/lam-dong","ID":44,"Title":"Lâm Đồng","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":13536},{"Type":1,"SolrID":"/lang-son","ID":45,"Title":"Lạng Sơn","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":5078},{"Type":1,"SolrID":"/ha-nam","ID":46,"Title":"Hà Nam","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":6133},{"Type":1,"SolrID":"/bac-can","ID":47,"Title":"Bắc Cạn","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":2337},{"Type":1,"SolrID":"/binh-dinh","ID":48,"Title":"Bình Định","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":12674},{"Type":1,"SolrID":"/cao-bang","ID":49,"Title":"Cao Bằng","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":3330},{"Type":1,"SolrID":"/son-la","ID":50,"Title":"Sơn La","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4914},{"Type":1,"SolrID":"/quang-binh","ID":51,"Title":"Quảng Bình","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":7394},{"Type":1,"SolrID":"/quang-tri","ID":52,"Title":"Quảng Trị","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":6393},{"Type":1,"SolrID":"/gia-lai","ID":53,"Title":"Gia Lai","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":8511},{"Type":1,"SolrID":"/bac-giang","ID":54,"Title":"Bắc Giang","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9673},{"Type":1,"SolrID":"/ha-tinh","ID":55,"Title":"Hà Tĩnh","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":9508},{"Type":1,"SolrID":"/ninh-binh","ID":56,"Title":"Ninh Bình","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":6883},{"Type":1,"SolrID":"/binh-thuan","ID":57,"Title":"Bình Thuận","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":10069},{"Type":1,"SolrID":"/kon-tum","ID":58,"Title":"Kon Tum","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4316},{"Type":1,"SolrID":"/vinh-phuc","ID":59,"Title":"Vĩnh Phúc","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":10901},{"Type":1,"SolrID":"/bac-lieu","ID":60,"Title":"Bạc Liêu","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4942},{"Type":1,"SolrID":"/yen-bai","ID":61,"Title":"Yên Bái","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4491},{"Type":1,"SolrID":"/dien-bien","ID":62,"Title":"Điện Biên","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":2983},{"Type":1,"SolrID":"/ha-giang","ID":63,"Title":"Hà Giang","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":4339},{"Type":1,"SolrID":"/chua-ro","ID":64,"Title":"Chưa rõ","STT":0,"Created":null,"Updated":null,"TotalDoanhNghiep":61810}];
var b = [];
for(var i in a){

}*/
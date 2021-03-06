var express = require('express');
var router = express.Router();
var path = require("path");
var moment = require("moment");
var path = require('path');
var fs = require("fs");
var async = require("async");
var mkdirp = require('mkdirp');
var sequelize = require('../models');

var USER = sequelize.import('../models/user.js');
var BINHLUAN = sequelize.import('../models/binhluan.js');
var CHUDE = sequelize.import('../models/chude.js');
var DANHMUC = sequelize.import('../models/danhmuc.js');
var TTBM = sequelize.import('../models/ttbaomat.js');
var TTCN = sequelize.import('../models/ttcanhan.js');

/*tạo ràng buộc dữ liệu*/

TTCN.belongsTo(USER, { foreignKey: 'ID_USER', as: "USER" });

TTBM.belongsTo(USER, { foreignKey: 'ID_USER', as: "USER" });

DANHMUC.belongsTo(USER, { foreignKey: 'ID_USER', as: "NGUOI_TAO" });

CHUDE.belongsTo(DANHMUC, { foreignKey: 'ID_DANH_MUC', as: "NHOM" });

CHUDE.belongsTo(USER, { foreignKey: 'ID_USER', as: "NGUOI_TAO" });

BINHLUAN.belongsTo(CHUDE, { foreignKey: 'ID_CHU_DE', as: "CHUDE" });

BINHLUAN.belongsTo(USER, { foreignKey: 'ID_USER', as: "USER" });

/*điều hướng service dịch vụ trả dữ liệu json*/

router.post("/binhluan/create", function(req, res, next) {
    var body = req.body;
    body.THOI_GIAN = new Date();
    BINHLUAN.create(body).then(function(bl) {
        res.send(bl);
    }).catch(next);
})

router.get("/binhluan/get_binhluan_by_chude", function(req, res, next) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    offset = parseInt(offset) < 0 ? 0 : parseInt(offset);
    limit = parseInt(limit);
    if (!req.query.offset || !req.query.limit || isNaN(offset) || isNaN(limit) || limit > 100) {
        return res.sendStatus(403);
    }
    var id = req.query.id;
    var kq = {}
    BINHLUAN.count({
        where: {
            ID_CHU_DE: id
        }
    }).then(function(sl) {
        kq.length = sl;
        console.log(sl);
        BINHLUAN.findAll({
            where: {
                ID_CHU_DE: id
            },
            include: [{ model: USER, as: "USER" }],
            order: [
                ["THOI_GIAN", "ASC"]
            ],
            offset: offset,
            limit: limit
        }).then(function(bls) {
            kq.data = bls;
            res.send(kq);
        }).catch(next)
    }).catch(next)
})

router.get("/chude/get_all", function(req, res, next) {
    CHUDE.findAll({
        include: [{ model: DANHMUC, as: "NHOM" }]
    }).then(function(chudes) {
        res.send(chudes);
    }).catch(next)
})

router.post("/hethong/save_img", function(req, res, next) {
    var file = req.body;
    var folder = new Date().getTime();
    var data = null;
    try {
        data = file.data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        mkdirp(path.join(__dirname, "/..") + "/upload/" + file.id + "/" + folder, function(err) {
            if (err) res.sendStatus(500);
            var url = path.join(__dirname, "/..") + "/upload/" + file.id + "/" + folder + "/" + file.name;
            fs.writeFile(url, new Buffer(data[2], "base64"), function(err) {
                if (err) res.sendStatus(500);
                res.send("/" + file.id + "/" + folder + "/" + file.name);
            })
        })
    } catch (err) {
        res.sendStatus(500);
    }
})

/*CHU DE*/
router.post("/chude/create", function(req, res, next) {
    var body = req.body;
    body.THOI_GIAN = new Date();
    body.SL_XEM = 0;
    body.SL_THICH = 0;
    CHUDE.create(body).then(function(cd) {
        res.send(cd);
    }).catch(next)
})
router.get("/chude/get_by_id", function(req, res, next) {
    var id = req.query.id;
    CHUDE.findOne({
        where: {
            ID: id
        },
        include: [{ model: DANHMUC, as: "NHOM" },
            { model: USER, as: "NGUOI_TAO" }
        ]
    }).then(function(chude) {
        res.send(chude);
    }).catch(next)
})

router.get("/chude/get_sl_by_dm_all", function(req, res, next) {
    DANHMUC.findAll({
        where: {
            HE_SO: 1
        }
    }).then(function(dms) {
        var kq = {};
        async.eachSeries(dms, function(dm, callback) {
            CHUDE.count({
                where: {
                    ID_DANH_MUC: dm.dataValues.ID
                }
            }).then(function(sl) {
                kq[dm.dataValues.ID] = sl;
                callback();
            }).catch(next);
        }, function(done) {
            res.send(kq);
        })
    }).catch(next);
})

router.get("/danhmuc/get_chi_tiet", function(req, res, next) {
    var id = req.query.id;
    var kq = {};
    DANHMUC.findOne({
        where: {
            ID: id
        }
    }).then(function(dm) {
        if (!dm || !dm.dataValues.ID) return res.sendStatus(404);
        kq.DANH_MUC = dm;
        CHUDE.findAll({
            where: {
                ID_DANH_MUC: dm.dataValues.ID,
            },
            order: [
                ["THOI_GIAN", "DESC"]
            ],
            include: [{ model: USER, as: "NGUOI_TAO", attributes: ["ID", "TEN_DANG_NHAP"] }]
        }).then(function(cds) {
            kq.CHUDE = [];
            async.eachSeries(cds, function(cd, call) {
                BINHLUAN.findAll({
                    where: {
                        ID_CHU_DE: cd.dataValues.ID
                    },
                    order: [
                        ["THOI_GIAN", "DESC"]
                    ],
                    include: [{ model: USER, as: "USER", attributes: ["ID", "TEN_DANG_NHAP"] }]
                }).then(function(bl) {
                    cd.dataValues.BINH_LUAN_MOI = bl[0];
                    cd.dataValues.SO_BL = bl.length;
                    kq.CHUDE.push(cd);
                    call();
                }).catch(next);
            }, function(done) {
                res.send(kq)
            })
        }).catch(next)
    }).catch(next)
})

router.get("/chude/get_by_id_all", function(req, res, next) {
    var id = req.query.id;
    var kq = {};
    DANHMUC.findOne({
        where: {
            ID: id
        }
    }).then(function(dm) {
        kq.DANH_MUC = dm;
        DANHMUC.findAll({
            where: {
                ID_DM_CHA: dm.dataValues.ID
            }
        }).then(function(dms) {
            var dmc = [];
            async.eachSeries(dms, function(item, call) {
                CHUDE.findAll({
                    where: {
                        ID_DANH_MUC: item.dataValues.ID
                    },
                    order: [
                        ["THOI_GIAN", "DESC"]
                    ]
                }).then(function(cds) {
                    item.dataValues.baiviet = cds.length;
                    item.dataValues.BAI_VIET_MOI = cds[0];
                    var arrbl = [];
                    for (var i in cds) {
                        arrbl.push(cds[i].dataValues.ID);
                    }
                    BINHLUAN.findAll({
                        where: {
                            ID_CHU_DE: {
                                $in: arrbl
                            }
                        },
                        order: [
                            ["THOI_GIAN", "DESC"]
                        ]
                    }).then(function(sl) {
                        item.dataValues.binhluan = sl.length;
                        item.dataValues.BINH_LUAN_MOI = sl[0];
                        dmc.push(item);
                        call();
                    }).catch(next)
                }).catch(next);
            }, function(done) {
                kq.DMC = dmc;
                res.send(kq);
            })
        }).catch(next);
    }).catch(next)
})


/*DANH MUC*/
router.get("/danhmuc/get_all", function(req, res, next) {
    var hienthi = req.query.hienthi;
    var heso = req.query.heso;
    var dk = {
        order: [
            ["THU_TU", "ASC"]
        ],
    };
    if (hienthi) {
        dk.where = {
            HIEN_THI: true
        }
    }
    if (heso) {
        if (!dk.where) dk.where = {};
        dk.where.HE_SO = heso
    }
    DANHMUC.findAll(dk).then(function(dms) {
        res.send(dms);
    }).catch(next)
})

router.post("/danhmuc/create", function(req, res, next) {
    var dm = req.body;
    DANHMUC.create(dm).then(function(danhmuc) {
        res.send(danhmuc);
    }).catch(next)
})

router.get("/danhmuc/get_by_id", function(req, res, next) {
    var id = req.query.id;
    DANHMUC.findOne({
        where: {
            ID: id
        },
        include: [{ model: USER, as: "NGUOI_TAO" }]
    }).then(function(dm) {
        res.send(dm)
    }).catch(next)
})

/*TTBM*/
router.post("/ttbm/change_tt", function(req, res, next) {
    var body = req.body;
    TTBM.findOne({
        where: {
            ID_USER: body.ID,
            MAT_KHAU_2: body.MAT_KHAU_2
        }
    }).then(function(bm) {
        if (bm && bm.dataValues.ID) {
            var ob = {
                ID: bm.dataValues.ID
            }
            if (body.MAT_KHAU_2_MOI) {
                ob.MAT_KHAU_2 = body.MAT_KHAU_2_MOI;
            }
            if (body.CAU_HOI) {
                ob.CAU_HOI = body.CAU_HOI;
            }
            if (body.TRA_LOI) {
                ob.TRA_LOI = body.TRA_LOI;
            }
            TTBM.update(ob, {
                where: {
                    ID: ob.ID
                }
            }).then(function(value) {
                res.send("yes");
            }).catch(next)
        } else {
            res.send("no");
        }
    }).catch(next)
})

/*USER*/
router.post("/user/check_cauhoi", function(req, res, next) {
    var body = req.body;
    USER.findOne({
        where: {
            TEN_DANG_NHAP: body.TEN_DANG_NHAP
        }
    }).then(function(user) {
        if (user && user.dataValues.ID) {
            TTBM.findOne({
                where: {
                    ID_USER: user.dataValues.ID,
                    CAU_HOI: body.CAU_HOI,
                    TRA_LOI: body.TRA_LOI
                }
            }).then(function(bm) {
                res.send(bm);
            }).catch(next);
        } else {
            res.send("tk");
        }
    }).catch(next)
})
router.post("/user/check_taikhoan", function(req, res, next) {
    var body = req.body;
    USER.findOne({
        where: {
            TEN_DANG_NHAP: body.TEN_DANG_NHAP
        }
    }).then(function(user) {
        if (user && user.dataValues.ID) {
            TTBM.findOne({
                where: {
                    ID_USER: user.dataValues.ID,
                    MAT_KHAU_2: body.MAT_KHAU
                }
            }).then(function(bm) {
                res.send(bm);
            }).catch(next);
        } else {
            res.send("tk");
        }
    }).catch(next)
})
router.post("/user/change_pass", function(req, res, next) {
    var body = req.body;
    var dk = {
        ID: body.ID
    }
    if (body.mkcu) {
        dk.MAT_KHAU = body.mkcu;
    }
    USER.findOne({
        where: dk,
        attributes: ["ID"]
    }).then(function(tk) {
        if (tk && tk.dataValues.ID) {
            var ob = {
                ID: tk.dataValues.ID,
                MAT_KHAU: body.mkmoi
            }
            USER.update(ob, {
                where: {
                    ID: ob.ID
                }
            }).then(function(u) {
                res.send("yes");
            }).catch(next)
        } else {
            res.send("no");
        }
    }).catch(next)
})
router.get("/ttcn/get_by_user", function(req, res, next) {
    var id = req.query.id_user;
    TTCN.findOne({
        where: {
            ID_USER: id
        },
        attributes: ["ID", "HO_TEN", "NGAY_SINH", "QUE_QUAN", "EMAIL", "SO_CMND", "SO_DT"],
        include: [{ model: USER, as: "USER" }]
    }).then(function(tt) {
        res.send(tt);
    }).catch(next);
})

router.post("/user/create", function(req, res, next) {
    var user = req.body;
    user.THOI_GIAN_TAO = new Date();
    USER.create(user).then(function(u) {
        res.send(u);
    }).catch(next)
})
router.post("/user/update", function(req, res, next) {
    var user = req.body;
    USER.findOne({
        where: { ID: user.ID }
    }).then(function(ob) {
        USER.update(user, {
            where: {
                ID: ob.ID
            }
        }).then(function(u) {
            res.send(user);
        }).catch(next)
    }).catch(next)
})

router.post("/user/login", function(req, res, next) {
    var user = req.body;
    USER.findOne({
        where: {
            TEN_DANG_NHAP: user.username,
            MAT_KHAU: user.password
        }
    }).then(function(u) {
        if (u) {
            res.send(u);
        } else {
            res.send("no")
        }
    }).catch(next)
})

router.post("/user/check_tk", function(req, res, next) {
    var tk = req.body;
    USER.findOne({
        where: {
            TEN_DANG_NHAP: tk.name
        },
        attributes: ["ID"]
    }).then(function(tk) {
        if (tk && tk.dataValues.ID) {
            res.send("no");
        } else {
            res.send("yes");
        }
    }).catch(next);
})


router.post("/user/register", function(req, res, next) {
    var body = req.body;
    var tk = {
        TEN_DANG_NHAP: body.TEN_DANG_NHAP,
        MAT_KHAU: body.MAT_KHAU,
        QUYEN: 1,
        THOI_GIAN_TAO: new Date()
    }
    var baomat = {
        CAU_HOI: body.CAU_HOI,
        TRA_LOI: body.TRA_LOI,
        MAT_KHAU_2: body.MAT_KHAU_2
    }
    var canhan = {
        HO_TEN: body.HO_TEN,
        NGAY_SINH: body.NGAY_SINH,
        QUE_QUAN: body.QUE_QUAN,
        SO_CMND: body.SO_CMND,
        SO_DT: body.SO_DT,
        EMAIL: body.EMAIL
    }
    USER.create(tk).then(function(user) {
        if (user && user.dataValues && user.dataValues.ID) {
            async.parallel([
                    function(callback) {
                        canhan.ID_USER = user.dataValues.ID;
                        TTCN.create(canhan).then(function(cn) {
                            callback(null, cn)
                        })
                    },
                    function(callback) {
                        baomat.ID_USER = user.dataValues.ID;
                        TTBM.create(baomat).then(function(bm) {
                            callback(null, bm);
                        })
                    }
                ],
                function(err, results) {
                    if (err) return res.sendStatus(500);
                    var ob = user.dataValues;
                    ob.QUE_QUAN = canhan.QUE_QUAN;
                    ob.NGAY_SINH = canhan.NGAY_SINH;
                    res.send(ob);
                });
        } else {
            res.sendStatus(500);
        }
    }).catch(next);
})

/*TTCN*/
router.post("/ttcn/update", function(req, res, next) {
    var tt = req.body;
    TTCN.findOne({
        where: { ID: tt.ID }
    }).then(function(ob) {
        TTCN.update(tt, {
            where: {
                ID: ob.ID
            }
        }).then(function(thongtin) {
            res.send(tt);
        }).catch(next)
    }).catch(next)
})


/*router.get("/trang-chu/get-tin", function(req, res, next) {
  nhom.findAll({
    where: {
      HIEN_THI: 1
    }
  }).then(function(nhoms) {
    var kq = [];
    async.eachSeries(nhoms, function(nhom, callback) {
      if (nhom && nhom.dataValues.ID) {
        tintuc.findAll({
          where: {
            ID_LOAI_TIN: nhom.dataValues.ID
          },
          offset: 0,
          limit: 6,
          order: [
            ["THOI_GIAN", "DESC"]
          ],
          attributes: ["ID", "TIEU_DE", "NOI_DUNG_TT", "THOI_GIAN", "ANH_TD", "ID_LOAI_TIN"]
        }).then(function(tins) {
          var ob = {
            TEN_NHOM: nhom.dataValues.TEN_NHOM,
            ID: nhom.dataValues.ID,
            TINTUC: tins
          }
          kq.push(ob);
          callback();
        })
      } else {
        callback();
      }
    }, function done() {
      // ket qua
      res.send(kq);
    })
  }).catch(next);
})*/




module.exports = router;
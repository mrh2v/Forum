var express = require('express');
var router = express.Router();
var path = require("path");
var moment = require("moment");
var path = require('path');
var fs = require("fs");
var async = require("async");
var mkdirp = require('mkdirp');
var sequelize = require('../models');

var BINHLUAN = sequelize.import('../models/binhluan.js');
var CHUDE = sequelize.import('../models/chude.js');
var DANHMUC = sequelize.import('../models/danhmuc.js');
var TTBM = sequelize.import('../models/ttbaomat.js');
var TTCN = sequelize.import('../models/ttcanhan.js');
var USER = sequelize.import('../models/user.js');

/*tạo ràng buộc dữ liệu*/

TTCN.belongsTo(USER, { foreignKey: 'ID_USER', as: "CN" });
TTBM.belongsTo(USER, { foreignKey: 'ID_USER', as: "BM" });
DANHMUC.belongsTo(USER, { foreignKey: 'ID_USER', as: "DM" });
CHUDE.belongsTo(DANHMUC, { foreignKey: 'ID_DANH_MUC', as: "NHOM" });
CHUDE.belongsTo(USER, { foreignKey: 'ID_USER', as: "TGIA" });
BINHLUAN.belongsTo(CHUDE, { foreignKey: 'ID_CHU_DE', as: "CD" });
BINHLUAN.belongsTo(USER, { foreignKey: 'ID_USER', as: "NGUOIDANG" });

/*điều hướng service dịch vụ trả dữ liệu json*/

router.get("/chude/get_all", function(req, res, next) {
  CHUDE.findAll({
    include: [{ model: DANHMUC, as: "NHOM" }]
  }).then(function(chudes) {
    res.send(chudes);
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


/*USER*/
router.post("/user/create", function(req, res, next) {
  var user = req.body;
  user.THOI_GIAN_TAO = new Date();
  USER.create(user).then(function(u) {
    res.send(u);
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

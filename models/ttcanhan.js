module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TTCANHAN', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_USER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    HO_TEN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    NGAY_SINH: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    QUE_QUAN: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SO_CMND: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SO_DT: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    EMAIL: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'TT_CA_NHAN',
    freezeTableName: true,
    timestamps: false,
  });
};

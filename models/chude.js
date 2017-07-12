module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CHUDE', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_DANH_MUC: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    TEN_CHU_DE: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    NOI_DUNG: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    ID_USER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SL_THICH: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    SL_XEM: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DS_THICH: {
      type : DataTypes.TEXT('medium'),
      allowNull: true
    },
    THOI_GIAN: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'CHU_DE',
    freezeTableName: true,
    timestamps: false,
  });
};

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BINHLUAN', {
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
    NOI_DUNG: {
      type: DataTypes.TEXT("medium"),
      allowNull: false
    },
    ID_CHU_DE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    CAM_ON: {
      type: DataTypes.TEXT("medium"),
      allowNull: true
    },
    THOI_GIAN: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'BINH_LUAN',
    freezeTableName: true,
    timestamps: false,
  });
};

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DANHMUC', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    ID_DM_CHA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TEN_DANH_MUC: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    HE_SO: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ID_USER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    THU_TU: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    HIEN_THI: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'DANH_MUC',
    freezeTableName: true,
    timestamps: false,
  });
};

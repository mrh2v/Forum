module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TTBAOMAT', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    CAU_HOI: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    TRA_LOI: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ID_USER: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    MAT_KHAU_CAP_2: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'TT_BAO_MAT',
    freezeTableName: true,
    timestamps: false,
  });
};

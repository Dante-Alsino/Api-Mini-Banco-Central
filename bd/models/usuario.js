module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      tableName: 'usuarios'
    });
  
    Usuario.associate = function(models) {
      Usuario.hasMany(models.Conta, { foreignKey: 'usuarioId' });
    };
  
    return Usuario;
  };
  
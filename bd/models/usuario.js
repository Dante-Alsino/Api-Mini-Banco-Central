module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'Usuarios' // atenção ao nome da tabela aqui
  });

  Usuario.associate = function(models) {
    Usuario.hasMany(models.Conta, { foreignKey: 'usuarioId' });
  };

  return Usuario;
};

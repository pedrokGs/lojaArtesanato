const Sequelize = require ("sequelize");
const connection = require("./database");

const Produto = connection.define('produtos',{
    nome:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    preco:{
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    imagem:{
        type: Sequelize.BLOB,
        allowNull: false
    }
})

Produto.sync({force: false});

module.exports = Produto;
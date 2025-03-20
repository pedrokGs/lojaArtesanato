const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Produto = require("./database/Produto");
const { where } = require("sequelize");


//Database

connection
    .authenticate()
    .then(() => {
        console.log("Conexão bom BD feita com sucesso!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Rotas
app.get("/", (req, res) => {
    Produto.findAll({
        raw: true, order: [
            ["id", 'ASC'] //ASC = Crescente || DESC = decrescente 
        ]
    }).then(produtos => {
        res.render("index", { produtos: produtos });
    });
});

app.get("/cadastrar", (req, res) => {
    res.render("cadastrar");
});

app.post("/cadastrarProduto", (req, res) => {

    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var preco = req.body.preco;
    var imagemUrl = req.body.imagemUrl;

    Produto.create({
        nome: nome,
        descricao: descricao,
        preco: preco,
        imagemUrl: imagemUrl
    }).then(() => {
        res.redirect("/");
    })
})

app.get("/catalogo", (req, res) => {
    Produto.findAll({
        raw: true, order: [
            ["id", 'DESC'] //ASC = Crescente || DESC = decrescente 
        ]
    }).then(produtos => {
        res.render("catalogo", { produtos: produtos });
    });
});

app.get("/catalogo/:id", (req, res) => {
    var id = req.params.id;
    Produto.findOne({
        where: { id: id }
    }).then(produto => {
        if (produto != undefined) { //produto 
            res.render("produto", {
                produto: produto,
            })
        } else {//Não 
            res.redirect("/")
        }
    })
})

/*
app.post("/salvarResposta", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId);
    });
})
*/
app.listen(4000, () => { console.log("App rodando!"); });
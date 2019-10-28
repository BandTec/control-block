// app.js é a página onde faz a conexão com todos os modulos, cada um desses modulos são utilizados na conexão
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// as váriaveis abaixo são as páginas onde ocorrem as conexão com as informações com o banco de dados 
// require, primeiramente ele interpreta o código o que faz o módulo importar e chamar a sí próprio e ao final require retorna a função atribuida ao exports. 
var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/usuarios');
var leiturasRouter = require('./routes/leituras');
var dadosRouter = require('./routes/dados');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// para que a conexão funcione todos os arquivos precisam estar em uma pasta 'publica' por isso o nome 'public' para a pasta do site
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/leituras', leiturasRouter);
app.use('/dados', dadosRouter);
app.use('/regEnd', endRouter);
// por favor não mexer em nenhum dos modulos "module export" é onde são exportadas todas as informações do nosso banco
module.exports = app;
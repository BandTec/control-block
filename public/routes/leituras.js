// não mexa nestas 3 linhas!
var express = require("express");
var router = express.Router();
var banco = require("../../app-banco");
// não mexa nessas 3 linhas!
// aqui acontece os registros das últimas leiturass
router.get("/ultimas", function(req, res, next) {
  console.log(banco.conexao);
  banco
    .conectar()
    .then(pool => {
      var limite_linhas = 1;
      return pool.request().query(`SELECT TOP ${limite_linhas} 
                            tipo_sensor,
                            hora_evento,
                            evento,
                            data_evento
                            from EVENTOS order by idEventos DESC`);
    })
    .then(consulta => {
      // o formato da hora é HH: Hora com 2 dígitos  MM: Minutos com 2 dígitos  SS: Segundos com 2 dígitos, selecionar os dados de forma descrecente
      // é considerado o melhor jeito porque pega os últimos registros considerando que a intenção é pegar os últimos registros
      console.log(
        `Resultado da consulta: ${JSON.stringify(consulta.recordset)}`
      );
      res.send(consulta.recordset);
    })
    .catch(err => {
      var erro = `Erro na leitura dos últimos registros: ${err}`;
      console.error(erro);
      res.status(500).send(erro);
    })
    .finally(() => {
      banco.sql.close();
    });
});

// dados em tempo real
router.get("/tempo-real", function(req, res, next) {
  console.log(banco.conexao);

  var estatisticas = {
    Entrada: 0,
    Saida: 0
  };

  banco
    .conectar()
    .then(() => {
      return banco.sql.query(`SELECT TOP ${limite_linhas} 
      tipo_sensor,
      hora_evento,
      evento,
      data_evento
      from EVENTOS order by idEventos DESC`);
    })
    .then(consulta => {
      // "select top" limita as linhas retornadas em um conjunto de resultados que começão em 1, em ordem descrecente dos dados das estastiticas

      estatisticas.Entrada = consulta.recordset[0].Entrada;
      estatisticas.saida = consulta.recordset[0].saida;
      console.log(`Tempo real: ${JSON.stringify(estatisticas)}`);

      res.send(estatisticas);
    })
    .catch(err => {
      var erro = `Erro na leitura dos registros de tempo real: ${err}`;
      console.error(erro);
      res.status(500).send(erro);
    })
    .finally(() => {
      banco.sql.close();
    });
});

// por favor não mexer em nenhum dos modulos "module export" é onde são exportadas todas as informações do nosso banco
module.exports = router;

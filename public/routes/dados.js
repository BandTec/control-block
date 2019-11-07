var express = require('express');
var router = express.Router();
var banco = require('../../app-banco');

// O router de estatisticas é aonde iremos fazer a conexão para as estatiscas dos gráficos 
//então todas as informações de entrada e saída precisam estar aqui
router.get('/estatisticas', function(req, res, next) {
    console.log(banco.conexao);

    var estatisticas = {
        // aqui voce coloca como inicia a coleta dos dados ou seja começa = 0 mas de acordo com o nome das colunass
        //entrada: 0,
        //saída: 0,
    };

    banco.conectar().then(pool => {
        return pool.request().query(`
          select 
          max(tipo_sensor_entrada), 
          min(tipo_sensor_entrada), and
          max(tipo_sensor_saida), 
          min(tipo_sensor_saida),
          from eventos
          `);
        // aqui é a consulta, ou seja onde ele faz o calculo das estatisticas
    }).then(consulta => {
        // estatisticas.entrada = consulta.recordset[0].entradas;
        //estatisticas.saida = consulta.recordset[0].saida;
        console.log(`Estatísticas: ${JSON.stringify(estatisticas)}`);
        res.send(estatisticas);
    }).catch(err => {

        var erro = `Erro na leitura dos últimos registros: ${err}`;
        console.error(erro);
        res.status(500).send(erro);

    }).finally(() => {
        banco.sql.close();
    });

});


// por favor não mexer em nenhum dos modulos "module export" é onde são exportadas todas as informações do nosso banco
module.exports = router;
// provavelmente o modulo onde mais vão encontrar dificuldades, "usuarios.js" é onde acontece a conexão com os dados do cadastro e login
// de todos o mais extenso

// não mexa nestas 3 linhas!
var express = require("express");
var router = express.Router();
var banco = require("../../app-banco");
// não mexa nessas 3 linhas!

// aqui são as variáveis das informações necessárias dos usuários
var nome_completo, nome_usuario, email, senha;

router.post("/cadastro", function (req, res, next) {
  banco
    .conectar()
    .then(pool => {
      console.log(`Chegou para cadastro: ${JSON.stringify(req.body)}`);
      // "req.body" são os dados de uma requisão os dados depois do . do body são os dados que estão no html do cadastro o (name) do cadastro
      // é semelhante ao "id" mas a conexão não funciona com "id" apenas com "name"
      nome_completo = req.body.nome_completo;
      nome_usuario = req.body.nome_usuario;
      email = req.body.email_cad;
      senha = req.body.senha_cad;

      if (nome_completo == "" || nome_usuario == "" || email == "" || senha == "") {
        console.log(
          `Dados do cadastro não chegaram completos: ${nome_completo} / ${nome_usuario} / ${email} / ${senha}`
        );
        return;
      }
      return pool
        .request()
        .query(
          `SELECT COUNT(*) FROM GERENTES WHERE email_gerente='${email}';`
        );
      // aqui é onde ele insere os dados do usuario o nome etc
    })
    .then(consulta => {
      banco
        .conectar()
        .then(pool => {
          if (consulta.recordset[0].qtd == 1) {
            res.send(false);
          } else {
            pool.request()
              .query(`INSERT INTO GERENTES (nome_gerente, usuario_gerente, email_gerente, senha_gerente)
                VALUES('${nome_completo}', '${nome_usuario}', '${email}', '${senha}');`);
          }
          return pool
            .request()
            .query(
              `SELECT idgerente FROM GERENTES WHERE nome_gerente = '${nome_usuario}';`
            );
        })
        .then(consulta => {
          if (consulta.recordset.length == 1) {
            res.send(consulta.recordset[0]);
          } else {
            res.send(false);
          }
        });
    })
    .catch(err => {
      var erro = `Erro no cadastro: ${err}`;
      console.error(erro);
      res.status(500).send(erro);
    })
    .finally(() => {
      banco.sql.close();
    });
});
// para a conexão do login é bem mais complexo, porque assim que iniciado o login todos os dados que petendemos exibir para o usuário
// tem que estar aqui

var login, senha;

router.post("/entrar", function (req, res, next) {
  banco
    .conectar()
    .then(pool => {
      console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
      login = req.body.nome_login;
      senha = req.body.senha_login;
      if (login == "" || senha == "") {
        throw new Error(
          `Dados de login não chegaram completos: ${login} / ${senha}`
        );
      }
      return pool
        .request()
        .query(
          `SELECT usuario_gerente, email_gerente, senha_gerente FROM GERENTES WHERE usuario_gerente='${login}' OR email_gerente='${login}' AND senha_gerente='${senha}';`
        );
    })
    .then(consulta => {
      console.log(
        `Usuários encontrados: ${JSON.stringify(consulta.recordset)}`
      );

      if (consulta.recordset.length > 0) {
        res.send(consulta.recordset);
      } else {
        banco
          .conectar()
          .then(pool => {
            return pool
              .request()
              .query(
                `SELECT usuario_gerente, email_gerente, senha_gerente FROM GERENTES WHERE usuario_gerente='${login}' OR email_gerente='${login}' AND senha_gerente='${senha}';`
              );
          })
          .then(consulta => {
            console.log(
              `Usuários encontrados: ${JSON.stringify(consulta.recordset)}`
            );
            if (consulta.recordset.length > 0) {
              res.send(consulta.recordset);
            } else {
              res.send(false);
              res.sendStatus(404);
            }
          });
      }
    })
    .catch(err => {
      var erro = `Erro no login: ${err}`;
      console.error(erro);
      res.status(500).send(erro);
    })
    .finally(() => {
      banco.sql.close();
    });
});

// por favor não mexer em nenhum dos modulos "module export" é onde são exportadas todas as informações do nosso banco
module.exports = router;

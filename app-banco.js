// a variável sempre que for iniciar a conexão tem que estar "true" ou seja a variável é verdadeira senão pode deixar em "false"
var desenvolvimento = false;
// variável da configurações é onde ocorre a configuração com o nosso banco de dados
//todas as informações estão na aba de "visão geral" no azure
var configuracoes = {
        producao: {
            server: "srvcontrollock.database.windows.net",
            user: "usercontrollock",
            password: "#Gfgrupo5",
            database: "dbcontrollock",
            options: {
                encrypt: true
            },
            // poll é o tempo de conexão com o banco de dados em milisegundos
            pool: {
                max: 4,
                min: 1,
                idleTimeoutMillis: 30000,
                connectionTimeout: 5000
            }
        },
        desenvolvimento: {
            server: "srvcontrollock.database.windows.net",
            user: "usercontrollock",
            password: "#Gfgrupo5",
            database: "dbcontrollock",
            options: {
                encrypt: true
            }
        }
    }
    // a variável sql é a conexão com os pacotes baixados do mssql e onde ocorre a conexão
var sql = require('mssql');
sql.on('error', err => {
    console.error(`Erro de Conexão: ${err}`);
});

var perfil = desenvolvimento ? 'desenvolvimento' : 'producao';

function conectar() {
    // return sql.connect(configuracoes[perfil])
    return new sql.ConnectionPool(configuracoes[perfil]).connect();
}
// por favor não mexer em nenhum dos modulos "module export" é onde são exportadas todas as informações do nosso banco
module.exports = {
    conectar: conectar,
    sql: sql
}
var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
        leitura as leitura, 
        unidadedeMedida as unidadedeMedida,
                        dtLeitura,
                        DATE_FORMAT(dtLeitura,'%H:%i:%s') as dtLeitura_grafico
                    FROM leitura
                    WHERE fkSensor = ${idAquario}
                    ORDER BY idLeitura DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    var instrucaoSql = `SELECT 
        leitura as leitura,
		DATE_FORMAT(dtLeitura,'%H:%i:%s') as dtLeitura_grafico, 
		fkSensor 
		FROM leitura WHERE fkSensor = ${idAquario}
                    ORDER BY idLeitura DESC LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}

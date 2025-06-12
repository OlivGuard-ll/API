var database = require("../database/config");

function umidadeAtual(idSensor) {
  var instrucaoSql = `	SELECT l.leitura, s.localInstalacao as setor FROM leitura as l JOIN sensor as s ON l.fkSensor = idSensor
		WHERE s.idSensor = ${idSensor}
		ORDER BY l.dtLeitura DESC LIMIT 1;
`;
  return database.executar(instrucaoSql);
}

function umidadeMediaDia(idSensor) {
  var instrucaoSql = `SELECT ROUND(AVG(l.leitura),1)as media, DATE(dtLeitura) as dataDaLeitura FROM 
	leitura as l JOIN sensor as s ON l.fkSensor = s.idSensor
    WHERE s.idSensor = ${idSensor}
	GROUP BY dataDaLeitura
    ORDER BY dataDaLeitura DESC LIMIT 1;`;

  return database.executar(instrucaoSql);
}


function mediaUmidadeMes(idSensor) {
  var instrucaoSql = `SELECT ROUND(avg(leituraTotal), 1) AS mediaUltimoTrintaDias FROM (
SELECT l.leitura AS leituraTotal, DATE(dtLeitura) as dataDaLeitura, s.idSensor as idSensor FROM leitura as l JOIN sensor as s ON l.fkSensor = s.idSensor
	WHERE s.idSensor = ${idSensor}  
    GROUP BY dataDaLeitura, l.leitura LIMIT 30) mediaDaSomaDosultimos30Dias;`

  return database.executar(instrucaoSql);
}

function ultimaLeitura(idSensor) {
  var instrucaoSql = `SELECT ROUND(AVG(somaDoDia), 1) as mediaDoDia, dataDaLeitura, idSensor FROM (
	SELECT l.leitura as somaDoDia, s.idSensor as idSensor, date_format(dtLeitura, '%m-%d')  as dataDaLeitura FROM 
				leitura as l JOIN sensor as s 
					ON l.fkSensor = s.idSensor
) as subMediaDoDia30Dias
	WHERE idSensor = ${idSensor}
	GROUP BY idSensor, dataDaLeitura 
    ORDER BY dataDaLeitura DESC LIMIT 30;
`;
  return database.executar(instrucaoSql);
}

function ultimaLeituraTempoReal(idSensor) {
  var instrucaoSql = `SELECT ROUND(AVG(somaDoDia), 1) as mediaDoDia, dataDaLeitura, idDoSensor FROM (
	SELECT l.leitura as somaDoDia, s.idSensor as idDoSensor, date_format(dtLeitura, '%m-%d')  as dataDaLeitura FROM 
				leitura as l JOIN sensor as s 
					ON l.fkSensor = s.idSensor
) as subMediaDoDia30Dias
	WHERE idDoSensor = ${idSensor}
	GROUP BY idDoSensor, dataDaLeitura 
    ORDER BY dataDaLeitura DESC LIMIT 1;
`;
  return database.executar(instrucaoSql);
}

function ultimaLeituraTempoRealCard(idEmpresa) {
  var instrucaoSql = `SELECT s.idSensor, l.leitura, l.dtLeitura, s.localInstalacao
          FROM sensor s
          JOIN leitura l ON s.idSensor = l.fkSensor
          WHERE s.fkEmpresa = ${idEmpresa}
            AND l.dtLeitura = (
                SELECT MAX(l2.dtLeitura)
                FROM leitura l2
                WHERE l2.fkSensor = s.idSensor
  );

`;
  return database.executar(instrucaoSql);
}



module.exports = { 
    umidadeAtual,
    umidadeMediaDia,
    mediaUmidadeMes,
    ultimaLeitura,
    ultimaLeituraTempoReal,
    ultimaLeituraTempoRealCard
};

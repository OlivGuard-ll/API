var dashboardModel = require("../models/dashboardModel");

function umidadeAtual(req, res){
    var idSensor = req.params.idSensor;
      dashboardModel.umidadeAtual(idSensor)
      .then((resultado) => {
        res.status(200).json(resultado);
      });
}

function umidadeMediaDia(req, res){
    var idSensor = req.params.idSensor;
      dashboardModel.umidadeMediaDia(idSensor)
      .then((resultado) => {
        res.status(200).json(resultado);
      });
}

function mediaUmidadeMes(req, res){
    var idSensor = req.params.idSensor;
      dashboardModel.mediaUmidadeMes(idSensor)
      .then((resultado) => {
        res.status(200).json(resultado);
      });
}

function ultimaLeitura(req, res){
     var idSensor = req.params.idSensor;
      dashboardModel.ultimaLeitura(idSensor)
      .then((resultado) => {
        res.status(200).json(resultado);
      });
}

function ultimaLeituraTempoReal(req, res){
     var idSensor = req.params.idSensor;
      dashboardModel.ultimaLeituraTempoReal(idSensor)
      .then((resultado) => {
        res.status(200).json(resultado);
      });
}

module.exports = {
  umidadeAtual,
  umidadeMediaDia,
  mediaUmidadeMes,
  ultimaLeitura,
  ultimaLeituraTempoReal
}
var express = require("express");
var router = express.Router();
var dashboardController = require('../controllers/dashboardController')

router.get("/umidadeAtual/:idSensor", function (req, res) {
    dashboardController.umidadeAtual(req, res)
});

router.get("/umidadeMediaDia/:idSensor", function (req, res) {
    dashboardController.umidadeMediaDia(req, res)
});

router.get("/mediaUmidadeMes/:idSensor", function (req, res) {
    dashboardController.mediaUmidadeMes(req, res)
});

router.get("/ultimaLeitura/:idSensor", function (req, res) {
    dashboardController.ultimaLeitura(req, res)
});


router.get("/ultimaLeituraTempoReal/:idSensor", function (req, res) {
    dashboardController.ultimaLeituraTempoReal(req, res)
});

router.get("/ultimaLeituraTempoRealCard/:idEmpresa", function (req, res) {
    dashboardController.ultimaLeituraTempoRealCard(req, res)
});

module.exports = router;
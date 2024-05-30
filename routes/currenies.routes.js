const { welcomeCurrencies, getCurrenciesServer, getCurrencies, getCurrenciesById } = require('../controllers/currencies.controllers');

const currenciesRoutes = require('express').Router()

currenciesRoutes.get("/", welcomeCurrencies);
currenciesRoutes.get("/server", getCurrenciesServer);
currenciesRoutes.get("/currencies", getCurrencies);
currenciesRoutes.get("/currencies/:id", getCurrenciesById);

module.exports = currenciesRoutes;
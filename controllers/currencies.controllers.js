const currencyInfo = require('../currencies.json');
const serverInfo = {
    server: "This is a node-http server",
    time: new Date().toTimeString(),
    date: new Date().toDateString()
}
const welcomeCurrencies = (request, response) => {
    response.send("<h1>This is a node-express server</h1>");
}

const getCurrencies =  (request, response) => {
    response.status(200).json(currencyInfo.data);
}

const getCurrenciesServer  = (request, response) => {
    response.status(200).json(serverInfo);
}

const getCurrenciesById =  (request, response) => {
    response.status(200).json(currencyInfo.data.find(x => x.id?.toLowerCase() === request.params.id));
}


module.exports = {welcomeCurrencies, getCurrencies, getCurrenciesServer, getCurrenciesById}
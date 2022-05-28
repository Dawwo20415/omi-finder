const dbInterface = require('./atlas-interface.js');
const res = require('express/lib/response');

async function getBy(model, filter, parameters) {
    var result;

    result = await dbInterface.query(model, JSON.parse(filter), parameters.values, parameters.limit);
    
    return result;
}

async function getSettore(model, filter, parameters, settore) {
    var result;

    result = await dbInterface.query(model, JSON.parse(filter), 'valori' , parameters.limit);

    for (e in result) {
        var tmp = {
            _id: result[e]._id,
            valore: []
        };
        for (v in result[e].valori) {
            var intmp = {semestre:result[e].valori[v].semestre};
            if (result[e].valori[v][settore]) {
                intmp[settore] = result[e].valori[v][settore];
            }
            tmp.valore[v] = intmp;
        }
        result[e] = tmp;
    }
    
    return result;
}

async function getTipo(model, filter, parameters, settore, tipo) {
    var result;

    result = await dbInterface.query(model, JSON.parse(filter), 'valori' , parameters.limit);

    for (e in result) {
        var tmp = {
            _id: result[e]._id,
            valore: []
        };

        for (v in result[e].valori) {
            var intmp = {semestre:result[e].valori[v].semestre};
            if (result[e].valori[v][settore]) {
                intmp[tipo] = result[e].valori[v][settore][tipo];
            }
            tmp.valore[v] = intmp;
        }
        result[e] = tmp;
    }
    
    return result;
}

//Exports ---------------------------------------------
module.exports = {getBy,getSettore,getTipo};
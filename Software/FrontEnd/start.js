//Packages
const express = require('express')
const custom_api = require('../BackEnd/atlas-interface.js')

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000

//Definisce una istanza della "classe" express con cui si interagisce
//con l'interfaccia web
const web_interface = express()

const zona = custom_api.dbConnectionSetup()

//Fare cose con l'interfaccia web

// "/" indica che è la homepage del sito
// Inserire /[qualcosa] si riferisce a quella pagina
web_interface.get( "/", (req, res) => {
    res.send("<h1>Homepage</h1>")
})

//Series of API calls

web_interface.get( '/v1/query', async (req, res) => {   
    //Check for query parameters
    parameters_json_object = {}

    if (req.query.provincia) {
        parameters_json_object.provincia = req.query.provincia
    } if (req.query.comune) {
        parameters_json_object.comune = req.query.comune
    } if (req.query.codice_catasto) {
        parameters_json_object.codice_catasto = req.query.codice_catasto
    } if (req.query.codice_zona) {
        parameters_json_object.codice_zona = req.query.codice_zona
    } if (req.query.link_zona) {
        parameters_json_object.link_zona = req.query.link_zona
    } 
    res.json(await custom_api.api_get_query(zona, parameters_json_object))
})

web_interface.get( '/v1/utilizzo/:tipo', async (req, res) => {   
    //Check for query parameters
    var parameters_json_object = {}

    if (req.query.provincia) {
        parameters_json_object.provincia = req.query.provincia
    } if (req.query.comune) {
        parameters_json_object.comune = req.query.comune
    } if (req.query.codice_catasto) {
        parameters_json_object.codice_catasto = req.query.codice_catasto
    } if (req.query.codice_zona) {
        parameters_json_object.codice_zona = req.query.codice_zona
    } if (req.query.link_zona) {
        parameters_json_object.link_zona = req.query.link_zona
    } 

    var result = await custom_api.api_get_query_completa(zona, parameters_json_object, 'valori')

    if (req.params.tipo == 'residenziale') {
        for (i = 0; i < result.length; i++) {
            result[i] = result[i].valori[i].residenziale;
        }
    } if (req.params.tipo == 'commerciale') {
        for (i = 0; i < result.length; i++) {
            result[i] = result[i].valori[i].commerciale;
        }
    } if (req.params.tipo == 'terziaria') {
        for (i = 0; i < result.length; i++) {
            result[i] = result[i].valori[i].terziaria;
        }
    }

    for (r in result) {
        console.log("Primo For - " + result.length + " - " + r);
        for (p in req.query) {
            console.log("Secondo For - " + p);
            result[r] = result[r][p];
        }
    }
    
    res.json(result)
})

web_interface.get( '/v1/:filter', async (req, res) => {    
    if (req.params.filter) {
        res.json(await custom_api.api_get_list(zona, req.params.filter))
    } else {
        res.send("Unacceptable Parameter")
    }
})

//Dire ad espress su quale porta ascoltare le richieste
//Con aggiunta funzione che lo dichiara sulla console
web_interface.listen(PORT, () => console.log(`Listening on ${ PORT }`)) 
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

web_interface.get( "/testpage", (req, res) => {
    res.send("<h1>Atlas Test Page</h1>")
})

web_interface.get( "/v1/testcommand", async (req, res) => {
    const result = await custom_api.api_test_function(zona)
    console.log(result)
    res.json(result)
})

//Dire ad espress su quale porta ascoltare le richieste
//Con aggiunta funzione che lo dichiara sulla console
web_interface.listen(PORT, () => console.log(`Listening on ${ PORT }`)) 
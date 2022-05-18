//Packages
const express = require('express')

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000

//Definisce una istanza della "classe" express con cui si interagisce
//con l'interfaccia web
const web_interface = express()

//Fare cose con l'interfaccia web

// "/" indica che è la homepage del sito
// Inserire /[qualcosa] si riferisce a quella pagina
web_interface.get( "/", (req, res) => {
    res.send("<h1>Homepage</h1>")
})

web_interface.get( "/testpage", (req, res) => {
    res.send("<h1>Atlas Test Page</h1>")
})

//Dire ad espress su quale porta ascoltare le richieste
//Con aggiunta funzione che lo dichiara sulla console
web_interface.listen(PORT, () => console.log(`Listening on ${ PORT }`)) 
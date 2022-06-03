const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');

const Iapi = require("../BackEnd/api-interface.js");
const Iatlas = require("../BackEnd/atlas-interface.js");
const zona_omi = require("../BackEnd/zona-omi-definition.js");
const Utente = require("../BackEnd/utente-definition.js");

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000;

const app = express();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

Iatlas.atlasConnectionSetup();

app.use(express.static('C:/Users/Simone/Desktop/omi-finder-development/Software/FrontEnd/omi-finder/build/index.html'));


app.get("/v2/getBy/:filter", async (req, res) => {
	res.json(await Iapi.getBy(zona_omi.model, req.params.filter, req.query));
});

app.get("/v2/getSettore/:settore/:filter", async (req, res) => {
	res.json(await Iapi.getSettore(zona_omi.model, req.params.filter, req.query, req.params.settore));
});

app.get("/v2/getTipo/:settore/:tipo/:filter", async (req, res) => {
	res.json(await Iapi.getTipo(zona_omi.model, req.params.filter, req.query, req.params.settore, req.params.tipo));
});

app.post('/v2/userGetStatus/', urlencodedParser, async (req, res) => {
	res.json(await Iapi.userGetStatus(req.body.id, Utente))
})

app.put('/v2/register/', urlencodedParser, async (req, res) => {
	_email = req.body.email
	// password già cifrata lato frontend
	_password = req.body.password
	// formato UNIX per verificare quando l'utente si è registrato 
	_createdIn = Math.round(new Date().getTime()/1000)	

	res.json(await Iapi.registerNewUser(_email, _password, _createdIn, Utente))
})

app.patch('/v2/changePassword', urlencodedParser, async (req, res) => {
	_email = req.body.email
	// vecchia password già cifrata lato frontend
	_oldPassword = req.body.oldPassword
	// nuova password già cifrata lato frontend
	_newPassword = req.body._newPassword

	res.json(await Iapi.changePassword(_email, _oldPassword, _newPassword, Utente))
})

// Siccome React ha un router interno passo ad ogni pagina del sito
// il frontend di React ("/*" significa ogni path dopo root)
app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log("Listening..."));

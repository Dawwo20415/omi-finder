const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const Iapi = require("../BackEnd/api-interface.js");
const Iatlas = require("../BackEnd/atlas-interface.js");
const zona_omi = require("../BackEnd/zona-omi-definition.js");
const Utente = require("../BackEnd/utente-definition.js");

//Definisce la porta su cui ascoltare | Heroku RICHIEDE la porta 5000
const PORT = process.env.PORT || 5000;

const app = express();

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: "Omi-Finder API",
			version: "2.0.0",
		},
	},
	apis: ["Software/FrontEnd/web.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

Iatlas.atlasConnectionSetup();

app.use(express.static(path.join(__dirname, "build")));

// Parsing automatico body json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * @swagger
 * /v2/getBy/{filter}:
 *   get:
 *     summary: Ritorna un array di oggetti zona-omi in base ai parametri di query assegnati.
 *     description: Permette di fare una pseudo-query direttamente al database in formato mongoose. Essenzialmente corrisponde ad utilizzare un "find()", non serve non serve fare l'escape di alcun carattere perchè all'interno della funzione c'è un JSON.parse() sul testo che lo fa in automatico. Il campo filtro segue le [regole delle richieste](https://www.mongodb.com/docs/manual/tutorial/query-documents/) di mongodb. Non importa tanto se il filtro non è corretto perchè se è sbagliato la query ritorna un insieme vuoto dato che non trova corrispondenze.
 *     parameters:
 *       - name: filter
 *         in: path
 *         required: true
 *         description: Questo è il filtro della query di mongodb, l'inserimento non ha bisogno di fare l'escape di alcun carattere dato che passa da un JSON.parse() in backend.
 *         schema:
 *           type: JSON
 *           minimum: 0
 *         example: {"comune":"TRENTO"}
 *       - name: values
 *         in: query
 *         required: false
 *         description: values definisce quali campi la query ritorna, si può anche mettere un '-' davanti ad un nome per escludere quel campo, ad eccezzione del campo '_id', le mappature positive e negative sono mutualmente esclusive perchè sono due statement ridondanti al meglio in conflitto al peggio. Il campo '_id' fa a parte perchè mongoose lo aggiunge sempre a meno che non gli metti tu il -_id.
 *         schema:
 *           type: string
 *         examples:
 *           - soloComuneSnezaID:
 *               summary: richiedi che gli oggetti ritornati abbiano solo il campo 'comune' senza il campo '_id'
 *               value: comune -_id
 *           - senzaCoordinate:
 *               summary: richiedi che gli oggetti ritornati non abbiano il campo 'coordinate'
 *               value: -coordinate
 *       - name: limit
 *         in: query
 *         required: false
 *         description: limit definisce il numero massimo di oggetti che la query può ritornare
 *         schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Array JSON di zone-omi corrispondenti ai parametri
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '400':
 *         description: Il link mandato non è scritto in modo corretto ed ha causato un errore nella lettura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/v2/getBy/:filter", async (req, res) => {
	try {
		res.json(await Iapi.getBy(zona_omi.model, req.params.filter, req.query));
	} catch (e) {
		console.log("riscontrato errore");
		res.status(400).end();
	}
});

/**
 * @swagger
 * /v2/getBy/{settore}/{filter}:
 *   get:
 *     summary: Ritorna un array di oggetti zona-omi in base ai parametri di query assegnati.
 *     description: Permette di fare una pseudo query sul database come per /v2/getBy ma nello specifico per le zone omi questa richiesta permette di richiedere uno degli specifici settori nel campo 'valori' delle zone-omi
 *     parameters:
 *       - name: settore
 *         in: path
 *         required: true
 *         description: indica quale tra residenziale, commerciale e terziaria si vuole prendere, nel caso in cui l'utente scriva i nomi male oppure in modo sbagliato la funzione ritorna un array vuoto. Il filtro viene applicato normalmente prima di segmentare l'oggetto di ritorno
 *         schema:
 *           type: JSON
 *           minimum: 0
 *         example: commerciale
 *       - name: filter
 *         in: path
 *         required: true
 *         description: Questo è il filtro della query di mongodb, l'inserimento non ha bisogno di fare l'escape di alcun carattere dato che passa da un JSON.parse() in backend.
 *         schema:
 *           type: JSON
 *           minimum: 0
 *         example: {"comune":"TRENTO"}
 *       - name: values
 *         in: query
 *         required: false
 *         description: values definisce quali campi la query ritorna, si può anche mettere un '-' davanti ad un nome per escludere quel campo, ad eccezzione del campo '_id', le mappature positive e negative sono mutualmente esclusive perchè sono due statement ridondanti al meglio in conflitto al peggio. Il campo '_id' fa a parte perchè mongoose lo aggiunge sempre a meno che non gli metti tu il -_id.
 *         schema:
 *           type: string
 *         examples:
 *           - soloComuneSnezaID:
 *               summary: richiedi che gli oggetti ritornati abbiano solo il campo 'comune' senza il campo '_id'
 *               value: comune -_id
 *           - senzaCoordinate:
 *               summary: richiedi che gli oggetti ritornati non abbiano il campo 'coordinate'
 *               value: -coordinate
 *       - name: limit
 *         in: query
 *         required: false
 *         description: limit definisce il numero massimo di oggetti che la query può ritornare
 *         schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Array JSON di zone-omi corrispondenti ai parametri
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '400':
 *         description: Il link mandato non è scritto in modo corretto ed ha causato un errore nella lettura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/v2/getSettore/:settore/:filter", async (req, res) => {
	try {
		res.json(await Iapi.getSettore(zona_omi.model, req.params.filter, req.query, req.params.settore));
	} catch (e) {
		console.log("riscontrato errore");
		res.status(400).end();
	}
});

/**
 * @swagger
 * /v2/getBy/{settore}/{tipo}/{filter}:
 *   get:
 *     summary: Ritorna un array di oggetti zona-omi in base ai parametri di query assegnati.
 *     description: Permette di fare una pseudo query sul database come per /v2/getBy ma nello specifico per le zone omi questa richiesta permette di richiedere uno degli specifici settori e quale categoria all'interno di esso nel campo 'valori' delle zone-omi.
 *     parameters:
 *       - name: settore
 *         in: path
 *         required: true
 *         description: indica quale tra residenziale, commerciale e terziaria si vuole prendere, nel caso in cui l'utente scriva i nomi male oppure in modo sbagliato la funzione ritorna un array vuoto. Il filtro viene applicato normalmente prima di segmentare l'oggetto di ritorno
 *         schema:
 *           type: JSON
 *           minimum: 0
 *         example: commerciale
 *       - name: tipo
 *         in: path
 *         required: true
 *         description: indica la categoria all'interno del settore si vuole selezionare, nel caso in cui l'utente scriva i nomi male oppure in modo sbagliato la funzione ritorna un array vuoto. Il filtro viene applicato normalmente prima di segmentare l'oggetto di ritorno
 *         schema:
 *           type: JSON
 *           minimum: 0
 *         example: commerciale
 *       - name: filter
 *         in: path
 *         required: true
 *         description: Questo è il filtro della query di mongodb, l'inserimento non ha bisogno di fare l'escape di alcun carattere dato che passa da un JSON.parse() in backend.
 *         schema:
 *           type: JSON
 *           minimum: 0
 *         example: {"comune":"TRENTO"}
 *       - name: values
 *         in: query
 *         required: false
 *         description: values definisce quali campi la query ritorna, si può anche mettere un '-' davanti ad un nome per escludere quel campo, ad eccezzione del campo '_id', le mappature positive e negative sono mutualmente esclusive perchè sono due statement ridondanti al meglio in conflitto al peggio. Il campo '_id' fa a parte perchè mongoose lo aggiunge sempre a meno che non gli metti tu il -_id.
 *         schema:
 *           type: string
 *         examples:
 *           - soloComuneSnezaID:
 *               summary: richiedi che gli oggetti ritornati abbiano solo il campo 'comune' senza il campo '_id'
 *               value: comune -_id
 *           - senzaCoordinate:
 *               summary: richiedi che gli oggetti ritornati non abbiano il campo 'coordinate'
 *               value: -coordinate
 *       - name: limit
 *         in: query
 *         required: false
 *         description: limit definisce il numero massimo di oggetti che la query può ritornare
 *         schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Array JSON di zone-omi corrispondenti ai parametri
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '400':
 *         description: Il link mandato non è scritto in modo corretto ed ha causato un errore nella lettura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/v2/getTipo/:settore/:tipo/:filter", async (req, res) => {
	try {
		res.json(await Iapi.getTipo(zona_omi.model, req.params.filter, req.query, req.params.settore, req.params.tipo));
	} catch (e) {
		console.log("riscontrato errore");
		res.status(400).end();
	}
});

/**
 * @swagger
 * /v2/getByCoordinate:
 *   get:
 *     summary: Ritorna l'id della zona corrispondente alle coordinate.
 *     description: Inserire la longitudine e la latitudine definisce unicamente una zona-omi, di default questa richiesta ritorna un solo oggetto, che però è comunque aggregato in un array.
 *     parameters:
 *       - name: longitude
 *         in: query
 *         required: true
 *         description: valore di longitudine.
 *         schema:
 *           type: int
 *       - name: latitude
 *         in: query
 *         required: true
 *         description: valore di latitudine.
 *         schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Array JSON di _id di zone-omi corrispondenti lle coordinate
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       '400':
 *         description: Il link mandato non è scritto in modo corretto ed ha causato un errore nella lettura
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
app.get("/v2/getByCoordinate", async (req, res) => {
	try {
		const longitude = parseFloat(req.query.longitude);
		const latitude = parseFloat(req.query.latitude);
		res.json(await Iapi.getByCoordinate(zona_omi.model, longitude, latitude));
	} catch (e) {
		res.status(400).end();
	}
});

// Da qua in giù autenticazione

// Non utilizzato
// app.post("/v2/userGetStatus/", async (req, res) => {
// 	const { id } = req.body;
// 	Iapi.userGetStatus(id, Utente)
// 		.then((value) => {
// 			res.json(value);
// 		})
// 		.catch((err) => {
// 			res.json(err);
// 		});
// });

app.post("/v2/login/", (req, res) => {
	const { emailOrUsername, password } = req.body;
	Iapi.loginUser(emailOrUsername, password, Utente)
		.then((value) => {
			res.json(value);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.put("/v2/register/", (req, res) => {
	const { username, email, password } = req.body;
	// formato UNIX per verificare quando l'utente si è registrato
	const createdIn = Math.round(new Date().getTime() / 1000);
	Iapi.registerUser(username, email, password, createdIn, Utente)
		.then((value) => {
			res.json(value);
		})
		.catch((err) => {
			res.json(err);
		});
});

// Non implementato lato frontend per ora non serve
/*
app.patch("/v2/changePassword/", async (req, res) => {
    const {email, oldPassword, newPassword} = req.body;
	res.json(await Iapi.changePassword(email, oldPassword, newPassword, Utente));
});
*/

// Endpoint pagine web
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/api-docs");

// Siccome React ha un router interno passo ad ogni pagina del sito
// il frontend di React ("/*" significa ogni path dopo root)
app.get("/*", (_, res) => {
	res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const dbInterface = require("./atlas-interface.js");
const res = require("express/lib/response");
// const jwt = require("jsonwebtoken");

async function getBy(model, filter, parameters) {
	let result;

	result = await dbInterface.query(model, JSON.parse(filter), parameters.values, parameters.limit);

	return result;
}

async function getSettore(model, filter, parameters, settore) {
	let result;

	result = await dbInterface.query(model, JSON.parse(filter), "valori", parameters.limit);

	for (e in result) {
		let tmp = {
			_id: result[e]._id,
			valore: [],
		};
		for (v in result[e].valori) {
			let intmp = {
				semestre: result[e].valori[v].semestre,
			};
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
	let result;

	result = await dbInterface.query(model, JSON.parse(filter), "valori", parameters.limit);

	for (e in result) {
		let tmp = {
			_id: result[e]._id,
			valore: [],
		};

		for (v in result[e].valori) {
			let intmp = {
				semestre: result[e].valori[v].semestre,
			};
			if (result[e].valori[v][settore]) {
				intmp[tipo] = result[e].valori[v][settore][tipo];
			}
			tmp.valore[v] = intmp;
		}
		result[e] = tmp;
	}

	return result;
}

async function getByCoordinate(model, longitude, latitude) {
	const filter = {
		coordinate: {
			$geoIntersects: {
				$geometry: {
					type: "Point",
					coordinates: [longitude, latitude],
				},
			},
		},
	};

	const result = await dbInterface.query(model, filter, "valori");
	if (result) {
		return result[0].valori;
	} else {
		return {};
	}
}

// Da qua in giù autenticazione

// Generazione token non utilizzata
/*
const generateJWT = (email, id) => {
	return jwt.sign({ email, id }, process.env.SUPER_SECRET, {
		expiresIn: 86400, // expires in 24 hours
	});
};
*/

// Non utilizzato
/*
async function userGetStatus(_id, User) {
	return (
		User.findById(_id)
			// what it sends back (if the user with the id=${id} exists)
			.select("_id, idPayment")
			.then((data, err) => {
				// if the user with the id=${_id} exists
				if (data)
					return {
						success: true,
						message: data,
					};
				else
					return {
						success: false,
						message: err,
					};
			})
			.catch(() => {
				// if the user with the id=${id} does not exist
				return {
					success: false,
					message: `The ID ${_id} does not exist`,
				};
			})
	);
}
*/

// Effettua il login di un utente
async function loginUser(emailOrUsername, password, Utente) {
	// Controllo se è una email
	// Uno username non può contenere la @ quindi se isEmailValid ritorna true
	// vuol dire che emailOrUsername è di sicuro una email
	if (isEmailValid(emailOrUsername)) {
		// email case insensitive
		emailOrUsername = emailOrUsername.toLowerCase();

		const promise = new Promise(async (resolve, reject) => {
			try {
				const user = await Utente.findOne({
					email: emailOrUsername,
					password,
				});

				if (user) {
					// const token = generateJWT(user.email, user._id);
					resolve({
						success: true,
						code: 4,
						message: "Successfully logged in",
						email: user.email,
						username: user.username,
						password: user.password,
						// token,
					});
				} else {
					reject({
						success: false,
						code: 1,
						message: "Wrong username, email or password",
					});
				}
			} catch (err) {
				reject({
					success: false,
					code: 2,
					message: "Something went wrong",
				});
			}
		});
		return promise;
	}
	// Altrimenti controllo che sia uno username valido
	else if (isUsernameValid(emailOrUsername)) {
		const promise = new Promise(async (resolve, reject) => {
			try {
				// Cerco user con username e password
				const user = await Utente.findOne({
					username: emailOrUsername,
					password,
				});

				// Se esiste un utente creo un jwt e risolvo la promise
				if (user) {
					// const token = generateJWT(user.email, user._id);
					resolve({
						success: true,
						code: 4,
						message: "Successfully logged in",
						email: user.email,
						username: user.username,
						password: user.password,
						// token,
					});
				} else {
					reject({
						success: false,
						code: 1,
						message: "Wrong username, email or password",
					});
				}
			} catch (err) {
				// Se si genera un errore nel try
				// al 99% è causa di una promise
				reject({
					success: false,
					code: 2,
					message: "Something went wrong",
				});
			}
		});
		return promise;
	}
	// Se non è né una email né uno username allore è un errore
	else {
		return Promise.reject({
			success: false,
			code: 3,
			message: "Parameter passed is not a username nor an email",
		});
	}
}

// Registra un nuovo utente controllando che email e username non esistano già nel database
async function registerUser(username, email, password, createdIn, Utente) {
	// Prima di tutto controllo che username, email e password siano validi
	if (!isUsernameValid(username)) {
		return Promise.reject({
			success: false,
			code: 1,
			message: "Username is invalid",
		});
	} else if (!isEmailValid(email)) {
		return Promise.reject({
			success: false,
			code: 2,
			message: "Email is invalid",
		});
	} else if (!isPasswordValid(password)) {
		return Promise.reject({
			success: false,
			code: 3,
			message: "Password is invalid",
		});
	}
	// Dopo aver controllato i parametri procedo con la registrazione
	else {
		const promise = new Promise(async (resolve, reject) => {
			try {
				// Controlla email non duplicata
				let user = await Utente.findOne({
					email,
				});
				if (user) {
					reject({
						success: false,
						code: 4,
						message: "A user with this email is already registered",
					});
					return;
				}

				// Controlla utente non duplicato
				user = await Utente.findOne({
					username,
				});
				if (user) {
					reject({
						success: false,
						code: 5,
						message: "A user with this username is already registered",
					});
					return;
				}

				// Creo il nuovo utente e lo salvo sul DB
				user = new Utente({
					username,
					email,
					password,
					createdIn,
					// idPayment: "",
				});
				user.save((err) => {
					// Se c'è stato un errore nel salvataggio
					if (err) {
						reject({
							success: false,
							code: 6,
							message: "Error while saving the user",
						});
					}

					// const token = generateJWT(user.email, user._id);
					resolve({
						success: true,
						code: 8,
						message: "User registered successfully",
						email: user.email,
						username: user.username,
						password: user.password,
						// token,
					});
				});
			} catch (err) {
				// Se per qualche motivo nel try si genera un errore
				// Al 99% l'errore proviene dalle Promise del database
				reject({
					success: false,
					code: 7,
					message: "Something went wrong",
				});
			}
		});

		return promise;
	}
}

// Per ora non viene utilizzato da nessuna parte
/*
async function changePassword(_email, _oldPassword, _newPassword, Utente) {
    return Utente.findOne({ email: _email }).then((user) => {
        if (!user)
            return {
                success: false,
                message: " No user with that email address is registered ",
            };
        else {
            if (user.password == _oldPassword) {
                user.password = _newPassword;
                user.save();
                return {
                    success: true,
                    message: "Password successfully changed",
                    email: user.email,
                    id: user._id,
                };
            } else
                return {
                    success: false,
                    message: " The old password does not match the one on the database ",
                };
        }
    });
}
*/

// Controlla che una email abbia il formato gisto
// Una email come "nome.cognome@gmail.com" ritorna true
const isEmailValid = (email) => {
	return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
};

// Uno username può contenere solamente lettere numeri e _ e deve essere lungo almeno 3 caratteri
const isUsernameValid = (username) => {
	return /^(\w|\d|\_){3,}$/.test(username);
};

// La password deve per forza essere compatibile con sha256
const isPasswordValid = (password) => {
	return /^[a-f0-9]{64}$/i.test(password);
};

//Exports ---------------------------------------------
module.exports = {
	getBy,
	getSettore,
	getTipo,
	getByCoordinate,
	userGetStatus,
	registerUser,
	// changePassword,
	loginUser,
};

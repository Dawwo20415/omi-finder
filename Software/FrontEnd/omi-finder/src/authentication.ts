import { SHA256 } from "crypto-js";

export const isEmailValid = (email: string): boolean => {
	return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
};

// Uno username può contenere solamente lettere numeri e _ e deve essere lungo almeno 3 caratteri
export const isUsernameValid = (username: string): boolean => {
	return /^(\w|\d|\_){3,}$/.test(username);
};

// La password non può contenere whitespaces e deve essere lunga almeno 8 caratteri
export const isPasswordValid = (password: string): boolean => {
	return !/\s/g.test(password) && password.length >= 8;
};

interface LoginCredentials {
	emailOrUsername: string;
	password: string;
}

interface LoginResponse {
	success: boolean;
	code: number;
	message: string;
	email?: string;
	username?: string;
	password?: string;
	token?: string;
}

// Codici login
// 1 = Wrong username, email or password
// 2 = Something went wrong
// 3 = Parameter passed is not a username nor an email
// 4 = User logged in

// Funzione richiamata ogni volta che si vuole fare il login
//  che prende in input le credenziali effettua la richiesta di login al backend
// e restituisce il risultato asincrono in una Promise
export const login = (credentials: LoginCredentials, hashPassword: boolean = false): Promise<LoginResponse> => {
	const promise = new Promise<LoginResponse>((resolve, reject) => {
		// Hash password
		if (hashPassword) {
			credentials.password = SHA256(credentials.password).toString();
		}

		// Send data with POST to /v2/login
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/v2/login", true);
		// xhr.open("POST", "localhost:5000/v2/login", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.addEventListener("readystatechange", () => {
			// If request is done check response
			if (xhr.readyState === 4) {
				// if request status is 200 then return response, error otherwise
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.response));
				} else {
					reject();
				}
			}
		});
		xhr.addEventListener("error", () => {
			reject();
		});
		console.log(credentials);
		xhr.send(JSON.stringify(credentials));
	});

	return promise;
};

interface RegisterCredentials {
	email: string;
	username: string;
	password: string;
}

interface RegisterResponse {
	success: boolean;
	code: number;
	message: string;
	email?: string;
	username?: string;
	password?: string;
	token?: string;
}

// Codici registrazione
// 1 = Username is invalid
// 2 = Email is invalid
// 3 = Password is invalid
// 4 = A user with this email is already registered
// 5 = A user with this username is already registered
// 6 = Error while saving the user
// 7 = Something went wrong
// 8 = User registered successfully

// Funzione richiamata ogni volta che si vuole fare il login
//  che prende in input le credenziali effettua la richiesta di login al backend
// e restituisce il risultato asincrono in una Promise
export const register = (
	credentials: RegisterCredentials,
	hashPassword: boolean = false
): Promise<RegisterResponse> => {
	const promise = new Promise<RegisterResponse>((resolve, reject) => {
		// Hash password
		if (hashPassword) {
			credentials.password = SHA256(credentials.password).toString();
		}

		// Send data with PUT to /v2/register
		const xhr = new XMLHttpRequest();
		xhr.open("PUT", "/v2/register", true);
		// xhr.open("PUT", "localhost:5000/v2/register", true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.addEventListener("readystatechange", () => {
			// If request is done check response
			if (xhr.readyState === 4) {
				// if request status is 200 then return response, error otherwise
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.response));
				} else {
					reject();
				}
			}
		});
		xhr.addEventListener("error", () => {
			reject();
		});
		xhr.send(JSON.stringify(credentials));
	});

	return promise;
};

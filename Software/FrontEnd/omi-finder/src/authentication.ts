import { SHA256 } from "crypto-js";

interface LoginCredentials {
	emailOrUsername: string;
	password: string;
}

interface LoginResponse {
	success: boolean;
	message: string;
	token: string;
	email: string;
	id: string;
}

export const isEmailValid = (email: string): boolean => {
	return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);
};

// Funzione richiamata ogni volta che si vuole fare il login
//  che prende in input le credenziali effettua la richiesta di login al backend
// e restituisce il risultato asincrono in una Promise
export const login = (credentials: LoginCredentials): Promise<LoginResponse> => {
	const promise = new Promise<LoginResponse>((resolve, reject) => {
		// Send data with POST to /v2/login
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/v2/login", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.addEventListener("readystatechange", () => {
			// If request is done check response
			if (xhr.readyState === 4) {
				// if request status is 200 then return response, error otherwise
				if (xhr.status === 200) {
					resolve(xhr.response);
				} else {
					reject();
				}
			}
		});
		xhr.addEventListener("error", () => {
			reject();
		});
		xhr.send(
			JSON.stringify({
				email: credentials.emailOrUsername,
				password: SHA256(credentials.password),
			})
		);
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
	message: string;
}

// Funzione richiamata ogni volta che si vuole fare il login
//  che prende in input le credenziali effettua la richiesta di login al backend
// e restituisce il risultato asincrono in una Promise
export const register = (credentials: RegisterCredentials): Promise<RegisterResponse> => {
	const promise = new Promise<RegisterResponse>((resolve, reject) => {
		// Send data with POST to /v2/register
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/v2/register", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.addEventListener("readystatechange", () => {
			// If request is done check response
			if (xhr.readyState === 4) {
				// if request status is 200 then return response, error otherwise
				if (xhr.status === 200) {
					resolve(xhr.response);
				} else {
					reject();
				}
			}
		});
		xhr.addEventListener("error", () => {
			reject();
		});
		xhr.send(
			JSON.stringify({
				email: credentials.email,
				password: SHA256(credentials.password),
			})
		);
	});

	return promise;
};

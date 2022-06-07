const localStorageKey = "omi-finder";

interface LocalStorageCredentials {
	username: string;
	email: string;
	passwordHash: string;
}

// Leggo lo stato memorizzato nel localStorage
export const getLocalStorageCredentials = (): LocalStorageCredentials => {
	// Se non esiste imposto uno stato di default non autenticato
	let state: LocalStorageCredentials | string | null = localStorage.getItem(localStorageKey);

	if (state) {
		state = JSON.parse(state) as LocalStorageCredentials;
	} else {
		state = {
			username: "",
			email: "",
			passwordHash: "",
		};
	}

	return state;
};

export const setLocalStorageCredentials = (credentials: LocalStorageCredentials) => {
	localStorage.setItem(localStorageKey, JSON.stringify(credentials));
};

export const deleteLocalStorageCredentials = () => {
	localStorage.removeItem(localStorageKey);
};

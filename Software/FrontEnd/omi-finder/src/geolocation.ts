interface ValoriZonaOMI {
	semestre: string; // Stringa con numero anno + numero semestre (es. 20212 vuol dire anno 2021 secondo semestre)
	residenziale?: {
		box?: { min: string, max: string },
		abitazioni_civili?: { min: string, max: string },
		ville_e_villini?: { min: string, max: string },
		posti_auto_coperto?: { min: string, max: string },
		posti_auto_scoperto?: { min: string, max: string },
		autorimesse?: { min: string, max: string },
		abitazioni_signorili?: { min: string, max: string },
		abitazioni_di_tipo_economico?: { min: string, max: string },
		abitazioni_tipiche_dei_luoghi?: { min: string, max: string },
		pensioni_e_assimilati?: { min: string, max: string },
	};
	commerciale?: {
		magazzini?: { min: string, max: string },
		negozi?: { min: string, max: string },
		centri_commerciali?: { min: string, max: string },
		uffici_strutturati?: { min: string, max: string },
	};
	terziaria?: {
		uffici?: { min: string; max: string };
	};
	produttiva?: {		
		capannoni_tipici?: { min: string, max: string },
		capannoni_industriali?: { min: string, max: string },
		laboratori?: { min: string, max: string },
	}
}

interface Coordinate {
    lat: number;
    lng: number;
}

export const findZona = (coordinate: Coordinate): Promise<ValoriZonaOMI> => {
    const promise = new Promise<ValoriZonaOMI>((resolve, reject) => {
		// Send data with POST to /v2/login
		const xhr = new XMLHttpRequest();
		xhr.open("GET", `/v2/getByCoordinate?logitude=${coordinate.lng}&latitude=${coordinate.lat}`, true);
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
		xhr.send();
	});

	return promise;
}
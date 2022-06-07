const mongoose = require("mongoose");

const multiPolygonSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["MultiPolygon"],
		required: true,
	},
	coordinates: {
		type: [[[[Number]]]],
		required: true,
	},
});

const schema = mongoose.Schema(
	{
		provincia: String, // Sigla della provincia della zona OMI (es. "TN" per Trento)
		codice_catasto: String, // Codice di forma lettera + 3 numeri (es. "Y111")
		comune: String, // Comune della zona OMI in maiuscolo (es. "STORO")
		codice_zona: String, // Codice zona OMI con lettera + numero (es. "R1", "B1", "D1", ...)
		linkzona: String, // Stringa di provincia + 8 numeri (es. "TN00000803")
		valori: [
			{
				semestre: String, // Stringa con numero anno + numero semestre (es. 20212 vuol dire anno 2021 secondo semestre)
				residenziale: {
					box: { min: String, max: String },
					abitazioni_civili: { min: String, max: String },
					ville_e_villini: { min: String, max: String },
					posti_auto_coperto: { min: String, max: String },
					posti_auto_scoperto: { min: String, max: String },
					autorimesse: { min: String, max: String },
					abitazioni_signorili: { min: String, max: String },
					abitazioni_di_tipo_economico: { min: String, max: String },
					abitazioni_tipiche_dei_luoghi: { min: String, max: String },
					pensioni_e_assimilati: { min: String, max: String },
				},
				commerciale: {
					magazzini: { min: String, max: String },
					negozi: { min: String, max: String },
					centri_commerciali: { min: String, max: String },
					uffici_strutturati: { min: String, max: String },
				},
				terziaria: {
					uffici: { min: String, max: String },
				},
				produttiva: {
					capannoni_tipici: { min: String, max: String },
					capannoni_industriali: { min: String, max: String },
					laboratori: { min: String, max: String },
				},
			},
		],
		coordinate: multiPolygonSchema, // Multipoligono GeoJSON del perimetro della zona OMI
	},
	{ collection: "ZoneOmi", strictQuery: "throw" }
);

const model = mongoose.model("ZoneOmi", schema);

module.exports = {
	schema,
	model,
};

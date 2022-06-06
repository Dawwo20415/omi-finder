const mongoose = require("mongoose");

const multiPolygonSchema = new mongoose.Schema({
	type: {
	  type: String,
	  enum: ["MultiPolygon"],
	  required: true,
	},
	coordinates: {
	  type: [[[[Number]]]], // Array of arrays of arrays of numbers
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
				// FIXME Da rivedere, credo che alcuni campi opzionali manchino in "residenziale", "commerciale" e "terziaria"
				residenziale: {
					box: { min: String, max: String },
					abitazioni_civili: { min: String, max: String },
					ville_e_villini: { min: String, max: String },
				},
				commerciale: {
					magazzini: { min: String, max: String },
					negozi: { min: String, max: String },
				},
				terziaria: {
					uffici: { min: String, max: String },
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

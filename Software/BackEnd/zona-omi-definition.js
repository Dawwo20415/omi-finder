const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        provincia : String,
        codice_catasto : String,
        comune : String,
        codice_zona : String,
        linkzona : String,
        valori : [{
            semestre : String,
            residenziale : {
                abitazioni_civili : {min : String, max : String},
                abitazioni_di_tipo_economico : {min : String, max : String},
                ville_e_villini : {min : String, max : String}
            },
            commerciale : {
                negozi : {min : String, max : String}
            },
            terziaria : {
                uffici : {min : String, max : String}
            }
        }],
        coordinate : [ String ]
    }, {collection : 'ZoneOmi', strictQuery: 'throw'}
);

const model = mongoose.model("ZoneOmi", schema);

module.exports = {
    schema,
    model
}
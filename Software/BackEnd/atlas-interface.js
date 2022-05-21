require('dotenv').config();
const mongoose = require('mongoose');

async function query (model, filter, projection) {
    //Execute Query
    result = await model.find(filter, projection).lean();
    result = JSON.stringify(result);
    result = JSON.parse(result);
    return result;
}

async function query_limitata (model, filter) {
    //Execute Query
    result = await model.find(filter).lean();
    result = JSON.stringify(result);
    result = JSON.parse(result);
    return result;
}

module.exports = {
    dbConnectionSetup : function () {
        const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASSWORD + '@omifinder.brexx.mongodb.net/OmiFinder?retryWrites=true&w=majority'; 
        mongoose.connect(uri, () => {
            console.log("Connecting...");
        });
    
        const omi_zone_schema = new mongoose.Schema({
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
        }, {collection : 'ZoneOmi'});
    
        const Zona = mongoose.model('ZoneOmi', omi_zone_schema);
    
        return Zona;
    },

    api_test_function : async function (model) {
        const result = await query(model, {provincia:"VR"}, '-coordinate');
        return result;
    },

    api_get_list : async function (model, filter) {
        const result = await query(model, {}, filter);
        return result;
    },

    api_get_query : async function (model, parameter) {
        const result = await query_limitata(model, parameter);
        return result;
    },

    api_get_query_completa : async function (model, parameters, filter) {
        const result = await query(model, parameters, filter);
        return result;
    }
}







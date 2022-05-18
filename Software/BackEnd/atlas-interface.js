require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    const zona = dbConnectionSetup();

    console.log(await query(zona, {provincia:"VR"}, '-coordinate'));

    console.log(await query(zona, {provincia:"VRT"}, '-coordinate'));

    mongoose.disconnect();

    process.exit();
}

function dbConnectionSetup () {
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
}


async function query(model, filter, projection) {

    //Execute Query
    result = await model.find(filter, projection);

    return result;
}
require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {

    const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASSWORD + '@omifinder.brexx.mongodb.net/OmiFinder?retryWrites=true&w=majority'; 
    console.log(uri); 
    mongoose.connect(uri);

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

    const ZoneOmi = mongoose.model('ZoneOmi', omi_zone_schema);

    const zona = await ZoneOmi.find();

    console.log(zona);
}


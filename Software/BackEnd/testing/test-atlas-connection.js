require('dotenv').config();
const { query } = require('express');
const custom_api = require('../atlas-interface.js');
const zona_omi = require('../zona-omi-definition.js');

const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASSWORD + '@omifinder.brexx.mongodb.net/OmiFinder?retryWrites=true&w=majority'; 

main().catch(err => console.log(err));

async function main() {

    custom_api.atlasConnectionSetup();

    result = await custom_api.query(zona_omi.model, {'comune':'TRENTO','valori.semestre' : '20212'}, 'valori');

    console.log(result);
    console.log('----------------------------------------');

    //result = await custom_api.aggregation(zona_omi.model, {"provincia": "TN"}, {_id:'$comune', valore:{$sum : "$codice_catasto"}});

    //console.log(result);

    process.exit();
}


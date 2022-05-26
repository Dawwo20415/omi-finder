require('dotenv').config();
const { query } = require('express');
const custom_api = require('../atlas-interface.js');
const zona_omi = require('../zona-omi-definition.js');

const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASSWORD + '@omifinder.brexx.mongodb.net/OmiFinder?retryWrites=true&w=majority'; 

main().catch(err => console.log(err));

async function main() {

    custom_api.atlasConnectionSetup();

    var result = await custom_api.query(zona_omi.model, {}, 'comune', 20);
    result = await custom_api.query(zona_omi.model, {}, 'provincia', 20);

    console.log(result);

    process.exit();
}


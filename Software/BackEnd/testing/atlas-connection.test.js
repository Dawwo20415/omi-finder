const { query } = require('express');
const Iatlas = require('../atlas-interface.js');
const zona_omi = require('../zona-omi-definition.js');


beforeAll(() => {
    expect(Iatlas.atlasConnectionSetup()).toBe(2);
});

test('bla blas', async () => {
    let expected_result = [{"_id":"629395dc6e658073a405d521"}, {"_id": "6293960cb420e9cea995d2e8"}];

    expect(JSON.stringify(await Iatlas.query(zona_omi.model, {'comune':'TRENTO'}, '_id', 2))).toBe(JSON.stringify(expected_result));
});

/*
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
*/

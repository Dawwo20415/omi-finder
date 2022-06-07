const { query } = require('express');
const mongoose = require('mongoose');
const Iatlas = require('../atlas-interface.js');
const zona_omi = require('../zona-omi-definition.js');
let time_out = 10000;

beforeAll(async () => {
    
   await Iatlas.atlasConnectionSetup();
}, time_out);

afterAll(async () => {
    await Iatlas.disconnect();
});

test('bla blas', async () => {
    let expected_result = [{"_id":"629c1301f666bfc86924865b"},{"_id":"629c1304f666bfc86924867d"}]

    expect(JSON.stringify(await Iatlas.query(zona_omi.model, {'comune':'TRENTO'}, '_id', 2))).toBe(JSON.stringify(expected_result));
});

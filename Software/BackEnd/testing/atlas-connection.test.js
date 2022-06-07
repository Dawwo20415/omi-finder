const { query } = require('express');
const mongoose = require('mongoose');
const Iatlas = require('../atlas-interface.js');
const test_models = require('./test-schema-definition.js');
let time_out = 10000;

beforeAll(async () => {  
    await Iatlas.atlasConnectionToDatabase('OmiFinder');
 }, time_out);

afterAll(async () => {
    await Iatlas.disconnect();
});

test('Test for numeric value', async () => {
    expect(JSON.stringify(await Iatlas.query(test_models.model, {}, 'valore_numerico -_id', 1))).toBe(JSON.stringify([{"valore_numerico":777}]));
});

test('Test for string value', async () => {
    expect(JSON.stringify(await Iatlas.query(test_models.model, {}, 'valore_testuale -_id', 1))).toBe(JSON.stringify([{"valore_testuale":"Qui Testo Prova"}]));
});

test('Test for boolean value', async () => {
    expect(JSON.stringify(await Iatlas.query(test_models.model, {}, 'valore_booleano -_id', 1))).toBe(JSON.stringify([{"valore_booleano":true}]));
});
test('Test for array value', async () => {
    expect(JSON.stringify(await Iatlas.query(test_models.model, {}, 'array_numerico -_id', 1))).toBe(JSON.stringify([{"array_numerico":[1,2,3,4,5,6,7,8,9]}]));
});
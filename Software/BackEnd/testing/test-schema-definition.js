const mongoose = require('mongoose');

const schema = mongoose.Schema(
    {
        valore_numerico : Number,
        valore_testuale : String,
        valore_booleano : Boolean,
        array_numerico : [ Number ],
        sotto_oggetto : { valore_1 : Number, valore_2 : String }
    }, {collection : 'test-collection', strictQuery: 'throw'}
);

const model = mongoose.model("TestModel", schema);

module.exports = {
    schema,
    model
}
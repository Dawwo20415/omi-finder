require('dotenv').config();
const mongoose = require('mongoose');

//Communication mongoose-atlas -------------------------------------------------
function atlasConnectionSetup() {
    const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASSWORD + '@omifinder.brexx.mongodb.net/OmiFinder?retryWrites=true&w=majority'; 
    console.log('Attempting to connect to [' + uri +']');

    mongoose.connect(uri, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Connecting...");
    });
}

async function query(model, filter, projection = '', limit = 0) {
    var result = {};

    const quer = model.find(filter, projection).lean();

    if (limit)
        quer.limit(limit);

    await quer.exec().then((err, res) => {
        if (err)
            result = err;
        else
            result = res; 
    });

    return result;
}

async function aggregation(model, filter, group_layout) {
    var result = {};

    result = await model.aggregate([
        {$match: filter},
        {$group: group_layout}
    ]);

    return result;
}

//Exports ---------------------------------------------
module.exports = {atlasConnectionSetup, query, aggregation};







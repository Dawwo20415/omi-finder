require('dotenv').config();
const mongoose = require('mongoose');

//Communication mongoose-atlas -------------------------------------------------
async function atlasConnectionSetup() {
    const uri = 'mongodb+srv://' + process.env.USER + ':' + process.env.PASSWORD + '@omifinder.brexx.mongodb.net/OmiFinder?retryWrites=true&w=majority'; 
    console.log('Attempting to connect to [' + uri +']');
    var outcome = uri;

    await new Promise((resolve, reject) => {
        mongoose.connect(uri, (err) => {
            if (err) {
                reject(err);
                
            } else {
                resolve("Connected");
            }
        });
    }); 

    return mongoose.connection.readyState;
}

async function disconnect() {
    await mongoose.disconnect();
    return mongoose.connection.readyState;
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
module.exports = {atlasConnectionSetup, disconnect, query, aggregation};







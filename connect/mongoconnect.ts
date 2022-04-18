module.exports = async function connectToMongo() {
    
    const mongoose = require('mongoose');
    const dbConfig = process.env.MONGOURL;
    mongoose.Promise = global.Promise;

    mongoose.connect(dbConfig, {
        useNewUrlParser: true
    }).then(() => {
        console.log("connected to DB....!");
    }).catch(() => {
        console.log('Could not connect to the database. Exiting now... ');
        process.exit();
    });

}


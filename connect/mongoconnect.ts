module.exports = async function connectToMongo() {
    
    const mongoose = require('mongoose');
    const dbConfig = process.env.MONGOURL || "mongodb+srv://hospitalapi123:hospitalapi123@cluster0.wpcbp.mongodb.net/hospitaldata?retryWrites=true&w=majority";
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


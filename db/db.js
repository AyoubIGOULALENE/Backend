const mongoose = require('mongoose');

function ConnectDB(params) {
    try {
        mongoose.connect(process.env.MONGO_CLOUD_URL)
        console.log("connected to db")
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDB
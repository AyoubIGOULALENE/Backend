const {Furtune} = require('./models/Furtune')
const {furtunes} = require("./data")

const ConnectDB = require("./db/db")
require("dotenv").config()
//
ConnectDB()
//
const importBooks = async () => 
{
try {
    await Furtune.insertMany(furtunes)
    console.log("books imported")
} catch (error) {
    console.log(error)
    process.exit(1)
}
}
// remove
const removeBooks = async () => 
    {
    
    try {
        await Furtune.deleteMany()
        console.log("books removed")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    }

    //
    if(process.argv[2] === "-import"){
importBooks()
    }else if(process.argv[2] === "-remove"){
        removeBooks()            }
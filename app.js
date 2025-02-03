const express = require('express');
const ConnectDB = require('./db/db')
const cors = require('cors')
//env config
require('dotenv').config()

//midllewares
const app = express()

//
app.use(cors())

//use
app.use(express.json());
app.use('/api/auth',require('./routes/auth'))
app.use('/api/users',require('./routes/users'))
app.use('/api/furtune',require('./routes/furtune'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/comment',require('./routes/comments'))
//Mongodb server
ConnectDB()
//listen server
const port = process.env.Domain  || 5500
app.listen(port,() => console.log('Connected seccusfuly!'))
'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
 const mongoose =require('mongoose');

 const server = express();
 server.use(cors());
 server.use(express.json());

 const PORT=process.env.PORT;


mongoose.connect('mongodb://localhost:27017/recipes',
{ useNewUrlParser: true, useUnifiedTopology: true }); 


const recipeSchema = new mongoose.Schema({
    label :String,
    image:String,
    ingredientLines:Array,

})
const recipeModel = mongoose.model('recipe',recipeSchema)
 
 server.get('/test', testHandler);
 function testHandler(req, res) {
    res.send('test route')
}

server.get('/', (request, response) => {
    let str = 'hello from back end';
    response.status(202).send(str);
})


server.get('*', (req, res) => {
    res.status(404).send('not found');
})

server.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
})
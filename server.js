'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
 //const mongoose =require('mongoose');

 const server = express();
 server.use(cors());
 server.use(express.json());

 const PORT=process.env.PORT;


// mongoose.connect('mongodb://localhost:27017/recipes',
// { useNewUrlParser: true, useUnifiedTopology: true }); 


// const recipeSchema = new mongoose.Schema({
//     label :String,
//     image:String,
//     ingredientLines:Array,

// })
// const recipeModel = mongoose.model('recipe',recipeSchema)
 
 server.get('/test', testHandler);
 server.get('/recipes',recipesHandler);
//  server.post('/addToFav',favoriteHandler);
//  server.get('/getFav',getFavoriteHandler);
//  server.delete('/deleteRecipe/:id',deleteHandler);
//  server.put('/updateRecipe/:id',updateHandler);

//here request data from api to send the res to front end
function recipesHandler(req,res){
    const ingredient = req.query.ingredient;
    console.log(ingredient)
console.log(req.query);
const url = `https://api.edamam.com/search?q=${ingredient}&app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}`;

axios
.get(url)
.then(result =>{
    const recipesArray = result.data.hits.map(item=>{
        return new Recipe(item);
        console.log(recipesArray);
    })
    res.send(recipesArray);

})
}


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

// we put recipe after data becuse in JSON API we have object of array 
// object hits  and recipe that have data
class Recipe{
    constructor(data){
        this.label = data.recipe.label;
        this.image= data.recipe.image;
        this.ingredientLines = data.recipe.ingredientLines;

    }
}
server.listen(PORT,()=>{
    console.log(`listening on PORT ${PORT}`);
})
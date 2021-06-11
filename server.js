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

 


 function testHandaller(req,res){
     res.send('Hello from Backend');

 }


 server.listen(PORT,()=>{
     console.log(`listening on PORT ${PORT}`);
 })
 server.get('/',testHandaler);
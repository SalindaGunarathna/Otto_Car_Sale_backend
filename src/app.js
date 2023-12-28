require('dotenv').config()
const express = require('express')
const cors = require('cors'); 
const app = express()
app.use(express.json());    
const createHttpError = require('http-errors')
const fileUpload = require('express-fileupload'); 
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw()); 


app.use(fileUpload());  
app.use(cors());
const Admin  = require('./routers/admin')  
const Vehicle = require('./routers/vehicle'); 

app.use('/api/v1/',Admin);
app.use('/api/v1/',Vehicle);

  

app.use('/public/profiles', express.static('public/profiles'))

app.use ((err,req,res,next) => {
     
   
    if (createHttpError.isHttpError(err)) {
        res.status(err.status).send({massage: err.message});
    }else[
        res.status(500).send({massage: err.message}),
    ]

    // unknown error
     res.status(500).send({massage:"Unknown error"})
})

module.exports  = app
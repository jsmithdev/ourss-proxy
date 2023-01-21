const dotenv = require('dotenv');
const express = require('express');
//const cors = require('cors');
//const helmet = require('helmet');
const fetch = require('node-fetch');


if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ){
    dotenv.config()
}

const app = express()
const port = process.env.PORT || 4242;
const jsonParser = express.json();

//app.use(helmet());

//app.use(cors({
//    origin: process.env.SF_URL
//}))

app.get('/', async (req, res) => {

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.status(200).send();
    }
    else {

        try {
            
            if(!req.query.url) return res.status(400).send('A url parameter is required');
            
            res.status(200).send(await (await fetch(req.query.url)).text());
            
        }
        catch(error){
            console.error( error )
            res.status(400).send(error.message)
        }
    }
})

app.post('/', jsonParser, async (req, res) => {

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

    if (req.method === 'OPTIONS') {
        // CORS Preflight
        res.status(200).send();
    }
    else {

        try {
            
            const { url } = req.body;

            if(!url) return res.status(400).send('A url parameter is required');
            
            return res.send(await (await fetch(url)).text()).status(200);
            
        }
        catch(error){
            console.error( error )
            res.status(400).send(error.message)
        }
    }
})


app.listen(port, () => console.log(`Initialized. Using port ${port} - ${new Date().toUTCString()}`))

/**
 * @description For AWS Lambda, export app 
 */
module.exports = app;
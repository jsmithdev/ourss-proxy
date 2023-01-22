const express = require('express');
//const cors = require('cors');
//const helmet = require('helmet');
const fetch = require('node-fetch');

const app = express()
const port = process.env.PORT || 4242;

//app.use(helmet());

//app.use(cors({
//    origin: process.env.SF_URL
//}))

app.get('/', async (req, res) => {

    if (req.method === 'OPTIONS') {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));

        // CORS Preflight
        res.send().status(200);
    }
    else {

        try {
            
            if(!req.query.url) return res.status(400).send('A url parameter is required');
            
            res.send(await (await fetch(req.query.url)).text()).status(200);
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
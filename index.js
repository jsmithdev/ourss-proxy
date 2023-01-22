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
    
    console.time('request')

    if (req.method === 'OPTIONS') {

        // CORS Preflight
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET");
        res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
        res.status(200).send();
    }
    else {

        try {
            
            if(!req.query.url) return res.status(400).send('A url parameter is required');
            
            const prox = await fetch(req.query.url)

            if(!prox.ok) return res.status(prox.status).send(prox.statusText);

            if(!res.getHeader('access-control-allow-origin')){
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Methods", "GET");
                res.header("Access-Control-Allow-Headers", req.header('access-control-request-headers'));
            }

            prox.body.pipe(res);
        }
        catch(error){
            console.error( error )
            res.status(400).send(error.message)
        }
    }

    console.timeEnd('request')
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
})

app.listen(port, () => console.log(`Initialized. Using port ${port} - ${new Date().toUTCString()}`))

/**
 * @description For AWS Lambda, export app 
 */
module.exports = app;
const express = require("express");
const bodyParser = require('body-parser');
const net = require('net');
let stop = false;


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.all("/api", (req, res) => {
    try {
        console.log(req.body);

        res.send({stop: stop});

        if(stop)
        {stop = false;}

        const client = net.connect(8080, 'localhost');

        client.write(JSON.stringify(req.body, null, 2));

        client.end();
    }
    catch (e) {
        console.error(e);
    }
});

app.post("/javafx-api", (req, res) => {
    try {
        res.send();
        stop = true;

        const client = net.connect(8080, 'localhost');

        client.write(JSON.stringify({message: "Shutting down number generation"}, null, 2));

        client.end();
    }
    catch (e) {
        console.error(e);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

process.on('uncaughtException', function(err) {

    // Handle the error safely
    console.log(err)
})
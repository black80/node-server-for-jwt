const express = require('express');
const jwt = require('jsonwebtoken')
const fs = require('fs')
const app = express();


app.get('/token', (req, res, next) => {
    try {
        const privateKey = fs.readFileSync('./pos_key.pem');

        const terminal = {
            data: {
                ops: "auth",
                client_uuid: "212f66c6-bbfd-4fc7-9f50-31a749145cd1", // provided by nearpay
                terminal_id: "1000003000000006"// get this number from mada
            }
        }

        const token = jwt.sign(terminal, privateKey, { algorithm: "RS256" });
        console.log({ token });
        res.send({ token })
    } catch (error) {
        next(error)
    }

});

app.listen(5006, () => {
    console.log("started");
})
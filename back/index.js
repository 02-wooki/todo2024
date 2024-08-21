const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.static(path.join('../web/build')));
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join('../web/build/index.html'));
})

app.post('/api/getlist', function (req, res) {
    const body = req.body;
    console.log(`${body.content}`);
    
    res.json({ body : 'OK' });
})

app.post('/api/updatelist', function (req, res) {
    
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
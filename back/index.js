const express = require('express');
const path = require('path');
const cors = require('cors');
const mariadb = require('./database/mariadb');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, '../web/build')));
app.use(cors());
app.use(express.json());

mariadb.connect();
function pushHandler (body) {
    mariadb.query(`insert into lists(bookId, checked, content) 
        values(${body.bookId}, ${body.check}, '${body.content}')`,
    function (err, rows) { console.log(rows); });
}

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../web/build/index.html'));
// })

app.post('/api/putlist', function (req, res) {
    console.log(`${req.body.bookId}: ${req.body.content}`);
    pushHandler(req.body);
    res.json({ body : 'OK' });
})

app.post('/api/updatelist', function (req, res) {
    
})

app.get('api/getlist', function (req, res) {
    var result;
    const q = req.query;

    if(q.all) {
        mariadb.query(`select * from lists`, function (err, rows) {
            result = rows;
        })
    }

    res.json({ body : rows });
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
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

// 데이터 DB에 삽입하는 함수
function pushHandler (body) {
    mariadb.query(`insert into lists(bookId, checked, content) 
        values(${body.bookId}, ${body.check}, '${body.content}')`,
    function (err, rows) { console.log(rows); });
}

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../web/build/index.html'));
// })

// 데이터 삽입 요청 처리
app.post('/api/putlist', function (req, res) {
    console.log(`${req.body.bookId}: ${req.body.content}`);
    pushHandler(req.body);
    res.json({ body : 'OK' });
})

app.post('/api/updatelist', function (req, res) {
    
})

// 데이터 불러오기 요청 처리
app.get('/api/getlist', function (req, res) {
    console.log('* get list 요청');
    if(req.query.all) {
        mariadb.query(`select * from lists`, function (err, rows) {
            if(err) {   // 데이터베이스 오류 예외처리
                console.log(err);
            } else {
                console.log(rows);
                res.json({ body: rows })
            }
        })
    }
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
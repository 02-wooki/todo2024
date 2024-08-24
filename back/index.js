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
    mariadb.query(`insert into lists(checked, content) 
        values(false, '${body.content}')`,
    function (err, rows) { console.log(rows); });
}

// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../web/build/index.html'));
// })

// 데이터 삽입 요청 처리
app.post('/api/addlist', function (req, res) {

    console.log('add list 요청');

    // 길이 0 예외처리
    if (req.body.content.length !== 0) {
        console.log(`${req.body.content}`);
        pushHandler(req.body);
        res.send({ body : 'OK' });
    } else {
        res.json({ body : 'length 0 content requested: NOT OK' });
    }
})

app.patch('/api/updatelist/', function (req, res) {
    
})

app.delete(`/api/removelist/:who`, function (req, res) {
    if (req.params.who === 'book') {
        mariadb.query(`delete from lists where bookId=${req.query.id}`, function (err, rows) {
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
            }
        })
    } else if (req.params.who === 'user') {
        // 회원 탈퇴
    }
})

// 데이터 불러오기 요청 처리
app.get('/api/getlist', function (req, res) {
    console.log('* get list 요청');
    if(req.query.id === 'all') {
        mariadb.query(`select * from lists`, function (err, rows) {
            if(err) {   // 데이터베이스 오류 예외처리
                console.log(err);
            } else {
                console.log(rows);
                res.json({ body: rows })
            }
        })
    } else {
        const bookId = req.query.id;
        mariadb.query(`select * from lists where bookId=${bookId}`, function (err, rows) {
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
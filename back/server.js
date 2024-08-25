const express = require('express');
const path = require('path');
const cors = require('cors');
const mariadb = require('./database/mariadb');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

mariadb.connect();

// 데이터 DB에 삽입하는 함수
function pushHandler (body) {
    mariadb.query(`insert into lists(checked, content) 
        values(false, '${body.content}')`,
    function (err, rows) { console.log(rows); });
}
function manualPushHandler (body) {
    console.log(body);
    const createdDatetime = body.created_at.substr(0, 10) + ' ' + body.created_at.substr(11, 8);
    const expireDatetime = () => {
        if (body.expire_at !== null)
            return ("'" + body.expire_at.substr(0, 10) + ' ' + body.expire_at.substr(11, 8) + "'");
        else
            return 'null';
    } 

    mariadb.query(`insert into lists (bookId, userId, checked, created_at, expire_at, content)
        values (${body.bookId}, ${body.userId}, ${body.checked}, '${createdDatetime}', ${expireDatetime()}, '${body.content}')`, 
    function (err, rows) { console.log(err ? err : rows); });
}

// 데이터 삽입 요청
app.post('/api/addlist', function (req, res) {

    console.log('* add list 요청');

    // 길이 0 예외처리
    if (req.body.content.length !== 0) {
        pushHandler(req.body);
        res.json({ body : 'OK' });
    } else {
        res.json({ body : 'length 0 content requested: NOT OK' });
    }
})

// 삭제 취소 요청
app.post('/api/recovery', function (req, res) {

    console.log('* recovery 요청');
    manualPushHandler(req.body);

    res.json({ body : 'OK' });
})

app.patch('/api/patchlist/:where', function (req, res) {
    if (req.params.where === 'checkbox') {
        console.log('* check 상태 변경 요청');
        mariadb.query(`select checked from lists where bookId=${req.query.id}`, function (err, rows) {
            mariadb.query(`update lists set checked=${rows[0].checked === 0 ? true : false} where bookId=${req.query.id}`, function (err, rows) {
                console.log(rows);
                res.json({ body : 'OK' });
            })
        })
    } else if (req.params.where === 'content') {

    }
})

app.delete(`/api/removelist/:who`, function (req, res) {
    if (req.params.who === 'book') {
        console.log('* remove list 요청');
        mariadb.query(`delete from lists where bookId=${req.query.id}`, function (err, rows) {
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
                res.json({ body : 'OK' });
            }
        })
    } else if (req.params.who === 'user') {
        // 회원 탈퇴
    }
})

// 데이터 불러오기 요청
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
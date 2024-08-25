const express = require('express');
const path = require('path');
const cors = require('cors');
const mariadb = require('./database/mariadb');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

mariadb.connect();

// get
const getlists = require('./controllers/get/getlists');

// post
const addlist = require('./controllers/post/addlist');

app.get('/api/getlist', getlists);
app.post('/api/addlist', addlist);

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

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
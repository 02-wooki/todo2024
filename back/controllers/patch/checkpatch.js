const mariadb = require('../../database/mariadb');

const checkpatch = (req, res) => {
    mariadb.connect();

    mariadb.query(`select checked from lists where bookId=${req.query.id};`, (err, rows) => {
        if (err)
            res.send({ body : { status : 'NOT OK', content : err } });
        else {
            mariadb.query(`update lists set checked=${rows[0].checked === 0 ? true : false} where bookId=${req.query.id};`, (err, rows) => {
                if (err) 
                    res.send({ body : { status : 'NOT OK', content : err } });
                else
                    mariadb.query(`select * from lists`, (err, rows) => {
                        if (err)
                            res.send({ body : { status : 'NOT OK', content : err } });
                        else
                            res.send({ body : { status : 'OK', content : rows } });
                    })
            })
        }
    })
}

module.exports = checkpatch;
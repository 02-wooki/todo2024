const mariadb = require('../../database/mariadb');

const contentpatch = (req, res) => {

    if (req.body.content.length !== 0) {
        mariadb.query(`update lists set content='${req.body.content}', updated_at=now() where bookId=${req.query.id}`, (err, rows) => {
            if (err)
                res.send({ body : { status : 'NOT OK', content : err} });
            else
                mariadb.query(`select * from lists`, (err, rows) => {
                    if (err)
                        res.send({ body : { status : 'NOT OK', content : err }});
                    else
                        res.send({ body : { status : 'OK', content : rows } });
                });
        });
    } else {
        res.send({ body : { status : 'NOT OK', content : 'Content length 0' } });
    }
}

module.exports = contentpatch;
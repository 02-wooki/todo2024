const mariadb = require('../../database/mariadb');

const deletelist = (req, res) => {
    if (req.params.who === 'book') {
        mariadb.query(`insert into removed_lists(bookId, userId, checked, created_at, updated_at, expire_at, content)
        select * from lists where bookId=${req.query.id}`, (err, rows) => {
            if (err)
                res.send({ body : { status : 'NOT OK', content : err } });
            else
                mariadb.query(`delete from lists where bookId=${req.query.id}`, (err, rows) => {
                    if (err)
                        res.send({ body : { status : 'NOT OK', content : err } });
                    else
                        mariadb.query(`select * from lists`, (err, rows) => {
                            if (err)
                                res.send({ body : { status : 'NOT OK', content : err } });
                            else
                                res.send({ body : { status : 'OK', content : rows } });
                        });
                });
        });
    } else if (req.params.who === 'user') {

    }
}

module.exports = deletelist;
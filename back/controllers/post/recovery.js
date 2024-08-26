const mariadb = require('../../database/mariadb');

const recovery = (req, res) => {
    mariadb.connect();

    mariadb.query(`insert into lists
        select bookId, userId, checked, created_at, updated_at, expire_at, content
        from removed_lists
        where deleted_at between date_add(now(), interval -10 second) and now();`, (err, rows) => {
            if (err)
                res.send({ body : { status : 'NOT OK', content : err } });
            else
                mariadb.query(`delete from removed_lists where deleted_at between date_add(now(), interval -10 second) and now();`, (err, rows) => {
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
}

module.exports = recovery;
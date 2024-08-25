const mariadb = require('../../database/mariadb');

const addlist = (req, res) => {

    if (req.body.content.length === 0)
        req.send({ body : { status : 'NOT OK'} });

    mariadb.connect();
    mariadb.query(`insert into lists (content) values (${req.body.content});`, (err, rows) => {
        if (err)
            res.send({ body : { status : 'NOT OK'} });
        else
            mariadb.query(`select * from lists`, (err, rows) => {
                res.send({ body : { status : 'OK', content : rows} });
            })
    });
}

module.exports = addlist;
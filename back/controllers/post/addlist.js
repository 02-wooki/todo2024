const mariadb = require('../../database/mariadb');

const addlist = (req, res) => {

    const now = new Date();
    console.log(`ADD: '${req.body.content}' ${now}`)

    if (req.body.content.length === 0)
        req.send({ body : { status : 'NOT OK', content : 'request content length is 0' } });

    mariadb.connect();
    mariadb.query(`insert into lists (content) values ('${req.body.content}');`, (err, rows) => {
        if (err)
            res.send({ body : { status : 'NOT OK', content : err } });
        else
            mariadb.query(`select * from lists`, (err, rows) => {
                if (err)
                    res.send({ body : { status : 'NOT OK', content : err } });
                else
                    res.send({ body : { status : 'OK', content : rows} });
            })
    });
}

module.exports = addlist;
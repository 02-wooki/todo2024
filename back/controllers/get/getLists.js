const mariadb = require('../../database/mariadb');

const getlist = async (req, res) => {
    if (req.query.id === 'all') {
        mariadb.query('select * from lists;', (err, rows) => {
            if (err)
                res.send({ body : { status : 'NOT OK'} });
            else
                res.send({ body : { status : 'OK', content : rows } });
        });
    } else {
        mariadb.query(`select * from lists where userId=${req.query.id};`, (err, rows) => {
            if (err)
                res.send({ body : { status : 'NOT OK' } });
            else
                res.send({ body : { status : 'OK', content : rows } });
        });
    }
};

module.exports = getlist;
const mariadb = require('../../database/mariadb');

const getlist = async (req, res) => {
    if (req.query.id === 'all') {
        mariadb.query('select * from lists', (err, rows) => {
            if (err)
                res.send({ body : 'an error occured' });
            else
                res.send({ body : rows });
        });
    } else {
        mariadb.query(`select * from lists where bookId=${req.query.id}`, (err, rows) => {
            if (err)
                res.send({ body : 'an error occured' });
            else
                res.send({ body : rows });
        });
    }
};

module.exports = getlist;
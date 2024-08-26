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
const recovery = require('./controllers/post/recovery');

// patch
const checkpatch = require('./controllers/patch/checkpatch');

// delete
const deletelist = require('./controllers/delete/deletelist');

app.get('/api/getlist', getlists);
app.get('/api/recovery', recovery);

app.post('/api/addlist', addlist);

app.patch('/api/patchlist/checkbox', checkpatch);

app.delete('/api/removelist/:who', deletelist);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})
import express from 'express';
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'
import _ from 'lodash';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

await db.read()
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/member', (req, res) => {
    res.json(db.data.slice(0, 20));
});

app.get('/api/member/search', (req, res) => {
    var param = req.query.keyword
    var temp = _.filter(db.data, function(data) {
        return data.policyNumber.includes(param) || data.memberCardNumber.includes(param);
    });
    res.json(temp);
});

app.get('/api/member/:id', (req, res) => {
    var param = req.params.id;
    var temp = _.filter(db.data, { 'id': +param });
    res.json(temp[0]);
});

app.listen(3000, function() {
    console.log('App listening on 3000.');
});
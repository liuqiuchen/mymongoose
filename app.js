const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const User = require('./model');
// 用于将表单中的数据格式化
const bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT || 3000;

// 解析表单数据，可以用req.body访问数据
app.use(bodyParser.urlencoded({extended: true}));
// 解析json
app.use(bodyParser.json());

// 设置html模板
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.set('views', './views');
app.set('port', 3000);
app.listen(port);

let url = 'mongodb://localhost/yourappdatabase';
mongoose.createConnection(url);

app.get('/', (req, res) => {
    res.render('index', {title: 'home'});
});

app.post('/new', (req, res) => {
    let newGuy = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password // 千万别用这种密码
    });
    newGuy.capitalizeName((err, name) => {
        if(err) {
            res.send({error: err});
            return;
        }
        console.log(`name is ${name}`);
    });
});

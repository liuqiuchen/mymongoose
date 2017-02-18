const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const User = require('./model');
// 用于将表单中的数据格式化
const bodyParser = require('body-parser');

let app = express();
let port = process.env.PORT || 3000;

// 解析json【这个要放在前面，不然执行顺序会混乱】
app.use(bodyParser.json());
// 解析表单数据，可以用req.body访问数据
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/form', (req, res) => {
    res.render('form', {title: '表单'});
});

app.post('/form/new', (req, res) => {
    console.log(req.body);
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
    res.redirect('/');
});

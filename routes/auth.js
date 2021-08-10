var express = require('express');
var router = express.Router();
var template = require('../lib/template')

require('dotenv').config();

var authData = {
  email: process.env.email,
  password: process.env.password,
  nickname: process.env.nickname
}

router.get('/login', (req, res) => {
  var html = template.html(`
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="password" placeholder="password"></p>
      <p><input type="submit" value="login"></p>
    </form>
  `,'');
  res.send(html);
});

router.post('/login_process', (req, res) => {
  var body = req.body;
  console.log(body);
  var email = body.email;
  var password = body.password;
  if (email === process.env.email && password === process.env.password){
    req.session.isLogin = true;
    req.session.nickname = authData.nickname;
    req.session.save(() => res.redirect('/'));
  }
  else
    res.send('who?');
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => res.redirect('/'));
})

module.exports = router;
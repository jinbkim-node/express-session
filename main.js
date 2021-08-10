var express = require('express');
var app = express();
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));  // extended: 중첩된 객체표현을 허용할지
app.use(session({
  secret: 'jinbkim',  // 이 값을 통해 세션을 암호화 하여 저장
  resave: false,  // 세션의 변화가 없어도 다시 저장을 할건지 
  saveUninitialized: true,  // 세션에 저장할 내용이 없어도 처음부터 세션을 설정할지
  store: new FileStore()  // 세션 저장을 어떻게 할건지
}))

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => res.status(404).send('404 Not Found'));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 Server Error');
})

app.listen(3000, () => console.log('listening on port 3000...'));
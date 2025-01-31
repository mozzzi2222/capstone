const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production'
      ? '.env'
      : process.env.NODE_ENV === 'development'
      ? '.env.dev'
      : process.env.NODE_ENV === 'local'
      ? '.env.local'
      : ' ',
  ),
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 테스트용 삭제 예정
app.get('/', (req, res) => {
  res.send('우리 모두 화이팅...!');
});
// 테스트용 삭제 예정
app.get('/api/test', (req, res) => {
  res.send('통신 성공');
});

const example = require('./src/api/example/exampleRoute');
const users = require('./src/api/user/userRoute');
const community = require('./src/api/community/communityRoute');
const quiz = require('./src/api/quiz/quizRoute');
const lecture = require('./src/api/lecture/lectureRoute');

app.use('/example', example);
app.use('/users', users);
app.use('/community', community);
app.use('/quiz', quiz);
app.use('/lecture', lecture);

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`Server is listening on ${port} \n NODE_ENV = ${process.env.NODE_ENV}`));

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dotenv = require('dotenv');
const logger = require('./logger');
const app = express();

const { sequelize } = require('./models');
const indexRouter = require('./routes/index');

dotenv.config();
app.set('port', process.env.PORT || 5000);


sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });
  
if(process.env.NODE_ENV == 'production'){
  app.use(morgan('combined'));
}else{
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/test', indexRouter);


app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    logger.info('hello');
    logger.error(error.message);
    next(error);
  });
  
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });
  
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
  });
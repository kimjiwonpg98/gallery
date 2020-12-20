var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var app = express();
require("dotenv").config();
// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB);
var db = mongoose.connection;
db.once('open', () =>console.log('DB connected'));
db.on('error', (err) => console.log('DB ERROR : ', err));

// Other settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());               //json 형식으로 데이터 받는다
app.use(bodyParser.urlencoded({extended: true})); //req.body로 생성
// query의 library 가져오는거 extended
app.use(methodOverride('_method'));




app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));


// Port setting
var port = 3000;
app.listen(port, () => {
  console.log('server on! http://localhost:'+port);
});

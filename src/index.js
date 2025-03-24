const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');

const dbaccs = require('./config/db/dbaccs')
const dbbuildings = require('./config/db/dbbuildings')
const dbrooms = require('./config/db/dbrooms')
const dbplan = require('./config/db/dbplan')
const dbfavourite = require('./config/db/dbfavourite')
const dbvendoritem = require('./config/db/dbvendoritem')
const dbreview = require('./config/db/dbreview')
const dbchatroom = require('./config/db/dbchatroom')
const dbmessage = require('./config/db/dbmessage')
const dbguest = require('./config/db/dbguest')

//connect DB
dbaccs.connect()
dbbuildings.connect()
dbrooms.connect()
dbplan.connect()
dbvendoritem.connect()
dbreview.connect()
dbchatroom.connect()
dbmessage.connect()
dbguest.connect()
dbfavourite.connect()

const app = express()
const port = process.env.PORT

app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors({
    origin: ['https://wedding-planner-frontend.up.railway.app','http://localhost:3000', 'https://wedding-planner-frontend-url.railway.app'],
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Chấp nhận các phương thức yêu cầu
  allowedHeaders: ['Content-Type', 'Authorization'] // Đảm bảo các header cần thiết được phép sử dụng

}))
// {
//     origin: 'http://localhost:3000',
//     credentials: true
// }
// Handle preflight OPTIONS requests
app.options('*', cors()); // Tạo phản hồi cho các yêu cầu OPTIONS từ frontend

const route = require('./routes')
route(app)

// Cấu hình thư mục public để phục vụ file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Thiết lập route cho trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = app;

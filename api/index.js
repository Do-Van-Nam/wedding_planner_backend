const express = require('express')
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const path = require('path');

const dbaccs = require('../src/config/db/dbaccs')
const dbbuildings = require('../src/config/db/dbbuildings')
const dbrooms = require('../src/config/db/dbrooms')
const dbplan = require('../src/config/db/dbplan')
const dbfavourite = require('../src/config/db/dbfavourite')
const dbvendoritem = require('../src/config/db/dbvendoritem')
const dbreview = require('../src/config/db/dbreview')
const dbchatroom = require('../src/config/db/dbchatroom')
const dbmessage = require('../src/config/db/dbmessage')
const dbguest = require('../src/config/db/dbguest')

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

const route = require('../src/routes')
route(app)

// Cấu hình thư mục public để phục vụ file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Thiết lập route cho trang chủ
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    // res.send("Welcome to Wedding Planner API!");
});

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = app;

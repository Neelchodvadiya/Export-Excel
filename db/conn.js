const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/exportExcel')
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('error in connection'));
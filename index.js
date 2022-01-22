const express = require('express');
const path   = require('path');
const dataModel = require('./models/user.model');
const XLSX = require('xlsx');
const port = process.env.PORT || 8000;

require("./db/conn");

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'outputFiles')));


app.get('/web',(req,res)=>{
    var wb = XLSX.utils.book_new(); //new workbook
    dataModel.find((err,data)=>{
        if(err){
            console.log(err)
        }else{

            var temp = JSON.stringify(data);
            temp = JSON.parse(temp);
            var ws = XLSX.utils.json_to_sheet(temp);
            var down = __dirname+'/outputFiles/databse.xlsx'
           XLSX.utils.book_append_sheet(wb,ws,"sheet1");
           XLSX.writeFile(wb,down);
           res.download(down);
           res.status(200).json({
               msg:"excel downloaded"
           })      
           
        }
    });
});


app.listen(port,()=>{

    console.log(`server running at ${port}`);
})


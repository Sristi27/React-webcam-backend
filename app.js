const express=require('express');
const multer=require('multer');
const cors=require('cors');
const path=require('path')
const bodyParser = require('body-parser')
const PORT=4000;

const fs = require('fs')
const app=express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    fileFilter:fileFilter
 });


app.post("/uploadForm",
upload.single('myImg'), 
async (req,res,next)=>
{
    if(req.file)
    {
        console.log("Successfully saved")
        const pathName=req.file.path;
        res.send({message:"Success",fileData:req.file,pathInDest:pathName})
    }
});

app.get("/",(req,res)=>
{
    res.send("Hello peeps!")
})
app.listen(PORT,()=>
    {
        console.log("Server running");
    })
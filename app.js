const express=require("express");
const bodyparser=require("body-parser");
/*const request=require("request");
const https=require("https");*/
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(express.static("public"));

var items=[];
var worklist=[];
app.get("/",function(req,res)
{
    var today = new Date();
    var option={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    var day= today.toLocaleDateString("en-US",option)
    res.render("list",{kindofday:day,new_item:items})
});

app.post("/",function(req,res)
{   var a=req.body.input;
    if(req.body.list==="work")
    {
        worklist.push(a);
        res.redirect("/work");
    }
    else{
    items.push(a);
    res.redirect("/");
    }
});

app.get("/work",function(req,res)
{
    res.render("list",{kindofday:"work list",new_item:worklist})
    
});

app.listen(process.env.PORT || 3000,function()
{
    console.log("server started at 3000");
});
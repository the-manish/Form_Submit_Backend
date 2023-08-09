import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose
.connect("mongodb://127.0.0.1:27017",{
    dbName:"backend",
})
.then(()=>console.log("Database Connected"))
.catch((e)=>console.log(e));

const messageSchema =new mongoose.Schema({
    name:String,
    email:String,
});

const Messge= mongoose.model("Message",messageSchema)

const app = express();

const users=[];

//Using Middlewares
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({ extended:true}));
app.set("view engine","ejs");

//Setting up View Engine
app.get("/",(req,res)=>{
    res.render("index.ejs");
});

/*app.get("/add",(req,res)=>{
 Messge.create({ name:"Manish", email: "manishkumartgo@gmail.com"}).then(() => {
res.send("Nice");
 });   
});
*/
app.get("/success",(req,res)=>{
    res.render("success");
});
app.post("/contact",async(req,res)=>{
 
 await Messge.create({name:req.body.name,email:req.body.email});
res.redirect("/success");
});

app.get("/users",(req,res)=>{
res.json({
    users,
})
});
app.listen(5000,()=>{
    console.log("Server is working");
});
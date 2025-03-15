import express from "express"

const app = express();

const port = 4000;

app.get('/', (req,res) =>{
    res.redirect("/test")
});

app.get('/test', (req,res) =>{
    res.json({message:"Express is working! Jane Lopez"});
});

app.listen(port, () =>{
    console.log(`Server is listening at http://localhost:${port}`);
});
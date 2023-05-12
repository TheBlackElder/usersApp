
const express = require('express');
  
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
// app.set('views', path.join(_dirname, 'views'))
app.set("view engine", "ejs");

      
app.get('/', (req, res)=>{
    res.status(200);
    res.render("users_index");
});

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
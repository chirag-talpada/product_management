
const express = require("express");
const cors = require("cors");

const { getRoles } = require("./controller/roles.controller");

const users=require('./routes/user.route')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req,res)=>{
  res.send("hello")
});

app.use('/api/users',users);



app.get("/api/roles",getRoles)




const PORT =  5000; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
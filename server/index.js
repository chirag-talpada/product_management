
const express = require("express");
const cors = require("cors");
const { getUsers } = require("./controller/user.controller");
const { getRoles } = require("./controller/roles.controller");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req,res)=>{
    res.send("hello")
});

app.get("/users", getUsers);
app.get("/roles",getRoles)




const PORT =  5000; 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
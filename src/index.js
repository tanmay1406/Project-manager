import dotenv from "dotenv"
import app from "./app.js"
dotenv.config({
    path:"./.env"
})//this is helpful when we will be shifting the main entering file to some new folder later on in the project

/*let myusername = process.env.MY_USERNAME
console.log(myusername)*/
const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})
    

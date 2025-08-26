import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/db.js"

dotenv.config({
    path:"./.env"
})//this is helpful when we will be shifting the main entering file to some new folder later on in the project

/*let myusername = process.env.MY_USERNAME
console.log(myusername)*/
const port=process.env.PORT || 3000

 
connectDB()
    .then(()=>{
        app.listen(port,()=>{
        console.log(`app listening on port http://localhost:${port}`)
    })
    })
    .catch((err)=>{
        console.error("MongoDB connection failed")
        process.exit(1)
    })
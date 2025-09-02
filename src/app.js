import express from "express"
import cors from "cors"
const app = express()

export default app 

//basic configuration
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

//cors configurations 
app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true, //this is there so we can use cookies
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],//this is dor the APIS this is also there in postman api
    allowedHeaders:['Content-Type','Authorization'],
     
}))

//import the routes
import healthCheckRouter from "./routes/healthCheck.routes.js"
import authRouter from "./routes/auth.routes.js"

app.use("/api/v1/healthcheck",healthCheckRouter)//this goes to the router file and there usses the use() to check the api 
app.use("/api/v1/auth",authRouter)
app.get("/",(req,res)=>{
    res.send("Hello World")
})

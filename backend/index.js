require("dotenv").config();
const express = require("express")
const app = express();
const cors = require("cors");
const cookieParser= require("cookie-parser");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnect");
const morgan = require("morgan"); 


const PORT =  process.env.PORT || 5000;
const productRouter = require("./routes/productRoutes");
const authRouter = require("./routes/authRoute");
const MONGODB_URL = "mongodb+srv://traya_admin:PXrhfye5yM5XEtOa@traya.8gjndyi.mongodb.net/Traya?retryWrites=true&w=majority";

app.use(cors({
    origin: ["http://localhost:3001"],
    credentials:true
}));

  
app.get("/", (req,res) => {
    res.send("Backend Live")
});
 

//to set router


app.use(morgan("dev"));
app.use("/api/user", authRouter);
app.use("/api/products",productRouter);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(notFound);
app.use(errorHandler);



const start = async() => {
    try{
        await connectDB(MONGODB_URL);
        app.listen(PORT, () => {  
           console.log( `${PORT} connected`);
        })
    } catch(error){
        console.log(error);
    }
}

start();


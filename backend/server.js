const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const app = express();
const cors=require('cors');
const morgan=require('morgan');
const helmet=require('helmet');
const bodyparser=require('body-parser');
const FarmerRoutes=require('./routes/farmers')
const EnthusiatsRoutes=require('./routes/enthusiats.js');
const Farmerauth=require('./routes/F_auth.js');
const Enthusiatsauth=require('./routes/E_auth')
const userRoutes = require("./routes/userRoutes")
const {notFound , errorHandler} = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());


app.use("/api/Farmers", FarmerRoutes);
app.use("/api/Enthusiats", EnthusiatsRoutes);
app.use("/api/Farmerauth", Farmerauth);
app.use("/api/Enthusiatsauth", Enthusiatsauth);
app.get('/',(req,res)=>{
    res.send("API running")
});
app.use('/api/user',userRoutes);
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 3000
app.listen(PORT,console.log(`Server is running on port ${PORT}`));
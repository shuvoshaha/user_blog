import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './router/router.js'

dotenv.config()
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;


// middleware
app.use(express.json({ extended: true, limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());
app.use(router);

//connection

mongoose.connect(process.env.CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(res => {
        console.log('DB is connected')
    })
    .catch(err => {
        console.log("DB is not connected")
    });
 

// router middleware
app.use("/user", userRouter);


// app.get("/", (req, res) =>{
//     res.send("data is connected")
// })


app.listen(port, () => {
    console.log(`Currently server is on port ${port}`)
})
import express from 'express';
import Connection from './Database/db.js';
import dotenv from 'dotenv';
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';//navin jis request me body include hoti hai usko handle karne ke liye


const app=express();
dotenv.config();

app.use(cors());//browser default behaviour me dono frontend and backend port ke liye cors error deta hai
app.use(bodyParser.json({extended:true}));//request ki body json ke format me hogi toh usko parse kar s
app.use(bodyParser.urlencoded({extended:true}));//url ko parse karne ke liye ,agar url me hamne space diya toh browser usme invalid characters add kar deta hai   toh us url ko parse karne ke liya
app.use("/",Router);


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server is running successfully on ${PORT}`);
});

Connection();

/*Dependencies are the packages that your project needs to run in production. These are the essential modules required for your application to function properly when it is deployed. Purpose: DevDependencies are the packages that are only needed during the development and testing phases of your project. These are not required for the application to run in production. */
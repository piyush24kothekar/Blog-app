import mongoose from 'mongoose';

const Connection=async()=>{
    const URL=  process.env.CONNECTION_STRING;
    try{
        // jo purana parser hai usko mat lo newParser ko parse karo
        await mongoose.connect(URL);
        console.log('Database connected Successfully');
    }catch(error){
        console.log('Error while connecting with the database',error);
    }
}

export default Connection;
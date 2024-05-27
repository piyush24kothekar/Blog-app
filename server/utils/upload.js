import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
dotenv.config();

import multer from 'multer';
//multer-gridfs-storage ki help se hum mongodb pe image ko store kar sakhte hai aur multer image ko upload karne ke liye

const storage=new GridFsStorage({
    url:process.env.CONNECTION_STRING,
    options:{useNewUrlParser:true},
    file:(request,file)=>{
        const match=["image/png","image/jpg"];//mujhe jpg,png file ko hi upload karna hai 
        if(match.indexOf(file.mimeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }   
})
// iss middleware ne apke imag ko mongodb pe upload kr diya
export default multer({storage});
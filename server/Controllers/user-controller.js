import bcrypt from 'bcrypt';
import User from '../Models/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from '../Models/token.js';

dotenv.config();
export const signupUser=async (req,res)=>{
    try
    {
        //adding some textual content before password is called as salt
        // const salt=await bcrypt.genSalt();//bcrypt.genSalt(10-represent amount of salt)
        const hashedPassword=await bcrypt.hash(req.body.password,10);//2nd paramter bydefault salt hoi hota hai woh internally salt generate karke add kar deta hai
        //password 1234 ek user ne dala toh uska hash password:dsjkdkskdsafnsd ye hoga but same time pe dusre user ka 1234 passsword hai toh password:mvncbmncvnjhu alag hoga
        const user={name:req.body.name,username:req.body.username,password:hashedPassword};
        const newUser=new User(user);//validate the given user body with the schema 
        await newUser.save();//saving the user body into the database

        return res.status(200).json({msg:'Signup Successful'});
    }catch(error){
        return res.status(500).json({msg:"Error while signup the user"});//500 is internal server error
    }
}

// export  const loginUser=async(req,res)=>{
//     let user=await User.findOne({username:req.body.username});
//     if(!user){
//         return res.status(400).json({msg:"Username does not exists"});
//     }

//     try{
//         // password ko database se decrypt karke uss username ke corresponding password ko match karne ke liye compare method
//         let match=await bcrypt.compare(req.body.password,user.password);
//         if(match){
//             const accesstoken=jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});

//             //acccesstoken 15 min me expire ho jayega but uske expire hone ke baad refreshtoken ki request kar sakhte ho ,agar aapke pass refresh toekn hai to aap phirse accesstoken generate kar sakhte ho

//             const refreshtoken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
//             //har bar naye user ke liye refreshtoken ko store karna hoga

//             const newToken=new Token({token:refreshtoken});
//             await newToken.save();
//             res.status(200).json({accesstoken:accesstoken,refreshToken:refreshtoken,name:user.name,username:user.username});
//         }
//         {
//             res.status(400).json({msg:"Password does not match"});
//         }
//     }catch(error){
//         return res.status(500).json({msg:'Error while login in User'});
//     }
//     res.status(400).json({ message: 'Bad Request' });
// };

export const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ msg: "Username does not exist" });
        }

        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            const accesstoken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

            const refreshtoken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
            const newToken = new Token({ token: refreshtoken });
            await newToken.save();

            return res.status(200).json({ accesstoken, refreshToken: refreshtoken, name: user.name, username: user.username });
        } else {
            return res.status(400).json({ msg: "Password does not match" });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Error while logging in User' });
    }
};

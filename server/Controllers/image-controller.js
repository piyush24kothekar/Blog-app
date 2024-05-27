

const   url="http://localhost:5000";

export const uploadImage=(req,res)=>{
    if(!req.file){
        return res.status(404).json({msg:"File not found"});
    }

    const imageUrl=`${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
}


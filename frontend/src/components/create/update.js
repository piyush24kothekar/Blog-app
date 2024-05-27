import { Box,styled ,FormControl,InputBase, Button,TextareaAutosize} from "@mui/material";
import {AddCircle as Add, Description} from '@mui/icons-material';
import { useState,useEffect,useContext } from "react";
// InputBase ek textfield input leta hai,TextareaAutosize html ke Textarea jaisa tag hai
import { useLocation ,useNavigate,useParams } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)(({theme})=>({
    margin:"50px 100px",
    [theme.breakpoints.down('md')]:{
        margin:0    
    }
}));

const Image=styled('img')({
    width:"100%",
    height:"50vh",
    objectFit:"cover"
})

const StyledFormControl=styled(FormControl)`
    margin-Top:10px;
    display:flex;
    flex-direction:row;
`
const InputTextField=styled(InputBase)`
    flex:1;
    margin:0 30px;
    font-size:25px;
`
const TextArea=styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`; 

const InitialPost={
    title:'',
    Description:'',
    picture:"",
    username:"",
    categories:"",
    createdDate:new Date()
}


const UpdatePost=()=>{
    
    
    const {account}=useContext(DataContext);//DataContext aap account field ko nikal rhe ho
    
    const location=useLocation();//humko url se values leni uske liye
    const navigate=useNavigate();
    
    const [post,setPost]=useState(InitialPost);
    const[file,setFile]=useState('');
    const { id } = useParams();

    const url="https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostbyId(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);


    useEffect(()=>{
        const getImage=async()=>{
            if(file){
                const data=new FormData();
                console.log(file);
                data.append("name",file.name);
                data.append("file",file);   

                //API CAL
                const response=await API.uploadFile(data);  
                post.picture=response.data;
            }
        }
        getImage();
        post.categories=location.search?.split('=')[1] || 'All';
        post.username=account.username;
    },[file])

    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value});
    }

    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }

    return (
        <Container>
            <Image src={url} alt="banner"></Image>

            <StyledFormControl>
                    <InputTextField placeholder="Title" value={post.title} onChange={(e)=>handleChange(e)} name="title"/>
                    <Button variant="contained" onClick={()=>updateBlogPost()}>Update</Button>
            </StyledFormControl>

            <TextArea
                minRows={5} 
                placeholder="Tell your story..."
                onChange={(e)=>handleChange(e)} name="description"
                value={post.description}
            />
        </Container>
    )
}   

export default UpdatePost;
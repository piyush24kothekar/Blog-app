
import { useState,useContext } from 'react';//useContext hook to consume the DataContext, allowing it to access and update the account state.
import {Box ,TextField,Button,styled,Typography} from '@mui/material';//The Box component is a generic container for grouping other components. It's a fundamental building block when working with Material UI—you can think of it as a <div> with extra built-in features, like access to your app's theme and the sx prop.
// The TextField wrapper component is a complete form control including a label, input, and help text. It comes with three variants: outlined (default), filled, and standard.Text fields allow users to enter text into a UI. They typically appear in forms and dialogs.

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';//konse context me se apko value nikalni hai
import { useNavigate } from 'react-router-dom';//login hone ke baad user ko home page dikhane ke liye

// mui ke style component se hum jo chahe woh element ko css add karke naya component render kar sakhte hai

// component me Box element ke saath css bhi hai
const Component=styled(Box)`
    width:400px;
    margin:auto;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
// hame html element ko styled ki madat se ss add karni hai toh usko string ke andar and css content ko ek object ke rup pass karna hota hai
const Image=styled("img")({
    width:200,
margin:'auto',
display:'flex',
padding:'50px 0px 0px'
});

const Wrapper=styled(Box)`
    padding:25px 35px;
    display:flex;
    flex:1;
    flex-direction:column;
    &> div,& >button ,& > p{
        margin-top:20px;
    }
`

const LoginButton=styled(Button)`
    text-transform:none;
    background:#36f797;
    height:48px;
    border-radius:4px;
`

const SignUpButton=styled(Button)`
    text-transform:none;
    background:#fff;
    color:#36b0f7;
    height:48px;
    border-radius:2px;
    box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2);
`

const Text=styled(Typography)`
    color:#878787;
    font-size:16px;
`

const Error=styled(Typography)`
    font-size:10px;
    color:#ff6161;
    margin-top:10px;
    font-weight:600;
`
const loginInitialValues={
    username:'',
    password:''
}

const signupInitials={
    name:'',
    username:'',
    password:''
}
const Login=({isUserAuthenticated})=>{
    const imageURL='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFw0eA7zNJdUQ4TGLnc1erHT1R7zORXkW6lW9bkQDCKoiqglo5sOqi4mnY60M7cqKyVNY&usqp=CAU';

    const [account,toggleAccount]=useState("login");
    const [signup,setSignup]=useState(signupInitials);
    const [error,setError]=useState('');//user ko error dikhane ke liye
    const [login,setLogin]=useState(loginInitialValues);

    const {setAccount}=useContext(DataContext);
    const navigate=useNavigate();//useNavigate() ko initialize karna padta hai

    const toggleSignup=()=>{
        (account==='signup')?toggleAccount('login'):toggleAccount('signup');
    }
    const onInputChange=(e)=>{
        // ... ka matlab purani values ke saath append karo,key:e.target.name and uski value:e.target.value ye rakho
        setSignup({...signup,[e.target.name]:e.target.value});
    }

    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }

    const signupUser=async ()=>{
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setSignup(signupInitials);
            toggleAccount('login');
        }
        else
        {
            setError('Something went wrong Please Try again later');
        }
        
    }

    const loginUser=async()=>{
        let response= await API.userLogin(login);
        if(response.isSuccess){
            setLogin(loginInitialValues);
            setError('');

            sessionStorage.setItem('accesstoken',`Bearer ${response.data.accesstoken}`);
            sessionStorage.setItem('refreshtoken',`Bearer ${response.data.refreshToken}`);

            //blog kiske kiya ya comment kisne kiya uska nam pta hona chahiye hum CONTEXTAPI ke through username ,name ko globally store karayenge
            setAccount({username:response.data.username,name:response.data.name});

            isUserAuthenticated(true);

            navigate("/");
        }else{
            setError(`Something went wrong! Please try again later`);
        }
    }
    return (
        <Component>
            <Box>
            <Image src={imageURL} alt='blogimage'/>  
            {
                account==="login"?
                <Wrapper>
                    <TextField variant='standard' value={login.username} onChange={(e)=>onValueChange(e)} name="username" label='Enter username'/>{/*label works as placeholder */ }
                    <TextField variant='standard'  value={login.password} onChange={(e)=>onValueChange(e)} name="password" label='Enter password'/>
                    {error && <Error>{error}</Error>}
                    <LoginButton variant='contained' onClick={()=>loginUser()}>Login</LoginButton>
                    <Text style={{textAlign:'center'}}>Or</Text>{/*Typography p tag ka replacement hai mui me */}
                    <SignUpButton onClick={()=>toggleSignup()}>Create an account</SignUpButton>
                </Wrapper>
                :
                <Wrapper>
                    <TextField variant='standard' label='Enter Name' onChange={(e)=>onInputChange(e)} name='name'/>{/*label works as placeholder */ }
                    <TextField variant='standard' label='Enter Username' onChange={(e)=>onInputChange(e)} name='username'/>
                    <TextField variant='standard' label='Enter Password' onChange={(e)=>onInputChange(e)} name='password'/>
                    {error && <Error>{error}</Error>}
                    <SignUpButton onClick={()=>signupUser()}>SignUp</SignUpButton>
                    <Text style={{textAlign:'center'}}>Or</Text>{/*Typography p tag ka replacement hai mui me */}
                    <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account</LoginButton>
                </Wrapper>
            }
            </Box>
        </Component>
    )
};

export default Login;
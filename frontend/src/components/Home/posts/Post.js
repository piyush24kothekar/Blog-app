
import { Box, Typography,styled } from "@mui/material";
import { addElipse } from "../../../utils/common-utils";

const Container=styled(Box)`
    border:1px solid #d3cede;
    border-radius:10px;
    margin:10px;
    height:350px;
    display:flex;
    align-items:center;
    flex-direction:column;
    ${'' /* parent me se child ko css inherit karne ke liye */}
    & > p,& >img{
        padding:0 5px 5px 5px;
    }
`
const Image=styled('img')({
    width:'100%',
    borderRadius:'10px 10px 0 0',
    objectFit:'cover',
    height:150
});

const Text=styled(Typography)`
    color:#878787;
    font-size:12px;
`

const Heading=styled(Typography)`
    font-size:24px;
    font-wright:600;
`
const Details=styled(Typography)`
    font-size:14px;
    word-break:break-word;
`
const Post=({post})=>{
    const url=post.picture?post.picture:"https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    return(
        <Container>
            <Image src={url} alt="blog"/>
            <Text>{post.categories}</Text>
            <Heading>{addElipse(post.title,20)}</Heading>
            <Text>{post.username}</Text>   
            <Details>{addElipse(post.description,80)}</Details>   
        </Container>
    )
};

export default Post;
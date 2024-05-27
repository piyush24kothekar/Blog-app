import {Box,Typography,styled} from '@mui/material';
// Box
// The Box component is a generic, theme-aware container with access to CSS utilities from MUI System.

const Image=styled(Box)`
    background:url('https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg')center/55% repeat-x;
    width:100%;
    height:40vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
`

const Heading=styled(Typography)`   
    font-size:70px;
    color:#FFFFFF;
    line-height:1
`

const SubHeading=styled(Typography)`
    font-size:10px;
    color:#FFFFFF;
    text-align:bottom;
`
const Banner=()=>{
    return (
        <Image>
            <Heading>BLOGGING WEBSITE</Heading>
            <SubHeading>By Piyush Kothekar</SubHeading>
        </Image>
    )
}

export default Banner;
import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from "@mui/material"
import { categories } from "../../constants/data";
import { Link,useSearchParams } from "react-router-dom";

// grid helps for bulding responsive ui,useSearchParams url me question mark  ke baad ki values ko lene ke liye


const StyledTable=styled(Table)`
    border:1px solid rgba(224,224,224,1);
`

const StyledButton=styled(Button)`
    margin:20px;
    width:85%;
    background:#6495ED;
    color:#fff;
`

const StyledLink=styled(Link)`
    text-decoration:none; 
    color:inherit;
`

const Categories = () => {

    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');//url se category lene ke liye
    return (
        <>
        {/* agar music category ko select karne baad  */}
            <StyledLink to={`/create?category=${category || ''}`}>  
            <StyledButton variant="contained">Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <TableHead>
                    <TableRow>
                        <TableCell>
                        <StyledLink to="/">
                            All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>
                                <StyledLink to={`/?category=${category.type}`}>
                                {category.type}
                                </StyledLink>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </StyledTable>
        </>
    )
}

export default Categories;
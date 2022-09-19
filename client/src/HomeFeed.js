import styled from "styled-components";

const HomeFeed = () => {
    return (
        <>
            <DivName>
            Sign Up
            </DivName>
            <DivName>
            Sign In
            </DivName>
        </>
    )
};

const DivName = styled.div `
font-family: Arial, Helvetica, sans-serif;
font-weight: bold;
text-decoration: none;
display: flex;
flex-direction: row;
border: 20px;
margin-top: 20px;
`

export default HomeFeed;
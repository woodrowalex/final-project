import styled from "styled-components";

const HomeFeed = () => {
    return (
        <>
            <DivName>
            Welcome                          
            </DivName>
            <DivName>
            Please log in or sign Up
            </DivName>
        </>
    )
};

const DivName = styled.div `
/* display: flex;
flex-direction: column; */
justify-content: space-around;
align-items: center;
font-size: x-large;
font-weight: bold;
text-decoration: none;
display: flex;
flex-direction: row;
border: 20px;
margin-top: 20px;
`

export default HomeFeed;
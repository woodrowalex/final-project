import styled from "styled-components";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';


const SignedIn = () => {
    return (
        <>
            <Div>
            You made it in the club!!                          
            </Div>
            <Div>
            Now go out there and find some cool weather events to share!!
            </Div>
            <Div>
            <ThunderstormIcon/>
            </Div>
            <Div>
            <ThunderstormIcon/>
            </Div>
            <Div>
            <ThunderstormIcon/>
            </Div>
            <Div>
            <ThunderstormIcon/>
            </Div>
        </>
    )
};

const Div = styled.div `
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

export default SignedIn;
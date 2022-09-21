import styled from "styled-components";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { Link } from 'react-router-dom';



const LoggedOut = () => {
    return (
        <>
            <Div>
            You have successfully logged out                            
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
            <Div>
            See you again soon
            </Div>
            <Link to="/login">
                    <LoginButton>Log In Again</LoginButton>
                </Link>
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

const LoginButton = styled.button`
    border-radius: 10px;
    padding: 20px 50px;
    margin: 15px 30px;
    cursor: pointer;
`

export default LoggedOut;
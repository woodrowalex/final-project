import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { PinContext } from "./PinContext";
import { useContext, useState } from "react";




const Header = () => {
     const {
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn
    } = useContext(PinContext);

    // let isLoggedIn === true;
    // const reservation = sessionStorage.getItem("reservation");

    return (
        <Wrapper>
            {/* <Title> */}
                <Link to="/" 
                style={{textDecoration: "none"}}>
                    <h1>Where's the Weather?</h1>
                </Link>
            {/* </Title> */}
            <ButtonDiv>
            {isLoggedIn === false 
            ? <> 
                <Link to="/login">
                    <LoginButton>Log In</LoginButton>
                </Link>
                </>
                : <>
                <Link to="/loggedout">
                    <>
                    <Link to="/login">
                        <SignupButton type="button" onClick={(e) => {
                        e.preventDefault() 
                        setIsLoggedIn(false)} }>Log Out</SignupButton>
                        </Link>
                    </>
                </Link>
                </>
            }
                <Link to="/signup">
                    <SignupButton>Sign Up</SignupButton>
                </Link>
            
            </ButtonDiv>
        </Wrapper>
    );
};

const Wrapper = styled.header`
    display: flex;
    justify-content: space-around;
    background-color: #efe9e1;
    height: 110px;
    border: 1px solid black;
`;


const ButtonDiv = styled.div`
    display: flex;
    justify-content: space-between;
`

const LoginButton = styled.button`
    border-radius: 10px;
    padding: 20px 50px;
    margin: 15px 30px;
    cursor: pointer;
`

const SignupButton = styled.button`
    border-radius: 10px;
    padding: 20px 50px;
    margin: 15px 30px;
    cursor: pointer;
`



// const Title = styled.div`
//     h1 {
//         text-decoration: none;
//     }

// `

export default Header;

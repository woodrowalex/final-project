import styled from "styled-components";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PinContext } from "./PinContext";
import SignedIn from "./SignedIn";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';


const Login = () => {
    const {
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn
    } = useContext(PinContext);

    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput]= useState();
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit")
        
        const loggingIn = {
            email: emailInput,
            password: passwordInput
        };

        const options = {
            method: "POST",
            body: JSON.stringify(loggingIn),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };
        
        fetch("/api/login", options) 
            .then((res) => res.json())
            .then((data) => {
                // if (data.status === 200) {
                    setIsLoggedIn(true);
                    // setCurrentUser(data.data);
                    // navigate("/signedin");
                // } else {
                //     window.alert("Error - try again");
                // }
            });
    };

    console.log(isLoggedIn)
    
    return (
        <FormWrapper>
            {isLoggedIn === false 
            ? <>    
                <FormBody onSubmit={handleSubmit}>
                    LOG IN BELOW
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={usernameInput}
                    onChange={(e) => {
                        setUsernameInput(e.target.value);
                    }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={emailInput}
                    onChange={(e) => {
                        setEmailInput(e.target.value);
                    }}
                />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={passwordInput}
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                    />
                    <Button 
                    type="submit"
                    >Log In</Button>
                    
                </FormBody>
            </>
            : <>
            <Div>
                Sweeeeeet, you logged in!
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
            <Button type="button" onClick={(e) => {
                e.preventDefault() 
                setIsLoggedIn(false)} }>Log Out</Button>
            </>
            }

        </FormWrapper>
    );
};

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormBody = styled.form`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border: 3px solid var(--color-alabama-crimson);
`;

const Button = styled.button`
    border-radius: 8px;
    font-size: 14px;
    color: black;
    background-color: #efe9e1;
    width: 100px;
    height: 40px;
    border: none;
    margin: 20px 20px;
    &:hover {
        font-weight: bold;
        border: 1px solid black;
        cursor: pointer;
    }
`;

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
`;

export default Login;
import styled from "styled-components";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PinContext } from "./PinContext";

const Login = () => {
    const {
        setCurrentUset,
        isLoggedIn,
        setIsLoggedIn
    } = useContext(PinContext);

    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState();
    const [emailInput, setEmailInput] = useState();
    const [passwordInput, setPasswordInput]= useState();
    const [inputType, setInputType] = useState();
    
    const handleSubmit = (e) => {
        e.preventDefault();
    
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
                if (data.status === 200) {
                    // sessionStorage.setItem("user", JSON.stringify(data));
                    isLoggedIn = true;
                    navigate.push("/confirmed");
                } else {
                    window.alert("Error - try again");
                }
            });
    };
    
    return (
        <FormWrapper>
            <form onSubmit={handleSubmit}>
                <FormBody>
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
                        type={inputType}
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                    />
                    <Button type="submit">Log In</Button>
                </FormBody>
            </form>
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
    background-color: var(--color-alabama-crimson);
    border: 0;
    &:hover {
        cursor: pointer;
    }
    &:disabled {
        color: var(--color-orange);
        background-color: #d1560e;
        border: 0;
    }`

export default Login;
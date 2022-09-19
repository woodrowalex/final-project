import styled from "styled-components";

import { useContext, useState } from "react";
import { PinContext } from "./PinContext";

const Signup = () => {
    const {
        setCurrentUser,
        isLoggedIn,
        setIsLoggedIn
    } = useContext(PinContext);

    const [userFirstName, setUserFirstName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
    const newUser = {
        username: userFirstName,
        email: userEmail,
        password: passwordInput,
    };

    const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: { 
            Accept: "application/json",
            "Content-Type": "application/json" 
        },
    };

        fetch("/api/signup", options)
            .then((res) => res.json())
            .then((json) => {
                const {status, error} = json;

                if (status >= 400) {
                    console.log("error is >400")
                } else if (status === 200) {
                    console.log("status is 200")
                    console.log("Sign Up Successful")
                }
            })
            .catch((err) => console.log(err))
    };
    
    return (
        <>
        {isLoggedIn
        ? (
            <Wrapper>
                <p>You are signed in and ready to explore the weather!</p>
            </Wrapper>
        )
        : (
        
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <FormBody>
                    <p>SIGN UP BELOW</p>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userFirstName}
                    required={true}
                    onChange={(e) => {
                        setUserFirstName(e.target.value);
                    }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={userEmail}
                    required={true}
                    onChange={(e) => {
                        setUserEmail(e.target.value);
                    }}
                />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={passwordInput}
                        required = {true}
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                    />
                    <Button type="submit">Submit</Button>
                </FormBody>
            </form>
        </Wrapper>
        )}
        </>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormBody = styled.div`
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
    }
`;

export default Signup;

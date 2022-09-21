import styled from "styled-components";

import { useContext, useState } from "react";
import { PinContext } from "./PinContext";
import { useNavigate } from "react-router-dom";


const Signup = () => {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        isLoggedIn,
        setIsLoggedIn

    } = useContext(PinContext);

    const navigate = useNavigate();


    // const [userFirstName, setUserFirstName] = useState("");
    // const [userEmail, setUserEmail] = useState("");
    // const [passwordInput, setPasswordInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
    const newUser = {
        username,
        email,
        password
    };


    fetch("/api/add-user", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.status == 200) {
                sessionStorage.setItem("user", JSON.stringify(data.data));
                setIsLoggedIn(true);
                navigate("/signedin");
            } else if (data.status == 404) {
                window.alert("This user already exists");
            } else {
                window.alert("Error - try again");
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
                    required={true}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required={true}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required = {true}
                        onChange={(e) => {
                            setPassword(e.target.value);
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

export default Signup;

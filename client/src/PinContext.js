import { createContext, useState } from "react";


export const PinContext = createContext(null);

export const PinProvider = ({ children }) => {

    const [username, setUsername] = useState("user");
    const [pins, setPins] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <PinContext.Provider
            value={{
                username,
                setUsername,
                pins,
                setPins,
                category,
                setCategory,
                description,
                setDescription,
                email,
                setEmail,
                password,
                setPassword,
                isLoggedIn,
                setIsLoggedIn
            }}
        >
        {children}
        </PinContext.Provider>
    );
};
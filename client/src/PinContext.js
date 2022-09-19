import { createContext, useState } from "react";


export const PinContext = createContext(null);

export const PinProvider = ({ children }) => {

    const [currentUsername, setCurrentUsername] = useState("user");
    const [pins, setPins] = useState(null);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState("");

    return (
        <PinContext.Provider
            value={{
                currentUsername,
                setCurrentUsername,
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
            }}
        >
        {children}
        </PinContext.Provider>
    );
};
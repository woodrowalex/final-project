
const Signup = () => {
//     const user = {
//         username,
//         email,
//         password,
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
    
//         fetch("/api/login", {
//             method: "POST",
//             body: JSON.stringify(reservation),
//             headers: {
//                 Accept: "application/json",
//                 "Content-Type": "application/json",
//             },
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.status === 201) {
//                     sessionStorage.setItem("user", JSON.stringify(data));
//                     // history.push("/confirmed");
//                 } else {
//                     window.alert("Error - try again");
//                 }
//             });
//     };
    
//     return (
//         <FormWrapper>
//             <form onSubmit={handleSubmit}>
//                 <FormBody>
//                 <input
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     onChange={(e) => {
//                         setUsername(e.target.value);
//                     }}
//                 />
//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     onChange={(e) => {
//                         setEmail(e.target.value);
//                     }}
//                 />
//                     <input
//                         type="text"
//                         name="password"
//                         placeholder="Password"
//                         onChange={(e) => {
//                             setPassword(e.target.value);
//                         }}
//                     />
//                     {Object.values(user).includes(" ") 
//                         ? (<Button type="submit" disabled>Submit</Button>) 
//                         : (<Button>Submit</Button>)}
//                 </FormBody>
//             </form>
//         </FormWrapper>
//     );
};

// const FormWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
// `;

// const FormBody = styled.div`
//     display: flex;
//     flex-direction: column;
//     padding: 10px;
//     border: 3px solid var(--color-alabama-crimson);
// `;

// const Button = styled.button`
//     background-color: var(--color-alabama-crimson);
//     border: 0;
//     &:hover {
//         cursor: pointer;
//     }
//     &:disabled {
//         color: var(--color-orange);
//         background-color: #d1560e;
//         border: 0;
//     }
// `;

export default Signup;
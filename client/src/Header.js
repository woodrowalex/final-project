import styled from 'styled-components'


const Header = () => {
    // const reservation = sessionStorage.getItem("reservation");

    return (
        <Wrapper>
            <Logo>
                <h1>Where's the Weather?</h1>
            </Logo>
            <ButtonDiv>
                <LoginButton>Log In</LoginButton>
                <SignupButton>Sign Up</SignupButton>
            </ButtonDiv>
            {/* <Nav>
                <>
                {(!reservation)
                ? <></>
                : <StyledNavLink to='/reservation'>Reservation</StyledNavLink>
                }
                </>
            </Nav> */}
        </Wrapper>
    );
};

const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    background-color: #efe9e1;
    height: 110px;
`;
const Logo = styled.div`    
`;

const ButtonDiv = styled.div`
    position: absolute;
    top: 10%;
    right: 10%;
    background-color: white;
`

const LoginButton = styled.button`

`

const SignupButton = styled.button`

`

export default Header;

import styled from "styled-components";

export default function FrontPageLogoBox() {
    return (
        <BlackLogoSpace>
            <LogoTextBox>
                <Logo>linkr</Logo>
                <Slogan>
                    <p>save, share and discover</p>
                    <p>the best links on the web</p>
                </Slogan>
            </LogoTextBox>
        </BlackLogoSpace>
    )
}

const BlackLogoSpace = styled.div`
    width: 62.5vw;
    height: 100vh;
    background-color: #000;
    margin-top: -72px;
    
`;

const LogoTextBox = styled.div`
    margin: 30vh 8%;
    width: 442px;
`;

const Logo = styled.h1`
    font-family: 'Passion One', cursive;
    font-weight: bold;
    font-size: 106px;    
`;

const Slogan = styled.p`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
`
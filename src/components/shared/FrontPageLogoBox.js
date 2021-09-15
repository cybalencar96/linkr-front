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
    @media (max-width: 768px){
        width: 100vw;
        height: 175px;
    }
`;

const LogoTextBox = styled.div`
    margin: 30vh 8%;
    width: 442px;
    @media (max-width: 768px){
        margin: 10px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

const Logo = styled.h1`
    font-family: 'Passion One', cursive;
    font-weight: bold;
    font-size: 106px;
    @media (max-width: 768px){
        font-size: 76px;
    }
`;

const Slogan = styled.p`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
    @media (max-width: 768px){
        font-size: 23px;
    }
`
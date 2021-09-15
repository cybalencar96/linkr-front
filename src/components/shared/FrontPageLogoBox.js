import styled from "styled-components";

export default function FrontPageLogoBox() {
    return (
        <BlackLogoSpace>
            <LogoTextBox>
                <Logo>linkr</Logo>
                <Slogan>save, share and discover</Slogan>
                <Slogan>the best links on the web</Slogan>
            </LogoTextBox>
        </BlackLogoSpace>
    )
}

const BlackLogoSpace = styled.div`
    width: 62.5vw;
    height: 100vh;
    background-color: #151515;
    margin-top: -72px;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
    @media (max-width: 992px){
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        width: 100vw;
        height: 175px;
    }
`;

const LogoTextBox = styled.div`
    margin: 30vh 8%;
    width: 442px;
    @media (max-width: 992px){
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
    @media (max-width: 992px){
        font-size: 76px;
        margin-bottom: -10px
    }
`;

const Slogan = styled.p`
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    font-size: 43px;
    line-height: 64px;
    @media (max-width: 992px){
        font-size: 23px;
        line-height: 34px;
    }
`;
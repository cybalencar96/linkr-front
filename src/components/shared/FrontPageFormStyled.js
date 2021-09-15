import styled from "styled-components";

const FrontPageFormStyled = styled.form`
    margin-top: -72px;
    width: 37.5vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 992px){
        width: 100vw;
        height: calc(100vh - 175px);
    }
`;

export default FrontPageFormStyled;
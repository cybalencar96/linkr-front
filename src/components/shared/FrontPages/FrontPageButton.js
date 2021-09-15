import styled from "styled-components";

const FrontPageButton = styled.button`
    width: 80%;
    height: 65px;
    border-radius: 6px;
    background-color: #1877F2;
    font-weight: bold;
    font-size: 27px;
    color: #ffffff;
    font-family: 'Oswald', sans-serif;
    margin-bottom: 22px;
    border: none;
    &:disabled{
        opacity: 0.7;
    }
    @media (max-width: 992px){
        width: 90%;
    }
`;

export default FrontPageButton;
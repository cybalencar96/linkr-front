import styled from "styled-components";

const FrontPageInput = styled.input`
    width: 90%;
    height: 65px;
    border-radius: 6px;
    background-color: #ffffff;
    font-size: 27px;
    font-family: 'Oswald', sans-serif;
    font-weight: bold;
    padding-left: 17px;
    margin-bottom: 10px;
    border: none;
    &::placeholder{
        color: #9F9F9F;
    }
    @media (max-width: 992px){
        width: 90%;
        height: 56px;
    }
`;

export default FrontPageInput;
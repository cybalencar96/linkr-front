import styled from "styled-components";

const FrontPageForm = styled.form`
    width: 37.5vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (max-width: 992px){
        margin-top: 40px;
        width: 100vw;
        height: initial;
    }
`;

export default FrontPageForm;
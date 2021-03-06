import styled from "styled-components";


const PageStyled = styled.div`
    padding-top: 72px;
    display: flex;
    position: relative;
    ${props => props.centralized ? "justify-content: center; align-items: center;": ""}
    @media (max-width: 992px){
        flex-direction: column;
    }
`;

export default PageStyled;

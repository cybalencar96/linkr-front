import styled from "styled-components";


const PageStyled = styled.div`
    padding-top: 72px;
    display: flex;
    ${props => props.centralized ? "justify-content: center; align-items: center;": ""}
    @media (max-width: 992px){
        flex-direction: column;
    }
`;

const Hashtag = styled.span`
    font-weight: 700;
    color: white;
    font-size: ${props => props.fontSize ? props.fontSize : "17px"};
`
export default PageStyled;
export {
    Hashtag
}

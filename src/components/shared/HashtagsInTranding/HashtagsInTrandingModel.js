import styled from "styled-components"

export default function HashtagsInTrandingModel (props) {
    return (
        <ContainerTrandingModel>
        </ContainerTrandingModel>
    )
}

const ContainerTrandingModel = styled.div`
    width: 301px;
    height: 20px;
    min-width: 301px;
    max-height: 435px;
    background-color: #333;

    @media(max-width: 994px){
        display: none;
    }
`;

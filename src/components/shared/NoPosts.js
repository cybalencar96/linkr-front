import styled from "styled-components"

export default function NoPosts(props) {
    return (
        <NoPostsContainer centralized={props.centralized}>
            {props.content ? props.content : "Nenhum post encontrado"}
        </NoPostsContainer>
    )
}

const NoPostsContainer = styled.article`
    width: 610px;
    height: 280px;
    background-color: #333;
    font-size: 25px;
    ${props => props.centralized && "display: flex; justify-content: center; align-items: center"};
    
    @media (max-width: 992px) {
        width: 100vw;
        height: 240px;
        border-radius: 0;
        margin-left: 5%
    }
`
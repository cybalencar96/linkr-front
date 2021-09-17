import styled from "styled-components"

export default function NoPosts() {
    return (
        <NoPostsContainer>
            Nenhum post encontrado
        </NoPostsContainer>
    )
}

const NoPostsContainer = styled.article`
    width: 610px;
    height: 280px;
    background-color: #333;
    font-size: 25px;

    @media (max-width: 992px) {
        width: 100vw;
        height: 240px;
        border-radius: 0;
        margin-left: 5%
    }
`
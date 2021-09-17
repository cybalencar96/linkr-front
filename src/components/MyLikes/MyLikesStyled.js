import styled from "styled-components";

const MyLikesContainer = styled.div`
    display: flex;
    gap:20px;

    @media (max-width: 992px) {
        width: auto;
        margin: 0;
    }
`

export {
    MyLikesContainer
}
import styled from "styled-components";

const MyPostsContainer = styled.div`

    & .content {
        display: flex;
        gap:20px;
    }
    
    @media (max-width: 992px) {
        width: auto;
        margin: 0;
        margin-top: 100px;

    }
`

export {
    MyPostsContainer
}
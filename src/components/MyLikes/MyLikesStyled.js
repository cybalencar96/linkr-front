import styled from "styled-components";

const MyLikesContainer = styled.div`
    
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
    MyLikesContainer
}
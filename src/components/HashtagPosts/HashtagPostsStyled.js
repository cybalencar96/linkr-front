import styled from "styled-components";

const HashtagPostContainer = styled.div`

    & .content {
        display: flex;
        gap: 20px;
    }
    @media (max-width: 992px) {
        width: auto;
        margin: 0;
    }
    max-width: 932px;
`

export {
    HashtagPostContainer,
}
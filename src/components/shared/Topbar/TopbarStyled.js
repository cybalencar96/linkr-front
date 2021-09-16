import styled from "styled-components";

const TopbarContainer = styled.header`
    position: fixed;
    width: 100%;
    height: 72px;
    top: 0;
    left:0;
    background-color: #151515;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    & p {
        font-family: 'Passion One', cursive;
        font-size: 35px;
        font-weight: 700;
        color: white;
    }

    & > .userMenu {
        display: flex;
        align-items: center;
        gap:10px;
    }

    & .userMenu img {
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
    }
`

export {
    TopbarContainer
}
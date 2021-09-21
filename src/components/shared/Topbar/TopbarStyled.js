import styled from "styled-components";

const TopbarContainer = styled.header`
    position: fixed;
    width: 100%;
    height: 72px;
    top: 0;
    left:0;
    background-color: #151515;
    z-index: 5;
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
`;

const SearchBarContainer = styled.form`
    width: 540px;
    background-color: white;
    padding: 0 15px;
    height: 45px;
    border-radius: 8px;
    display: ${props => props.display ? props.display : "flex"};
    align-items: center;
    justify-content: space-between;

    & input {
        font-size: 19px;
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;
        border: none;
    }

    & input::placeholder {
        color: #C6C6C6;
    }

    & input:focus {
        outline: none;
    }

    & .searchIcon {
        cursor: pointer;
    }

    @media (max-width: 992px) {
        width: 94%;
        margin: 10px 0 10px 0;

        & input {
            font-size: 15px;
        }
    }
`
export {
    TopbarContainer,
    SearchBarContainer
}
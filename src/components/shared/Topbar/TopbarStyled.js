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

const SuggestionsContainer = styled.section`
    width: 540px;
    background-color: #E7E7E7;
    border-radius: 8px;
    position: relative;
    min-height: 45px;
    display: ${props => props.display ? props.display : "initial"};

    position: fixed;
    top: 15px;
    left: calc(50vw - 270px);

    @media (max-width: 992px) {
        width: 94%;
        position: absolute;
        top: 90px;
        left: calc(50vw - 47%);
    }
`

const SearchBarContainer = styled.form`
    background-color: white;
    padding: 0 15px;
    height: 45px;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
    display: flex;
    
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;

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
        width: 100%;

        & input {
            font-size: 15px;
        }
    }
`

const SuggestedList = styled.ul`
    margin-top: 45px;
`

const UserSuggestedContainer = styled.li`
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 10px;
    cursor: pointer;

    &:hover {
        background-color: lightgray;
    }

    & .username {
        color: black;
        max-width:70%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & .follow {
        color: #C5C5C5
    }

    &:last-child {
        margin-bottom: 10px;
    }
`

export {
    TopbarContainer,
    SearchBarContainer,
    SuggestionsContainer,
    SuggestedList,
    UserSuggestedContainer
}
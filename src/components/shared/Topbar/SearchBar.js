import { useState, useContext } from "react";
import { Search, SearchOutline } from 'react-ionicons'
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from '../../../services/Linkr'
import UserContext from "../../../contexts/UserContext";
import { SearchBarContainer } from './TopbarStyled'

export default function SearchBar() {
    const {userData} = useContext(UserContext)
    const [userNameInput, setUserNameInput] = useState("");
    const [userSuggestions, setUserSuggestions] = useState([])

    function searchName(e) {
        e.preventDefault()
        alert("to procurando")
    }

    function writeAndSuggest(e) {
        setUserNameInput(e.target.value)
        

        // if (!!e.target.value) {
        //     searchUser(e.target.value,userData.token)
        //     .then(res => setUserSuggestions(res.data.users))
        //     .catch(err => console.log(err.response))
        // }
    }

    return (
        <SearchBarContainer onSubmit={searchName}>
            <DebounceInput
                minLength={3}
                debounceTimeout={300}
                placeholder="Search for people and friends" 
                onChange={writeAndSuggest} 
                value={userNameInput}
            />

            <SearchOutline
                color={'#c7c7c7'} 
                height="25px"
                width="25px"
                onClick={searchName}
                className="searchIcon"
            />
        </SearchBarContainer>
    )
}
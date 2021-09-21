import { TopbarContainer, SearchBarContainer } from "./TopbarStyled";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, SearchOutline } from 'react-ionicons'
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from '../../../services/Linkr'

export default function Topbar() {
    return(
        <TopbarContainer>
            <Link to="/timeline"><p>Linkr</p></Link>
            <SearchBar />
            <Menu />
        </TopbarContainer>
    ) 
}

function SearchBar() {
    const [userNameInput, setUserNameInput] = useState("");

    function searchName(e) {
        e.preventDefault()
        alert("to procurando")
    }

    function writeAndSuggest(e) {
        setUserNameInput(e.target.value)
        if (e.target.value) {
            const queryConfig = {
                headers: {
                    Authorization: `Bearer ?username=${e.target.value}`
                }
            }
    
            searchUser(queryConfig)
            .then(res => console.log(res))
            .catch(err => console.log(err.response))
        }
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
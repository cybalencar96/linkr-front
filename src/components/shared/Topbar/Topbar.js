import { TopbarContainer, SearchBarContainer } from "./TopbarStyled";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search, SearchOutline } from 'react-ionicons'


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
    return (
        <SearchBarContainer onSubmit={searchName}>
            <input 
                placeholder="Search for people and friends" 
                onChange={e => setUserNameInput(e.target.value)} 
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
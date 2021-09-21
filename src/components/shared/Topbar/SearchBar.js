import { useState, useContext } from "react";
import { Search, SearchOutline } from 'react-ionicons'
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from '../../../services/Linkr'
import UserContext from "../../../contexts/UserContext";
import { SearchBarContainer,SuggestionsContainer,SuggestedList,UserSuggestedContainer } from './TopbarStyled'
import UserImage from "../UserImage";

export default function SearchBar({display}) {
    const {userData} = useContext(UserContext)
    const [userNameInput, setUserNameInput] = useState("");
    const [userSuggestions, setUserSuggestions] = useState([])
    console.log(userSuggestions)
    function searchName(e) {
        e.preventDefault()
        alert("to procurando")
    }

    function writeAndSuggest(e) {
        setUserNameInput(e.target.value)
        setUserSuggestions([])

        if (!!e.target.value && e.target.value.length >= 3) {
            searchUser(e.target.value,userData.token)
            .then(res => {
                const followers = res.data.users.filter(user => user.isFollowingLoggedUser === true);
                const notFollowers = res.data.users.filter(user => user.isFollowingLoggedUser === false);
                const suggestions = [...followers,...notFollowers];

                setUserSuggestions(suggestions)
            })
            .catch(err => console.log(err.response))
        }
    }

    return (
        <SuggestionsContainer display={display}>
            <SearchBarContainer onSubmit={searchName}>


                <DebounceInput
                    minLength={1}
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
            
            <SuggestedList>
                {
                    userSuggestions.map(userSugestion => <UserSuggested 
                                                            key={userSugestion.id} 
                                                            username={userSugestion.username}
                                                            userImg={userSugestion.avatar}
                                                            follow={userSugestion.isFollowingLoggedUser}
                                                        />)
                }
            </SuggestedList>
        </SuggestionsContainer>
        
    )
}

function UserSuggested({key,username,userImg,follow}) {
    return (
        <UserSuggestedContainer>
            <UserImage src={userImg}/>
            <span className="username">{username}</span>
            {follow ? <span className="follow">• following</span> : <></>}
        </UserSuggestedContainer>
    )
}

const arr = [
   { avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/25/avatar",
id: 25,
isFollowingLoggedUser: false,
username: "carlos"},

{avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/27/avatar",
id: 27,
isFollowingLoggedUser: true,
username: "Carlos"},

{avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/104/avatar",
id: 104,
isFollowingLoggedUser: false,
username: "carlota"},

{avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr/users/122/avatar",
id: 122,
isFollowingLoggedUser: true,
username: "carlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlincarlin"
}
]
import { useState, useContext } from "react";
import { SearchOutline } from 'react-ionicons'
import {DebounceInput} from 'react-debounce-input';
import { searchUser } from '../../../services/Linkr'
import UserContext from "../../../contexts/UserContext";
import { SearchBarContainer,SuggestionsContainer,SuggestedList,UserSuggestedContainer } from './TopbarStyled'
import UserImage from "../UserImage";
import { Link, useHistory } from "react-router-dom";

export default function SearchBar({display}) {
    const {userData} = useContext(UserContext)
    const [userNameInput, setUserNameInput] = useState("");
    const [userSuggestions, setUserSuggestions] = useState([])
    const history = useHistory();
    
    function searchName(e) {
        e.preventDefault()
        searchUser(userNameInput,userData.token).then(res => {
            const userToBeFound = res.data.users.filter(user => user.username === userNameInput)
            if (userToBeFound.length !== 0) {
                setUserNameInput("");
                setTimeout(() => setUserSuggestions([]),100);
                history.push(`/user/${userToBeFound[0].id}`)
            } else {
                setUserSuggestions([]);
                alert('usuario não encontrado')
            }
        })
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

    function closeSuggestions() {
        setTimeout(() => {
            setUserSuggestions([])
            setUserNameInput('')
        },100)
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
                    onBlur={closeSuggestions}
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
                                                            userId={userSugestion.id}
                                                            username={userSugestion.username}
                                                            userImg={userSugestion.avatar}
                                                            follow={userSugestion.isFollowingLoggedUser}
                                                            setUserSuggestions={setUserSuggestions}
                                                            setUserNameInput={setUserNameInput}
                                                        />)
                }
            </SuggestedList>
        </SuggestionsContainer>
        
    )
}

function UserSuggested({userId,username,userImg,follow,setUserSuggestions,setUserNameInput}) {
    const history = useHistory();

    function sendToUserPage(id) {
        setUserNameInput("");
        setUserSuggestions([]);
        history.push(`/user/${id}`)
    }

    return (
        <UserSuggestedContainer onClick={() => sendToUserPage(userId)}>
                <UserImage src={userImg}/>
                <span className="username">{username}</span>
                {follow ? <span className="follow">• following</span> : <></>}
        </UserSuggestedContainer>
    )
}

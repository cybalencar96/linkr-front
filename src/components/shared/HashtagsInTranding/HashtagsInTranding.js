import { useContext, useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components"
import UserContext from "../../../contexts/UserContext";
import { getHashtags } from "../../../services/Linkr";


export default function HashtagsInTranding (props) {

    const [trendingHashtags, setTrendingHashtags] = useState([]);
    const {userData} = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();

    useEffect(() => {
        const config = {
            headers: {
                Authorization : `Bearer ${userData.token}`
            }
        }

        getHashtags(config).then((response) => {
            setTrendingHashtags(response.data);
        })
        .catch((error) => {
            alert("Ops!! Houve um erro ao carregar trending");
        })
        
    }, [userData.token])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(searchInput)
            history.push(`/hashtag/${searchInput}`)
        }
    }
    return (
        <ContainerTranding>
            <div className="fixed">
                <h1>trending</h1>
                <UlHashtags>
                        {trendingHashtags.hashtags && trendingHashtags.hashtags.map( (hashtag) => {
                            return (
                                    <LiHashtags onClick={() => {props.setIsLoading(true); history.push(`/hashtag/${hashtag.name}`)}} key={hashtag.name}># {hashtag.name}</LiHashtags>
                            )
                        }
                    )}
                </UlHashtags>
                <div className="inputContainer">
                    <p>#</p>
                    <InputButtonTrending type='text' placeholder='search a Hashtag' value={searchInput} onKeyDown={handleKeyDown} onChange={(e) => setSearchInput(e.target.value)} required/>
                </div>
           </div>
        </ContainerTranding>
    )
}

const ContainerTranding = styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 27px;
    color: #FFFFFF;
    width: 301px;
    min-width: 301px;
    max-height: 435px;
    border-radius: 16px;

    h1{
        margin: 12px 0 15px 18px;
    }

    & .fixed {
        position: fixed;
        width: 301px;
        background-color: #171717;
        border-radius: 16px;
    }

    & .fixed .inputContainer {
        height: 30px;
        background-color: rgba(50, 50, 50, 1);
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        width: calc(100% - 36px );
        margin: 0 18px 15px 18px;
        padding-left: 10px;
        color: #ffffff;
        display: flex;
        align-items: center;
    }

    & .fixed .inputContainer p {
        font-size: 25px
    }

    @media(max-width: 992px){
        display: none;
    }
`;

const UlHashtags = styled.ul`
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 19px;
    border-top: 1px solid #484848;
`;
const LiHashtags = styled.li`
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 19px;
    color: white;
    margin: 13px 18px;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &:hover {
        text-shadow: 0 0 4px #fff, 0 0 4px #ff0;
    }
`;

const InputButtonTrending = styled.input`
    background-color: rgba(50, 50, 50, 1);
    font-family: 'Lato', sans-serif;
    display:flex;
    align-items:center;
    border:none;
    outline: none;
    font-size: 15px;
    height: 100%;
    color: white;
    font-family: 'Lato', sans-serif;
    font-weight: 700;

    &::placeholder, &::placeholder{
        font-weight: 300;
        color: #949494;
    }
    &:not(:focus), &:focus{
        padding-left: 10px;
    }
`;
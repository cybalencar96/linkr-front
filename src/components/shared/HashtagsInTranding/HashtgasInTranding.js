import { useContext, useEffect, useState } from "react"
import { HeartDislikeSharp } from "react-ionicons";
import { useHistory } from "react-router-dom";
import styled from "styled-components"
import UserContext from "../../../contexts/UserContext";
import { getHashtags } from "../../../services/Linkr";
import Loading from "../Loading";


export default function HashtagsInTranding () {

    const [trendingHashtags, setTrendingHashtags] = useState(null);
    const {userData} = useContext(UserContext);
    const [searchInput, setSearchInput] = useState("");

    const history = useHistory();
    const config = {
        headers: {
            Authorization : `Bearer ${userData.token}`
        }
    }
    
    useEffect(() => {
        getHashtags(config).then((response) => {
            console.log(response);
            setTrendingHashtags(response.data);
        })
        .catch((error) => {
            alert("Ops!! Houve um erro ao carregar trending");
        })
    }, [])

    if (!trendingHashtags) {
        return 	<Loading/>
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if(searchInput)
            history.push(`/hashtag/:${searchInput}`)
        }
    }

    return (
        <ContainerTranding>
           <h1>trending</h1>
           <InputButtonTrending type='text' placeholder='search a Hashtag' value={searchInput} onKeyDown={handleKeyDown} onChange={(e) => setSearchInput(e.target.value)} required/>
           <UlHashtags>
                {trendingHashtags.hashtags.map( hashtag => {
                    return (
                        <LiHashtags onClick={() => history.push(`/hashtag/:${hashtag.name}`)}># {hashtag.name}</LiHashtags>
                    )
                }
            )}
           </UlHashtags>
        </ContainerTranding>
    )
}

const ContainerTranding = styled.div`
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 27px;
    color: #FFFFFF;
    width: 301px;
    max-height: 435px;
    background-color: #171717;
    border-radius: 16px;
    margin: 132px 0 0 0;

    h1, input{
        margin: 9px 0 12px 18px;
    }

    @media(max-width: 994px){
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
    &:hover {
        text-shadow: 0 0 4px #fff, 0 0 4px #ff0;
    }
`;

const InputButtonTrending = styled.input`
    height: 30px;
    background-color: #EFEFEF;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    border: none;
    border-radius: 5px;
    margin-top: 8px;
    max-width: 503px;
    outline: none;
    font-size: 15px;

    &::placeholder, &::placeholder{
        color: #949494;
    }
    &:not(:focus), &:focus{
        padding-left: 10px;
    }
`;
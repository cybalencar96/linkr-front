import PageStyled from "../shared/PageStyled";
import { HashtagPostContainer } from "./HashtagPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Loading from "../shared/Loading";
import { getPostsByHashtag } from "../../services/Linkr";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function UserPostsPage() {
    const {userData} = useContext(UserContext);
    const [posts, setPosts] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {hashtag} = useParams();

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        getPostsByHashtag(hashtag, config)
        .then(response => {
            setPosts(response.data.posts);
            setIsLoading(false);
        })
        .catch(error => {
            alert("Failed to get posts from this hashtag, please refresh page")
            setIsLoading(false);
        })
    },[posts, userData.token]) //posts, userData.token

    if(!posts){
        return(
            <Loading />
        )
    }
    return (
        <PageStyled centralized>
            <HashtagPostContainer>
                <div>
                    <Title># {hashtag}</Title>
                    {isLoading ? <Loader type="Hearts" color="#00BFFF" height={80} width={80} />  : posts.length !== 0 ? posts.map(post => <Card post={post}/>) : "Nenhum post encontrado"}
                </div>
                <HashtagsInTranding ss={setIsLoading}/>
            </HashtagPostContainer>
        </PageStyled>
    )
}
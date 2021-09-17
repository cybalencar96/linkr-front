import PageStyled from "../shared/PageStyled";
import Topbar from "../shared/Topbar/Topbar";
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
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const {hashtag} = useParams();

    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    useEffect(() => {
        setLoading(true);
        getPostsByHashtag(hashtag, config)
        .then(response => {
            setLoading(false);
            setPosts(response.data.posts)
        })
        .catch(error => {
            setLoading(false);
            alert("Failed to get posts from this hashtag, please refresh page")
        })
    },[posts])

    if (!posts) {
        return 	<Loading/>
    }

    return (
        <PageStyled centralized>
            <HashtagPostContainer>
                <div>
                    <Title># {hashtag}</Title>
                    {posts.length !== 0 ? posts.map(post => <Card post={post}/>) : "Nenhum post encontrado"}
                </div>
                <HashtagsInTranding />
            </HashtagPostContainer>
        </PageStyled>
    )
}
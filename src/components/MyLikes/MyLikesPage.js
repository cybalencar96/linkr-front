import PageStyled from "../shared/PageStyled";
import { MyLikesContainer } from "./MyLikesStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getMyLikedPosts } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";

export default function MyLikesPage() {
    const {userData} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState("");

    useEffect(() => {
        if (userData) {
            renderPosts();
        }
    },[userData])

    function renderPosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        setLoading(true);
        getMyLikedPosts(config)
        .then(res => {
            setLoading(false);
            setPosts(res.data.posts)
        })
        .catch(err => {
            setLoading(false);
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
            console.log(err)
        })
    }

    if (!posts) {
        return 	<Loading/>
    }

    return (
        <PageStyled centralized>
            <MyLikesContainer>
                    <div>
                    <Title>my likes</Title>
                    {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts}/>) : <NoPosts/>}
                    </div>
                    <HashtagsInTranding />
            </MyLikesContainer>
        </PageStyled>
    )
}   
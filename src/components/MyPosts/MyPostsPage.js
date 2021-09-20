import PageStyled from "../shared/PageStyled";
import { MyPostsContainer } from "./MyPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getPostsByUserId } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";

export default function MyPostsPage() {
    const { userData } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState("");

    useEffect(() => {
        if (userData) {
            renderPosts();
        }
    }, [userData])

    function renderPosts() {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        setLoading(true);
        getPostsByUserId(userData.user.id, config)
            .then(res => {
                setLoading(false);
                setPosts(res.data.posts)
            })
            .catch(err => {
                setLoading(false);
                alert("Houve uma falha ao obter os posts, por favor atualize a página")
            })
    }

    if (!posts) {
        return <Loading />
    }

    return (

        <PageStyled centralized>
            <MyPostsContainer>
                <Title>my posts</Title>
                <div className="content">
                    <div>
                        {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />) : <NoPosts />}
                    </div>
                    <HashtagsInTranding />
                </div>
            </MyPostsContainer>
        </PageStyled>
    )
}

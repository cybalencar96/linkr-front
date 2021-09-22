import PageStyled from "../shared/PageStyled";
import Topbar from "../shared/Topbar/Topbar";
import { UserPostsContainer } from "./UserPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { getPostsByUserId } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import YoutubeContext from "../../contexts/YoutubeContext";

export default function UserPostsPage() {
    const {userData} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const params = useParams();
    const history = useHistory();
    const {setYoutubeVideos} = useContext(YoutubeContext)
    
    useEffect(() => {
        setYoutubeVideos([]);

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
        setIsLoading(true);
        getPostsByUserId(params.id, config)
        .then(res => {
            setIsLoading(false);
            setPosts(res.data.posts)
        })
        .catch(err => {
            setIsLoading(false);
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
            history.push("/my-posts");
        })
    }

    if (!posts) {
        return 	<Loading/>
    }

    return (
        <PageStyled centralized>
            <UserPostsContainer>
                <Title>{posts[0].user.username}'s posts</Title>
                <div className="content">
                    <div>
                        {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts}/>) : <NoPosts />}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </UserPostsContainer>
        </PageStyled>
    )
}
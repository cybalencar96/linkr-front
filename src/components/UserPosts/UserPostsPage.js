import PageStyled from "../shared/PageStyled";
import { UserPostsContainer } from "./UserPostsStyled";
import { PageTitle } from '../shared/PageTitle';
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { getPostsByUserId } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import { PublishButton } from "../shared/PublishLink/PostLink";

export default function UserPostsPage() {
    const { userData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const { id } = useParams();
    const history = useHistory();

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
        getPostsByUserId(id, config)
            .then(res => {
                setPosts(res.data.posts)
            })
            .catch(err => {
                alert("Houve uma falha ao obter os posts, por favor atualize a página")
                history.push("/");
            })
    }

    if (!posts) {
        return <Loading />
    }

    return (
        <PageStyled centralized>
            <UserPostsContainer>
                <PageTitle titleTxt={`${posts[0].user.username}'s posts`} >
                    <PublishButton disabled={isLoading} >{isLoading ? "Follow" : "Unfollow"}</PublishButton>
                </PageTitle>
                <div className="content">
                    <div>
                        {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />) : <NoPosts />}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading} />
                </div>
            </UserPostsContainer>
        </PageStyled>
    )
}
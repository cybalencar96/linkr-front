import PageStyled from "../shared/PageStyled";
import { UserPostsContainer } from "./UserPostsStyled";
import { PageTitle } from '../shared/PageTitle';
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { 
    getListOfFollowingRequest,
    getPostsByUserId,
    sendFollowRequest,
    sendUnfollowRequest } from "../../services/Linkr";
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
    const [isFollowing, setIsFollowing] = useState(false)

    useEffect(() => {
        if (userData) {
            renderPosts();
            getListOfFollowing();
        }
    }, [userData])

    function renderPosts() {
        getPostsByUserId(id, userData.token)
            .then(res => {
                setPosts(res.data.posts)
            })
            .catch(err => {
                alert("Houve uma falha ao obter os posts, por favor atualize a página")
                history.push("/");
            })
    }

    function getListOfFollowing(){
        setIsLoading(true);
        getListOfFollowingRequest(userData.token)
            .then((res) => {
                const serverResponse = res.data.users;
                setIsFollowing(serverResponse.map((user) => user.id).includes(Number(id)));
            })
            .catch(err => {
                alert(err);
            })
            .finally(() => setIsLoading(false))

    }

    function toggleFollow() {
        setIsLoading(true);
        if(isFollowing){
            sendUnfollowRequest(id, userData.token)
                .then(res => {
                    setIsFollowing(false);
                })
                .catch(err => {
                    console.log(err.response)
                })
                .finally(() => setIsLoading(false))
        }else{
            sendFollowRequest(id, userData.token)
                .then(res => {
                    setIsFollowing(true);
                })
                .catch(err => {})
                .finally(() => setIsLoading(false))
        }
    }

    function createButtonTxt() {
        if (isLoading === true)
            return "Loading...";
        return isFollowing ? "Unfollow" : "Follow";
    }

    if (!posts) {
        return <Loading />
    }

    return (
        <PageStyled centralized>
            <UserPostsContainer>
                <PageTitle titleTxt={`${posts[0].user.username}'s posts`} >
                    <PublishButton disabled={isLoading} isWhite={isFollowing} onClick={toggleFollow} >
                        {createButtonTxt()}
                    </PublishButton>
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
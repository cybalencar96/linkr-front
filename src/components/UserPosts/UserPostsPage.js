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
import Loading, { CardLoadingScreen } from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import YoutubeContext from "../../contexts/YoutubeContext";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";
import SearchBar from "../shared/Topbar/SearchBar";
import { PublishButton } from "../shared/PublishLink/PostLink";
import FollowingContext from "../../contexts/FollowingContext";
import InfiniteScroll from "react-infinite-scroll-component";


let page = 0;

export default function UserPostsPage() {
    const { userData } = useContext(UserContext);
    const { listOfFollowing, setListOfFollowing } = useContext(FollowingContext)
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const { id } = useParams();
    const history = useHistory();
    const {setYoutubeVideos} = useContext(YoutubeContext)
    const {windowWidth} = useWindowDimensions();
    const [isFollowing, setIsFollowing] = useState(false)

    const [hasNext, setHasNext] = useState(true);

    useEffect(() => {
        setYoutubeVideos([]);

        if (userData) {
            if (id === userData.user.id)
                history.push("/my-posts")

            setIsFollowing(listOfFollowing.includes(Number(id)))
            renderPosts(true);
            getListOfFollowing();

        }
    },[id,userData])
    
    function renderPosts(reload) {
        
        setIsLoading(true);

        if(reload){

            page = 0;
        }

        getPostsByUserId(id, userData.token, page)
        .then(res => {
            setIsLoading(false);

            if(!page){
                setPosts(res.data.posts);
                setHasNext(true);
            }
            else{
                setPosts(posts.concat(res.data.posts));
            }            
            if(res.data.posts.length < 10){
                setHasNext(!hasNext);
            }
        })
        .catch(err => {
            setIsLoading(false);
            alert("Houve uma falha ao obter os posts, por favor atualize a página")
        })
    }

    function toggleFollow() {
        setIsLoading(true);
        if(isFollowing){
            sendUnfollowRequest(id, userData.token)
                .then(res => {
                    setIsFollowing(false);
                    setListOfFollowing(() => listOfFollowing.filter((listId) => listId != id))
                })
                .catch(err => {
                    console.log(err.response)
                })
                .finally(() => setIsLoading(false))
        }else{
            sendFollowRequest(id, userData.token)
                .then(res => {
                    setIsFollowing(true);
                    
                    setListOfFollowing([...listOfFollowing, Number(id)])
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

    const fetchMoreData = () => {
        setTimeout(() => {
          page += 11;
          renderPosts();
        }, 2000);
    };

    return (
        <PageStyled centralized>
            <SearchBar display={windowWidth >= 992 ? "none" : "initial"}/>

            <UserPostsContainer>
                <PageTitle titleTxt={`${posts[0].user.username}'s posts`} >
                    <PublishButton disabled={isLoading} isWhite={isFollowing} onClick={toggleFollow} >
                        {createButtonTxt()}
                    </PublishButton>
                </PageTitle>
                <div className="content">
                    <div>
                        {posts.length !== 0 ? 
                        <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchMoreData}
                        hasMore={hasNext}
                        loader={CardLoadingScreen()}
                        > 
                        {posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />)}
                        </InfiniteScroll> : <NoPosts />}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading} />
                </div>
            </UserPostsContainer>
        </PageStyled>
    )
}
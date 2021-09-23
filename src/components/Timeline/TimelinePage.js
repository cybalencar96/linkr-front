import PageStyled from "../shared/PageStyled";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import PostLink from "../shared/PublishLink/PostLink";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { apiTeste, getListOfFollowingRequest, getPosts, getPostsByFollowUsers } from "../../services/Linkr";
import Loading, { CardLoadingScreen } from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import YoutubeContext from "../../contexts/YoutubeContext";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";

let type = "";

export default function TimelinePage() {
    const { userData } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const {setYoutubeVideos} = useContext(YoutubeContext);
    const {windowWidth} = useWindowDimensions();
    const [usersFollowing, setUserFollowing] = useState([]);
    const [noFollowing, setNoFollowing] = useState(false)

    useEffect(() => {
        setYoutubeVideos([]);
        if (userData) {
            renderPosts(true);
            getListFollowUSers();
        }
    }, [userData]);

    function renderPosts(reload) {

        if(reload){
            type = "";
        }   
        
        getPostsByFollowUsers(userData.token, type)
            .then(res => {
                if(!type.length){
                    setPosts(res.data.posts.filter(post => post.user.id !== userData.user.id));
                    setHasNext(true);
                }
                else{
                    setPosts(posts.concat(res.data.posts.filter(post => post.user.id !== userData.user.id)));
                }
    
                if(res.data.posts.length < 10){

                    setHasNext(!hasNext);
                }
            })
            .catch(err => {
                alert("Houve uma falha ao obter os posts, por favor atualize a página");
            })
    }

    function getListFollowUSers () {

        getListOfFollowingRequest(userData.token)
            .then(res => {

                setUserFollowing(res.data.users);
                if(!res.data.users.length) {
                    setNoFollowing(true);
                }
            })
            .catch(error => {
                alert("server error! please reload the page");
            })
    }

    const fetchMoreData = () => {
        setTimeout(() => {
          type = `?olderThan=${posts[posts.length - 1].id}`;
          renderPosts();
        }, 2000);
    };

    if (!posts) {
        return <Loading />
    }
    
    return (
        <PageStyled centralized>
            <TimelineContainer>
                <Title>timeline</Title>
                <div className="content">
                    <div posts="posts">
                        <PostLink renderPosts={renderPosts} />
                        {posts.length !== 0 ? 
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={fetchMoreData}
                            hasMore={hasNext}
                            loader={CardLoadingScreen()}
                        >
                        {posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />)}
                        </InfiniteScroll> : <NoPosts content={noFollowing ? "Você não segue ninguém ainda, procure por perfis na busca" : "Nenhuma publicação encontrada"}/>}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </TimelineContainer>
        </PageStyled>
    )
}
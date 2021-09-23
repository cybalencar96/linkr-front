import PageStyled from "../shared/PageStyled";
import { MyPostsContainer } from "./MyPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getPostsByUser, getPostsByUserId } from "../../services/Linkr";
import Loading, { CardLoadingScreen } from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
<<<<<<< HEAD
import InfiniteScroll from "react-infinite-scroll-component";

let page = 0;
=======
import YoutubeContext from "../../contexts/YoutubeContext";
import SearchBar from "../shared/Topbar/SearchBar";
import useWindowDimensions from "../../services/hooks/useWindowDimensions.js";
>>>>>>> feat/newTimeline

export default function MyPostsPage() {
    const { userData } = useContext(UserContext);
    const {setYoutubeVideos} = useContext(YoutubeContext)
    const [isLoading, setIsLoading] = useState(false);
<<<<<<< HEAD
    const [posts, setPosts] = useState([]);
    const [hasNext, setHasNext] = useState(true);
=======
    const [posts, setPosts] = useState("");
    const {windowWidth} = useWindowDimensions();
>>>>>>> feat/newTimeline

    useEffect(() => {
        setYoutubeVideos([])
        if (userData) {
            renderPosts(true);
        }
    }, [userData])

<<<<<<< HEAD
    function renderPosts(reload) {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        setIsLoading(true);
        
        if(reload){
            page = 0;
        }

        getPostsByUser(userData.user.id, config, page)
=======
    function renderPosts() {
        setIsLoading(true);
        getPostsByUserId(userData.user.id, userData.token)
>>>>>>> feat/newTimeline
            .then(res => {
                setIsLoading(false);

                if(!page){
                    setPosts(res.data.posts);
                    setHasNext(true);
                }
                else{
                    setPosts(posts.concat(res.data.posts));
                }
                
                if(res.data.posts.length < 10) {

                    setHasNext(!hasNext);
                }
            })
            .catch(err => {
                setIsLoading(false);
                alert("Houve uma falha ao obter os posts, por favor atualize a página")
            })
    }

    const fetchMoreData = () => {
        setTimeout(() => {
          page += 11;
          renderPosts(false);
          console.log(posts)
        }, 2000);
    };

    if (!posts) {
        return <Loading />
    }

    return (

        <PageStyled centralized>
            <SearchBar display={windowWidth >= 992 ? "none" : "initial"}/>

            <MyPostsContainer>
                <Title>my posts</Title>
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
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </MyPostsContainer>
        </PageStyled>
    )
}

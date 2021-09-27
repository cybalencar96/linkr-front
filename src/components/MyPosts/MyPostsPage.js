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
import YoutubeContext from "../../contexts/YoutubeContext";
import SearchBar from "../shared/Topbar/SearchBar";
import useWindowDimensions from "../../services/hooks/useWindowDimensions.js";
import InfiniteScroll from "react-infinite-scroll-component";

let page = 0;

export default function MyPostsPage() {
    const { userData } = useContext(UserContext);
    const {setYoutubeVideos} = useContext(YoutubeContext)
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const {windowWidth} = useWindowDimensions();

    const [hasNext, setHasNext] = useState(true);

    useEffect(() => {
        setYoutubeVideos([])
        if (userData) {
            renderPosts(true);
        }
    }, [userData])

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

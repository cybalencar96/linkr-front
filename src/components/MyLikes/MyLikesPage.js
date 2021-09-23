import PageStyled from "../shared/PageStyled";
import { MyLikesContainer } from "./MyLikesStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getMyLikedPosts } from "../../services/Linkr";
import Loading, { CardLoadingScreen } from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import InfiniteScroll from "react-infinite-scroll-component";
import YoutubeContext from "../../contexts/YoutubeContext";
import SearchBar from "../shared/Topbar/SearchBar";
import useWindowDimensions from "../../services/hooks/useWindowDimensions.js";

let page = 0;

export default function MyLikesPage() {
    const {userData} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const {setYoutubeVideos} = useContext(YoutubeContext)
    const {windowWidth} = useWindowDimensions();

    useEffect(() => {
        setYoutubeVideos([])

        if (userData) {
            renderPosts(true);
        }
    },[userData])

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

        getMyLikedPosts(config, page)
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

    const fetchMoreData = () => {
        setTimeout(() => {
          page += 11;
          renderPosts();
        }, 2000);
    };

    if (!posts) {
        return 	<Loading/>
    }

    return (
        <PageStyled centralized>
            <SearchBar display={windowWidth >= 992 ? "none" : "initial"}/>

            <MyLikesContainer>
                <Title>my likes</Title>
                <div className="content">
                    <div>
                        {posts.length !== 0 ?
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={fetchMoreData}
                            hasMore={hasNext}
                            loader={CardLoadingScreen()}
                        > 
                        {posts.map(post => 
                            <Card post={post} key={post.id} renderPosts={renderPosts} isMyLikesPage />)}
                        </InfiniteScroll> : <NoPosts/>}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </MyLikesContainer>
        </PageStyled>
    )
}   
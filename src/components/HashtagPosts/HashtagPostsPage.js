import PageStyled from "../shared/PageStyled";
import { HashtagPostContainer } from "./HashtagPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router"; 
import UserContext from "../../contexts/UserContext";
import Loading, { CardLoadingScreen } from "../shared/Loading";
import { getPostsByHashtag } from "../../services/Linkr";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import styled from "styled-components";
import NoPosts from "../shared/NoPosts";
import YoutubeContext from "../../contexts/YoutubeContext";
import InfiniteScroll from "react-infinite-scroll-component";

let page = 0;
let infinityScrollSetTimeout = null;

export default function HashtagPostsPage() {
    const {userData} = useContext(UserContext);
    const {setYoutubeVideos} = useContext(YoutubeContext)

    const [posts, setPosts] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {hashtag} = useParams();
    let history = useHistory();
    const [hasNext, setHasNext] = useState(true);
 
    useEffect(() => {
        setYoutubeVideos([])
        
        if (userData) {
            clearTimeout(infinityScrollSetTimeout) //previne renderizar posts de outras paginas
            renderPosts(true);
        }else if (userData === ""){
            history.push("/")
        }
    }, [hashtag, userData])
    
    function renderPosts(reload) {
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }

        if(reload){

            page = 0;
        }

        getPostsByHashtag(hashtag, config, page)
        .then(response => {
            setTimeout(() => {setIsLoading(false)}, 1000)

            if(!page){
                setPosts(response.data.posts);
                setHasNext(true);
            }
            else{
                setPosts(posts.concat(response.data.posts));
            }

            if(response.data.posts.length < 10) {

                setHasNext(!hasNext);
            }
        })
        .catch(error => {
            alert("Failed to get posts from this hashtag, please refresh page")
        })
    }



    if(!posts){
        return(
            <Loading />
        )
    }

    const fetchMoreData = () => {
        infinityScrollSetTimeout = setTimeout(() => {
          page += 11;
          renderPosts();
        }, 2000);
    };
  
    return (
        <PageStyled centralized>
            <HashtagPostContainer>
                <TittleWithLimitattor># {hashtag}</TittleWithLimitattor>
                <div className="content">
                    <Separator>
                        {isLoading ?
                            <NoPosts centralized content={<Loader type="Hearts" color="#00BFFF" height={80} width={80} />}/> :
                            posts.length !== 0 ?
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={fetchMoreData}
                                hasMore={hasNext}
                                loader={CardLoadingScreen()}
                            > 
                            {posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts}/>)} 
                            </InfiniteScroll> : <NoPosts/>}
                    </Separator>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </HashtagPostContainer>
        </PageStyled>
    )
}

const TittleWithLimitattor = styled(Title)`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media(max-width: 996px){
        margin: 19px auto;
        width: 86vw;
    }
`;

const Separator = styled.div`
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Hashtauge = styled.span`
    width: 100%;
    font-size: 43px;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
`;
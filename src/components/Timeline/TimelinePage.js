import PageStyled from "../shared/PageStyled";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import PostLink from "../shared/PublishLink/PostLink";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { apiTeste, getPosts } from "../../services/Linkr";
import Loading, { CardLoadingScreen } from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import InfiniteScroll from "react-infinite-scroll-component";

let page = 0;

export default function TimelinePage() {
    const { userData } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);

    
    useEffect(() => {
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

        if(reload){
            page = 0;
        }

        getPosts(config, page)
            .then(res => {
                
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
                alert("Houve uma falha ao obter os posts, por favor atualize a página");
            })
    }

    const fetchMoreData = () => {
        setTimeout(() => {
          page += 11;
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
                        </InfiniteScroll> : <NoPosts />}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </TimelineContainer>
        </PageStyled>
    )
}
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
import InfiniteScroll from "react-infinite-scroll-component";

let page = 0;

export default function MyPostsPage() {
    const { userData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasNext, setHasNext] = useState(true);

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
        setIsLoading(true);
        getPostsByUser(userData.user.id, config, page)
            .then(res => {
                setIsLoading(false);
                setPosts(posts.concat(res.data.posts));

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
          renderPosts();
          console.log(posts)
        }, 2000);
    };

    if (!posts) {
        return <Loading />
    }

    return (

        <PageStyled centralized>
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

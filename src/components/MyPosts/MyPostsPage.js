import PageStyled from "../shared/PageStyled";
import { MyPostsContainer } from "./MyPostsStyled";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { getPostsByUserId } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import SearchBar from "../shared/Topbar/SearchBar";
import useWindowDimensions from "../../services/hooks/useWindowDimensions.js";

export default function MyPostsPage() {
    const { userData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState("");
    const {windowWidth} = useWindowDimensions();

    useEffect(() => {
        if (userData) {
            renderPosts();
        }
    }, [userData])

    function renderPosts() {
        setIsLoading(true);
        getPostsByUserId(userData.user.id, userData.token)
            .then(res => {
                setIsLoading(false);
                setPosts(res.data.posts)
            })
            .catch(err => {
                setIsLoading(false);
                alert("Houve uma falha ao obter os posts, por favor atualize a página")
            })
    }

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
                        {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />) : <NoPosts />}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </MyPostsContainer>
        </PageStyled>
    )
}

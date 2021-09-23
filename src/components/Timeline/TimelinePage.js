import PageStyled from "../shared/PageStyled";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import PostLink from "../shared/PublishLink/PostLink";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import YoutubeContext from "../../contexts/YoutubeContext";
import { getPosts } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import SearchBar from "../shared/Topbar/SearchBar";
import useWindowDimensions from "../../services/hooks/useWindowDimensions.js";

export default function TimelinePage() {
    const { userData } = useContext(UserContext);
    const {setYoutubeVideos} = useContext(YoutubeContext);
    const [posts, setPosts] = useState("");
    const {windowWidth} = useWindowDimensions();

    useEffect(() => {
        setYoutubeVideos([]);
        if (userData) {
            renderPosts();
            const interval = setInterval(() => {
                renderPosts();
            }, 15000);
            return () => clearInterval(interval);
        }
    }, [userData])

    function renderPosts() {
        getPosts(userData.token)
            .then(res => {
                setPosts([...res.data.posts]);
            })
            .catch(err => {
                alert("Houve uma falha ao obter os posts, por favor atualize a página");
            })
    }


    if (!posts) {
        return <Loading />
    }

    return (
        <PageStyled centralized>
            <SearchBar display={windowWidth >= 992 ? "none" : "initial"}/>

            <TimelineContainer>
                <Title>timeline</Title>
                <div className="content">
                    <div posts="posts">
                        <PostLink renderPosts={renderPosts} />
                        {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />) : <NoPosts />}
                    </div>
                    <HashtagsInTranding />
                </div>
            </TimelineContainer>
        </PageStyled>
    )
}
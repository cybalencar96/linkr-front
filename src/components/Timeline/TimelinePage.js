import PageStyled from "../shared/PageStyled";
import { TimelineContainer } from "./TimelineStyle";
import Title from '../shared/PageTitle'
import Card from "../shared/Card/Card";
import PostLink from "../shared/PublishLink/PostLink";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import YoutubeContext from "../../contexts/YoutubeContext";
import { getListOfFollowingRequest, getPosts, getPostsByFollowUsers } from "../../services/Linkr";
import Loading from "../shared/Loading";
import HashtagsInTranding from "../shared/HashtagsInTranding/HashtagsInTranding";
import NoPosts from "../shared/NoPosts";
import SearchBar from "../shared/Topbar/SearchBar";
import useWindowDimensions from "../../services/hooks/useWindowDimensions.js";

export default function TimelinePage() {
    const { userData } = useContext(UserContext);
    const {setYoutubeVideos} = useContext(YoutubeContext);
    const [posts, setPosts] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {windowWidth} = useWindowDimensions();
    const [usersFollowing, setUserFollowing] = useState([]);
    const [message, setMessage] = useState({noFollowing : false, noPublications : false})

    
    useEffect(() => {
        setYoutubeVideos([]);
        if (userData) {
            renderPosts();
            getListFollowUSers();
        }
    }, [userData])
    
    function renderPosts() {

        getPostsByFollowUsers(userData.token)
            .then(res => {
                setPosts(res.data.posts.filter(post => post.user.id !== userData.user.id));
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
                    setMessage({noFollowing : true, noPublications : false})
                }
            })
            .catch(error => {
                alert("erro no servidor, favor recarregar a página");
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
                        {posts.length !== 0 ? posts.map(post => <Card post={post} key={post.id} renderPosts={renderPosts} />) : <NoPosts content={message.noFollowing ? "Você não segue ninguém ainda, procure por perfis na busca" : "Nenhuma publicação encontrada"}/>}
                    </div>
                    <HashtagsInTranding setIsLoading={setIsLoading}/>
                </div>
            </TimelineContainer>
        </PageStyled>
    )
}